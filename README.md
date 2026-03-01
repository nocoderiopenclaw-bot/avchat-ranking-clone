# AVtuber Ranking Clone (High-Fidelity)

A polished, high-fidelity clone of `https://avtuber.doerolife.com/ranking/` focused on ranking UX and layout.

> Removed features/tabs as requested:
> - 診断機
> - 今日のおみくじ
> - AVTuber (関連タブ/導線)

## What is included

- Sticky header + ranking-focused nav
- Ranking anchor tabs (ユーザー / 同接 / 急上昇)
- 3 ranking sections with card grids
- Responsive layout (desktop/mobile)
- Local mock data (`data.json`)

## Project structure

```text
avtuber-ranking-clone/
├─ index.html
├─ styles.css
├─ script.js
├─ data.json
├─ reference.html                     # captured source HTML for analysis
└─ docs/
   ├─ reference-structure.md          # extracted base HTML/CSS structure notes
   └─ backend-feasibility-report.md   # backend design and risk analysis
```

## Run locally

Because `script.js` loads `data.json`, serve via HTTP (not `file://`).

### Option A: Python

```bash
cd /Users/nri/.openclaw-taro/workspace/avtuber-ranking-clone
python3 -m http.server 5173
```

Open: `http://localhost:5173`

### Option B: Node (if installed)

```bash
cd /Users/nri/.openclaw-taro/workspace/avtuber-ranking-clone
npx serve . -p 5173
```

## Notes

- This clone is for UI/prototyping reference.
- Data in `data.json` is sample data, not live production sync.
- For backend production planning, see:
  - `docs/backend-feasibility-report.md`
