let myScale = 0.01,
  radius = 10,
  nSteps = 360,
  width = 600,
  height = 600,
  phy_radians = 2.4,
  blobs = 200,
  pixel_size = 1;

var currStep = 0;

function setup() {
  createCanvas(width, height);
  pixelDensity(pixel_size);
  var seed = int(random()*100000);
  noiseSeed(seed);
  console.log(seed);
//  noiseSeed(2423)
  // noiseSeed(2);
  // noiseSeed(6);
  // noiseSeed(8);
  colorMode(HSB);
//    noStroke();
    noFill();
    frameRate(60);
  // frameRate(5);
    background(0);
    strokeWeight(5);
}


function noisy(x, y, theta) {
  // noise(x,y) == noise(-x,y) --- so add offset of radius*5
  var px = (radius * 5) + (x + radius) * cos(theta);
  var py = (radius * 5) + (x + radius) * sin(theta);

  return noise(myScale * px, myScale * py, myScale * y);
}

function draw() {
    let currStep = frameCount % nSteps,
        noise_theta = map(currStep, 0, nSteps, 0, TWO_PI);

    background(0, 0.05);

    var delta = 50;
    for (var y=100; y<height-100; y+=40) {
        stroke(color(map(y, 100, height-200, 0, 255),100,100));

        beginShape();
        for (var x=0; x <= width; x+= 100) {
            curveVertex(x,
                        map(noisy(y, x+100, noise_theta),
                           -1, 2,
                            y-delta, y+delta));
        }
        endShape();

    }

  if ((frameCount >= nSteps) && (frameCount < nSteps*2)) {
      frameRate(5);
      saveCanvas("flag-" + nf(frameCount % nSteps, 3) + ".png")
  }
}
