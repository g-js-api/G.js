"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
/**
 * @module log
 */
const constants_1 = require("../constants");
const core_1 = require("../core");
exports.log = {
    runtime: {
        flash: (color = (0, core_1.rgb)(212, 210, 210), fade_in = 0, hold = 0, fade_out = 0.5) => constants_1.BG.pulse(color, fade_in, hold, fade_out),
        sex: () => console.log("Sex")
    }
};
