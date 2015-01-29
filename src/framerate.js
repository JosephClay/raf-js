var signal = require('signal-js'),
    cycle = require('./cycle'),

    ONE_SECOND = 1000,
    DEFAULT_INTERVAL = ONE_SECOND / 60;

/**
 * An easy way to subscribe to a tick with
 * a throttle framerate.
 *
 * Inspired from:
 * http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
 * Main comment preserved in `tick` method
 */
var Framerate = module.exports = signal.extend(function(opts) {
    if (!(this instanceof Framerate)) { return new Framerate(opts); }

    var self = this;

    // this._then;
    // this._active;
    self.tick = self.tick.bind(self);
    self.interval = DEFAULT_INTERVAL; // 60fps
    self.e = {};

    self._setup(opts);
}, {
    _setup: function() {
        var self = this;
        if (!opts) { return; }
        if (!isNaN(opts)) {
            return self.setFPS(opts);
        }
        if (opts.fps !== undefined) {
            return self.setFPS(opts.fps);
        }
        if (opts.interval !== undefined) {
            return self.setInterval(opts.interval);
        }
    },

    start: function() {
        var self = this;
        if (self._active) { return self; }
        self._active = true;

        cycle.add(self.tick);

        self._then = Date.now();

        return self;
    },

    stop: function() {
        var self = this;
        self._active = false;

        cycle.remove(self.tick);

        return self;
    },

    tick: function(time) {
        time = time || Date.now();

        var self = this,
            e = this.e,
            delta = time - self._then;
        if (delta > self.interval) {
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

            self._then = time - (delta % self.interval);

            e.now = time;
            e.then = self._then;
            e.delta = delta;

            self.trigger('tick', e);
        }

        return self;
    },

    setFPS: function(fps) {
        var self = this;
        self.interval = (ONE_SECOND / fps);
        return self;
    },
    setInterval: function(interval) {
        var self = this;
        self.interval = interval;
        return self;
    },

    addTo: function(raf) {
        if (raf) { raf.add(this.tick); }
        return this;
    }
});

Framerate.create = function(config) {
    return new Framerate(config);
};
