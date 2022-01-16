const canvas = document.getElementById("jsCanvas");

let painting = false;

function onMouseMove(e) {
  const { offsetX: x } = e;
  const { offsetY: y } = e;
}

function onMouseDown() {
  painting = true;
}

function onMouseUp() {
  painting = false;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
}

/* clientX or clientY = 윈도우에서 마우스 위치 */
/* offsetX or offsetY = 해당태크에서 마우스 위치 */
