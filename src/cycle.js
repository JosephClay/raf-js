var requestAnimationFrame = require('./requestAnimationFrame');

var id;
var api;

// queues =================================
var before = [];
var main   = [];
var after  = [];

// add / remove =================================

var add = function(queue, fn) {
    if (Array.isArray(fn)) {
        var idx = 0, length = fn.length;
        for (; idx < length; idx++) {
            queue.push(fn[idx]);
        }
        return this;
    }

    queue.push(fn);
};

var remove = function(queue, fn) {
    // find, splice and return true
    var idx = queue.length;
    while (idx--) {
        if (queue[idx] === fn) {
            queue.splice(idx, 1);
            return true;
        }
    }

    // not found
    return false;
};

var addRemove = function(queue) {
    return {
        add: function(fn) {
            add(queue, fn);
            return api;
        },
        remove: function(fn) {
            return remove(queue, fn);
        }
    };
};

// cycle a queue =================================

var cycle = function(queue, time) {
    var idx = 0,
        length = queue.length,
        fn;

    // early return
    if (!length) { return; }

    while (idx < length && (fn = queue[idx])) {
        fn(time);
        idx++;
    }
};

// API =================================

api = module.exports = addRemove(main);
api.raf = requestAnimationFrame;
api.before = addRemove(before);
api.after = addRemove(after);
api.tick = function(time) {
    // time is the time since the start of the page
    // in some browsers - Date.now in others -
    // and performance.now in others.
    // Working off of Date.now for consistency
    time = Date.now();

    cycle(before, time);
    cycle(main, time);
    cycle(after, time);

    return api;
};

var loop = function() {
    api.tick();
    id = requestAnimationFrame(loop);
};
api.start = function() {
    loop();
    return api;
};
api.stop = function() {
    cancelAnimationFrame(id);
    return api;
};