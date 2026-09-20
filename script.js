const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
const siteHeader = document.querySelector('.site-header');
const sections = document.querySelectorAll('main section[id]');
const scrollProgress = document.querySelector('.scroll-progress span');
const heroVisual = document.querySelector('[data-tilt]');
const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.lucide) {
  window.lucide.createIcons();
}

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navLinks.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  }
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = 'Thank you! Your message has been received.';
  contactForm.reset();
});

const updateNavigation = () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 12);

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  scrollProgress.style.setProperty('--scroll-progress', String(progress));

  if (motionAllowed && window.matchMedia('(min-width: 761px)').matches) {
    heroVisual.style.setProperty('--parallax-y', `${Math.min(window.scrollY * 0.055, 28)}px`);
  }

  let currentSection = 'home';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 160) {
      currentSection = section.id;
    }
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${currentSection}`;
    link.classList.toggle('active', isCurrent);
    link.toggleAttribute('aria-current', isCurrent);
  });
};

updateNavigation();
window.addEventListener('scroll', updateNavigation, { passive: true });

if (motionAllowed) {
  const revealElements = document.querySelectorAll('.section-heading, .about-copy, .card, .project-card, .education-card, .contact-form');
  revealElements.forEach((element) => element.classList.add('reveal-ready'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));
}

if (motionAllowed && window.matchMedia('(pointer: fine)').matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroVisual.style.setProperty('--tilt-x', `${horizontal * 5}deg`);
    heroVisual.style.setProperty('--tilt-y', `${vertical * -5}deg`);
  });

  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.setProperty('--tilt-x', '0deg');
    heroVisual.style.setProperty('--tilt-y', '0deg');
  });

  document.querySelectorAll('.card, .project-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
    });
  });
}
