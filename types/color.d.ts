declare interface color {
    /**
     * Sets color to RGB value
     */
    set: Function;
    /**
     * Copy a color channel to another
     */
    copy: Function;
    /**
     * Pulses color w/ HSV
     */
    pulse_hsv: Function;
    /**
     * Pulses color
     */
    pulse: Function;
}

declare class $color {
    /**
     * Representation of colors
     */
    constructor(number: number, specific?: boolean);

    /**
     * Sets color to RGB value
     * @param c RGB value
     * @param duration How long it takes for color to change
     * @param blending Whether to make color blending
     * @param delay_trig Whether to do wait(duration)
     */
    set(c: any[], duration?: number, blending?: boolean, delay_trig?: boolean): void;

    /**
     * Copy a color channel to another
     * @param c Color channel to be copied
     * @param duration Duration of color change
     * @param hvs HVS color to copy
     * @param blending Toggle blending on color
     * @param opacity Channel opacity
     * @param copy_opacity Copy target opacity
     */
    copy(c: color, duration?: number, hvs?: string, blending?: boolean, opacity?: number, copy_opacity?: boolean): void;

    /**
     * Pulses color w/ HSV
     * @param h Hue
     * @param s Saturation
     * @param b Brightness
     * @param s_checked Saturation is checked
     * @param b_checked Brightness is checked
     * @param fade_in Fade in
     * @param hold Hold
     * @param fade_out Fade out
     * @param exclusive Whether to prioritize over simultaneous pulses
     */
    pulse_hsv(h: number, s: number, b: number, s_checked?: boolean, b_checked?: boolean, fade_in?: number, hold?: number, fade_out?: number, exclusive?: number): void;

    /**
     * Pulses color
     * @param color RGB color to pulse
     * @param fade_in Fade in
     * @param hold Hold
     * @param fade_out Fade out
     * @param exclusive Whether to prioritize over simultaneous pulses
     */
    pulse(color: any[], fade_in?: number, hold?: number, fade_out?: number, exclusive?: number): void;

}

