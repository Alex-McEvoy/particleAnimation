/* 
The final animation script
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
  radius: 50
};

window.addEventListener("mousemove", event => {
  mouse.x = event.x;
  mouse.y = event.y;
});

ctx.fillStyle = "white";
ctx.font = "20px Verdana";
ctx.fillText("Aww Snap", 0, 40);
const textCoordinates = ctx.getImageData(0, 0, 1000, 1000);

class Particle {
  constructor(x, y) {
    this.x = x + 100;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
    this.color = "white";
    this.distance = 9999;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    this.distance = distance;
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
      this.color = "yellow";
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 20;
        this.color = "white";
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 20;
      }
    }
  }
}

function init() {
  console.log("textCoordinates", textCoordinates);
  particleArray = [];
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      // Check each pixels opacity, any pixel greater than 50% (255/2 is roughly 128) is a hit
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      ) {
        let positionX = x;
        let positionY = y;
        particleArray.push(new Particle(positionX * 10, positionY * 10));
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < particleArray.length; index++) {
    particleArray[index].draw();
    particleArray[index].update();
  }
  connect();
  requestAnimationFrame(animate);
}

init();
animate();

function connect() {
  let opacity = 1;
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let dx = particleArray[a].x - particleArray[b].x;
      let dy = particleArray[a].y - particleArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let color = "white";
      //   If the mouse is close to our particle
      if (particleArray[a].distance < mouse.radius) {
        color = "yellow";
      }

      if (distance < 20) {
        opacity = 1 - distance / 20;
        ctx.strokeStyle = color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
      }
    }
  }
}

const randomColor = () => {
  let chars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ];
  let color = ["#"];
  for (let i = 0; i < 6; i++) {
    color.push(chars[Math.floor(Math.random() * chars.length)]);
  }
  return color.join("");
};
