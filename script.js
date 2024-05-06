const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

//Measure title elemt
let titleElement = document.getElementById('title1');
let titleMeasurement = titleElement.getBoundingClientRect();
let title = {
  x: titleMeasurement.left,
  y: titleMeasurement.top,
  width: titleMeasurement.width,
  height: 10
}

const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

// Define color stops
gradient.addColorStop(0, "#80ddf233"); // Color at start
gradient.addColorStop(0.2, "#049dbf66"); // Color at start
gradient.addColorStop(0.4, "#0378a64d"); // Color at start
gradient.addColorStop(0.6, "#0367A6"); // Color at start
gradient.addColorStop(1, "#0487D9");  // Color at end

const numberofPartilce = 1000;
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 15 + 1;
    this.weight = Math.random() * 1 + 1;
    this.directionX = -1;
    //this.directionX = (Math.random() -0.5) *2;
  }
  update() {
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.weight = Math.random() * 1 + 1;
      this.x = Math.random() * canvas.width * 1.5;
    }
    //this.weight += 0.05;
    this.weight += 0.001 * this.size;
    this.y += this.weight;
    //this.directionX = -1/this.size; 
    //this.x += this.directionX * this.weight;
    this.x += this.directionX;

    //check for collisoion between each particle and title element
    if (
      this.x < title.x + title.width &&
      this.x + this.size > title.x &&
      this.y < title.y + title.height &&
      this.y + this.size > title.y
    ) {
      this.y -= 3;
      this.weight *= -0.5;
    }
  }
  draw() {
    //ctx.fillStyle = '#80DDF2';
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numberofPartilce; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particlesArray.push(new Particle(x, y))
  }
}
init();

function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }

  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  titleMeasurement = titleElement.getBoundingClientRect();
  title = {
    x: titleMeasurement.left,
    y: titleMeasurement.top,
    width: titleMeasurement.width,
    height: 10
  }
  init();
});