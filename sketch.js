function setup() {
  createCanvas(800, 900);
}

function draw() {
  background(255);
  fill(255);
  rect(0, 0, width - 1, height - 1)
  /*if (mouseIsPressed) {
    fill(0);
  }
  else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);*/
  fill(0);
  text("FrameRate : " + frameRate(), 10, 15);
  for (let i = 0; i < touches.length; i++) {
    text("x : " + touches[i].x + ", y : " + touches[i].y, 10, i * 15 + 30);
    ellipse(touches[i].x, touches[i].y, 100, 100);
  }
}
