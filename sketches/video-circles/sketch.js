// based on https://www.youtube.com/watch?v=oLiaUEKsRws

var video_w = 60,
    video_h = 40,
    arg_scale = 10;

var capture;
var tick;

function setup() {
    createCanvas(video_w*arg_scale, video_h*arg_scale);
    capture = createCapture(VIDEO);
    capture.size(video_w, video_h);
    capture.hide();
}

function draw() {
    img = capture.get()
    img.filter(GRAY);

    fill(0);
    background(255);
    for (var y=0; y<video_h; y++) {
        for (var x=0; x<video_w; x++) {
            var val = img.get(x,y)[0];
            var radius = (1 - (val / 255)) * arg_scale;
            ellipse(x*arg_scale, y*arg_scale, radius, radius);
        }
    }
}
