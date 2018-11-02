var w;
var r_noise;

let canvas_w = 600,
    canvas_h = 600,
    noise_r = 1,
    nSteps = 360,
    line_count = 1,
    line_height = 30,
    circle_size = 100,
    dot_size = 8,
    center_x = canvas_w / 2,
    center_y = canvas_h / 2,
    line_color = [],
    line_noise_offset = [];

function setup() {
    pixelDensity(1);
    // frameRate(5);
    createCanvas(canvas_w, canvas_h);
    colorMode(HSB, 1);

    fill(color(0, 0, 0));
    for (var idx = 0; idx < line_count; idx++) {
        line_color[idx] = color(random(100) / 100, 1, 1);

        line_noise_offset[idx] = random(10000);
    }
    strokeWeight(2);


    // frameRate(5);
    background(0);
    noStroke();

    shuffleArray(times);
    for (var n=0; n<times.length; n++) {
        if (random() > 0.5)
            times[n] *= -1;
    }

}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function noisy(theta, x, y) {
    var n = noise(noise_r + noise_r * sin(theta),
                  noise_r + noise_r * cos(theta),
                  x * 0.001);
    return map(n, 0.25, 0.75, 0, height)
}

var res = 200,
    times = [
        120,
        90,
        72,
        60,
        45,
        40,
        36,
        30
    ],
    radiuses = [

                160,
                140,
                120,
                100,
                80,
        60,
        40,
        20
    ];

function draw() {

    background(0, 0, 0, 0.9);

    for (var n = 0; n < radiuses.length; n++) {
        let radius = radiuses[n];
        for (var idx = 0; idx < res/50; idx++) {
            let pre_theta = map(idx, 0, res, 0, TWO_PI / 5);

            let theta = map(frameCount % times[n], 0, times[n], 0, TWO_PI) + pre_theta + 100 * noise(radius);

            var hue = map((theta + noisy(radius)) % TWO_PI, 0, TWO_PI, 0, 1.0);
            fill(color(hue, 1, 1));
            // stroke(1)
            let ax = width / 2 + sin(theta) * radius,
                ay = height / 2 + cos(theta) * radius;

            if ((n * n + frameCount) % 60 < 30) {
                var s = map((n*n+frameCount) % 30, 0, 29, 2, 50)
            } else {
                var s = map((n*n+frameCount) % 30, 0, 29, 50, 2)
            }
            ellipse(ax, ay, s,s)
        }
    }

    if ((frameCount >= nSteps) && frameCount < 2 * nSteps) {
         frameRate(5)
//        noLoop()
         saveCanvas("rainbow-plots-"+nf(frameCount%nSteps, 3)+".png")
    }

    // noLoop();
}
