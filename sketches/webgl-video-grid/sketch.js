//var width=500,
//    height=500;
var angle=0;
var video_w=40,
    video_h=30,
    pixel_size=20;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    capture = createCapture(VIDEO);
    capture.size(video_w, video_h)
    capture.hide();
    ambientLight(128);
    noStroke();
}

function draw() {
    background(0);
    img = capture.get();
    angle += 0.01;
    rotateX(noise(angle)/2);
    rotateY(noise(10+angle)/2);
    translate(0,0,300);
    translate(-pixel_size*video_w/2, -pixel_size*video_h/2, 0);

    for (var y=0; y<video_h; y++) {
        for (var x=0; x<video_w; x++) {
            //            ambientMaterial(img.get(x,y))
            var color = img.get(x,y);
            specularMaterial(color)
            push()
            translate(0, 0, (color[0] + color[1] + color[2])/8);
            rotateY(noise(x*x+y+angle));
            rotateZ(noise(x+y*y+angle));
            sphere(pixel_size/3);
//            box(pixel_size/2);
            pop();
            translate(pixel_size, 0, 0);
        }
        translate(-pixel_size*video_w, pixel_size,0);
    }
}
