module.exports = function(store) {
    return function(id) {
        if (id in store.ids) {
            cycle.remove(store.ids[id]);
            store.ids[id] = undefined;
            if (!util.hasSize(store.ids)) {
                store.ids = {};
            }
        }
    };
};