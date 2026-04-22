document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Header ---
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // --- Mobile Menu ---
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Logo click → scroll to top ---
  const logoLink = document.getElementById('headerLogoLink');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Scroll Animations ---
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) {
        item.classList.add('active');
      }
    });
  });

  // ============================================
  //  🔥 3D / WOW EFFECTS
  // ============================================

  // --- 1. Floating Hero Particles ---
  const particleContainer = document.getElementById('heroParticles');
  if (particleContainer) {
    const PARTICLE_COUNT = 35;
    const types = ['spark', 'ring', 'hex'];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = document.createElement('div');
      const type = types[Math.floor(Math.random() * types.length)];
      const size = type === 'spark'
        ? (2 + Math.random() * 4)
        : type === 'ring'
        ? (10 + Math.random() * 30)
        : (4 + Math.random() * 8);

      el.className = `particle particle--${type}`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;

      // Random drift direction
      const dx = (Math.random() - 0.5) * 200;
      const dy = (Math.random() - 0.5) * 200;
      el.style.setProperty('--dx', `${dx}px`);
      el.style.setProperty('--dy', `${dy}px`);

      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 10;
      el.style.animation = `particleFloat ${duration}s ${delay}s ease-in-out infinite`;

      particleContainer.appendChild(el);
    }
  }

  // --- 2. 3D Tilt on Service Cards (mouse-tracking) ---
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      // Spotlight glow follows mouse
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${percentX}%`);
      card.style.setProperty('--mouse-y', `${percentY}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- 3. 3D Tilt on Gallery Items ---
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

  // --- 4. Parallax Hero Content on Mouse Move ---
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const glowRing = document.querySelector('.hero-glow-ring');

  if (hero && heroContent) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Subtle parallax on hero content
      heroContent.style.transform = `translate(${x * -15}px, ${y * -10}px)`;

      // Larger drift on glow ring for depth
      if (glowRing) {
        glowRing.style.transform = `translate(calc(-50% + ${x * 30}px), calc(-50% + ${y * 30}px))`;
      }
    });

    hero.addEventListener('mouseleave', () => {
      heroContent.style.transform = '';
      if (glowRing) {
        glowRing.style.transform = 'translate(-50%, -50%)';
      }
    });
  }

  // --- 5. 3D Rotating Tire (Canvas) ---
  const tireCanvas = document.getElementById('tireCanvas');
  if (tireCanvas) {
    const ctx = tireCanvas.getContext('2d');
    const size = 160;
    tireCanvas.width = size * 2;  // retina
    tireCanvas.height = size * 2;
    ctx.scale(2, 2);

    let angle = 0;

    function drawTire() {
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2);
      ctx.rotate(angle);

      const r = size * 0.4;

      // Outer tire
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 168, 67, 0.4)';
      ctx.lineWidth = 8;
      ctx.stroke();

      // Inner rim
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(212, 168, 67, 0.25)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Hub
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 168, 67, 0.35)';
      ctx.fill();

      // Spokes (5 elegant spokes)
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r * 0.2, Math.sin(a) * r * 0.2);
        ctx.lineTo(Math.cos(a) * r * 0.85, Math.sin(a) * r * 0.85);
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.2)';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Tread marks on outer ring
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        const x1 = Math.cos(a) * (r - 4);
        const y1 = Math.sin(a) * (r - 4);
        const x2 = Math.cos(a) * (r + 4);
        const y2 = Math.sin(a) * (r + 4);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(212, 168, 67, 0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
      angle += 0.008;
      requestAnimationFrame(drawTire);
    }

    drawTire();
  }

  // --- 6. Scroll-triggered counter animation for prices ---
  const priceElements = document.querySelectorAll('.price');
  let pricesAnimated = false;

  const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !pricesAnimated) {
        pricesAnimated = true;
        priceElements.forEach(el => {
          const finalValue = parseInt(el.textContent);
          if (isNaN(finalValue)) return;
          let current = 0;
          const step = Math.ceil(finalValue / 30);
          const interval = setInterval(() => {
            current += step;
            if (current >= finalValue) {
              current = finalValue;
              clearInterval(interval);
            }
            el.textContent = current + ' €';
          }, 30);
        });
      }
    });
  }, { threshold: 0.3 });

  const priceTable = document.querySelector('.price-table');
  if (priceTable) priceObserver.observe(priceTable);
});

// ============================================================
//  ��️  RS AUTO 24 – Animated 3D Brand Logo Renderer
// ============================================================

(function initBrandLogos() {
  var DPR = Math.min(window.devicePixelRatio || 1, 2);

  function setupCanvas(canvas, w, h) {
    canvas.width  = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    var ctx = canvas.getContext('2d');
    ctx.scale(DPR, DPR);
    return ctx;
  }

  function goldGrad(ctx, x1, y1, x2, y2, shimmer) {
    var g = ctx.createLinearGradient(x1, y1, x2, y2);
    var s = shimmer || 0;
    g.addColorStop(0,    '#4a3000');
    g.addColorStop(0.15, '#c8900a');
    g.addColorStop(0.4,  '#f5d060');
    g.addColorStop(0.5,  '#fff0a0');
    g.addColorStop(0.65, '#d4a843');
    g.addColorStop(0.85, '#b88e2f');
    g.addColorStop(1,    '#3d2800');
    return g;
  }

  function whiteGrad(ctx, x1, y1, x2, y2) {
    var g = ctx.createLinearGradient(x1, y1, x2, y2);
    g.addColorStop(0,   '#aaaaaa');
    g.addColorStop(0.3, '#ffffff');
    g.addColorStop(0.6, '#e8e8e8');
    g.addColorStop(1,   '#888888');
    return g;
  }

  function drawExtruded(ctx, text, x, y, font, depth, fillColor, extColor) {
    ctx.font = font;
    for (var d = depth; d > 0; d--) {
      ctx.fillStyle = extColor;
      ctx.fillText(text, x + d * 0.55, y + d * 0.45);
    }
    ctx.fillStyle = fillColor;
    ctx.fillText(text, x, y);
  }

  function drawShimmer(ctx, x, y, w, h, progress) {
    var cx = x + w * progress;
    var shine = ctx.createLinearGradient(cx - 80, y, cx + 80, y + h);
    shine.addColorStop(0,    'rgba(255,255,255,0)');
    shine.addColorStop(0.4,  'rgba(255,255,255,0.06)');
    shine.addColorStop(0.5,  'rgba(255,255,255,0.20)');
    shine.addColorStop(0.6,  'rgba(255,255,255,0.06)');
    shine.addColorStop(1,    'rgba(255,255,255,0)');
    ctx.fillStyle = shine;
    ctx.fillRect(x, y, w, h);
  }

  // ── HERO LOGO ──────────────────────────────────────────────
  var heroCanvas = document.getElementById('heroLogoCanvas');
  if (heroCanvas) {
    var W = 420, H = 165;
    var ctx = setupCanvas(heroCanvas, W, H);

    (function animHero(ts) {
      var t = (ts || 0) * 0.001;
      ctx.clearRect(0, 0, W, H);

      var bg = ctx.createRadialGradient(W/2, H*0.55, 0, W/2, H*0.55, W*0.55);
      bg.addColorStop(0,   'rgba(212,168,67,0.08)');
      bg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.textBaseline = 'alphabetic';

      // RS italic white
      ctx.font = 'italic 900 80px Inter,sans-serif';
      var rsW = ctx.measureText('RS').width;
      drawExtruded(ctx, 'RS', 18, 90, 'italic 900 80px Inter,sans-serif', 5,
        whiteGrad(ctx, 18, 15, 18, 92), 'rgba(0,0,0,0.45)');

      // AUTO white
      ctx.font = '900 54px Inter,sans-serif';
      var autoX = 18 + rsW + 5;
      drawExtruded(ctx, 'AUTO', autoX, 90, '900 54px Inter,sans-serif', 4,
        whiteGrad(ctx, autoX, 38, autoX, 92), 'rgba(0,0,0,0.4)');
      var autoW = ctx.measureText('AUTO').width;

      // 24 gold animated
      ctx.font = '900 72px Inter,sans-serif';
      var numX = autoX + autoW + 5;
      var shimOffset = (Math.sin(t * 1.1) + 1) * 0.25;
      drawExtruded(ctx, '24', numX, 90, '900 72px Inter,sans-serif', 6,
        goldGrad(ctx, numX, 10, numX, 92, shimOffset), 'rgba(60,30,0,0.55)');

      // Divider
      ctx.strokeStyle = 'rgba(212,168,67,0.4)';
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(18, 103); ctx.lineTo(W-18, 103); ctx.stroke();

      // Tagline
      ctx.font = '500 12.5px Inter,sans-serif';
      ctx.fillStyle = 'rgba(190,190,190,0.72)';
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';
      ctx.fillText('AUTOHOOLDUS  ·  REMONT  ·  REHVIVAHETUS', W/2, 110);

      // Shimmer sweep
      var sp = (((t * 0.16) % 1.3) - 0.15);
      drawShimmer(ctx, 0, 0, W, H, sp);
      ctx.restore();

      requestAnimationFrame(animHero);
    })();
  }

  // ── HEADER LOGO ────────────────────────────────────────────
  var headerCanvas = document.getElementById('headerLogoCanvas');
  if (headerCanvas) {
    var HW = 210, HH = 44;
    var hctx = setupCanvas(headerCanvas, HW, HH);

    (function animHeader(ts) {
      var t = (ts || 0) * 0.001;
      hctx.clearRect(0, 0, HW, HH);
      hctx.save();
      hctx.textBaseline = 'alphabetic';

      hctx.font = 'italic 900 36px Inter,sans-serif';
      var rsW = hctx.measureText('RS').width;
      drawExtruded(hctx, 'RS', 2, 37, 'italic 900 36px Inter,sans-serif', 2,
        whiteGrad(hctx, 2, 3, 2, 40), 'rgba(0,0,0,0.5)');

      hctx.font = '900 24px Inter,sans-serif';
      var ax = 2 + rsW + 2;
      drawExtruded(hctx, 'AUTO', ax, 37, '900 24px Inter,sans-serif', 2,
        whiteGrad(hctx, ax, 14, ax, 40), 'rgba(0,0,0,0.4)');
      var aw = hctx.measureText('AUTO').width;

      hctx.font = '900 32px Inter,sans-serif';
      var nx = ax + aw + 2;
      var so = (Math.sin(t * 1.1) + 1) * 0.25;
      drawExtruded(hctx, '24', nx, 37, '900 32px Inter,sans-serif', 3,
        goldGrad(hctx, nx, 5, nx, 40, so), 'rgba(60,30,0,0.55)');

      var sp = (((t * 0.22) % 1.4) - 0.2);
      drawShimmer(hctx, 0, 0, HW, HH, sp);
      hctx.restore();

      requestAnimationFrame(animHeader);
    })();
  }

  // ── FOOTER LOGO ────────────────────────────────────────────
  var footerCanvas = document.getElementById('footerLogoCanvas');
  if (footerCanvas) {
    var FW = 170, FH = 32;
    var fctx = setupCanvas(footerCanvas, FW, FH);

    (function animFooter(ts) {
      var t = (ts || 0) * 0.001;
      fctx.clearRect(0, 0, FW, FH);
      fctx.save();
      fctx.textBaseline = 'alphabetic';

      fctx.font = 'italic 900 26px Inter,sans-serif';
      var rsW = fctx.measureText('RS').width;
      drawExtruded(fctx, 'RS', 1, 28, 'italic 900 26px Inter,sans-serif', 1,
        whiteGrad(fctx, 1, 2, 1, 30), 'rgba(0,0,0,0.5)');

      fctx.font = '900 18px Inter,sans-serif';
      var ax = 1 + rsW + 2;
      drawExtruded(fctx, 'AUTO', ax, 28, '900 18px Inter,sans-serif', 1,
        whiteGrad(fctx, ax, 9, ax, 30), 'rgba(0,0,0,0.4)');
      var aw = fctx.measureText('AUTO').width;

      fctx.font = '900 23px Inter,sans-serif';
      var nx = ax + aw + 2;
      var so = (Math.sin(t * 1.1) + 1) * 0.25;
      drawExtruded(fctx, '24', nx, 28, '900 23px Inter,sans-serif', 2,
        goldGrad(fctx, nx, 4, nx, 30, so), 'rgba(60,30,0,0.55)');

      fctx.restore();
      requestAnimationFrame(animFooter);
    })();
  }

})();
