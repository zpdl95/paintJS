const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const state = document.getElementById("jsState");
const allClear = document.getElementById("jsAllClear");
const saveBtn = document.getElementById("jsSave");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let painting = false;
let filling = false;

function onMouseMove(e) {
  const { offsetX: x } = e;
  const { offsetY: y } = e;
  if (!filling) {
    if (!painting) {
      /* beginPath() = 경로생성 */
      ctx.beginPath();
      /* moveTo() = 시작지점생성 */
      ctx.moveTo(x, y);
    } else {
      /* lineTo() = 이동지점생성 */
      ctx.lineTo(x, y);
      /* stroke() = 그리기 */
      ctx.stroke();
    }
  }
}

function onMouseEnter(e) {
  const { offsetX: x } = e;
  const { offsetY: y } = e;
  if (painting) {
    ctx.moveTo(x, y);
  }
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function handleColorClick(e) {
  const {
    target: {
      style: { backgroundColor: color },
    },
  } = e;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(e) {
  ctx.lineWidth = e.target.value;
}

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = "fill";
    state.innerText = "painting...";
  } else {
    filling = true;
    mode.innerText = "paint";
    state.innerText = "filling...";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleAllClear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleCM(e) {
  e.preventDefault();
}

function handleSave() {
  const image = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  /* 다운받는 주소 */
  link.href = image;
  /* 다운받는 파일 이름 */
  link.download = "canvas";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  window.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseenter", onMouseEnter);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

colors.forEach((color) => color.addEventListener("click", handleColorClick));

range?.addEventListener("input", handleRangeChange);

mode?.addEventListener("click", handleModeClick);

saveBtn?.addEventListener("click", handleSave);

allClear?.addEventListener("click", handleAllClear);

/* clientX or clientY = 윈도우에서 마우스 위치 */
/* offsetX or offsetY = 해당태크에서 마우스 위치 */
