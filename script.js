const res = await fetch('./data.json');
const data = await res.json();

const formatCount = (value, type) => {
  if (type === 'pv') return `+${value}%`;
  return value.toLocaleString('ja-JP');
};

const renderCard = (item, index, type) => {
  const rank = index + 1;
  const top3 = rank <= 3 ? 'top3' : '';
  const metricLabel =
    type === 'like' ? '♥' : type === 'live' ? '同接' : '伸び率';

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

for (const [type, items] of Object.entries(data)) {
  const grid = document.querySelector(`[data-grid="${type}"]`);
  if (!grid) continue;
  grid.innerHTML = items.map((item, index) => renderCard(item, index, type)).join('');
}

const sectionIds = ['like', 'live', 'pv'];
const tabs = document.querySelectorAll('.anchor-tab');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    tabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      if (!sectionIds.includes(id)) return;
      tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.target === id));
    });
  },
  { rootMargin: '-40% 0px -45% 0px' }
);

sectionIds.forEach((id) => {
  const sec = document.getElementById(id);
  if (sec) observer.observe(sec);
});
