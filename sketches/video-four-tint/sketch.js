// based on https://www.youtube.com/watch?v=oLiaUEKsRws

var video_w = 240,
    video_h = 180;

var capture;
var tick;

function setup() {
    createCanvas(video_w*2, video_h*2);
    capture = createCapture(VIDEO);
    capture.size(video_w, video_h);
    capture.hide();
    tick = 0;
}

function draw() {
    tick += 1;
    var img = capture.get()


    noTint()
    image(img, 0, 0, video_w, video_h);
    tint(0, 0, 255);
    image(img, video_w, 0, video_w, video_h);
    tint(255, 0, 0);
    image(img, 0, video_h, video_w, video_h);
    tint(0, 255, 0);
    image(img, video_w, video_h, video_w, video_h);
}
