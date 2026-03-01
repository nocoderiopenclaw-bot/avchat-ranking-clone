const res = await fetch('./data.json');
const data = await res.json();

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

for (const [type, items] of Object.entries(data)) {
  const grid = document.querySelector(`[data-grid="${type}"]`);
  if (!grid) continue;
  grid.innerHTML = items.map((item, index) => renderCard(item, index, type)).join('');
}

const sectionIds = ['like', 'live', 'pv'];
const tabs = [...document.querySelectorAll('.anchor-tab')];
const setActiveTab = (id) => {
  tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.target === id));
};

tabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    const target = tab.dataset.target;
    const el = document.getElementById(target);
    if (!el) return;

    e.preventDefault();
    history.replaceState(null, '', `#${target}`);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveTab(target);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries.find((entry) => entry.isIntersecting);
    if (!visible) return;
    const id = visible.target.id;
    if (!sectionIds.includes(id)) return;
    setActiveTab(id);
  },
  { rootMargin: '-30% 0px -55% 0px', threshold: 0.01 }
);

sectionIds.forEach((id) => {
  const sec = document.getElementById(id);
  if (sec) observer.observe(sec);
});

const initialHash = location.hash.replace('#', '');
if (sectionIds.includes(initialHash)) {
  const target = document.getElementById(initialHash);
  if (target) {
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
      setActiveTab(initialHash);
    }, 0);
  }
} else {
  setActiveTab('like');
}

window.addEventListener('hashchange', () => {
  const id = location.hash.replace('#', '');
  if (!sectionIds.includes(id)) return;
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setActiveTab(id);
});
