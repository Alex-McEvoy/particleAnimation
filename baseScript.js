/* 
This code provides the base for the final animations
within script.js.
*/

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

// handle mouse interactions
const mouse = {
  x: null,
  y: null,
  radius: 150
};

window.addEventListener("mousemove", event => {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse.x, mouse.y);
});

ctx.fillStyle = "white";
ctx.font = "30px Verdana";
ctx.fillText("A", 20, 60);
// ctx.strokeStyle = "white";
// ctx.strokeRect(0, 0, 100, 100);
const data = ctx.getImageData(0, 0, 100, 100);

class Particle {
  constructor(x, y) {
    this.x = x + 100;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 50) {
      this.size = 10;
    } else {
      this.size = 3;
    }
  }
}

function init() {
  particleArray = [];
  for (let i = 0; i < 500; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.width;
    particleArray.push(new Particle(x, y));
  }
  particleArray.push(new Particle(50, 50));
  particleArray.push(new Particle(80, 50));
}

init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < particleArray.length; index++) {
    particleArray[index].draw();
    particleArray[index].update();
  }
  requestAnimationFrame(animate);
}

animate();
