/**
 * Jon Arve Ovesen – Promotional Website
 * main.js
 */

'use strict';

/* =========================================================
   Data
   ========================================================= */

const RELEASES = [
  {
    id: 1,
    title: 'Eidsvoll Nocturne',
    year: '2023',
    type: 'Single',
    emoji: '🌙',
    tags: ['Atmospheric', 'Electronic'],
    desc: 'A quiet, textured journey through the Norwegian midnight landscape.'
  },
  {
    id: 2,
    title: 'Signal From Nowhere',
    year: '2022',
    type: 'EP',
    emoji: '📡',
    tags: ['Electronic', 'Cinematic'],
    desc: 'Five transmissions from a self-made sonic universe.'
  },
  {
    id: 3,
    title: 'The Long Winter',
    year: '2021',
    type: 'Album',
    emoji: '❄',
    tags: ['Ambient', 'Piano'],
    desc: 'A full-length meditation on solitude, perseverance, and Nordic light.'
  },
  {
    id: 4,
    title: 'Latent Spaces',
    year: '2024',
    type: 'Single',
    emoji: '✦',
    tags: ['AI-Assisted', 'Experimental'],
    desc: 'Jon\'s first released AI-collaboration — human emotion, machine texture.'
  },
  {
    id: 5,
    title: 'Deep Frequency',
    year: '2020',
    type: 'Single',
    emoji: '∿',
    tags: ['Electronic', 'Drone'],
    desc: 'Subterranean pulses from a decade of low-register experiments.'
  },
  {
    id: 6,
    title: 'Northern Grid',
    year: '2019',
    type: 'Album',
    emoji: '◈',
    tags: ['Electronic', 'Atmospheric'],
    desc: 'Grid-based composition meets the open Norwegian landscape.'
  }
];

const VAULT_ITEMS = [
  {
    year: '1994',
    title: 'Draft 07 – Cascade',
    desc: 'Early Cubase sketch — raw polysynth layering, unearthed after 30 years.',
    badge: 'new',
    badgeLabel: 'Just Released'
  },
  {
    year: '1988',
    title: 'First Piano Composition',
    desc: 'A self-taught melody recorded to cassette in Eidsvoll. Unaltered.',
    badge: 'new',
    badgeLabel: 'Just Released'
  },
  {
    year: '2001',
    title: 'Midnight Map',
    desc: 'A 12-minute ambient piece composed through a single winter night.',
    badge: 'coming',
    badgeLabel: 'Coming Soon'
  },
  {
    year: '1997',
    title: 'Resonance Study #3',
    desc: 'MIDI experiments from a period of deep harmonic exploration.',
    badge: 'coming',
    badgeLabel: 'Coming Soon'
  }
];

/* =========================================================
   Navigation
   ========================================================= */

function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  // Scroll state
  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close nav when a link is clicked
  links.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =========================================================
   Particle Canvas
   ========================================================= */

function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let particles = [];
  let rafId;
  let W, H;

  function resize() {
    W = canvas.width = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.05,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      pulse: Math.random() * Math.PI * 2
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 120 }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const t = Date.now() * 0.001;

    particles.forEach((p) => {
      p.pulse += 0.006;
      const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(138, 180, 248, ${alpha})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;
    });

    // Draw faint connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(138, 180, 248, ${0.04 * (1 - dist / 90)})`;
          ctx.stroke();
        }
      }
    }

    rafId = requestAnimationFrame(draw);
  }

  init();
  draw();

  window.addEventListener('resize', () => {
    resize();
  });
}

/* =========================================================
   Music Grid
   ========================================================= */

function initMusicGrid() {
  const grid = document.getElementById('musicGrid');
  if (!grid) return;

  RELEASES.forEach((release, i) => {
    const card = document.createElement('article');
    card.className = 'music__card fade-in fade-in-delay-' + Math.min(i + 1, 5);
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${release.title} – ${release.type}, ${release.year}`);

    const tagsHtml = release.tags
      .map((t) => `<span class="tag">${t}</span>`)
      .join('');

    card.innerHTML = `
      <div class="music__card-art">
        <span aria-hidden="true">${release.emoji}</span>
        <div class="music__card-play" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
      <div class="music__card-body">
        <h3 class="music__card-title">${release.title}</h3>
        <p class="music__card-meta">${release.type} · ${release.year}</p>
        <div class="music__card-tags">${tagsHtml}</div>
      </div>
    `;

    grid.appendChild(card);
  });

  grid.setAttribute('role', 'list');
}

/* =========================================================
   Vault Releases
   ========================================================= */

function initVault() {
  const container = document.getElementById('vaultReleases');
  if (!container) return;

  VAULT_ITEMS.forEach((item, i) => {
    const el = document.createElement('article');
    el.className = 'vault__item fade-in fade-in-delay-' + Math.min(i + 1, 5);
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', `Vault release: ${item.title}, ${item.year}`);

    const badgeClass =
      item.badge === 'new'
        ? 'vault__item-badge vault__item-badge--new'
        : 'vault__item-badge vault__item-badge--coming';

    el.innerHTML = `
      <span class="vault__item-year" aria-hidden="true">${item.year}</span>
      <div class="vault__item-body">
        <h3 class="vault__item-title">${item.title}</h3>
        <p class="vault__item-desc">${item.desc}</p>
      </div>
      <span class="${badgeClass}">${item.badgeLabel}</span>
    `;

    container.appendChild(el);
  });
}

/* =========================================================
   Newsletter Form
   ========================================================= */

function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  const messageEl = document.getElementById('formMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = form.querySelector('#emailInput');
    const email = emailInput.value.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage(messageEl, 'Please enter a valid email address.', 'error');
      emailInput.focus();
      return;
    }

    // Simulate async submission
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Subscribing…';

    setTimeout(() => {
      showMessage(
        messageEl,
        '✓ You\'re subscribed! First vault update coming soon.',
        'success'
      );
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Subscribe';
    }, 900);
  });
}

/* =========================================================
   Contact Form
   ========================================================= */

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const messageEl = document.getElementById('contactFormMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contactName').value.trim();
    const email = form.querySelector('#contactEmail').value.trim();
    const subject = form.querySelector('#contactSubject').value;
    const message = form.querySelector('#contactMessage').value.trim();

    if (!name) {
      showMessage(messageEl, 'Please enter your name.', 'error');
      form.querySelector('#contactName').focus();
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage(messageEl, 'Please enter a valid email address.', 'error');
      form.querySelector('#contactEmail').focus();
      return;
    }

    if (!subject) {
      showMessage(messageEl, 'Please select an enquiry type.', 'error');
      form.querySelector('#contactSubject').focus();
      return;
    }

    if (!message || message.length < 10) {
      showMessage(messageEl, 'Please enter a message (at least 10 characters).', 'error');
      form.querySelector('#contactMessage').focus();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      showMessage(
        messageEl,
        '✓ Message sent! We\'ll be in touch within 2 business days.',
        'success'
      );
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }, 1000);
  });
}

/* =========================================================
   Scroll Animations
   ========================================================= */

function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-in');

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* =========================================================
   Helpers
   ========================================================= */

function showMessage(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className = 'form__message form__message--' + type;
}

/* =========================================================
   Init
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initParticles();
  initMusicGrid();
  initVault();
  initNewsletterForm();
  initContactForm();
  initScrollAnimations();
});
