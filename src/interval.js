var cycle  = require('./cycle');
var util   = require('./util');
var clear  = require('./clear');
var store  = { ids: {} };

module.exports = {
    setInterval: function(callback, delay) {
        var end = Date.now() + delay,
            id = util.id();

        var tick = store.ids[id] = function(time) {
            time = time || Date.now();
            if (time >= end) {
                callback();
                end = Date.now() + delay;
            }
        };

        cycle.add(tick);

        return id;
    },
    clearInterval: clear(store)
};