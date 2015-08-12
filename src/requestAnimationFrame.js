// from: https://gist.github.com/paulirish/1579671

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license

var win = global,
    vendors = ['ms', 'moz', 'webkit', 'o'];
for (var idx = 0; idx < vendors.length && !win.requestAnimationFrame; ++idx) {
    win.requestAnimationFrame = win[vendors[idx] + 'RequestAnimationFrame'];
    win.cancelAnimationFrame = win[vendors[idx] + 'CancelAnimationFrame'] || win[vendors[idx] + 'CancelRequestAnimationFrame'];
}

module.exports = win.requestAnimationFrame;
