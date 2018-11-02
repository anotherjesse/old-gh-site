var w;
var xoff = 0;
var yoff = 0;
colorMax = 1;

function setup() {
    createCanvas(640, 360);
    colorMode(HSB, colorMax);
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
        c = color(colorMax * mouseX / width,
                  colorMax * mouseY / height,
                  colorMax)
        fill(c);
        ellipse(this.pos.x, this.pos.y, 48, 48);
    }
}
