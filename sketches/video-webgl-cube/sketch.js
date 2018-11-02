//var width=500,
//    height=500;
var angle=0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    capture = createCapture(VIDEO);
    capture.size(100, 100);
    capture.hide();
//    ambientLight(255,0,0); //even red light across our objects
}

function draw() {
    background(0);
    texture(capture.get());
    angle += 0.01;
    translate(100,0,700); //moves our drawing origin to the top left corner
    push();
    rotateX(noise(angle));
    rotateY(noise(-angle));
    rotateZ(noise(100+2*angle));
    box(100);
    pop()

    translate(-200, 0, 0);
    rotateX(noise(angle));
    rotateY(noise(-angle));
    rotateZ(noise(100+2*angle));
    texture(capture);
    box(100);
}
