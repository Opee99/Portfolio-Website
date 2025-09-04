
(function(){
  const root = document.documentElement;
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const savedTheme = localStorage.getItem('mfo-theme');
  if(savedTheme === 'light' || (!savedTheme && prefersLight)){ root.classList.add('light'); }

  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem('mfo-theme', root.classList.contains('light') ? 'light' : 'dark');
  });

  // Mobile nav
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Animate stats count-up
  const counters = document.querySelectorAll('.stat .num');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.target || '0', 10);
        let current = 0;
        const step = Math.ceil(target / 40);
        const tick = () => {
          current += step;
          if(current >= target){ current = target; }
          el.textContent = String(current);
          if(current < target) requestAnimationFrame(tick);
        };
        tick();
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => revealObserver.observe(c));

  // Skill bars animation
  const bars = document.querySelectorAll('.bar');
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const span = entry.target.querySelector('span');
        const level = entry.target.dataset.level || '0';
        span.style.width = level + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => barObserver.observe(b));

  // Skills filtering
  const skillChips = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('.skill-card');
  skillChips.forEach(chip => {
    chip.addEventListener('click', () => {
      skillChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.getAttribute('data-skill-filter');
      skillCards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });

  // Projects filtering
  const filterChips = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('.project-card');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.getAttribute('data-filter');
      projectCards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });

  // Contact form validation
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const name = form.name, email = form.email, message = form.message;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Reset errors
    form.querySelectorAll('.error').forEach(s => s.style.display = 'none');
    [name, email, message].forEach(inp => inp.style.outline = 'none');

    if(!name.value.trim()){ showError(name); valid = false; }
    if(!emailRegex.test(email.value.trim())){ showError(email); valid = false; }
    if(!message.value.trim()){ showError(message); valid = false; }

    if(valid){
      status.textContent = "Thanks! Your message is ready to send via email client.";
      const subject = encodeURIComponent('Portfolio Contact');
      const body = encodeURIComponent(`Name: ${name.value}\nEmail: ${email.value}\n\n${message.value}`);
      window.location.href = `mailto:mubtasimfuad99@gmail.com?subject=${subject}&body=${body}`;
      form.reset();
    }else{
      status.textContent = "Please fix the highlighted fields.";
    }

    function showError(input){
      input.nextElementSibling.style.display = 'block';
      input.style.outline = '2px solid #e64848';
    }
  });

  // Footer year
  const yearEl = document.getElementById('year');
  yearEl.textContent = String(new Date().getFullYear());
})();
