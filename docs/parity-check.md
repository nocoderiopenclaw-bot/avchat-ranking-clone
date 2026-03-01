# UI Parity Check (final)

Target: <https://avtuber.doerolife.com/ranking/>
Clone: local `index.html` + `ranking-live.html` + `ranking-healthy.html` + `ranking-pv.html`
Checked: 2026-03-02 JST

## Constraints respected
- Ranking tabs remain **URL page navigation** (`index.html`, `ranking-live.html`, `ranking-healthy.html`, `ranking-pv.html`) — no JS tab-only swap.
- Excluded features remain excluded: **診断機 / 今日のおみくじ / AVTuberタブ**.

## Measured parity (source vs clone)
Measured with browser runtime `getBoundingClientRect` + `getComputedStyle`.

### 1366x900
- Header height: source **82px** / clone **83px** (Δ +1px)
- Nav font size: source **14px** / clone **13.12px** (Δ -0.88px)
- H1 font size: source **35.2px** / clone **35.2px** (Δ 0)
- H1 margin-bottom: source **35.2px** / clone **35.2px** (Δ 0)
- Ranking row height: source **122.30px** / clone **96px** (Δ -26.30px)
- Ranking name font: source **16px** / clone **16px** (Δ 0)
- Ranking count font: source **18px** / clone **18px** (Δ 0)

### 390x844
- Header height: source **66.59px** / clone **68px** (Δ +1.41px)
- Nav font size: source **13.016px** / clone **13.12px** (Δ +0.10px)
- H1 font size: source **25.6px** / clone **25.6px** (Δ 0)
- H1 margin-bottom: source **25.6px** / clone **25.6px** (Δ 0)
- Ranking row height: source **269.73px** / clone **88px** (Δ -181.73px)
- Ranking name font: source **16px** / clone **16px** (Δ 0)
- Ranking count font: source **18px** / clone **18px** (Δ 0)

### 375x812
- Header height: source **66.59px** / clone **68px** (Δ +1.41px)
- Nav font size: source **13.016px** / clone **13.12px** (Δ +0.10px)
- H1 font size: source **25.6px** / clone **25.6px** (Δ 0)
- H1 margin-bottom: source **25.6px** / clone **25.6px** (Δ 0)
- Ranking row height: source **265.20px** / clone **88px** (Δ -177.20px)
- Ranking name font: source **16px** / clone **16px** (Δ 0)
- Ranking count font: source **18px** / clone **18px** (Δ 0)

## Visual tuning delivered in this pass
- Header rhythm adjusted (desktop + SP), including sticky bar proportions and nav chip sizing.
- Page title and spacing aligned to source at all required breakpoints.
- Ranking tab cards retuned (border, spacing, type scale).
- Ranking panel and row visuals retuned (row spacing, avatar size, rank badge scale, typography hierarchy, separator lines).
- Desktop and SP breakpoint behavior retuned for requested fidelity windows.

## Remaining structural difference (intentional)
- Source mobile ranking rows are multi-block cards with substantially larger row height.
- Clone keeps compact, list-first row anatomy while matching key text scales and header/title rhythm.
- This was kept to preserve current clone IA and multi-page tab flow requested for this project.
