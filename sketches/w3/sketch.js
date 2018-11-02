let box_count = 16;

function setup() {
    createCanvas(600, 600, WEBGL);

//    ortho(-width, width, height, -height/2, 0.1, 100);
}

function noisy(x, y, theta, radius, scaling) {
    // noise(x,y) == noise(-x,y) --- so add offset of radius*5
    var px = (radius * 5) + (x + radius) * cos(theta);
    var py = (radius * 5) + (x + radius) * sin(theta);

    return noise(scaling * px, scaling * py, scaling * y);
}

function draw() {
    let theta = map(frameCount % 360, 0, 360, 0, TWO_PI);
    background(255);

    translate(0,0,200);

    for(var i = 0; i < 500; i+=100){
        push();
        fill(i * 0.1, 100, 100);

        //line
        translate(0, 100, 0);
        line(-100, 0, i, 100, 0, i);

        //triangles
        translate(0, 100, 0);
        triangle(
            0, sin( i + frameCount * 0.1) * 10, i,
            60, 60, i,
            -60, 60, i);

        //quad
        translate(0, 200, 0);
        quad(
    -100, i, 0,
            100, i, 0,
    -100, 100, i,
            100, 100, i
        );
        pop();
    }



    if (frameCount == 42) {
        saveCanvas('42.png');
    }

}



function draw(){
    background(250);
    rotateY(frameCount * 0.01);

    for(var j = 0; j < 5; j++){
        push();
        for(var i = 0; i < 80; i++){
            translate(sin(map(frameCount % 360, 0, 360, 0, TWO_PI) + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
            rotateZ(frameCount * 0.002);
            push();
            sphere(8, 6, 4);
            pop();
        }
        pop();
    }
}


var img;
function setup() {
    createCanvas(600, 600, WEBGL);
    pixelDensity(1);
    frameRate(60);
}

var weird_count = 80;

function draw() {
    let theta = map(frameCount % 360, 0, 360, 0, TWO_PI);
    background(0);

    var locX = height / 2;
    var locY = width / 2;

    ambientLight(60, 60, 60);
    pointLight(255, 0, 255, locX, locY, 100);

    for (var idx=0; idx<weird_count; idx++) {
        push();
        rotate(map(idx, 0, weird_count, 0, TWO_PI), [1,0,1])
        if (idx % 2 == 1) {
            rotate(0.01, [1,0,1]);
        }
        translate(width / 4, -height / 4, 0);
        rotate(map(frameCount % 360, 0, 360, 0, TWO_PI), [0,1,0])
        normalMaterial();
        torus(80, 20, 64, 64);
        pop();
    }


    if (frameCount == 42) {
//        saveCanvas('42.png');
    }

    if (frameCount >= 360 && frameCount < 720) {
//        frameRate(5);
//        saveCanvas('torus-' + nf(frameCount % 360, 3) + '.png');
    }
}
