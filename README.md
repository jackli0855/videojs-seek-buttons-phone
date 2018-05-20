# videojs-seek-buttons-phone



## Installation

```sh
npm install --save @wind-buttons/videojs-seek-buttons-phone
```

## Usage

To include videojs-seek-buttons-phone on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-seek-buttons-phone.min.js"></script>
<script>
  var player = videojs('my-video');

  player.windButtons();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-seek-buttons-phone via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('@wind-buttons/videojs-seek-buttons-phone');

var player = videojs('my-video');

player.windButtons();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', '@wind-buttons/videojs-seek-buttons-phone'], function(videojs) {
  var player = videojs('my-video');

  player.windButtons();
});
```

## License

MIT. Copyright (c) libao &lt;lb.funward@gmail.com&gt;


[videojs]: http://videojs.com/
