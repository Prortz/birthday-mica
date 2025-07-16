const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function Firework(x, y) {
  this.x = x;
  this.y = y;
  this.particles = [];

  for (let i = 0; i < 100; i++) {
    this.particles.push({
      x: x,
      y: y,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      radius: Math.random() * 2 + 1,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.003
    });
  }
}

Firework.prototype.update = function () {
  this.particles.forEach(p => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= p.decay;
  });
};

Firework.prototype.draw = function () {
  this.particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${p.alpha})`;
    ctx.fill();
  });
};

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.02) {
    fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height));
  }

  fireworks.forEach((f, index) => {
    f.update();
    f.draw();
    f.particles = f.particles.filter(p => p.alpha > 0);
    if (f.particles.length === 0) fireworks.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

document.getElementById("start-btn").addEventListener("click", () => {
  document.getElementById("start-btn").style.display = "none";
  document.querySelector(".happy__birthday").style.display = "block";
  document.getElementById("birthday-audio").play();
  animate();
});

canvas.addEventListener("click", (e) => {
  fireworks.push(new Firework(e.clientX, e.clientY));
});
