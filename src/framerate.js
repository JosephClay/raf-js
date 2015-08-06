var signal = require('signal-js');
var cycle = require('./cycle');

var ONE_SECOND = 1000;
var DEFAULT_INTERVAL = ONE_SECOND / 60;

/**
 * An easy way to subscribe to a tick with
 * a throttle framerate.
 *
 * Inspired from:
 * http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
 * Main comment preserved in `tick` method
 */
module.exports = function fps(opts) {
    var api = signal();
    var interval = DEFAULT_INTERVAL; // 60fps
    var e = {};
    var running = false;
    var then;

    var tick = function(time) {
        time = time || Date.now();

        var delta = time - then;
        if (delta > interval) {
            // update time stuffs

            // Just `then = now` is not enough.
            // Lets say we set fps at 10 which means
            // each frame must take 100ms
            // Now frame executes in 16ms (60fps) so
            // the loop iterates 7 times (16*7 = 112ms) until
            // delta > interval === true
            // Eventually this lowers down the FPS as
            // 112*10 = 1120ms (NOT 1000ms).
            // So we have to get rid of that extra 12ms
            // by subtracting delta (112) % interval (100).
            // Hope that makes sense.

            then = time - (delta % interval);

            e.now = time;
            e.then = then;
            e.delta = delta;

            api.trigger('tick', e);
        }

        return this;
    };

    var setFPS = function(fps) {
        interval = (ONE_SECOND / fps);
        return this;
    };

    var setInterval = function(interval) {
        interval = interval;
        return this;
    };

    var setup = function(opts) {
        if (!opts) { return; }
        if (!isNaN(opts)) {
            return setFPS(opts);
        }
        if (opts.fps !== undefined) {
            return setFPS(opts.fps);
        }
        if (opts.interval !== undefined) {
            return setInterval(opts.interval);
        }
    };

    setup(opts);

    return {
        tick: tick,
        setFPS: setFPS,
        setInterval: setInterval,

        start: function() {
            if (running) { return this; }
            running = true;

            cycle.add(tick);

            then = Date.now();

            return this;
        },

        stop: function() {
            if (!running) { return this; }
            running = false;

            cycle.remove(tick);

            return this;
        },

        addTo: function(raf) {
            if (raf) { raf.add(tick); }
            return this;
        }
    };
};
