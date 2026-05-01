/* ============================================
   main.js — Portfolio Shared JavaScript
   ============================================ */

/* ── Mobile Menu Toggle ── */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  menuToggle.innerHTML = isOpen
    ? `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>`
    : `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`;
});

// Close mobile menu on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.innerHTML = `<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`;
  });
});

/* ── Scroll Reveal Animation ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children inside reveal containers
        const children = entry.target.querySelectorAll('.card, .timeline-item, .skill-pill');
        if (children.length > 0) {
          children.forEach((child, idx) => {
            child.style.transitionDelay = `${idx * 0.06}s`;
          });
        }
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Navbar Scroll Effect ── */
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 60) {
    navbar?.classList.add('scrolled');
    navbar.style.background = 'rgba(9, 9, 11, 0.95)';
  } else {
    navbar.style.background = 'rgba(9, 9, 11, 0.8)';
  }
  lastScroll = currentScroll;
}, { passive: true });

/* ── Smooth Hover on Project Cards ── */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', (e) => {
    card.style.willChange = 'transform';
  });
  card.addEventListener('mouseleave', () => {
    card.style.willChange = 'auto';
  });
});

/* ── Typing animation for hero ── */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.style.animation = 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both';
}

/* ── Cursor Glow Effect ── */
const heroSection = document.getElementById('hero');
if (heroSection) {
  const glow = document.querySelector('.hero-glow');
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (glow) {
      glow.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      glow.style.transition = 'transform 0.3s ease';
    }
  });
}

/* ── Active nav link highlight ── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    if (!link.classList.contains('navbar-cta')) {
      link.classList.add('active');
    }
  }
});

/* ── Console Easter Egg ── */
console.log('%c👋 Hey! You found the console.', 'color: #6366f1; font-size: 1.2rem; font-weight: bold;');
console.log('%cBuilt by Tony Nguyen — let\'s connect!', 'color: #a1a1aa; font-size: 0.9rem;');
