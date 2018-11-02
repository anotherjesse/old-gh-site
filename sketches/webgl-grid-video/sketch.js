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
    translate(0,0,300); //moves our drawing origin to the top left corner
    rotateX(-(mouseY / height - 0.5));
    rotateY(mouseX / width - 0.5);
    translate(-200, -200, 0);
    for (var y=0; y<10; y++) {
        for (var x=0; x<10; x++) {
            push();
            translate(10*sin(x*x + y), 10*cos(x*x - y), 100*noise(x*x+y+angle));
            box(45);
            pop();
            translate(50,0,0);
        }
        translate(-500, 50, 0);
    }
}
