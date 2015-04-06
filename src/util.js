var id = 0;
module.exports = {
    id: function() {
        return id++;
    },
    hasSize: function(obj) {
        if (!obj) { return false; }
        for (var key in obj) {
            if (obj[key]) { return true; }
        }
        return false;
    },
    extend: function(base) {
        var args = arguments,
            idx = 1, length = args.length,
            key, merger;
        for (; idx < length; idx++) {
            merger = args[idx];

            for (key in merger) {
                base[key] = merger[key];
            }
        }

        return base;
    }
};