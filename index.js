const s = 10;
const b = 8 / 3;
const p = 28;

const defaultPointSize = 5;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const screamDoge = new Image();
screamDoge.src = "dogescream.png";
const normalDoge = new Image();
normalDoge.src = "dogecalm.png";

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const offsetX = window.innerWidth / 2;
const offsetY = window.innerHeight / 2;

// function randomColor() {
//     let n = (Math.random() * 0xfffff * 1000000).toString(16);
//     return '#' + n.slice(0, 6);
// };

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

class LorenzPoint {
  constructor(x0, y0, z0, i, pointCount) {
    this.x = x0;
    this.y = y0;
    this.z = z0;
    const tpc = pointCount / 3;
    this.color = `rgb(
      ${~~Math.min(255, (i / tpc) * 255)}, 
      ${~~Math.min(255, ((i - tpc) / tpc) * 255)}, 
      ${~~Math.min(255, ((i - 2 * tpc) / tpc) * 255)})`;
  }

  update(dt) {
    let dx = s * (this.y - this.x);
    this.x += dx * dt;

    let dy = this.x * (p - this.z) - this.y;
    this.y += dy * dt;

    let dz = this.x * this.y - b * this.z;
    this.z += dz * dt;
  }

  draw() {
    let centerX = offsetX + this.x * 35 - this.z / 10;
    let centerY = offsetY + this.y * 15 - this.z / 10;
    let radius = this.z / 5;
    ctx.fillStyle = this.color;
    ctx.fillRect(centerX, centerY, radius, radius);

    // ctx.drawImage(
    //   this.z * 2 < 60 ? normalDoge : screamDoge,
    //   centerX,
    //   centerY,
    //   radius,
    //   radius
    // );
  }
}

const pointCount = 30000;

const startingXVariation = 1 / pointCount;
const startingYVariation = 1 / pointCount;
const startingZVariation = 1 / pointCount;
const startingX = 0;
const startingY = 0;
const startingZ = 10;

let points = [];
let deltaTime = performance.now();

for (let i = 0; i < pointCount; i++) {
  points.push(
    new LorenzPoint(
      startingX + startingXVariation * i,
      startingY + startingYVariation * i,
      startingZ + startingZVariation * i,
      i,
      pointCount
    )
  );
}

function animate() {
  let currentTime = performance.now();
  let elapsedTime = (currentTime - deltaTime) / 5000;
  deltaTime = currentTime;

  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  points.forEach((point) => {
    point.update(elapsedTime);
    point.draw();
  });

  requestAnimationFrame(animate);
}

animate();
