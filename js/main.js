// Project cards (swap the colour for an image path when you have photos)
const projects = [
  { name: 'Meydan World Cup', color: '#6b3a2a', image: '' },
  { name: 'Maison Margiela S/S', color: '#4a6a78', image: '' },
  { name: 'Soho House Dubai', color: '#7a4a1e', image: '' },
  { name: 'District 09', color: '#1d3a8a', image: '' },
  { name: 'Amwaj Resorts', color: '#c98a6a', image: '' },
];

const track = document.getElementById('track');
projects.forEach(({ name, color, image }) => {
  const bg = image ? `url(${image}) center/cover` : `linear-gradient(160deg, ${color}, #111)`;
  track.insertAdjacentHTML('beforeend',
    `<div class="card"><div class="img" style="background:${bg}"></div>${name}</div>`);
});

// Rotating headline words; click a word to lock it
const rotating = [
  { el: document.getElementById('verb'), words: ['BREAK', 'BEND', 'REDEFINE', 'PUSH'] },
  { el: document.getElementById('noun'), words: ['LIMITS', 'RULES', 'BOUNDARIES'] },
  { el: document.getElementById('poss'), words: ['POSSIBILITY', 'IMAGINATION', 'VISION'] },
];

rotating.forEach(({ el, words }) => {
  let i = 0;
  el.addEventListener('click', () => el.classList.toggle('locked'));
  setInterval(() => {
    if (el.classList.contains('locked')) return;
    el.style.opacity = 0;
    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.style.opacity = 1;
    }, 350);
  }, 2600);
});

// Cinema dimming + carousel movement on scroll
const work = document.getElementById('work');
const dim = document.getElementById('dim');
const titles = document.querySelectorAll('#work .title');

function onScroll() {
  const rect = work.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, (innerHeight - rect.top) / innerHeight));
  dim.style.opacity = (1 - progress) * 0.8;
  titles.forEach(t => t.classList.toggle('in', progress > 0.5));
  track.style.transform = `rotateY(${(rect.top / innerHeight) * 8}deg) translateX(${rect.top * 0.08}px)`;
}
addEventListener('scroll', onScroll);
onScroll();

// Hero: the button and the first scroll gesture auto-scroll to the next section
const next = document.getElementById('break');
const goNext = () => next.scrollIntoView({ behavior: 'smooth' });
document.getElementById('scrollBtn').addEventListener('click', e => { e.preventDefault(); goNext(); });

let heroLock = false;
addEventListener('wheel', e => {
  if (e.deltaY > 0 && scrollY < 10 && !heroLock) {
    heroLock = true;
    goNext();
    setTimeout(() => (heroLock = false), 1200);
  }
}, { passive: true });
