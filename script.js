// Lazy loading des images désactivé pour éviter les problèmes de chargement
function handleImageLoading() {
  // Fonction désactivée
}

// Particules animées et carrousel 3D uniquement si présents sur la page
// Particules animées
(function() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);
  const colors = ["#0ff", "#f0f", "#fff", "#0f9"];
  
  // Réduire le nombre de particules sur mobile
  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 50 : 150;
  
  const particles = Array.from({length: particleCount}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    sx: Math.random() * 1 - 0.5,
    sy: Math.random() * 1 - 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    pulse: 0,
    pulseSpeed: Math.random() * 0.1
  }));

  // Optimisation du rendu
  let lastTime = 0;
  const fps = 30;
  const interval = 1000 / fps;

  function animate(currentTime) {
    if (!lastTime) lastTime = currentTime;
    const deltaTime = currentTime - lastTime;

    if (deltaTime > interval) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.sx;
        p.y += p.sy;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;

        p.pulse += p.pulseSpeed;
        const size = p.size * (1 + Math.sin(p.pulse) * 0.3);

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Lignes de connexion
        particles.forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (100 - distance) / 100 * 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      }
      lastTime = currentTime - (deltaTime % interval);
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// Carrousel 3D (si présent)
(function() {
  const carousel = document.querySelector(".carousel-3d");
  const items = document.querySelectorAll(".menu-item");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  if (!carousel || items.length === 0 || !prevBtn || !nextBtn) return;
  let angle = 0;
  const step = 360 / items.length;
  function update() {
    carousel.style.transform = `translateZ(-400px) rotateY(${angle}deg)`;
    items.forEach((item, i) => {
      item.style.transform = `rotateY(${i * step}deg) translateZ(400px)`;
    });
  }
  prevBtn.onclick = () => { angle += step; update(); };
  nextBtn.onclick = () => { angle -= step; update(); };
  update();
})();

// Burger Menu
(function() {
  const burger = document.querySelector('.burger-menu');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav ul li a');

  if (!burger || !nav) return;

  function toggleMenu() {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }
  // Gestion des événements tactiles et clic
  burger.addEventListener('touchend', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  // Ajouter le clic pour desktop
  burger.addEventListener('click', () => {
    toggleMenu();
  });

  // Fermer le menu au clic sur un lien
  navLinks.forEach(link => {
    link.addEventListener('touchend', (e) => {
      if (nav.classList.contains('active')) {
        e.preventDefault();
        toggleMenu();
        // Attendre la fin de l'animation avant de naviguer
        setTimeout(() => {
          window.location.href = link.href;
        }, 300);
      }
    });
  });

  // Fermer le menu au swipe
  let touchStartX = 0;
  let touchEndX = 0;

  nav.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  nav.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) { // Swipe gauche
      toggleMenu();
    }
  }, { passive: true });
})();

// Optimisation du carrousel 3D pour mobile
(function() {
  const carousel = document.querySelector(".carousel-3d");
  const items = document.querySelectorAll(".menu-item");
  if (!carousel || items.length === 0) return;

  let startX = 0;
  let currentAngle = 0;
  const step = 360 / items.length;

  items.forEach((item, i) => {
    item.style.transform = `rotateY(${i * step}deg) translateZ(400px)`;
  });

  // Gestion du swipe sur mobile
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const diff = startX - touch.clientX;

    if (Math.abs(diff) > 30) { // Minimum swipe distance
      currentAngle += diff > 0 ? step : -step;
      carousel.style.transform = `translateZ(-400px) rotateY(${currentAngle}deg)`;
      startX = touch.clientX;
    }
  });
})();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // handleImageLoading() désactivé
});