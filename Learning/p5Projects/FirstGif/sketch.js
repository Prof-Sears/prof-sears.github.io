let x = 400;
let y = 400;

const duration = 180;

let speedx;
let speedy;

let capturer;
let p5Canvas;

function setup() {

  p5Canvas = createCanvas(600, 600);
  updateSpeed();

  frameRate(30);

  capturer = CCapture({
    format: 'gif',
    workersPath: '../js/',
    name: 'ball',
    framerate: 30,
    verbose: false
  });
  
  print('End of setup.');
}

function draw() {
  if(frameCount === 1) capturer.start();
  background(220);
  noStroke();
  fill(0);
  circle(x, y, 20);
  if (x < 10 || x > width - 10) speedx *= -1;
  if (y < 10 || y > height - 10) speedy *= -1;
  x += speedx;
  y += speedy;
  
  if(frameCount < duration) {
    capturer.capture(p5Canvas.canvas);
  } else {
    capturer.stop();
    noLoop();
    print('Done Looping');
    capturer.save();
  }

}

function mouseClicked() {
  
}

function updateSpeed() {
  speedx = random(-5, 5);
  speedy = random(-5, 5);
}