# UI Parity Check (final)

Target: <https://avtuber.doerolife.com/ranking/>
Clone: local `index.html` + `ranking-live.html` + `ranking-healthy.html` + `ranking-pv.html`
Checked: 2026-03-02 JST

## Constraints respected
- Ranking tabs remain **URL page navigation** (`index.html`, `ranking-live.html`, `ranking-healthy.html`, `ranking-pv.html`) — no JS-only tab swap.
- Excluded features remain excluded: **診断機 / 今日のおみくじ / AVTuberタブ**.

## Iteration result (SP row/card parity fix)
- Reworked ranking row/card anatomy on SP to a vertical card structure (`rank/count` top line + centered avatar + centered meta).
- Increased SP card density/height to match source rhythm.
- Tuned desktop ranking row height to source-level density.

## Measured parity (source vs clone)
Measured with runtime `getBoundingClientRect` + `getComputedStyle`.

| Viewport | Metric | Source | Clone | Δ |
|---|---|---:|---:|---:|
| 1366x900 | Header height | 82.00px | 83.00px | +1.00px |
| 1366x900 | Nav font size | 14.00px | 13.12px | -0.88px |
| 1366x900 | H1 font size | 35.20px | 35.20px | 0.00px |
| 1366x900 | H1 margin-bottom | 35.20px | 35.20px | 0.00px |
| 1366x900 | Ranking row/card height | 122.30px | 122.00px | -0.30px |
| 1366x900 | Ranking name font | 16.00px | 16.00px | 0.00px |
| 1366x900 | Ranking count font | 18.00px | 18.00px | 0.00px |
| 390x844 | Header height | 66.59px | 68.00px | +1.41px |
| 390x844 | Nav font size | 13.016px | 13.12px | +0.10px |
| 390x844 | H1 font size | 25.60px | 25.60px | 0.00px |
| 390x844 | H1 margin-bottom | 25.60px | 25.60px | 0.00px |
| 390x844 | Ranking row/card height | 269.73px | 267.00px | -2.73px |
| 390x844 | Ranking name font | 16.00px | 16.00px | 0.00px |
| 390x844 | Ranking count font | 18.00px | 18.00px | 0.00px |
| 375x812 | Header height | 66.59px | 68.00px | +1.41px |
| 375x812 | Nav font size | 13.016px | 13.12px | +0.10px |
| 375x812 | H1 font size | 25.60px | 25.60px | 0.00px |
| 375x812 | H1 margin-bottom | 25.60px | 25.60px | 0.00px |
| 375x812 | Ranking row/card height | 265.20px | 262.00px | -3.20px |
| 375x812 | Ranking name font | 16.00px | 16.00px | 0.00px |
| 375x812 | Ranking count font | 18.00px | 18.00px | 0.00px |

## Acceptance status
- [x] SP ranking row/card vertical structure and density aligned to source-level proportions.
- [x] Ranking tab switching is page URL navigation.
- [x] Exclusions preserved (診断機 / 今日のおみくじ / AVTuber tab absent).
- [x] Required breakpoints validated (1366x900, 390x844, 375x812).
- [x] list/live/news pages remain coherent/responsive after ranking refinements.

Overall parity checklist: **effectively green**.
