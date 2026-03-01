const res = await fetch('./data.json');
const data = await res.json();

const rankingType = document.body.dataset.rankingType;
const validTypes = ['like', 'live', 'pv'];
const currentType = validTypes.includes(rankingType) ? rankingType : 'like';

const formatCount = (value, type) => {
  if (type === 'pv') return `+${value}%`;
  return value.toLocaleString('ja-JP');
};

const renderCard = (item, index, type) => {
  const rank = index + 1;
  const top3 = rank <= 3 ? 'top3' : '';
  const metricLabel = type === 'like' ? '♥' : type === 'live' ? '同接' : '伸び率';

  return `
    <article class="ranking-card" aria-label="${rank}位 ${item.name}">
      <div class="card-image">${rank}</div>
      <div class="card-body">
        <div class="meta-row">
          <span class="rank-badge ${top3}">${rank}位</span>
          <span class="count">${metricLabel} ${formatCount(item.count, type)}</span>
        </div>
        <h3 class="card-name">${item.name}</h3>
        <p class="belong">${item.office}</p>
      </div>
    </article>
  `;
};

const grid = document.querySelector(`[data-grid="${currentType}"]`);
if (grid) {
  const items = data[currentType] ?? [];
  grid.innerHTML = items.map((item, index) => renderCard(item, index, currentType)).join('');
}
