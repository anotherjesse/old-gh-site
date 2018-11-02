// based on https://www.youtube.com/watch?v=oLiaUEKsRws

var video_w = 240,
    video_h = 180;

var capture;
var loops = {'r': [],
             'g': [],
             'b': []}
var recording = {};
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
    img = capture.get()
    //    img.filter(GRAY);

    function check(key, x, y) {
        if (recording[key]) {
            loops[key].push(img);
            image(img, x, y, video_w, video_h);
        } else {
            if (loops[key].length) {
                image(loops[key][tick%loops[key].length], x, y, video_w, video_h);
            }
        }
    }

    check('r', 0, 0);
    check('g', video_w, 0);
    check('b', 0, video_h);

    loadPixels();
    var d = pixelDensity()

    for (var x=0; x<video_w*d; x++) {
        for (var y=0; y<video_h*d; y++) {
            var si_r = ((y*video_w*2*d)+x)
            var si_g = ((y*video_w*2*d)+x+d*video_w)
            var si_b = (((video_h*d+y)*video_w*2*d)+x)
            var di = (((video_h*d+y)*video_w*2*d)+(x+d*video_w))
            pixels[di*4] = pixels[si_r*4]
            pixels[di*4+1] = pixels[si_g*4+1]
            pixels[di*4+2] = pixels[si_b*4+2]
            pixels[di*4+3] = 255
        }
    }

    updatePixels();
}

window.onkeypress = function(e) {
    if (!recording[e.key]) {
        recording[e.key] = true;
        loops[e.key] = [];
    }
}

window.onkeyup = function(e) {
    recording[e.key] = false;
}
