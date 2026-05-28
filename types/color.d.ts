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
 * @public
 * @category Types
 */
export declare class $color {
    /**
     * Creates a color from a number
     * @param {number} number Color ID
     * @param {boolean} [specific=true] Whether to disallow G.js from using that specific color again
     */
    constructor(a: any, specific?: boolean);
    /**
     * Sets color to RGB value
     * @param {array} c RGB value
     * @param {number} [duration=0] How long it takes for color to change
     * @param {boolean} [blending=false] Whether to make color blending
     */
    set(c: any, duration?: number, blending?: boolean): void;
    /**
     * Copy a color channel to another
     * @param {color} c Color channel to be copied
     * @param {number} [duration=0] Duration of color change
     * @param {string} [hvs="0a1a1a0a0"] HVS color to copy
     * @param {boolean} [blending=false] Toggle blending on color
     * @param {number} [opacity=1] Channel opacity
     * @param {boolean} [copy_opacity=false] Copy target opacity
     */
    copy(c: any, duration?: number, hvs?: string, blending?: boolean, opacity?: number, copy_opacity?: boolean): void;
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
    pulse_hsv(h: any, s: any, b: any, s_checked?: boolean, b_checked?: boolean, fade_in?: number, hold?: number, fade_out?: number, exclusive?: boolean): void;
    /**
   * Pulses color
   * @param {array} color RGB color to pulse
   * @param {number} [fade_in=0] Fade in
   * @param {number} [hold=0] Hold
   * @param {number} [fade_out=0] Fade out
   * @param {number} [exclusive=false] Whether to prioritize over simultaneous pulses
   */
    pulse(c: any, fade_in?: number, hold?: number, fade_out?: number, exclusive?: boolean): void;
}
export default $color;
