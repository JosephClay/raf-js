raf-js
==========

A better rAF api.

`npm install raf-js`


Quickstart
----------------
``` javascript
require('raf-js')
	// start the stats
	.before.add(stats.begin)

    // add a method to be called every tick
    .add(animate)
    // add a few more methods
    .add([ foo, bar, baz ])

    // end the stats
	.after.add(stats.begin)

    // start it up!
    .start();
```

Control fps
----------------
Create a function that only gets called 30 frames-per-second.
``` javascript
raf.fps(30)
	.on('tick', doSomething)
    .start();
```

Or, if it's easier, create a function that only gets called
every 1 second.
``` javascript
raf.fps({ interval: 1000 })
	.on('tick', doSomething)
    .start();
```

Manual tick
----------------
Already have a loop setup? You can manually tick `raf-js`
``` javascript
var raf = require('raf-js');
function cycle() {
	raf.tick();
	requestAnimationFrame(cycle) // or raf.raf
}
cycle();
```

#License

The MIT License (MIT)

Copyright (c) 2015 Joseph Clay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
