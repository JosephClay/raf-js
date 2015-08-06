var cycle = require('./cycle');

module.exports = function(store) {
    return function(id) {
        if (id in store.ids) {
            cycle.remove(store.ids[id]);
            store.ids[id] = undefined;
        }
    };
};