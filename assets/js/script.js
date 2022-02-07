/* query's */
const query = element => document.querySelector(element);
const queryAll = element => document.querySelectorAll(element);

/* VARIABLES */
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

/* CONST */
const screen = query('#screen');
const ctx = screen.getContext('2d');
const clear = query('.clear');
const btnDownload = query('.download');

/* EVENTS */
queryAll('.colorArea .color').forEach(elementColor => {
  elementColor.addEventListener('click', selectedColor);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

clear.addEventListener('click', clearScreen);
btnDownload.addEventListener('click', downloadScreen);

/* FUNCTIONS */
function selectedColor(event) {
  let color = event.target.getAttribute('data-color');
  currentColor = color;
  query('.color.active').classList.remove('active');
  event.target.classList.add('active');
}

function mouseDownEvent(event) {
  canDraw = true;
  mouseX = event.pageX - screen.offsetLeft;
  mouseY = event.pageY - screen.offsetTop;
}

function mouseMoveEvent(event) {
  if (canDraw) {
    draw(event.pageX, event.pageY);
  }
}

function mouseUpEvent() {
  canDraw = false;
}

function draw(x, y) {
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;
  let lineWidth = 5;

  if (currentColor === 'white') {
    lineWidth = 25;
  }

  /* Drawing property and methods */
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = 'round';
  ctx.moveTo(mouseX, mouseY);
  ctx.lineTo(pointX, pointY);
  ctx.closePath();
  ctx.strokeStyle = currentColor;
  ctx.stroke();

  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function downloadScreen() {
  const download = query('a#download');
  const img = query('#screen')
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');
  download.setAttribute('href', img);
}
