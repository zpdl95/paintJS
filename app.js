const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

let painting = false;

function onMouseMove(e) {
  const { offsetX: x } = e;
  const { offsetY: y } = e;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
}

/* clientX or clientY = 윈도우에서 마우스 위치 */
/* offsetX or offsetY = 해당태크에서 마우스 위치 */
