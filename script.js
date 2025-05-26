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
  const colors = ["#0ff", "#f0f", "#fff"];
  const particles = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    sx: Math.random() * 0.5 - 0.25,
    sy: Math.random() * 0.5 - 0.25,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.sx; p.y += p.sy;
      if (p.x > canvas.width || p.x < 0) p.sx *= -1;
      if (p.y > canvas.height || p.y < 0) p.sy *= -1;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
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

  burger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
})();