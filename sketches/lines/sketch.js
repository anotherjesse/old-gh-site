var w;
var r_noise;

var canvas_w = 300,
    canvas_h = 300,
    center_x = canvas_w / 2,
    center_y = canvas_h / 2;

function setup() {
    createCanvas(canvas_w, canvas_h);
    colorMode(HSB, 1);
    noStroke();

    stroke(0.1);
    fill(color(1,0,0))

    r_noise = random(1000);
}

function draw() {
    background(1);
    r_noise += 0.05;
    for (var y=0; y<canvas_h; y+=10) {
        for (var x=0; x<canvas_w; x++) {
            var scale = 0;
            var dist_center = Math.sqrt(Math.pow(x - center_x, 2) +
                                        Math.pow(y - center_y, 2))
            if (dist_center < 100) {
                scale = (100-dist_center) / 100
            }
            var s = scale * 30 * noise(r_noise + y + (x/100));
            rect(x,y-s,1,1)
        }

    }
}
