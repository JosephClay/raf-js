var cycle = require('./cycle'),
    util  = require('./util'),
    clear = require('./clear'),
    store = { ids: {} };

module.exports = {
    setTimeout: function(callback, delay) {
        var end = Date.now() + delay,
            id = util.id();

        var tick = store.ids[id] = function(time) {
            time = time || Date.now();
            if (time >= end) {
                callback();
                cycle.remove(tick);
            }
        };

        cycle.add(tick);

        return id;
    },
    clearTimeout: clear(store)
};