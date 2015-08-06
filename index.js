var util = require('./src/util');
var cycle = module.exports = require('./src/cycle');
cycle.framerate = cycle.fps = require('./src/framerate');
util.extend(cycle, require('./src/timeout'), require('./src/interval'));
cycle.delay = cycle.setTimeout;