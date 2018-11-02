var w;
var xoff = 0;
var yoff = 0;

function setup() {
    createCanvas(640, 360);
    colorMode(HSB, 1);
    noStroke();

    for (var x=0; x<width; x+=4) {
        for (var y=0; y<height; y+=4) {
            fill(color(x/width,
                       y/height,
                       1));
            rect(x, y, 4, 4);
        }
    }

    stroke(0.1);

    w = new Walker();
}

function draw() {
//    background(51);
    w.walk();
    w.display();
}

function Walker() {
    this.walk = function() {
        xoff += random(0.02);
        yoff += random(0.02);
        this.pos = createVector(noise(xoff)*width, noise(yoff)*height)
    };

    this.display = function() {
        //         fill((xoff/2) % 1, 1, 1, 0.5)
        c = color(noise(xoff),
                  noise(yoff),
                  1)
        fill(c);
        ellipse(this.pos.x, this.pos.y, 24+noise(xoff)*24, 24+noise(xoff)*24);
    }
}
