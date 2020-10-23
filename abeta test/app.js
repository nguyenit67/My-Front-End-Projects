const HEIGHT = 10;
const WIDTH = 15;
const CELL_COLOR_CSSVAR = "--bg-color";
const matrix = getNew2dArray(HEIGHT, WIDTH);

const dataMatrix = getNew2dArray(HEIGHT, WIDTH);

const COLORSTRING = `
  ${"red\n".repeat(7)}

  coral
  tomato
  orangered
  gold

  ${"yellow\n".repeat(4)}
  
  lawngreen
  chartreuse
  limegreen
  lime
  green
  darkgreen
  greenyellow
  springgreen
  mediumspringgreen
  lightgreen
  palegreen

  aqua
  darkturquoise

  deepskyblue
  dodgerblue
  blue

  mediumslateblue
  slateblue
  darkslateblue

  violet
  purple
  hotpink
  deeppink
`;
const COLORS = COLORSTRING.split(/\s+/).filter(c => c);

const style = elemt("style", {}, `
  .box {
    grid-template-columns: repeat(${WIDTH}, 1fr);
  }  
`);

document.head.appendChild(style);

const grid = document.querySelector(".box");

// for (const [y, x] of nrange2d(HEIGHT, WIDTH)) {
for (const y of nrange(HEIGHT)) {
  for (const x of nrange(WIDTH)) {

    const cell = elemt("input", {
      type: "checkbox",
      class: "cell",
      style: `${CELL_COLOR_CSSVAR}: ${getRandomColor()}`
    });
    grid.appendChild(cell);
    matrix[y][x] = cell;
  }
}
// }

// add EVENT LISTENERs

document.querySelector("#next").onclick = nextGen;

// FUNCTIONS
function aliveAdjCountt(y, x) {
  let count = 0;
  
  for (const [relY, relX] of adjacentRel()) {
    count += isAlive( y + relY, x + relX );
  }

  return count;
}

function nextGen() {
  // get new 2d array data

  for (const [y, x] of nrange2d(HEIGHT, WIDTH)) {

    let count = aliveAdjCountt(y, x);

    let chk = matrix[y][x].checked;
    switch (null) {
    //   case 1: 
    //   case 4:
    //     chk = 0;
    //   break;
    //   case 3:
    //     chk = 1;
    //   break;
    }

    if (count === 3) {
      chk = 1;
    } else if (count !== 2) {
      chk = 0;
    }

    dataMatrix[y][x] = chk;
  }

  // update respect to new 2d array
  for (const [y, x] of nrange2d(HEIGHT, WIDTH)) {
    matrix[y][x].checked = dataMatrix[y][x];
  }
}

function getNew2dArray(height, width) {
  const mat = [];
  for (const y of nrange(HEIGHT)) {
    mat[y] = []; // Array(width);
  }
  return mat;
}

function getRandomColor() {

  return COLORS[parseInt(Math.random() * COLORS.length)];
  // return lighten("#" + parseInt(Math.random() * 16**6 ), 3);
}

function isAlive(y, x, mat = matrix) {
  if (y < 0 || y >= HEIGHT ||
      x < 0 || x >= WIDTH) return false;
  
  try {
    return mat[y][x].checked;

  } catch {
    console.log("Error ", y, x);
  }
}

function elemt(name = "input", attrMap, ...children) {
  let dom = document.createElement(name);
  for (let attr in attrMap) {
    dom.setAttribute(attr, attrMap[attr]);
  }
  dom.append(...children);
  return dom;
}

function* nrange(start = 0, end = null, step = 1) {
  if (end == null) {
    [start, end] = [0, start];
  }
  for (; start < end; start += step) {
    yield start;
  }
}

function* nrange2d(n, m) {
  for (const y of nrange(n)) {
    for (const x of nrange(m)) {
      yield [y, x];
    }
  }
}

function* adjacentRel() {
  for (const relY of nrange(-1, 2)) {
    for (const relX of nrange(-1, 2)) {
      if (relY || relX)
        yield [relY, relX];
    }
  }
}

function lighten(color, amt) {

  var usePound = false;

  if (color[0] == "#") {
    color = color.slice(1);
    usePound = true;
  }

  var num = parseInt(color, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") +
    (g | (b << 8) | (r << 16)).toString(16)
      .padStart(6, "0");
}