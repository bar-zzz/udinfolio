// ===== PORTFOLIO JAVASCRIPT =====

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ===== ACTIVE NAV LINK =====
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
setActiveNav();

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay for grid items
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, Number(delay));
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade elements
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach((el, i) => {
  if (!el.dataset.delay) {
    el.dataset.delay = 0;
  }
  observer.observe(el);
});

// Stagger project cards
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.classList.add('fade-in');
  card.dataset.delay = i * 80;
  observer.observe(card);
});

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-bar-fill');
      fills.forEach(fill => {
        const width = fill.dataset.width;
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-list');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(214,181,138,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transition: transform 0.15s ease;
  transform: translate(-50%, -50%);
  top: -200px;
  left: -200px;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + (el.dataset.suffix || '');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = Number(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ===== PROJECT FILTER (projects.html only) =====
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');

if (filterTabs.length > 0) {
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      projectCards.forEach((card, i) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;

        if (show) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          }, i * 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ===== CONTACT FORM (simple feedback) =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Pesan Terkirim!';
    btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ===== PARALLAX HERO =====
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = hero.querySelector('.hero-container');
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.12}px)`;
    }
  });
}

// ===== PAGE LOAD REVEAL =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';

  // Stagger stat cards
  document.querySelectorAll('.stat-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 900 + i * 100);
  });
});

// Initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
setTimeout(() => {
  document.body.style.opacity = '1';
}, 100);
