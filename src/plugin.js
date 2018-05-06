import videojs from 'video.js';
import {version as VERSION} from '../package.json';

// Default options for the plugin.
const defaults = {};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
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
const onPlayerReady = (player, options) => {
  player.addClass('vjs-wind-buttons');
  if (options.forward && options.forward > 0) {
    player.windForward = player.addChild('windButton', {
      direction: 'forward',
      seconds: options.forward
    });
    player.el().insertBefore(
      player.windForward.el(),
      player.bigPlayButton.el().nextSibling
    );
  }

  if (options.back && options.back > 0) {
    player.windBack = player.addChild('windButton', {
      direction: 'back',
      seconds: options.back
    });
    player.el().insertBefore(
      player.windBack.el(),
      player.bigPlayButton.el()
    );
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
const windButtons = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
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
class WindButton extends Button {
  constructor(player, options) {
    super(player, options);
    if (this.options_.direction === 'forward') {
      this.controlText(
        this.localize('Seek forward {{seconds}} seconds')
        .replace('{{seconds}}', this.options_.seconds)
      );
    } else if (this.options_.direction === 'back') {
      this.controlText(
        this.localize('Seek back {{seconds}} seconds')
        .replace('{{seconds}}', this.options_.seconds)
      );
    }
  }

  buildCSSClass() {
    /* Each button will have the classes:
       `vjs-seek-button`
       `skip-forward` or `skip-back`
       `skip-n` where `n` is the number of seconds
       So you could have a generic icon for "skip back" and a more
       specific one for "skip back 30 seconds"
    */
    return `vjs-wind-button skip-${this.options_.direction} ` +
      `skip-${this.options_.seconds} ${super.buildCSSClass()}`;
  }

  handleClick() {
    const now = this.player_.currentTime();

    if (this.options_.direction === 'forward') {
      this.player_.currentTime(now + this.options_.seconds);
    } else if (this.options_.direction === 'back') {
      this.player_.currentTime(now - this.options_.seconds);
    }
  }
}

Component.registerComponent('WindButton', WindButton);

// Register the plugin with video.js.
registerPlugin('windButtons', windButtons);

// Include the version number.
windButtons.VERSION = VERSION;

export default windButtons;
