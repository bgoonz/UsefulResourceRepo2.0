//  twitter.com/johnnyscript
//  soundcloud.com/johnnyscript
//  soundcloud.com/folkstack

master = new webkitAudioContext();
jsynth = require("jsynth");
nvelope = require("jmod");
sync = require("jsynth-sync");
oz = require("oscillators");
jdelay = require("jdelay");
sine = oz.sine;
saw = oz.saw;
sr = master.sampleRate;
bf = 444;

delay = jdelay(
  Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
  0.767,
  0.367
);
delay2 = jdelay(Math.floor(sr * (60 / 72) * 2, 0.99, 0.867));

attack = [
  [0, -0.5],
  [0, 6],
  [1, 2],
];
release = [
  [1, 2],
  [1, 0],
  [1, 0],
];
durations = [0.05, 0.2];

zamod = {};
zamod.curves = [attack, release];
zamod.durations = durations;

generators = [];
generators0 = [];
generators1 = [];
generators2 = [];

timer = sync(72 / 3, 44100);

t = timer.on(1 / 16, function (ti, b) {
  var zod = zamod;
  zod.durations[0] = 0.02;
  zod.durations[1] = 0.07;
  var mod = nvelope(zod);
  var synth = function (t) {
    return (
      (oz.sine(t, 888 * 2 * (16 - (b % 12))) +
        oz.sine(t, 0.667 * Math.pow(888 * 2, 5 / 12) * (16 - (b % 12)))) *
      mod.envelope(t - ti)
    );
  };
  if (b % 12) {
    generators.push(synth);
    if (b > 2) generators.shift();
  }
});

t0 = timer.on(2, function (ti, b) {
  var mod = nvelope(zamod);
  var synth = function (t) {
    return sine(t, 888) * mod.envelope(t - ti);
  };
  generators0.push(synth);
  if (b > 2) generators0.shift();
});

t1 = timer.on(2, function (ti, b) {
  var zod = zamod;
  zod.durations[0] = 0.2;
  zod.durations[1] = 60 / 72 / 3 - 0.2;
  var mod = nvelope(zod);
  //   b = (b * 1.667)

  var synth = function (t) {
    return oz.square(t, 222) * mod.envelope(t - ti);
  };
  generators1.push(synth);
  if (b > 2) generators1.shift();
});

t2 = timer.on(1 / 4, function (ti, b) {
  var mod = nvelope(zamod);
  var fqs = [
    444,
    (444 * 3) / 2,
    444,
    (444 / 3) * 2,
    444,
    (444 * 2) / 3,
    (444 * 3) / 2,
    444 * 2,
    444 * 2,
    444 * 4,
  ];
  var f = fqs[b % fqs.length];
  if (!(b % 16) % 3) f *= 2;
  var synth = function (t) {
    return saw(t, f) * mod.envelope(t - ti);
  };
  generators2.push(synth);
  if (b > 2) generators2.shift();
});

synth = function (t) {
  timer.tick.call(timer, t);
  var s = 0;
  s += generators.reduce(function (p, e, i, d) {
    return p + e(t);
  }, 0);
  s += generators0.reduce(function (p, e, i, d) {
    return p + e(t);
  }, 0);
  s += generators1.reduce(function (p, e, i, d) {
    return p + e(t);
  }, 0);
  s += generators2.reduce(function (p, e, i, d) {
    return p + e(t);
  }, 0);
  return delay(s);
};

dsp = jsynth(master, synth);
dsp.connect(master.destination);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 8,
    0.767,
    0.367
  );
}, 4212);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 32,
    0.767,
    0.367
  );
}, 9633);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 3,
    0.767,
    0.367
  );
}, 3869);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.367
  );
}, 21528);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 3,
    0.767,
    0.367
  );
}, 13159);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.367
  );
}, 7646);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.367
  );
}, 8885);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.367
  );
}, 15034);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2 / 2,
    0.767,
    0.367
  );
}, 15071);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2 / 2 / 2,
    0.767,
    0.367
  );
}, 10160);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2 / 2 / 2,
    0.767,
    0.667
  );
}, 15234);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.667
  );
}, 14496);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2 / 2 / 2,
    0.767,
    0.667
  );
}, 10410);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.667
  );
}, 454848);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.167
  );
}, 14520);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.167
  );
}, 5738);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2 / 2,
    0.767,
    0.167
  );
}, 94812);
setTimeout(function () {
  synth = function (t) {
    timer.tick.call(timer, t);
    var s = 0;
    t += Math.floor((sr * 60) / 72 / 3) / 4;
    s += generators.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    s += generators0.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    s += generators1.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    s += generators2.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    return delay(s);
  };
}, 15944);
setTimeout(function () {
  synth = function (t) {
    timer.tick.call(timer, t);
    var s = 0;
    t += Math.floor((sr * 60) / 72 / 3) / 2;
    s += generators.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    s += generators0.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    s += generators1.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    s += generators2.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    return delay(s);
  };
}, 2685);
setTimeout(function () {
  synth = function (t) {
    timer.tick.call(timer, t);
    var s = 0;
    t += Math.floor((sr * 60) / 72 / 3) / 8;
    s += generators.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    s += generators0.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    s += generators1.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    s += generators2.reduce(function (p, e, i, d) {
      return p + e(t);
    }, 0);
    return delay(s);
  };
}, 19649);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2 / 2,
    0.767,
    0.567
  );
}, 6259);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.567
  );
}, 5548);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.567
  );
}, 5358);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.567
  );
}, 9684);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.567
  );
}, 4607);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.567
  );
}, 5229);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.567
  );
}, 5421);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.567
  );
}, 4721);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2 / 2,
    0.767,
    0.567
  );
}, 4689);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.567
  );
}, 4772);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.567
  );
}, 100019);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.767
  );
}, 15790);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.967
  );
}, 13530);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.767
  );
}, 3794);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.567
  );
}, 11694);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2 / 2,
    0.767,
    0.567
  );
}, 20023);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.767,
    0.567
  );
}, 20830);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.967
  );
}, 8032);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.567
  );
}, 21310);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.567
  );
}, 14926);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.967
  );
}, 45395);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + ((sr * 60) / 72 / 16) * 2,
    0.867,
    0.967
  );
}, 9575);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + ((sr * 60) / 72 / 16) * 2,
    0.867,
    0.567
  );
}, 2741);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + ((sr * 60) / 72 / 16) * 2,
    0.867,
    0.567
  );
}, 2843);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + ((sr * 60) / 72 / 16) * 2,
    0.867,
    0.567
  );
}, 104579);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.867,
    0.567
  );
}, 7054);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.867,
    0.267
  );
}, 13140);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.867,
    0.267
  );
}, 8043);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.867,
    0.467
  );
}, 11191);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.667,
    0.567
  );
}, 1260614);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72,
    0.667,
    0.967
  );
}, 13645);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 2,
    0.667,
    0.967
  );
}, 4473);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 8,
    0.667,
    0.967
  );
}, 7164);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 8,
    0.367,
    0.967
  );
}, 2684);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 8,
    0.167,
    0.967
  );
}, 3004);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.167,
    0.967
  );
}, 14552);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.167,
    1.467
  );
}, 16312);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.167,
    1.167
  );
}, 8718);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.267,
    1.167
  );
}, 75039);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 3) + (sr * 60) / 72 / 16,
    0.267,
    1.167
  );
}, 25622);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 3) + (sr * 60) / 72 / 3 / 16,
    0.267,
    1.167
  );
}, 9974);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 6) + (sr * 60) / 72 / 16,
    0.267,
    1.167
  );
}, 4888);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 4) + (sr * 60) / 72 / 16,
    0.267,
    1.167
  );
}, 5824);
setTimeout(function () {
  delay = jdelay(
    Math.floor(sr * (60 / 72)) + (sr * 60) / 72 / 16,
    0.267,
    1.167
  );
}, 5014);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.267,
    1.167
  );
}, 103132);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.667,
    1.167 / 2
  );
}, 80090);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2 / 2,
    0.767,
    0.45
  );
}, 40232);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.867,
    0.75
  );
}, 69337);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.167,
    0.95
  );
}, 15297);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.967,
    0.95
  );
}, 12499);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.767,
    0.95
  );
}, 62343);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2 / 2 / 2,
    0.167,
    0.25
  );
}, 35753);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.002,
    0.95
  );
}, 44552);
setTimeout(function () {
  delay =
    jdelay(
      Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
      0.002,
      0.95
    ) * 10;
}, 6077);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.002,
    0.95
  );
}, 6242);
setTimeout(function () {
  delay =
    jdelay(
      Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
      0.002,
      0.95
    ) * 10;
}, 2210);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.002,
    0.95
  );
}, 8936);
setTimeout(function () {
  delay =
    jdelay(
      Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
      0.002,
      0.95
    ) * 10;
}, 2086);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.002,
    0.95
  );
}, 5434);
setTimeout(function () {
  delay =
    jdelay(
      Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
      0.002,
      0.95
    ) * 10;
}, 2805);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.002,
    0.95
  );
}, 4194);
setTimeout(function () {
  delay =
    jdelay(
      Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
      0.002,
      0.95
    ) * 2;
}, 2248);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.002,
    0.95
  );
}, 25142);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + ((sr * 60) / 72 / 16) * 10,
    0.002,
    0.95
  );
}, 12501);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + ((sr * 60) / 72 / 16) * 8,
    0.002,
    0.95
  );
}, 7294);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + ((sr * 60) / 72 / 16) * 8,
    0.902,
    0.95
  );
}, 14055);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + ((sr * 60) / 72 / 16) * 4,
    0.902,
    0.75
  );
}, 11647);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + ((sr * 60) / 72 / 16) * 6,
    0.902,
    0.75
  );
}, 11493);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + ((sr * 60) / 72 / 16) * 2,
    0.902,
    0.75
  );
}, 23834);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 64,
    0.302,
    0.75
  );
}, 34722);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 128,
    0.302,
    0.75
  );
}, 15264);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 128,
    0.602,
    0.75
  );
}, 19529);
setTimeout(function () {
  delay = jdelay(
    Math.floor(sr * (60 / 72)) + (sr * 60) / 72 / 16 / 128,
    0.602,
    0.75
  );
}, 18564);
setTimeout(function () {
  delay = jdelay(
    Math.floor(sr * (60 / 72) * 2) + (sr * 60) / 72 / 16 / 128,
    0.602,
    0.75
  );
}, 53320);
setTimeout(function () {
  delay = jdelay(
    Math.floor(sr * (60 / 72)) + (sr * 60) / 72 / 16 / 128,
    0.602,
    0.75
  );
}, 18341);
setTimeout(function () {
  delay = jdelay(Math.floor(sr * (60 / 72)) + (sr * 60) / 72 / 16, 0.602, 0.75);
}, 9375);
setTimeout(function () {
  delay = jdelay(
    Math.floor(sr * (60 / 72)) + (sr * 60) / 72 / 16 / 2,
    0.602,
    0.75
  );
}, 10999);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 4) + (sr * 60) / 72 / 16,
    0.602,
    0.75
  );
}, 58259);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 4) + ((sr * 60) / 72 / 16) * 2,
    0.602,
    0.75
  );
}, 6181);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 4) + ((sr * 60) / 72 / 16) * 3,
    0.602,
    0.75
  );
}, 6482);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 4) + (sr * 60) / 72 / 3,
    0.602,
    0.75
  );
}, 3200);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 4) + (sr * 60) / 72 / 3 / 16,
    0.602,
    0.75
  );
}, 8791);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 4) + (sr * 60) / 72 / 3 / 2,
    0.602,
    0.75
  );
}, 3876);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 4) + (sr * 60) / 72 / 3 / 2 / 2,
    0.602,
    0.75
  );
}, 3707);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 3 / 2 / 2,
    0.602,
    0.75
  );
}, 1178);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 3) + (sr * 60) / 72 / 3 / 2 / 2,
    0.602,
    0.75
  );
}, 6290);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 6) + (sr * 60) / 72 / 3 / 2 / 2,
    0.602,
    0.75
  );
}, 6006);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5) + (sr * 60) / 72 / 3 / 2 / 2,
    0.602,
    0.75
  );
}, 60586);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5 / 3) + (sr * 60) / 72 / 3 / 2 / 2,
    0.602,
    0.75
  );
}, 4878);
setTimeout(function () {
  delay = jdelay(
    Math.floor((((sr * (60 / 72)) / 1.5) * 3) / 2) + (sr * 60) / 72 / 3 / 2 / 2,
    0.602,
    0.75
  );
}, 4135);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5) + (sr * 60) / 72 / 3 / 2 / 2,
    0.602,
    0.75
  );
}, 21160);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5 / 3) + (sr * 60) / 72 / 3 / 2 / 2,
    0.602,
    0.75
  );
}, 33620);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5) + (sr * 60) / 72 / 3 / 2 / 2,
    0.602,
    0.75
  );
}, 31424);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5 / 3) + (sr * 60) / 72 / 3 / 2 / 2,
    0.602,
    0.75
  );
}, 37372);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.602,
    0.55
  );
}, 50157);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2 / 2,
    0.602,
    0.55
  );
}, 25110);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.702,
    0.65
  );
}, 507);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.702,
    0.65
  );
}, 25);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.702,
    0.65
  );
}, 29);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16 / 2,
    0.702,
    0.65
  );
}, 17973);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 501);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 31);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 30);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 31);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 30);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 34);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 42);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 18);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 29);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 38);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 23);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 31);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 41);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.702,
    0.95
  );
}, 43381);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5 / 3) + (sr * 60) / 72 / 3 / 2 / 2,
    0.502,
    0.55
  );
}, 23266);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5 / 3) + (sr * 60) / 72 / 3 / 2 / 2,
    0.502,
    0.95
  );
}, 20062);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5 / 3 / 3) + (sr * 60) / 72 / 3 / 2 / 2,
    0.502,
    0.95
  );
}, 11085);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5 / 3) + (sr * 60) / 72 / 3,
    0.502,
    0.95
  );
}, 35063);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5 / 3) + (sr * 60) / 72 / 3,
    0.902,
    0.75
  );
}, 50274);
setTimeout(function () {
  delay = function (s) {
    return s;
  }; //jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3, .902, .75)
}, 4844687);
setTimeout(function () {
  delay = function (s) {
    return 0;
  }; //jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3, .902, .75)
}, 55954868);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 1.5 / 3) + (sr * 60) / 72 / 3,
    0.902,
    0.75
  );
}, 106288);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.902,
    0.75
  );
}, 60734);
setTimeout(function () {
  delay = function () {
    return 0;
  }; // jdelay(Math.floor(sr * (60 / 72) / 2) + sr * 60 / 72 / 16, .902, .75)
}, 38568101);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.902,
    0.75
  );
}, 7445);
setTimeout(function () {
  delay = function (s) {
    return 0;
  }; //jdelay(Math.floor(sr * (60 / 72) / 1.5 / 3) + sr * 60 / 72 / 3, .902, .75)
}, 3208027);
setTimeout(function () {
  delay = jdelay(
    Math.floor((sr * (60 / 72)) / 2) + (sr * 60) / 72 / 16,
    0.902,
    0.75
  );
}, 68094617);
setTimeout(function () {
  dsp.connect(master.destination);
}, 14231);
