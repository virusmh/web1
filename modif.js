const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');

const slices = 8; // Number of segments on the wheel
const sliceColors = ['#FF4136', '#FF851B', '#FFDC00', '#2ECC40', '#0074D9', '#B10DC9', '#FFD700', '#001f3f']; // Colors for each segment

const sliceDegree = (Math.PI * 2) / slices;
let currentDegree = 0;
let spinning = false;

function drawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < slices; i++) {
    ctx.beginPath();
    ctx.fillStyle = sliceColors[i];
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, i * sliceDegree, (i + 1) * sliceDegree);
    ctx.lineTo(centerX, centerY);
    ctx.fill();
  }
}

function spinWheel() {
  if (spinning) return;
  spinning = true;
  const spinAngleStart = Math.random() * 10 + 10;
  const spinTime = Math.random() * 3000 + 4000;
  rotateWheel(spinAngleStart, spinTime);
}

function rotateWheel(angle, time) {
  const spinAngleTotal = angle * 30;
  const startTime = Date.now();

  function rotate() {
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime >= time) {
      spinning = false;
      return;
    }
    const spinAngle = spinAngleTotal * (1 - Math.sin(Math.PI * (elapsedTime / time)));
    currentDegree += spinAngle * Math.PI / 180;
    currentDegree %= 360;
    drawWheel();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(currentDegree);
    ctx.restore();
    requestAnimationFrame(rotate);
  }

  requestAnimationFrame(rotate);
}

drawWheel();

spinButton.addEventListener('click', spinWheel);
