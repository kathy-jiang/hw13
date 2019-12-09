var objs = [];
var btns = [];
var FPS = 60;
var timepast = 0;
var R = 200;
var G = 150;
var B = 50;
var bR = 0;
var bG = 0;
var bB = 60;
var eraserRange = 20;
var timerRange = 50;
var brushType = "CIRCLE";
var pbrushType = "CIRCLE";
var isPlaying = true;
var isMenuHide = false;

function ColorBtn(X, Y, W, H, givenR, givenG, givenB) {
  this.x = X;
  this.y = Y;
  this.w = W;
  this.h = H;
  this.r = givenR;
  this.g = givenG;
  this.b = givenB;
}
ColorBtn.prototype.isMouseInBtn = function() {
  if (mouseX >= this.x && mouseX <= this.x + this.w &&
    mouseY >= this.y && mouseY <= this.y + this.h) {
    return true;
  } else {
    return false;
  }
}
ColorBtn.prototype.clickBtn = function() {
  R = this.r;
  G = this.g;
  B = this.b;
}
ColorBtn.prototype.displayBtn = function() {
  stroke(0);
  strokeWeight(2);
  fill(this.r * 1.5, this.g * 1.5, this.b * 1.5);
  rect(this.x, this.y, this.w, this.h, 15);
}

function Node(position, givenSize, givenR, givenG, givenB) {
  this.R = givenR;
  this.G = givenG;
  this.B = givenB;
  this.position = createVector(position.x, position.y);
  this.position.x += (random(20) - 10);
  this.position.y += (random(20) - 10);
  this.size = createVector(0, 110);
  this.sizeScale = 0.5;
  var randomSize = givenSize / 2 + random(10);
  this.baseSize = createVector(randomSize, randomSize);
  this.timepast = 0;
  this.isPlaying = isPlaying;
  this.rotateAngle = random(2 * PI);
  this.shapeType = brushType;
}

Node.prototype.drawing = function() {
  noStroke();
  if (this.shapeType == "CIRCLE") {
    translate(this.position.x, this.position.y);
    fill(this.size.x * this.R / 10, this.size.x * this.G / 10, this.size.x * this.B / 10, round(sin(this.timepast) * 128));
    ellipse(sin(this.timepast) * this.baseSize.x, cos(this.timepast) * this.baseSize.y, this.size.x * 1.25, this.size.y * 1.25);
    fill(this.size.x * this.R / 10, this.size.x * this.G / 10, this.size.x * this.B / 10, 255);
    ellipse(sin(this.timepast) * this.baseSize.x, cos(this.timepast) * this.baseSize.y, this.size.x, this.size.y);
    resetMatrix();

  } 
}

Node.prototype.update = function() {
  this.size = createVector(this.baseSize.x + sin(this.timepast) * this.baseSize.x * this.sizeScale,
    this.baseSize.y + sin(this.timepast) * this.baseSize.y * this.sizeScale);
  if (this.isPlaying) {
    this.timepast += 1 / FPS;
  }
}

function setup() {
  frameRate(FPS);
  createCanvas(600, 600);
  noCursor();
  strokeCap(PROJECT);
 
  btns.push(new ColorBtn(5, 5 + 30 * 1, 30, 30, 200, 30, 50));
  btns.push(new ColorBtn(5, 5 + 30 * 2, 30, 30, 200, 60, 50));
  btns.push(new ColorBtn(5, 5 + 30 * 3, 30, 30, 200, 90, 50));
  

  btns.push(new ColorBtn(5, 5 + 30 * 4, 30, 30, 200, 120, 50));
  btns.push(new ColorBtn(5, 5 + 30 * 5, 30, 30, 200, 150, 50));
  btns.push(new ColorBtn(5, 5 + 30 * 6, 30, 30, 200, 180, 50));

  btns.push(new ColorBtn(5, 5 + 30 * 7, 30, 30, 150, 200, 50));
  btns.push(new ColorBtn(5, 5 + 30 * 8, 30, 30, 120, 200, 50));
  btns.push(new ColorBtn(5, 5 + 30 * 9, 30, 30, 90, 200, 50));

  btns.push(new ColorBtn(5, 5 + 30 * 10, 30, 30, 60, 200, 50));
  btns.push(new ColorBtn(5, 5 + 30 * 11, 30, 30, 30, 200, 50));
  btns.push(new ColorBtn(5, 5 + 30 * 12, 30, 30, 0,204,255));
  
  
  btns.push(new ColorBtn(5, 5 + 30 * 13, 30, 30, 0,150,255));
  btns.push(new ColorBtn(5, 5 + 30 * 14, 30, 30, 0, 90, 255));
  btns.push(new ColorBtn(5, 5 + 30 * 15, 30, 30, 0, 60, 255));
  
  btns.push(new ColorBtn(5, 5 + 30 * 16, 30, 30, 0, 30, 255));
  btns.push(new ColorBtn(5, 5 + 30 * 17, 30, 30, 0, 0, 255));
   
}

function draw() {
  background(bR, bG, bB);
  timepast += 1 / FPS;
 
  if (mouseIsPressed && (mouseX > 40 || isMenuHide)) {
    if (brushType == "CIRCLE" ) {
      var position = createVector(mouseX, mouseY);
      objs.push(new Node(position, sqrt(sq(mouseX - pmouseX) + sq(mouseY - pmouseY)), R, G, B));
    }
  }
  for (var i = 0; i < objs.length; i++) {
    objs[i].drawing();
    objs[i].update();
  }
  
  
  stroke(0);
  strokeWeight(2);
  if (!isMenuHide) {
    for (var i = 0; i < btns.length; i++) {
      btns[i].displayBtn();
      if (btns[i].isMouseInBtn()) {
        cursor(HAND);
      }
    }
  }

 
  if (mouseX > 40 || isMenuHide) {
    noCursor();
    fill(R * 1.5, G * 1.5, B * 1.5);
    stroke(R * 1.5, G * 1.5, B * 1.5);
    if (brushType == "CIRCLE") {
      ellipse(mouseX, mouseY, 10, 10);
    }
  }
}

function mouseClicked() {
  if (!isMenuHide) {
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].isMouseInBtn()) {
        btns[i].clickBtn();
      }
    }
  }
}

