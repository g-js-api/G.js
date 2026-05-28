/**
 * @module shaders
 */
import { trigger, unknown_g } from '../core';

/**
 * Creates a shader layers trigger and returns it
 * @param {any[]} layers Array of shader layers
 * @returns {any} Resulting shader layers trigger
 * @category Functions
 * @group Shaders
 */
export let shader_layers = (layers) => {
    return trigger({
        OBJ_ID: 3613,
        SHADER_LAYERS: layers.join('.'),
    });
};

/**
 * Creates a shader layer and returns it
 * @param {number} layer Layer of shader (0-15)
 * @param {number} strength Strength of shader (0-1)
 * @returns {any} Resulting shader layer
 * @category Functions
 * @group Shaders
 */
export let shader_layer = (layer, strength) => {
    return `${layer}.${strength}`;
};

/**
 * Implementation of Sepia shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting sepia shader
 * @category Functions
 * @group Shaders
 */
export let sepia = (strength, duration = 0) => {
    return trigger({
        OBJ_ID: 3613,
        SHADER_TYPE: 1,
        SHADER_STRENGTH: strength,
        DURATION: duration,
    });
};

/**
 * Implementation of Hue Shift shader
 * @param {number} shift Hue shift (0-360)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting hue shift shader
 * @category Functions
 * @group Shaders
 */
export let hue_shift = (shift, duration = 0) => {
    return trigger({
        OBJ_ID: 3613,
        SHADER_TYPE: 2,
        SHADER_HUE: shift,
        DURATION: duration,
    });
};

/**
 * Implementation of Grayscale shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting grayscale shader
 * @category Functions
 * @group Shaders
 */
export let grayscale = (strength, duration = 0) => {
    return trigger({
        OBJ_ID: 3613,
        SHADER_TYPE: 3,
        SHADER_STRENGTH: strength,
        DURATION: duration,
    });
};

/**
 * Implementation of Pixelate shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting pixelate shader
 * @category Functions
 * @group Shaders
 */
export let pixelate = (strength, duration = 0) => {
    return trigger({
        OBJ_ID: 3613,
        SHADER_TYPE: 4,
        SHADER_STRENGTH: strength,
        DURATION: duration,
    });
};

/**
 * Implementation of Chromatic shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting chromatic shader
 * @category Functions
 * @group Shaders
 */
export let chromatic = (strength, duration = 0) => {
    return trigger({
        OBJ_ID: 3613,
        SHADER_TYPE: 5,
        SHADER_STRENGTH: strength,
        DURATION: duration,
    });
};

/**
 * Implementation of Glitch shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting glitch shader
 * @category Functions
 * @group Shaders
 */
export let glitch = (strength, duration = 0) => {
    return trigger({
        OBJ_ID: 3613,
        SHADER_TYPE: 6,
        SHADER_STRENGTH: strength,
        DURATION: duration,
    });
};

/**
 * Implementation of Bulge shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting bulge shader
 * @category Functions
 * @group Shaders
 */
export let bulge = (strength, duration = 0) => {
    return trigger({
        OBJ_ID: 3613,
        SHADER_TYPE: 7,
        SHADER_STRENGTH: strength,
        DURATION: duration,
    });
};

/**
 * Implementation of Split Screen shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting split screen shader
 * @category Functions
 * @group Shaders
 */
export let split_screen = (strength, duration = 0) => {
    return trigger({
        OBJ_ID: 3613,
        SHADER_TYPE: 8,
        SHADER_STRENGTH: strength,
        DURATION: duration,
    });
};
