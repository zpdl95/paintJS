const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const lineWidth = document.querySelector('#line-width');
const color = document.querySelector('#color');
const colorList = document.querySelector('.color-list');
const modeBtn = document.querySelector('#mode-btn');
const resetBtn = document.querySelector('#reset-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const fileInput = document.querySelector('#file');
const textInput = document.querySelector('#text');
const saveBtn = document.querySelector('#save');
const body = document.body;

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.strokeStyle = color.value;
ctx.fillStyle = color.value;
ctx.lineCap = 'round';

let isPainting = false;
let isFilling = false;
let mobile = false;

function onMouseMove(e) {
  if (isPainting) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
  ctx.moveTo(e.offsetX, e.offsetY);
}

function onStartPainting() {
  isPainting = true;
}

function onCancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onMouseClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onMouseEnter(e) {
  if (isPainting) {
    ctx.moveTo(e.offsetX, e.offsetY);
  }
}

function onLineWidthChange(e) {
  ctx.lineWidth = e.target.value;
}

function onColorChange(e) {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
}

function onColorSelect(e) {
  color.value = e.target.dataset.color;
  ctx.strokeStyle = e.target.dataset.color;
  ctx.fillStyle = e.target.dataset.color;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.textContent = 'Fill';
  } else {
    isFilling = true;
    modeBtn.textContent = 'Draw';
  }
}

function onResetClick() {
  textInput.value = '';
  lineWidth.value = 15;
  ctx.lineWidth = lineWidth.value;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = 'white';
  isFilling = false;
  modeBtn.textContent = 'Fill';
}

function onFileChange(e) {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(this, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(e) {
  const text = textInput.value.trim();
  if (text) {
    ctx.save(); // 컨택스트의 현재상태를 저장
    ctx.lineWidth = 1;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 48px Arial';
    ctx.fillText(text, e.offsetX, e.offsetY);
    ctx.restore(); // 이전 저장된 상태를 불러옴
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myDrawing.png';
  a.click();
}

function isMobile() {
  mobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (mobile) {
    showNoticeBox();
  }
}

function showNoticeBox() {
  const article = document.createElement('article');
  article.setAttribute('class', 'checkMobile');
  const p = document.createElement('p');
  p.textContent = '데스크탑에서만 작동합니다.';
  p.setAttribute('class', 'checkMobile__text');
  article.appendChild(p);
  body.appendChild(article);

  article.addEventListener('touchmove', (e) => {
    e.preventDefault();
  });
}

canvas.addEventListener('dblclick', onDoubleClick);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onStartPainting);
document.addEventListener('mouseup', onCancelPainting);
canvas.addEventListener('click', onMouseClick);
canvas.addEventListener('mouseenter', onMouseEnter);
lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);
colorList.addEventListener('click', onColorSelect);
modeBtn.addEventListener('click', onModeClick);
resetBtn.addEventListener('click', onResetClick);
eraserBtn.addEventListener('click', onEraserClick);
fileInput.addEventListener('change', onFileChange);
saveBtn.addEventListener('click', onSaveClick);
document.addEventListener('DOMContentLoaded', isMobile);
