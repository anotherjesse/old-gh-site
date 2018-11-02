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

    background(0, 0.1);

    var delta = 50;
    for (var br=0; br < height; br+=25) {

        beginShape();
        var r = (br + currStep) % height/2;
        stroke(color(map(r, 0, height/3, 160, 192),100,100));
        for (var t=0; t <= TWO_PI; t += TWO_PI/100) {
            var cr = map(noisy(r, t*100, noise_theta), 0.25, 0.75, r, 1.5*r);
//            console.log(cr);
            var cx = width/2 + cr * sin(t);
            var cy = height/2 + cr * cos(t);

            curveVertex(cx, cy);
            if (t == 0) {
                curveVertex(cx, cy);
            }
//                        map(noisy(y, x+100, noise_theta),
//                           -1, 2,
//                            y-delta, y+delta));
        }
        var cr = map(noisy(r, 0, noise_theta), 0.25, 0.75, r, 1.5*r);
        var cx = width/2 + cr * sin(0);
        var cy = height/2 + cr * cos(0)
        curveVertex(cx, cy);
        curveVertex(cx, cy);

        endShape();

    }

  if ((frameCount >= nSteps) && (frameCount < nSteps*2)) {
      frameRate(5);
      saveCanvas("blue-rose-" + nf(frameCount % nSteps, 3) + ".png")
  }
}
