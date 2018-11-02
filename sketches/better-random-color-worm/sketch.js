var w;
var xoff;
var yoff;
var hoff;
var soff;

function setup() {
    createCanvas(640, 360);
    colorMode(HSB, 1);
    noStroke();

    stroke(0.1);

    xoff = random(1000);
    yoff = random(1000);
    hoff = random(1000);
    soff = random(1000);

    w = new Walker();
}

function draw() {
//    background(51);
    w.walk();
    w.display();
}

function Walker() {
    this.walk = function() {
        xoff += 0.01
        yoff += 0.01
        hoff += 0.01
        soff += 0.01
        this.pos = createVector(noise(xoff)*width, noise(yoff)*height)
    };

    this.display = function() {
        //         fill((xoff/2) % 1, 1, 1, 0.5)
        c = color(noise(hoff),
                  noise(soff),
                  1)
        fill(c);
        ellipse(this.pos.x, this.pos.y, 24+noise(xoff)*24, 24+noise(xoff)*24);
    }
}
