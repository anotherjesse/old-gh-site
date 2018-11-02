let canvas_w = 600,
  canvas_h = 600,
  nSteps = 360,
    things = [],
    quickdraws;

var periods = [
  // 10,
  // 12,
  // 15,
  // 18,
  // 20,
  // 24,
  // 30,
  // 36,
  // 40,
  // 45,
  // 60,
  // 72,
  // 90,
  120,
  180,
  360
]

function noisy(x, y, theta, radius, scaling) {
  // noise(x,y) == noise(-x,y) --- so add offset of radius*5
  var px = (radius * 5) + (x + radius) * cos(theta);
  var py = (radius * 5) + (x + radius) * sin(theta);

  return noise(scaling * px, scaling * py, scaling * y);
}

function preload() {
    quickdraws = loadJSON('cactus.json');
    num_quickdraws = 131676;
}

function circle_thing() {
  return {
    cx: random() * canvas_w,
    cy: random() * canvas_h,
    initial_theta: map(random(), 0, 1, 0, TWO_PI),
    r: map(random(), 0, 1, canvas_w / 5, canvas_w / 3),
    size: map(random(), 0, 1, 2, 10),
    color: color(map(random(), 0, 1, 0.6, 0.8), 1, 1),
    period: periods[Math.floor(random() * periods.length)],
    draw: function(step) {
      var theta = this.initial_theta + map(step % this.period, 0, this.period, 0, TWO_PI);
      var x = this.cx + this.r * sin(theta),
        y = this.cy + this.r * cos(theta);

      fill(this.color);
      var size = this.size; // * noisy(this.cx, this.cy, theta, this.r*10, 0.01);
      ellipse(x, y, size, size);
    }
  }
}

function wander_thing() {
  var start_x = random() * canvas_w,
    start_y = random() * canvas_h;

  return {
    x: start_x,
    y: start_y,
    dx: -0.5 + random(),
    dy: -0.5 + random(),

    // initial_theta: map(random(), 0, 1, 0, TWO_PI),
    // r: map(random(), 0, 1, canvas_w / 5, canvas_w / 3),
    size: map(random(), 0, 1, 2, 10),
    color: color(map(random(), 0, 1, 0.6, 0.8), 1, 1),
    // period: periods[Math.floor(random() * periods.length)],
    draw: function(step) {
      this.x += this.dx;
      this.y += this.dy;

      var d = dist(this.x, this.y, start_x, start_y);

      if (d > 100) {

        //         noFill();
        //         stroke(0.5);

        //         ellipse(this.x, this.y, this.size*2, this.size*2)
        //         noStroke();

        //         this.x = start_x;
        //         this.y = start_y;
        if (this.x > start_x) {
          this.dx = -0.5;
        } else {
          this.dx = 0.5;
        }
        if (this.y > start_y) {
          this.dy = -0.5;
        } else {
          this.dy = 0.5;
        }

        this.dx = 0;
        this.dy = 0;
      }
      // console.log(d);

      this.dx += -0.5 + random();
      this.dy += -0.5 + random();

      if (this.dx > 3) this.dx = 3;
      if (this.dx < -3) this.dx = -3;
      if (this.dy > 3) this.dy = 3;
      if (this.dy < -3) this.dy = -3;

      // var theta = this.initial_theta + map(step % this.period, 0, this.period, 0, TWO_PI);
      // var x = this.cx + this.r * sin(theta),
      // y = this.cy + this.r * cos(theta);

      fill(this.color);
      var size = this.size; // * noisy(this.cx, this.cy, theta, this.r*10, 0.01);
      ellipse(this.x, this.y, size, size);
      // noStroke();
      // fill();
    }
  }
}

function draw_strokes(strokes, x, y, scaling, step) {
    var count = 0;

    total = 0;
    all_x = []
    all_y = []



    strokes.forEach((cur) => {
//        all_x = all_x.concat(cur[0]);
//        all_y = all_y.concat(cur[1]);
        total += cur[0].length
    });
    /*
     *     function shuffle(a1, a2) {
     *         var currentIndex = a1.length, temporaryValue, randomIndex;
     *
     *         // While there remain elements to shuffle...
     *         while (0 !== currentIndex) {
     *
     *             // Pick a remaining element...
     *             randomIndex = Math.floor(Math.random() * currentIndex);
     *             currentIndex -= 1;
     *
     *             // And swap it with the current element.
     *             temporaryValue = a1[currentIndex];
     *             a1[currentIndex] = a1[randomIndex];
     *             a1[randomIndex] = temporaryValue;
     *
     *             temporaryValue = a2[currentIndex];
     *             a2[currentIndex] = a2[randomIndex];
     *             a2[randomIndex] = temporaryValue;
     *         }
     *     }
     *
     *     shuffle(all_x, all_y);
     *
     *     strokeWeight(0.5);
     *     for (var idx=1; idx<all_x.length; idx++) {
     *         line(1 + x + all_x[idx-1] * scaling,
     *              1 + y + all_y[idx-1] * scaling,
     *              1 + x + all_x[idx]   * scaling,
     *              1 + y + all_y[idx]   * scaling)
     *     }
     * */

    strokes.forEach((x_y) => {
        var xs = x_y[0].slice(),
            ys = x_y[1].slice();

        if (xs.length > 3) {
            var idx = Math.floor(random() * xs.length);
            xs.splice(idx, 1)
            ys.splice(idx, 1)
        }

        for (var idx=1; idx<xs.length; idx++) {
//            if (step % total == count) {
//                strokeWeight(3)
//            }
//            else {
                strokeWeight(2);
//            }
            line(1 + x + xs[idx-1] * scaling,
                 1 + y + ys[idx-1] * scaling,
                 1 + x + xs[idx]   * scaling,
                 1 + y + ys[idx]   * scaling)
//            count += 1;
        }
    })
}


function quickdraw_thing(x, y, size) {
    let start = Math.floor(num_quickdraws * random())

    return {
        x: x,
        y: y,
        color: color(map(random(), 0, 1, 0.2, 0.4), 1, 1),
        scaling: (size-2)/256,
        strokes: quickdraws[start],
        update: function(step) {
            this.strokes = quickdraws[Math.floor(num_quickdraws * random())]
        },
        draw: function(step) {
            fill(this.color);
            noStroke();
            stroke(this.color);
            draw_strokes(this.strokes, x, y, this.scaling, step);
        }

    }


}


function show_framecount(step) {
    return;
    fill(0);
    rect(0, 570, 80, 30);
    fill(color(0, 1, 1));
    textSize(20);
    text('' + step, 10, 590)
}

function setup() {
  pixelDensity(1);
  createCanvas(canvas_w, canvas_h);
  colorMode(HSB, 1);

  fill(color(0, 0, 0));
  background(0);
  noStroke();

    var s = 100;
  for (var x = 0; x < canvas_w; x+=s) {
      for (var y = 0; y < canvas_h; y+=s) {
          things.push(quickdraw_thing(x,y,s));
      }
  }
}

var i0, i1;

function draw() {
  background(0, 0.5);
  var step = frameCount % nSteps;

  if (step == 0) {
    // console.log('loop');
  }


    show_framecount(step);

//    things[Math.floor(random() * things.length)].update(step);


  things.forEach((thing) => thing.draw(step));

  if (frameCount == 42) {
    saveCanvas("42.png");
  }
	if (frameCount == 2*nSteps) {
    // i0 = createGraphics(canvas_w, canvas_h);
  //  saveCanvas("1.png");
  }


  if ((frameCount >= nSteps) && frameCount < 2 * nSteps) {
//       frameRate(5)
//      saveCanvas("electric-rando-"+nf(frameCount%nSteps, 3)+".png")
  }
}
