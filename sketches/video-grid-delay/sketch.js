// based on https://www.youtube.com/watch?v=oLiaUEKsRws

var capture;
var captures = [];

var video_w = 120,
    video_h = 90;

function setup() {
    createCanvas(video_w*5, video_h*5);
    capture = createCapture(VIDEO);
    capture.size(video_w, video_h);
    capture.hide();
}

function draw() {
    captures.unshift(capture.get());
    captures = captures.slice(0,25)
    for (var i=0; i<captures.length; i++) {
        image(captures[i],
              (i%5)*video_w,
              int(i/5)*video_h,
              video_w,
              video_h);
    }
}
