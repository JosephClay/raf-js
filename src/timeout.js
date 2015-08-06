var cycle = require('./cycle');
var util  = require('./util');
var clear = require('./clear');
var store = { ids: {} };

module.exports = {
    clearTimeout: clear(store),
    setTimeout: function(callback, delay) {
        var end = Date.now() + delay;
        var id = util.id();

        var tick = store.ids[id] = function(time) {
            time = time || Date.now();
            if (time >= end) {
                callback();
                cycle.remove(tick);
            }
        };

        cycle.add(tick);

        return id;
    }
};