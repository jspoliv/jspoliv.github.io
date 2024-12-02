var dim = Math.sqrt(map_arr.length);
var prev_dim = dim;
var mousePrev = [-1, -1];
var mousePos = [-1, -1];

function setup() {
  var canvas = createCanvas(dim, dim);
  canvas.parent("mycanvas");
  pixelDensity(1);
  noLoop();
  // background(255);
}

function draw() {
  loadPixels();
  asciiToRgb();
  updatePixels();
  // background(255);
}

function asciiToRgb() {
  let pos = 0;
  let r, g, b;
  for (let index = 0; index < map_arr.length; index++) {
    if (map_arr[index] == "#") {
      [r, g, b] = [0, 0, 0];
    } else if (map_arr[index] == "*") {
      [r, g, b] = [255, 255, 255];
    } else if (map_arr[index] == "O" || map_arr[index] == "X") {
      [r, g, b] = [255, 255, 0];
    } else {
      const intVal = map_arr.charCodeAt(index);
      if (intVal <= 63) {
        const norm = (intVal - 32) / 31.0;
        r = 0;
        g = Math.round(norm * 128);
        b = 255 - Math.round(norm * 127);
      } else if (intVal <= 79) {
        const norm = (intVal - 63) / 16.0;
        r = 0;
        g = 128 + Math.round(norm * 127);
        b = 128 - Math.round(norm * 128);
      } else if (intVal <= 96) {
        const norm = (intVal - 79) / 16.0;
        r = Math.round(norm * 128);
        g = 128 - Math.round(norm * 127);
        b = 0;
      } else {
        const norm = (intVal - 96) / 31.0;
        r = 128 + Math.round(norm * 127);
        g = 128 - Math.round(norm * 128);
        b = 0;
      }
    }
    pixels[pos + 0] = r;
    pixels[pos + 1] = g;
    pixels[pos + 2] = b;
    pixels[pos + 3] = 255;
    pos += 4;
  }
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

    var start = document.getElementById("start");
    start.value = mousePos[0] + mousePos[1] * dim;
    // fill("white");
    // text("c(" + (mousePos[0] + mousePos[1] * dim) + ")", 0, height / 8);
    // text("p(" + (mousePrev[0] + mousePrev[1] * dim) + ")", 0, height / 4);
  } else if (floor(mouseX) != mousePos[0] || floor(mouseY) != mousePos[1]) {
    mousePrev = mousePos;
    mousePos = tmp;
    redraw();
    set(mousePrev[0], mousePrev[1], 255);
    set(mousePos[0], mousePos[1], 255);
    updatePixels();

    changePos("start", mousePrev[0], mousePrev[1]);
    changePos("goal", mousePos[0], mousePos[1]);
    
    var start = document.getElementById("start");
    start.value = mousePrev[0] + mousePrev[1] * dim;
    var goal = document.getElementById("goal");
    goal.value = mousePos[0] + mousePos[1] * dim;
    // fill("white");
    // text("c(" + (mousePos[0] + mousePos[1] * dim) + ")", 0, height / 8);
    // text("p(" + (mousePrev[0] + mousePrev[1] * dim) + ")", 0, height / 4);
  }
}

function boundby(x, max) {
  if (x < 0) return 0;
  else if (x >= max) return max - 1;
  return x;
}

function resetPos() {
  mousePrev = [-1, -1];
  mousePos = [-1, -1];

  changePos("start", -1, -1);
  changePos("goal", -1, -1);

  var start = document.getElementById("start");
  start.value = -1;
  var goal = document.getElementById("goal");
  goal.value = -1;
}

function changePos(posName, posX, posY) {
  if (posName == "start") {
    var pos = document.getElementById("startPos");
    pos.innerHTML = "Starting point: ("+posX+","+posY+")";
  } else if (posName == "goal") {
    var pos = document.getElementById("goalPos");
    pos.innerHTML = "Ending point: ("+posX+","+posY+")";
  }
}
