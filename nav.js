/* ── JAVIS Shared Nav + Visitor Counter v1 ──────────────────────────────
   Usage: <script src="https://legendart.github.io/nav.js?v=2" defer></script>
          <script>document.addEventListener('DOMContentLoaded',()=>JavisNav.init('pageid'));</script>
   Page IDs: home | news | saju | star | humor | hotdeal | cal
─────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Service registry ─────────────────────────────────────────────── */
  const SERVICES = [
    { id: 'news',    emoji: '📡', label: '뉴스',  url: 'https://legendart.github.io/news/',    group: '정보' },
    { id: 'saju',   emoji: '🔮', label: '사주',  url: 'https://legendart.github.io/saju/',    group: '엔터' },
    { id: 'star',   emoji: '⭐', label: '스타',  url: 'https://legendart.github.io/star/',    group: '엔터' },
    { id: 'humor',  emoji: '😂', label: '유머',  url: 'https://legendart.github.io/humor/',   group: '커뮤니티' },
    { id: 'hotdeal',emoji: '🔥', label: '핫딜',  url: 'https://legendart.github.io/hotdeal/', group: '커뮤니티' },
    { id: 'cal',    emoji: '📅', label: '달력',  url: 'https://legendart.github.io/cal/',     group: '정보' },
  ];
  const GROUPS = ['정보', '엔터', '커뮤니티'];

  /* ── CSS ──────────────────────────────────────────────────────────── */
  const CSS = `
.jv-nav {
  position: sticky; top: 0; z-index: 2000;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 1.5rem;
  background: rgba(10,14,26,0.97);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  height: 48px; font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
}
.jv-nav__logo {
  font-weight: 800; font-size: 1rem; color: #7c83fd;
  text-decoration: none; letter-spacing: 0.05em; flex-shrink: 0;
}
.jv-nav__links { display: flex; height: 100%; gap: 0; }
.jv-nav__link {
  color: rgba(255,255,255,0.55); text-decoration: none;
  font-size: 0.82rem; font-weight: 500; padding: 0 0.85rem;
  height: 100%; display: flex; align-items: center; gap: 0.3rem;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s; white-space: nowrap;
}
.jv-nav__link:hover { color: #fff; }
.jv-nav__link.active { color: #fff; font-weight: 700; border-bottom-color: #7c83fd; }
.jv-nav__label { display: inline; }
/* ── Hamburger ── */
.jv-nav__hamburger {
  display: none; flex-direction: column; justify-content: center; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 4px;
  width: 36px; height: 36px; flex-shrink: 0;
}
.jv-nav__hamburger span {
  display: block; width: 22px; height: 2px;
  background: rgba(255,255,255,0.75); border-radius: 2px;
  transition: transform 0.25s, opacity 0.25s;
}
.jv-nav--open .jv-nav__hamburger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.jv-nav--open .jv-nav__hamburger span:nth-child(2) { opacity: 0; }
.jv-nav--open .jv-nav__hamburger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ── Mobile menu ── */
.jv-mobile-menu {
  display: none; position: absolute; top: 48px; left: 0; right: 0;
  background: rgba(10,14,26,0.98); backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding: 1rem 1.5rem 1.5rem; z-index: 1999;
}
.jv-nav--open .jv-mobile-menu { display: block; }
.jv-mobile-group { margin-bottom: 1rem; }
.jv-mobile-group:last-child { margin-bottom: 0; }
.jv-mobile-group__title {
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; color: rgba(255,255,255,0.3);
  margin-bottom: 0.4rem; padding-left: 0.2rem;
}
.jv-mobile-link {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.55rem 0.5rem; color: rgba(255,255,255,0.65);
  text-decoration: none; font-size: 0.92rem; font-weight: 500;
  border-radius: 8px; transition: background 0.15s, color 0.15s;
}
.jv-mobile-link:hover { background: rgba(255,255,255,0.07); color: #fff; }
.jv-mobile-link.active { color: #7c83fd; font-weight: 700; }
.jv-mobile-link__emoji { font-size: 1.1rem; width: 1.5rem; text-align: center; }

/* ── Visitor counter footer ── */
.jv-visitor-bar {
  display: flex; align-items: center; justify-content: center;
  flex-wrap: wrap; gap: 1.2rem;
  padding: 0.9rem 1.5rem;
  background: rgba(10,14,26,0.6);
  border-top: 1px solid rgba(255,255,255,0.06);
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  font-size: 0.75rem; color: rgba(226,232,240,0.45);
}
.jv-visitor-bar__item { display: flex; align-items: center; gap: 0.35rem; }
.jv-visitor-bar__num { font-weight: 700; color: rgba(226,232,240,0.75); }
.jv-visitor-bar__badge img { height: 18px; border-radius: 3px; vertical-align: middle; }

/* ── Responsive ── */
@media (max-width: 640px) {
  .jv-nav__links { display: none; }
  .jv-nav__hamburger { display: flex; }
  .jv-nav { position: relative; }
}
@media (min-width: 641px) {
  .jv-mobile-menu { display: none !important; }
}
`;

  /* ── DOM builders ─────────────────────────────────────────────────── */
  function buildNav(currentId) {
    const nav = document.createElement('nav');
    nav.className = 'jv-nav';

    // Logo
    const logo = document.createElement('a');
    logo.className = 'jv-nav__logo';
    logo.href = 'https://legendart.github.io/';
    logo.textContent = '⬡ JAVIS';
    nav.appendChild(logo);

    // Desktop links
    const links = document.createElement('div');
    links.className = 'jv-nav__links';
    SERVICES.forEach(s => {
      const a = document.createElement('a');
      a.href = s.url;
      a.className = 'jv-nav__link' + (s.id === currentId ? ' active' : '');
      a.innerHTML = `<span>${s.emoji}</span><span class="jv-nav__label">${s.label}</span>`;
      links.appendChild(a);
    });
    nav.appendChild(links);

    // Hamburger button
    const btn = document.createElement('button');
    btn.className = 'jv-nav__hamburger';
    btn.setAttribute('aria-label', '메뉴 열기');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);

    // Mobile menu (grouped)
    const menu = document.createElement('div');
    menu.className = 'jv-mobile-menu';
    GROUPS.forEach(group => {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'jv-mobile-group';
      const title = document.createElement('div');
      title.className = 'jv-mobile-group__title';
      title.textContent = group;
      groupDiv.appendChild(title);
      SERVICES.filter(s => s.group === group).forEach(s => {
        const a = document.createElement('a');
        a.href = s.url;
        a.className = 'jv-mobile-link' + (s.id === currentId ? ' active' : '');
        a.innerHTML = `<span class="jv-mobile-link__emoji">${s.emoji}</span>${s.label}`;
        groupDiv.appendChild(a);
      });
      menu.appendChild(groupDiv);
    });
    nav.appendChild(menu);

    // Toggle
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('jv-nav--open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) nav.classList.remove('jv-nav--open');
    }, { passive: true });

    return nav;
  }

  /* ── Visitor counter ──────────────────────────────────────────────── */
  function buildVisitorBar() {
    const bar = document.createElement('div');
    bar.className = 'jv-visitor-bar';
    bar.innerHTML = `
      <div class="jv-visitor-bar__item">
        👥 총 방문 <strong class="jv-visitor-bar__num" id="jv-vc-total">-</strong>회
      </div>
      <div class="jv-visitor-bar__item">
        오늘 <strong class="jv-visitor-bar__num" id="jv-vc-today">-</strong>회
      </div>
      <div class="jv-visitor-bar__item">
        🔥 <strong class="jv-visitor-bar__num" id="jv-vc-streak">-</strong>일 연속
      </div>
      <div class="jv-visitor-bar__badge">
        <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Flegendart.github.io&count_bg=%23C9A84C&title_bg=%23160B2C&icon=star.svg&icon_color=%23F0D080&title=total&edge_flat=true"
          alt="visitor count" loading="lazy">
      </div>`;
    return bar;
  }

  function initVisitorCounter() {
    const LS_KEY = 'javis_visitor';
    const today = new Date().toISOString().slice(0, 10);
    let data;
    try { data = JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch { data = {}; }
    if (!data.total)      data.total = 0;
    if (!data.lastDate)   data.lastDate = '';
    if (!data.streak)     data.streak = 0;
    if (!data.todayCount) data.todayCount = 0;

    const isNewDay = data.lastDate !== today;
    if (isNewDay) {
      const yd = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      data.streak = data.lastDate === yd ? data.streak + 1 : 1;
      data.todayCount = 0;
      data.lastDate = today;
    }
    data.total += 1;
    data.todayCount += 1;
    try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}

    function animateNum(el, target) {
      if (!el) return;
      const steps = 25, dur = 700;
      const start = parseInt(el.textContent.replace(/,/g, '')) || 0;
      const inc = (target - start) / steps;
      let cur = start, step = 0;
      const t = setInterval(() => {
        step++; cur += inc;
        el.textContent = Math.round(cur).toLocaleString();
        if (step >= steps) { el.textContent = target.toLocaleString(); clearInterval(t); }
      }, dur / steps);
    }

    setTimeout(() => {
      animateNum(document.getElementById('jv-vc-total'),  data.total);
      animateNum(document.getElementById('jv-vc-today'),  data.todayCount);
      animateNum(document.getElementById('jv-vc-streak'), data.streak);
    }, 300);
  }

  /* ── Public API ───────────────────────────────────────────────────── */
  function init(currentId) {
    // Inject CSS
    if (!document.getElementById('jv-nav-css')) {
      const style = document.createElement('style');
      style.id = 'jv-nav-css';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    // Replace or prepend nav
    const navEl = buildNav(currentId);
    const existing = document.querySelector('.javis-nav, .jv-nav');
    if (existing) existing.replaceWith(navEl);
    else document.body.prepend(navEl);

    // Inject visitor counter bar
    // Skip if saju's own counter already exists (avoid duplication)
    if (!document.getElementById('vc-total')) {
      const bar = buildVisitorBar();
      const footer = document.querySelector('footer');
      if (footer) footer.insertAdjacentElement('beforebegin', bar);
      else document.body.appendChild(bar);
      initVisitorCounter();
    } else {
      // Saju page: just run counter logic (HTML already exists there)
      initVisitorCounter();
    }
  }

  window.JavisNav = { init };

})();
