var w;

function setup() {
    createCanvas(640, 360);
    w = new Walker();
}

function draw() {
    background(51);
    w.walk();
    w.display();
}

function Walker() {
    this.pos = createVector(width/2, 0);
    this.vel = createVector(0, 0)
    this.accel = createVector(0, 0.1);

    this.walk = function() {
        this.vel.add(this.accel);
        this.pos.add(this.vel);
/*        if (this.pos.y > height) {
            this.vel.mult(-1);
        }*/
    };

    this.display = function() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 48, 48);
    }
}
