// based on https://www.youtube.com/watch?v=oLiaUEKsRws

var video_w = 240,
    video_h = 180,
    per_row = 4,
    per_col = 4,
    history_length = 100;

var capture;
var captures = [];
var locations = [];

function setup() {
    createCanvas(video_w*per_row, video_h*per_col);
    capture = createCapture(VIDEO);
    capture.size(video_w, video_h);
    capture.hide();
    for (var x=0; x<per_row; x++) {
        for (var y=0; y<per_col; y++) {
            locations.push(int(random(history_length)));
        }
    }
}

function draw() {
    captures.unshift(capture.get());
    captures = captures.slice(0, history_length);
    if (captures.length < history_length)
        return

    for (var x=0; x<per_row; x++) {
        for (var y=0; y<per_col; y++) {

        image(captures[locations[y*per_row+x]],
              x*video_w,
              y*video_h,
              video_w,
              video_h);
        }
    }
}
