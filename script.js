document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particlesArray = [];
  const colors = ["#0ff", "#f0f", "#fff"];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Rebond ou réinitialisation
      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    for (let i = 0; i < 150; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  init();
  animate();
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel-3d");
  const items = document.querySelectorAll(".menu-item");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");

  if (!carousel || items.length === 0 || !prevBtn || !nextBtn) {
    console.warn("Carrousel non trouvé ou incomplet.");
    return;
  }

  let angle = 0;
  const totalItems = items.length;
  const angleStep = 360 / totalItems;

  // Position initiale de chaque item
  function updateCarousel() {
    carousel.style.transform = `translateZ(-400px) rotateY(${angle}deg)`;

    items.forEach((item, index) => {
      const itemAngle = index * angleStep;
      item.style.transform = `rotateY(${itemAngle}deg) translateZ(400px)`;
    });
  }

  // Bouton précédent
  prevBtn.addEventListener("click", () => {
    angle += angleStep;
    updateCarousel();
  });

  // Bouton suivant
  nextBtn.addEventListener("click", () => {
    angle -= angleStep;
    updateCarousel();
  });

  updateCarousel(); // Initialiser l'affichage
});
