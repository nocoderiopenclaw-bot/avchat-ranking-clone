# Reference Extraction: avtuber.doerolife.com/ranking

Source captured: `../reference.html` (downloaded 2026-03-01).

## 1) High-level page structure (observed)

- `header.header`
  - `.sitetitle` (logo)
  - `nav.gnav > ul.menu` main links
  - Included links to remove in clone:
    - `診断機`
    - `今日のおみくじ`
    - `AVtuberとは`
- quick ranking anchors (within menu region)
  - `#user` (ユーザーランキング)
  - `#live-r18` (同接ランキング)
  - `#pv` (急上昇ランキング)
- `main > .column-wrapper.-ranking > .column-left`
  - breadcrumbs
  - `h1.title-page`
  - `.ranking-main`
    - `section#like.box-white`
    - `section#live-r18.box-white`
    - `section#pv.box-white`

## 2) Ranking card structure (observed classes)

Each ranking section uses Splide carousel in source:

- `.like-ranking-slider.splide` / `.live-ranking-slider-r18.splide`
- `.splide__track > .splide__list > .splide__slide`
- `.ranking-card`
  - `.img.square` (thumbnail area)
  - count row (heart icon + numeric count)
  - `.text`
    - `.rank-icon.rank{n}` (rank badge image)
    - name
    - office (`.belong`)

Clone implementation keeps this semantic hierarchy but uses CSS Grid instead of Splide to simplify local runnable demo.

## 3) Preserved visual language in clone

- light paper cards (`box-white`) on soft gray background
- hot pink accent for `AV` and ranking emphasis
- rounded cards and compact dense ranking tiles
- 3 ranking blocks (ユーザー / 同接 / 急上昇)
- top anchor tabs to jump to each ranking section

## 4) Explicitly removed features from clone (as requested)

- 診断機
- 今日のおみくじ
- AVtuber（関連タブ/導線）

## 5) Notes on data fidelity

- The production page is dynamic and includes lazy-loaded images, WordPress plugin scripts, and login-gated behavior.
- Clone data in `data.json` is sample/mock for demonstration and local prototyping.
