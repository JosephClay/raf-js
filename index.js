require('./src/polyfill');
var util = require('./src/util'),
    cycle = module.exports = require('./src/cycle');
cycle.framerate = cycle.fps = require('./src/framerate');
util.extend(cycle, require('./src/timeout'), require('./src/interval'));