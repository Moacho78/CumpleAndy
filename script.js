function playMusic() {
  const music = document.getElementById('bg-music');
  music.play()
    .then(() => {
      document.getElementById('play-button').style.display = 'none';
    })
    .catch(error => {
      console.error("No se pudo reproducir el audio:", error);
    });
}

// Confeti
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 50 + 30,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    tilt: Math.random() * 10 - 5,
    tiltAngle: 0
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.ellipse(p.x, p.y, p.r, p.r * 0.6, p.tilt, 0, Math.PI * 2);
      ctx.fill();
    });
    update();
    requestAnimationFrame(draw);
  }

  function update() {
    pieces.forEach(p => {
      p.y += Math.cos(p.d / 10) + 2;
      p.tiltAngle += 0.1;
      p.tilt = Math.sin(p.tiltAngle) * 10;
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  draw();
}

// Al cargar
window.onload = () => {
  launchConfetti();
  document.getElementById("play-btn").addEventListener("click", playMusic);
};



