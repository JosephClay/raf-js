// queues =================================

var before = [],
    main   = [],
    after  = [];

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

var id,
    api = module.exports = addRemove(main);
api.raf = requestAnimationFrame;
api.before = addRemove(before);
api.after = addRemove(after);
api.tick = function(time) {
    time = time || Date.now();

    cycle(before, time);
    cycle(main, time);
    cycle(after, time);

    return api;
};
api.start = function() {
    id = requestAnimationFrame(api.tick);
    return api;
};
api.stop = function() {
    cancelAnimationFrame(id);
    return api;
};