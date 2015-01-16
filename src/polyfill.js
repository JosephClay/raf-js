// from: https://gist.github.com/paulirish/1579671

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
 
var window = window,
    lastTime = 0,
    vendors = ['ms', 'moz', 'webkit', 'o'];
for (var idx = 0; idx < vendors.length && !window.requestAnimationFrame; ++idx) {
    window.requestAnimationFrame = window[vendors[idx]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[idx]+'CancelAnimationFrame'] || window[vendors[idx]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
        var currTime   = +(new Date()),
            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
            id = setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
        
        lastTime = currTime + timeToCall;

        return id;
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}