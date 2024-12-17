var dim = Math.sqrt(map_arr.length);
var prev_dim = dim;
var mousePrev = [-1, -1];
var mousePos = [-1, -1];
var result = [];
const colorCache = new Map();

function setup() {
  var canvas = createCanvas(dim, dim);
  canvas.parent("mycanvas");
  pixelDensity(1);
  noLoop();
  // background(255);
}

function draw() {
  loadPixels();
  colorMap();
  if (result != null) {
    result.forEach((pos) => {
      set(pos % dim, floor(pos / dim), 255);
    });
  } else {
    if (mousePrev[0] != -1) {
      set(mousePrev[0], mousePrev[1], 255);
    }
    if (mousePos[0] != -1) {
      set(mousePos[0], mousePos[1], 255);
    }
  }
  updatePixels();
  // background(255);
}

function colorMap() {
  let pos = 0;
  let r, g, b;
  for (let index = 0; index < map_arr.length; index++) {
    [r, g, b] = colorCache.get(map_arr[index]) || asciiToRGB(map_arr[index]);

    pixels[pos + 0] = r;
    pixels[pos + 1] = g;
    pixels[pos + 2] = b;
    pixels[pos + 3] = 255;
    pos += 4;
  }
  // console.log("colorCache size: ", colorCache.size);
}

function asciiToRGB(input_char) {
  let r, g, b;
  if (input_char == "#") {
    [r, g, b] = [0, 0, 0];
  } else if (input_char == "*") {
    [r, g, b] = [255, 255, 255];
  } else {
    const intVal = input_char.charCodeAt(0);
    let norm;
    if (intVal <= 63) {
      norm = (intVal - 32) / 31.0;
      r = 0;
      g = floor(norm * 128);
      b = 255 - floor(norm * 127);
    } else if (intVal <= 79) {
      norm = (intVal - 63) / 16.0;
      r = 0;
      g = 128 + floor(norm * 127);
      b = 128 - floor(norm * 128);
    } else if (intVal <= 95) {
      norm = (intVal - 79) / 16.0;
      r = floor(norm * 128);
      g = 128 - floor(norm * 127);
      b = 0;
    } else {
      norm = (intVal - 96) / 31.0;
      r = 128 + floor(norm * 127);
      g = 128 - floor(norm * 128);
      b = 0;
    }
  }
  colorCache.set(input_char, [r, g, b]);
  return [r, g, b];
}

function resetPos() {
  mousePrev = [-1, -1];
  mousePos = [-1, -1];
  result = null;

  changePos("start", -1, -1);
  changePos("goal", -1, -1);

  document.getElementById("start").value = -1;
  document.getElementById("goal").value = -1;
  document.getElementById("solve_btn").disabled = false;

  // stateLog();
}

function fullReset() {
  document.getElementById("dimension").value = 10;
  document.getElementById("density").value = 30;
  document.getElementById("seed").value = 998;
  resetPos();
}

function stateLog() {
  console.log("dim: ", dim, "prev_dim: ", prev_dim);
  console.log("result is null: ", result == null);
  console.log("mousePrev: ", mousePrev);
  console.log("mousePos: ", mousePos);
  console.log(document.getElementById("startPos").innerHTML);
  console.log(document.getElementById("goalPos").innerHTML);
  console.log("hidden start: ", document.getElementById("start").value);
  console.log("hidden goal: ", document.getElementById("goal").value);
  console.log("input dimension: ", document.getElementById("dimension").value);
  console.log("input density: ", document.getElementById("density").value);
  console.log("input seed: ", document.getElementById("seed").value);
  console.log(
    "----------------------------------------------------------------"
  );
}

function changeMap() {
  if (prev_dim == dim) {
    redraw();
    return;
  }
  prev_dim = dim;
  resizeCanvas(dim, dim);
}

function mouseClicked() {
  if (mouseX < 0 || mouseX >= dim || mouseY < 0 || mouseY >= dim) return;
  let tmp = [boundby(floor(mouseX), dim), boundby(floor(mouseY), dim)];
  if (map_arr[tmp[0] + tmp[1] * dim] == "#") {
    return;
  }

  if (mousePos[0] == -1) {
    mousePos = tmp;
    redraw();
    set(mousePos[0], mousePos[1], 255);
    updatePixels();

    changePos("start", mousePos[0], mousePos[1]);

    document.getElementById("start").value = mousePos[0] + mousePos[1] * dim;

    // stateLog();
  } else if (floor(mouseX) != mousePos[0] || floor(mouseY) != mousePos[1]) {
    result = null;
    mousePrev = mousePos;
    mousePos = tmp;
    redraw();
    set(mousePrev[0], mousePrev[1], 255);
    set(mousePos[0], mousePos[1], 255);
    text("mouseX: " + mouseX + "\nmouseY: " + mouseY, 0, height / 4);
    updatePixels();

    changePos("start", mousePrev[0], mousePrev[1]);
    changePos("goal", mousePos[0], mousePos[1]);

    document.getElementById("start").value = mousePrev[0] + mousePrev[1] * dim;
    document.getElementById("goal").value = mousePos[0] + mousePos[1] * dim;

    // stateLog();
  }
}

function boundby(x, max) {
  if (x < 0) return 0;
  else if (x >= max) return max - 1;
  return x;
}

function changePos(posName, posX, posY) {
  if (posName == "start") {
    document.getElementById("startPos").innerHTML =
      "Starting point: (" + posX + "," + posY + ")";
  } else if (posName == "goal") {
    document.getElementById("goalPos").innerHTML =
      "Ending point: (" + posX + "," + posY + ")";
  }
}

function rnd_bound(e) {
  document.getElementById("solve_btn").disabled = true;

  let el = document.getElementById(e.getAttribute("name"));
  do {
    var rnd_val = Math.ceil(Math.random() * el.max);
  } while (el.value == rnd_val);
  el.value = el.min > rnd_val ? el.min : rnd_val;
}

function enforceMinMax(el) {
  document.getElementById("solve_btn").disabled = true;

  if (el.value == "") {
    el.value = el.min;
    return;
  }

  if (parseInt(el.value) < parseInt(el.min)) {
    el.value = el.min;
  } else if (parseInt(el.value) > parseInt(el.max)) {
    el.value = el.max;
  } else {
    el.value = parseInt(el.value);
  }
}
