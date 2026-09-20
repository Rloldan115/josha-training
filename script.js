const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
const siteHeader = document.querySelector('.site-header');
const sections = document.querySelectorAll('main section[id]');

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
