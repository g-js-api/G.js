/**
 * Creates a shader layers trigger and returns it
 * @param {any[]} layers Array of shader layers
 * @returns {any} Resulting shader layers trigger
 * @category Functions
 * @group Shaders
 */
export declare let shader_layers: (layers: any) => import("../core").GJsObject;
/**
 * Creates a shader layer and returns it
 * @param {number} layer Layer of shader (0-15)
 * @param {number} strength Strength of shader (0-1)
 * @returns {any} Resulting shader layer
 * @category Functions
 * @group Shaders
 */
export declare let shader_layer: (layer: any, strength: any) => string;
/**
 * Implementation of Sepia shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting sepia shader
 * @category Functions
 * @group Shaders
 */
export declare let sepia: (strength: any, duration?: number) => import("../core").GJsObject;
/**
 * Implementation of Hue Shift shader
 * @param {number} shift Hue shift (0-360)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting hue shift shader
 * @category Functions
 * @group Shaders
 */
export declare let hue_shift: (shift: any, duration?: number) => import("../core").GJsObject;
/**
 * Implementation of Grayscale shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting grayscale shader
 * @category Functions
 * @group Shaders
 */
export declare let grayscale: (strength: any, duration?: number) => import("../core").GJsObject;
/**
 * Implementation of Pixelate shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting pixelate shader
 * @category Functions
 * @group Shaders
 */
export declare let pixelate: (strength: any, duration?: number) => import("../core").GJsObject;
/**
 * Implementation of Chromatic shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting chromatic shader
 * @category Functions
 * @group Shaders
 */
export declare let chromatic: (strength: any, duration?: number) => import("../core").GJsObject;
/**
 * Implementation of Glitch shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting glitch shader
 * @category Functions
 * @group Shaders
 */
export declare let glitch: (strength: any, duration?: number) => import("../core").GJsObject;
/**
 * Implementation of Bulge shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting bulge shader
 * @category Functions
 * @group Shaders
 */
export declare let bulge: (strength: any, duration?: number) => import("../core").GJsObject;
/**
 * Implementation of Split Screen shader
 * @param {number} strength Strength of shader (0-1)
 * @param {number} [duration=0] Duration of shader
 * @returns {any} Resulting split screen shader
 * @category Functions
 * @group Shaders
 */
export declare let split_screen: (strength: any, duration?: number) => import("../core").GJsObject;
