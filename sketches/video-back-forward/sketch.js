// based on https://www.youtube.com/watch?v=oLiaUEKsRws

var video_w = 480,
    video_h = 360;

var capture;
var loop = [];
var recording = false;
var tick;
var direction = 1;

function setup() {
    createCanvas(video_w, video_h);
    capture = createCapture(VIDEO);
    capture.size(video_w, video_h);
    capture.hide();
    tick = 0;
}

function draw() {

    var img = capture.get();
    if (recording) {
        loop.push(img);
        image(img, 0, 0, video_w, video_h);
    } else {
        if (loop.length) {
            tick += direction;
            if (tick >= loop.length) {
                tick = loop.length - 1;
                direction = -1;
            }
            if (tick < 0) {
                tick = 0;
                direction = 1;
            }

            image(loop[tick], 0, 0, video_w, video_h);
        }
    }
}

window.onkeydown = function(e) {
    if ((e.key == 'a') && !recording) {
        recording = true;
        loop = [];
    }
}

window.onkeyup = function(e) {
    if (e.key == 'a') {
        recording = false;
    }
}
