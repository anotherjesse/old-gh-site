var w;
var r_noise;

var recording = -10;
var stop_recording = 300;
var gif;


var canvas_w = 600,
    canvas_h = 600,
    center_x = canvas_w / 2,
    center_y = canvas_h / 2;

function setup() {
    canvas = createCanvas(canvas_w, canvas_h);
    colorMode(HSB, 1);
    noStroke();
    pixelDensity(1);

    stroke(0.1);
    fill(color(1, 0, 0))

    r_noise = random(1000);
    frameRate(4);
}

function draw() {
    background(1, 0, 1, 0.2);

    r_noise += 0.05;
    for (var y = 0; y < canvas_h; y += 10) {
        for (var x = 0; x < canvas_w; x += 5) {
            var scale = 0;
            var dist_center = Math.sqrt(Math.pow(x - center_x, 2) +
                                        Math.pow(y - center_y, 2))
            if (dist_center > 100) {
                scale = (100 - dist_center) / 50
                var s = scale * 30 * noise(r_noise + y + (x / 100));
                rect(x, y - s, 1, 1)
            }

        }

    }

    recording += 1;

    if (recording > 0) {
        var num = recording;
        if (recording < 10) num = '0' + num;
        if (recording < 100) num = '0' + num;

        saveCanvas(canvas, 'wind-' + num + '.png')

    }
    if (recording > stop_recording) {
        noLoop();
    }
}
