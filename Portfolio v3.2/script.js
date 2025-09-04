(function () {
  const root = document.documentElement;

  // Theme init
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const savedTheme = localStorage.getItem('mfo-theme');
  if (savedTheme === 'light' || (!savedTheme && prefersLight)) root.classList.add('light');

  // Elements
  const siteHeader   = document.getElementById('siteHeader');
  const themeToggle  = document.getElementById('theme-toggle');
  const navToggle    = document.getElementById('nav-toggle');
  const navLinks     = document.getElementById('nav-links');
  const navOverlay   = document.getElementById('nav-overlay');
  const navAnchors   = Array.from(document.querySelectorAll('.nav-link'));
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop    = document.getElementById('backToTop');
  const scrollDown   = document.getElementById('scrollDown');
  const profileImg   = document.getElementById('profilePic');
  const yearEl       = document.getElementById('year');

  // Keep header height in sync to prevent jump
  function refreshHeaderHeight() {
    if (!siteHeader) return;
    const h = siteHeader.offsetHeight;
    document.body.style.paddingTop = h + 'px';
    root.style.setProperty('--header-h', h + 'px');
  }
  window.addEventListener('load', refreshHeaderHeight);
  window.addEventListener('resize', () => { clearTimeout(window._headerResizeT); window._headerResizeT = setTimeout(refreshHeaderHeight, 120); });
  window.addEventListener('orientationchange', () => setTimeout(refreshHeaderHeight, 300));
  refreshHeaderHeight();

  // Theme toggle
  themeToggle?.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('mfo-theme', root.classList.contains('light') ? 'light' : 'dark');
    updateChartsForTheme();
  });

  // Accessible mobile nav
  function openNav() {
    navToggle.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('open');
    navLinks.setAttribute('aria-hidden', 'false');
    navOverlay.classList.add('show');
    navOverlay.setAttribute('aria-hidden', 'false');
    root.classList.add('nav-open');
    const first = navLinks.querySelector('a, button');
    first?.focus();
  }
  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    navLinks.setAttribute('aria-hidden', 'true');
    navOverlay.classList.remove('show');
    navOverlay.setAttribute('aria-hidden', 'true');
    root.classList.remove('nav-open');
    navToggle.focus();
  }
  function toggleNav() { (navToggle.getAttribute('aria-expanded') === 'true') ? closeNav() : openNav(); }

  navLinks?.setAttribute('aria-hidden', 'true');
  navOverlay?.setAttribute('aria-hidden', 'true');
  navToggle?.setAttribute('aria-expanded', 'false');

  navToggle?.addEventListener('click', (e) => { e.stopPropagation(); toggleNav(); });
  navOverlay?.addEventListener('click', () => closeNav());
  navAnchors.forEach(a => a.addEventListener('click', () => {
    if (navToggle.getAttribute('aria-expanded') === 'true' && window.matchMedia('(max-width: 980px)').matches) {
      setTimeout(() => closeNav(), 120);
    }
  }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') closeNav(); });
  document.addEventListener('click', (e) => {
    if (!navLinks?.contains(e.target) && !navToggle?.contains(e.target)) {
      if (navToggle.getAttribute('aria-expanded') === 'true' && window.matchMedia('(max-width: 980px)').matches) closeNav();
    }
  }, { capture: true });

  // Scroll progress & back to top
  function onScroll() {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? Math.min(100, Math.max(0, (scrolled / height) * 100)) : 0;
    if (scrollProgress) scrollProgress.style.width = pct + '%';
    backToTop?.classList.toggle('show', scrolled > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Stats counter
  const counters = document.querySelectorAll('.stat .num');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target || '0', 10);
        let current = 0;
        const step = Math.ceil(target / 40);
        const tick = () => {
          current += step;
          if (current >= target) current = target;
          el.textContent = String(current);
          if (current < target) requestAnimationFrame(tick);
        };
        tick();
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => revealObserver.observe(c));

  // Scroll-down widget (keyboard accessible)
  function scrollToTarget(el) {
    const target = el.getAttribute('data-target') || el.getAttribute('href') || '#about';
    const dest = document.querySelector(target);
    if (!dest) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    prefersReduced ? dest.scrollIntoView() : dest.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  scrollDown?.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToTarget(scrollDown); } });
  scrollDown?.addEventListener('click',  (e) => { e.preventDefault(); scrollToTarget(scrollDown); });

  // Profile fallback
  profileImg?.addEventListener('error', () => {
    profileImg.style.display = 'none';
    const fallback = document.querySelector('.avatar-fallback');
    if (fallback) fallback.style.opacity = 1;
  });

  // Footer year
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ===== Chart.js (theme-aware) =====
  let charts = [];
  function buildCharts() {
    charts.forEach(c => c.destroy());
    charts = [];

    const isLight = root.classList.contains('light');
    const grid  = isLight ? '#e5eaf3' : '#1f2937';
    const ticks = isLight ? '#1f2937' : '#e5eaf3';
    const line  = '#3b82f6';
    const fill  = 'rgba(59,130,246,0.25)';
    const c1c = '#22c55e', c2c = '#fbbf24', c3c = '#ef4444';

    const radarCtx = document.getElementById('skillsRadar');
    const activityCtx = document.getElementById('activityLine');
    const donutCtx = document.getElementById('projectsDonut');

    if (window.Chart && radarCtx) {
      const c1 = new Chart(radarCtx.getContext('2d'), {
        type: 'radar',
        data: {
          labels: ['Python','ML','DS','BI','Web','Networks'],
          datasets: [{ label: 'Proficiency', data: [90,85,80,75,70,60], borderColor: line, backgroundColor: fill }]
        },
        options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{labels:{color:ticks}}}, scales:{ r:{ grid:{color:grid}, pointLabels:{color:ticks}, ticks:{color:ticks}}}}
      });
      charts.push(c1);
    }

    if (window.Chart && activityCtx) {
      const months = ['S','O','N','D','J','F','M','A','M','J','J','A'];
      const values = [6,10,7,12,8,9,14,13,19,17,21,24];
      const c2 = new Chart(activityCtx.getContext('2d'), {
        type: 'line',
        data: { labels: months, datasets: [{ label:'Activity', data: values, borderColor: line, backgroundColor: fill, tension: .3, fill: true, pointRadius: 3 }]},
        options: {
          responsive:true, maintainAspectRatio:false,
          plugins:{ legend:{ labels:{ color:ticks } } },
          scales:{ x:{ grid:{ color:grid }, ticks:{ color:ticks }}, y:{ grid:{ color:grid }, ticks:{ color:ticks, beginAtZero:true }}}
        }
      });
      charts.push(c2);
    }

    if (window.Chart && donutCtx) {
      const c3 = new Chart(donutCtx.getContext('2d'), {
        type: 'doughnut',
        data: { labels:['ML','DL','BI','Web','Networks'], datasets:[{ label:'Projects', data:[6,2,3,4,1], backgroundColor:[c1c,c2c,c3c,line,fill], borderWidth:0 }] },
        options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ labels:{ color:ticks } }, tooltip:{ enabled:true } }, cutout:'55%' }
      });
      charts.push(c3);
    }
  }
  function updateChartsForTheme(){ buildCharts(); }
  buildCharts();

  // ===== Filters (kept separate & scoped) =====

  // Skills filters — use data-skill-filter to avoid collision with project filters
  const skillFilterBtns = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('.skills-grid .skill-card');

  function applySkillFilter(filter){
    skillFilterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-skill-filter') === filter || (filter==='all' && b.getAttribute('data-skill-filter')==='all')));
    skillFilterBtns.forEach(b => b.setAttribute('aria-selected', String(b.classList.contains('active'))));
    skillCards.forEach(card => {
      const cat = card.dataset.category || '';
      card.style.display = (filter === 'all' || cat === filter || card.classList.contains(filter)) ? '' : 'none';
    });
  }
  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => applySkillFilter(btn.getAttribute('data-skill-filter') || 'all'));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); applySkillFilter(btn.getAttribute('data-skill-filter') || 'all'); }
    });
  });
  applySkillFilter('all');

  // Project filters — unchanged; scoped to project cards
  const projectFilterChips = document.querySelectorAll('#projects [data-filter]');
  const projectCards = document.querySelectorAll('.project-card');
  projectFilterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      projectFilterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.getAttribute('data-filter');
      projectCards.forEach(card => card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none');
    });
  });

})();

// Fallback used by resize events
function refreshHeaderHeight(){
  const siteHeader = document.getElementById('siteHeader');
  if(!siteHeader) return;
  const h = siteHeader.offsetHeight;
  document.body.style.paddingTop = h + 'px';
}

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      window.location.href = `mailto:${email}?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message)}`;
    });
  }
