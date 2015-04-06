require('./src/polyfill');
var util = require('./util'),
    cycle = module.exports = require('./src/cycle');
cycle.framerate = cycle.fps = require('./src/framerate');
util.extend(cycle, require('./timeouts'), require('./intervals'));