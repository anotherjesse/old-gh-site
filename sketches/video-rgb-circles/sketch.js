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
    noStroke();
}

function draw() {
    color = capture.get()

    fill(0);
    background(255);
    for (var y=0; y<video_h; y++) {
        for (var x=0; x<video_w; x++) {
            var vals = color.get(x,y);
            var radius = (1 - ((vals[0] + vals[1] + vals[2]) / 765)) * arg_scale;
            if (vals[0] >= vals[1]) {
                if (vals[0] >= vals[2]) {
                    fill(255, 0, 0)
                } else {
                    fill(0, 0, 255);
                }
            } else {
                if (vals[1] >= vals[2]) {
                    fill(0, 255, 0);
                } else {
                    fill(0, 0, 255);
                }
            }
            ellipse(x*arg_scale, y*arg_scale, radius, radius);
        }
    }
}
