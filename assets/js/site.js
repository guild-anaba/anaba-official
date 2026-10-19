(() => {
  const button = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  if (button && menu) {
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('is-open', !open);
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      button.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }));
  }

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!revealItems.length || reduceMotion || !('IntersectionObserver' in window)) return;

  revealItems.forEach((item) => item.classList.add('reveal-ready'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
})();
