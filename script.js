const res = await fetch('./data.json');
const data = await res.json();

const rankingType = document.body.dataset.rankingType;
const validTypes = ['like', 'live', 'healthy', 'pv'];
const currentType = validTypes.includes(rankingType) ? rankingType : 'like';

const formatCount = (value, type) => {
  if (type === 'pv') return `+${value}%`;
  return value.toLocaleString('ja-JP');
};

const metricLabel = (type) => {
  if (type === 'like') return '♥';
  if (type === 'live' || type === 'healthy') return '同接';
  return '伸び率';
};

const initialBadge = (name) =>
  name
    .replace(/\s+/g, '')
    .slice(0, 2)
    .toUpperCase();

const renderRow = (item, index, type) => {
  const rank = index + 1;
  const topClass = rank <= 3 ? `top${rank}` : '';

  return `
    <article class="rank-row" aria-label="${rank}位 ${item.name}">
      <div class="rank-no ${topClass}">${rank}</div>
      <div class="rank-avatar">${initialBadge(item.name)}</div>
      <div class="rank-meta">
        <h3 class="rank-name">${item.name}</h3>
        <p class="rank-office">${item.office}</p>
      </div>
      <div class="rank-count">${metricLabel(type)} ${formatCount(item.count, type)}</div>
    </article>
  `;
};

const grid = document.querySelector(`[data-grid="${currentType}"]`);
if (grid) {
  const items = data[currentType] ?? [];
  grid.innerHTML = items.map((item, index) => renderRow(item, index, currentType)).join('');
}
