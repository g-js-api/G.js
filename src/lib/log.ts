/**
 * @module log
 */
import { BG } from '../constants'
import { rgb } from '../core'
export const log = {
    runtime: {
        flash: (color = rgb(212, 210, 210), fade_in = 0, hold = 0, fade_out = 0.5) => BG.pulse(color, fade_in, hold, fade_out), 
        sex: () => console.log("Sex")
    }
};