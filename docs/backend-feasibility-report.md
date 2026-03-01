# Backend Feasibility Report (Ranking Clone)

## Scope
This report evaluates backend implementation feasibility for a ranking site with:

- User ranking (likes)
- Concurrent viewers ranking (同接)
- Trending ranking (急上昇)

and addresses: possible/impossible items, ranking logic, data model, and ops risks.

---

## 1. Feasibility Summary

## Possible (high confidence)
- Periodic batch ranking generation (hourly/daily cron)
- Real-time-ish updates (1-5 min lag) using stream ingestion + cache
- Leaderboard API (`/api/rankings?type=like|live|pv`)
- Anti-duplicate likes with account/device/IP heuristics
- Historical snapshots and time-window ranking (7d, 30d)

## Conditionally possible (needs external contracts)
- Accurate 同接 data across multiple streaming platforms
  - Requires official APIs or compliant scraping with legal review
- Cross-platform identity unification (same creator on different platforms)
  - Needs manual curation + fuzzy matching safeguards

## Hard / effectively impossible without compromise
- Perfect bot-proof like counting
- Truly real-time, exact concurrent viewers from all platforms simultaneously
- Zero-latency global ranking recomputation at huge scale without cost tradeoff

---

## 2. Ranking Logic Proposal

## 2.1 User ranking (likes)
Recommended score:

`score_like = unique_likes_7d + 0.35 * comments_7d + quality_bonus`

Where:
- `unique_likes_7d`: deduplicated by account + device fingerprint + velocity checks
- `comments_7d`: optional engagement weight
- `quality_bonus`: capped manual/editorial bonus for anti-gaming

Tie-breakers:
1. `likes_24h`
2. `total_followers`
3. latest updated timestamp

## 2.2 同接 ranking (concurrent viewers)
Use robust average to avoid short spikes:

`score_live = trimmed_mean(concurrent_viewers_samples_7d, trim=10%)`

Optional confidence factor:

`score_live_adj = score_live * data_confidence`

where `data_confidence` reflects source API stability and sampling quality.

## 2.3 急上昇 ranking (trending)
Use relative growth with floor to avoid tiny-number explosions:

`score_pv = (pv_7d_recent - pv_7d_prev) / max(pv_7d_prev, 200)`

Optionally blended with watch-time growth:

`score_trend = 0.7 * score_pv + 0.3 * score_watchtime`

Anti-noise:
- minimum baseline traffic threshold
- winsorize outliers
- cooldown period for newly created profiles

---

## 3. Data Model (minimal practical)

## Tables

### creators
- `id` (PK)
- `display_name`
- `office_id` (FK)
- `slug`
- `status` (active, suspended)
- `created_at`, `updated_at`

### offices
- `id` (PK)
- `name`
- `slug`

### creator_platform_accounts
- `id` (PK)
- `creator_id` (FK)
- `platform` (FC2, Fantia, etc.)
- `platform_user_id`
- `url`
- `verified`

### engagement_events
- `id` (PK)
- `creator_id` (FK)
- `event_type` (like, comment, view)
- `event_value` (int)
- `source`
- `occurred_at`
- indexes: `(creator_id, occurred_at)`, `(event_type, occurred_at)`

### live_samples
- `id` (PK)
- `creator_id` (FK)
- `platform`
- `concurrent_viewers`
- `sampled_at`
- index: `(creator_id, sampled_at)`

### ranking_snapshots
- `id` (PK)
- `ranking_type` (like/live/pv)
- `window` (7d, 30d)
- `generated_at`
- `payload_json` (ordered top-N list)

### votes (if explicit user heart action is supported)
- `id` (PK)
- `creator_id` (FK)
- `user_id` (nullable for anonymous)
- `device_hash`
- `ip_hash`
- `voted_at`
- unique/partial constraints per voting rule

---

## 4. API and Processing Architecture

## API
- `GET /api/rankings?type=like&window=7d&limit=50`
- `GET /api/creators/:slug`
- `POST /api/votes` (rate-limited)

## Batch/stream jobs
- ingest collector (platform APIs/scrapers)
- normalization job
- ranking materialization job
- cache warmer (Redis/CDN)

## Caching
- hot ranking payload in Redis (TTL 60-300 sec)
- CDN cache with stale-while-revalidate

---

## 5. Operational Risks

1. **Legal/compliance risk**
   - scraping ToS violation risk on some platforms
   - mitigation: official APIs first, legal review, source whitelist

2. **Gaming/abuse risk**
   - click farms, scripted likes, proxy rotation
   - mitigation: anomaly detection, risk scoring, delayed finalization

3. **Data quality risk**
   - API outages, schema drift, missing samples
   - mitigation: confidence scoring + fallback to previous snapshot

4. **Reputation risk**
   - ranking disputes from creators/fans
   - mitigation: transparent methodology page + correction workflow

5. **Cost risk**
   - high-frequency ingestion and recompute at scale
   - mitigation: tiered recompute cadence and adaptive sampling

---

## 6. Suggested MVP rollout

Phase 1 (2-4 weeks):
- single source ingestion
- 3 ranking types with hourly refresh
- top 50 API + static frontend

Phase 2:
- multi-source ingestion
- anti-abuse layer
- historical trend chart

Phase 3:
- near real-time updates
- creator claim/verification dashboard
- public methodology + audit trail

---

## Conclusion
A production-grade backend is **feasible** with standard web stack patterns. The hardest areas are cross-platform data correctness and abuse resistance, not UI rendering. For MVP, prioritize transparent scoring + stable ingestion over premature real-time complexity.
