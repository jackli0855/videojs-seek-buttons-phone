import videojs from 'video.js';

var version = "0.0.0";

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var defaults = {};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
var onPlayerReady = function onPlayerReady(player, options) {
  player.addClass('vjs-wind-buttons');
  if (options.forward && options.forward > 0) {
    player.windForward = player.addChild('windButton', {
      direction: 'forward',
      seconds: options.forward
    });
    player.el().insertBefore(player.windForward.el(), player.bigPlayButton.el().nextSibling);
  }

  if (options.back && options.back > 0) {
    player.windBack = player.addChild('windButton', {
      direction: 'back',
      seconds: options.back
    });
    player.el().insertBefore(player.windBack.el(), player.bigPlayButton.el());
  }
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function windButtons
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var windButtons = function windButtons(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, videojs.mergeOptions(defaults, options));
  });
};

/**
 * Button to seek forward/back
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Button
 * @class WindToggle
 */

var WindButton = function (_Button) {
  inherits(WindButton, _Button);

  function WindButton(player, options) {
    classCallCheck(this, WindButton);

    var _this2 = possibleConstructorReturn(this, _Button.call(this, player, options));

    if (_this2.options_.direction === 'forward') {
      _this2.controlText(_this2.localize('Seek forward {{seconds}} seconds').replace('{{seconds}}', _this2.options_.seconds));
    } else if (_this2.options_.direction === 'back') {
      _this2.controlText(_this2.localize('Seek back {{seconds}} seconds').replace('{{seconds}}', _this2.options_.seconds));
    }
    return _this2;
  }

  WindButton.prototype.buildCSSClass = function buildCSSClass() {
    /* Each button will have the classes:
       `vjs-seek-button`
       `skip-forward` or `skip-back`
       `skip-n` where `n` is the number of seconds
       So you could have a generic icon for "skip back" and a more
       specific one for "skip back 30 seconds"
    */
    return 'vjs-wind-button skip-' + this.options_.direction + ' ' + ('skip-' + this.options_.seconds + ' ' + _Button.prototype.buildCSSClass.call(this));
  };

  WindButton.prototype.handleClick = function handleClick() {
    var now = this.player_.currentTime();

    if (this.options_.direction === 'forward') {
      this.player_.currentTime(now + this.options_.seconds);
    } else if (this.options_.direction === 'back') {
      this.player_.currentTime(now - this.options_.seconds);
    }
  };

  return WindButton;
}(Button);

Component.registerComponent('WindButton', WindButton);

// Register the plugin with video.js.
registerPlugin('windButtons', windButtons);

// Include the version number.
windButtons.VERSION = version;

export default windButtons;