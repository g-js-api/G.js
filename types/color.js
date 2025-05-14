/**
 * @module color
 */
/**
 * @typedef {object} color
 * @property {function} set Sets color to RGB value
 * @property {function} copy Copy a color channel to another
 * @property {function} pulse_hsv Pulses color w/ HSV
 * @property {function} pulse Pulses color
 */
/**
 * Representation of colors
 * @class
 * @constructor
 * @public
 */
class $color {
  /**
   * Creates a color from a number
   * @param {number} number Color ID
   * @param {boolean} [specific=true] Whether to disallow G.js from using that specific color again
   */
  constructor(a, specific = true) {
    this.value = a;
    this.type = 'color';
    if (specific && !all_known.colors.includes(a)) all_known.colors.push(a);
  }
  /**
   * Sets color to RGB value
   * @param {array} c RGB value
   * @param {number} [duration=0] How long it takes for color to change
   * @param {boolean} [blending=false] Whether to make color blending
   */
  set(c, duration = 0, blending = false) {
    $.add(trigger({
      OBJ_ID: 899,
      DURATION: duration,
      TRIGGER_RED: c[0],
      TRIGGER_GREEN: c[1],
      TRIGGER_BLUE: c[2],
      OPACITY: c[3] ?? 1,
      BLENDING: blending,
      TARGET_COLOR: this,
      ACTIVE_TRIGGER: true,
      36: 1
    }));
    wait(duration);
  }
  /**
   * Copy a color channel to another
   * @param {color} c Color channel to be copied
   * @param {number} [duration=0] Duration of color change
   * @param {string} [hvs="0a1a1a0a0"] HVS color to copy
   * @param {boolean} [blending=false] Toggle blending on color
   * @param {number} [opacity=1] Channel opacity
   * @param {boolean} [copy_opacity=false] Copy target opacity
   */
  copy(c, duration = 0, hvs = "0a1a1a0a0a", blending = false, opacity = 1, copy_opacity = false) {
    $.add(trigger({
      OBJ_ID: 899,
      DURATION: duration,
      COPIED_COLOR_ID: c,
      COPIED_COLOR_HVS: hvs,
      COPY_OPACITY: copy_opacity,
      OPACITY: opacity,
      BLENDING: blending,
      TARGET_COLOR: this,
      36: 1,
    }));
    wait(duration);
  }
  /**
   * Pulses color w/ HSV
   * @param {number} h Hue
   * @param {number} s Saturation
   * @param {number} b Brightness
   * @param {boolean} [s_checked=false] Saturation is checked
   * @param {boolean} [b_checked=false] Brightness is checked
   * @param {number} [fade_in=0] Fade in
   * @param {number} [hold=0] Hold
   * @param {number} [fade_out=0] Fade out
   * @param {number} [exclusive=false] Whether to prioritize over simultaneous pulses
   */
  pulse_hsv(h, s, b, s_checked = false, b_checked = false, fade_in = 0, hold = 0, fade_out = 0, exclusive = false) {
    $.add(trigger({
      OBJ_ID: 1006,
      COPIED_COLOR_HVS: [h, s, b, +s_checked, +b_checked].join("a"),
      EXCLUSIVE: exclusive,
      FADE_IN: fade_in,
      HOLD: hold,
      FADE_OUT: fade_out,
      TARGET: this,
      PULSE_HSV: true,
      36: 1,
    }));
    wait(fade_in + hold + fade_out);
  }
  /**
 * Pulses color
 * @param {array} color RGB color to pulse
 * @param {number} [fade_in=0] Fade in
 * @param {number} [hold=0] Hold
 * @param {number} [fade_out=0] Fade out
 * @param {number} [exclusive=false] Whether to prioritize over simultaneous pulses
 */
  pulse(c, fade_in = 0, hold = 0, fade_out = 0, exclusive = false) {
    $.add(trigger({
      OBJ_ID: 1006,
      TRIGGER_RED: c[0],
      TRIGGER_GREEN: c[1],
      TRIGGER_BLUE: c[2],
      EXCLUSIVE: exclusive,
      FADE_IN: fade_in,
      HOLD: hold,
      FADE_OUT: fade_out,
      TARGET: this,
      PULSE_HSV: false,
      36: 1,
    }));
    wait(fade_in + hold + fade_out);
  }
}

module.exports = $color