/**
 * @module shaders
 */

/**
 * @typedef {number} shader_layer
 */
/**
 * An object representing all shader layers
 * 
 * @typedef {Object} shader_layers
 * @property {shader_layer} BG Background layer
 * @property {shader_layer} MG Midground layer
 * @property {shader_layer} B5 Background layer 5
 * @property {shader_layer} B4 Background layer 4
 * @property {shader_layer} B3 Background layer 3
 * @property {shader_layer} B2 Background layer 2
 * @property {shader_layer} B1 Background layer 1
 * @property {shader_layer} P Player layer
 * @property {shader_layer} T1 Top layer 1
 * @property {shader_layer} T2 Top layer 2
 * @property {shader_layer} T3 Top layer 3
 * @property {shader_layer} T4 Top layer 4
 * @property {shader_layer} G Ground layer
 * @property {shader_layer} UI UI layer
 * @property {shader_layer} MAX Maximum layer
 */

/**
 * Dictionary abstracting all shader layers into readable values
 * @type {shader_layers}
 */
let shader_layers = {
    BG: 1,
    MG: 2,
    B5: 3,
    B4: 4,
    B3: 5,
    B2: 6,
    B1: 7,
    P: 8,
    T1: 9,
    T2: 10,
    T3: 11,
    T4: 12,
    G: 13,
    UI: 14,
    MAX: 15
}

/**
 * Defines the layers that shader effects can use
 * @param {shader_layer} min_layer Lowest layer shaders can use
 * @param {shader_layer} max_layer Highest layer shaders can use
 */
let shader_layer = (min_layer, max_layer) => {
    $.add(object({
        OBJ_ID: 2904,
        LOWEST_LAYER: min_layer,
        HIGHEST_LAYER: max_layer
    }));
};

/**
 * Creates a glitch effect
 * @param {number} strength How strong the glitch effect is
 * @param {number} duration How long it takes to start the effect
 * @param {easing} easing How smoothly the effect should start
 * @param {number} speed How fast the glitch effect is
 * @param {number} slice_height How high up objects get slices
 * @param {number} max_slice_x_off How much objects get sliced
 * @param {number} max_col_x_off Max offset for color effect on X axis
 * @param {number} max_col_y_off Max offset for color effect on Y axis
 */
let glitch = (strength, duration = 0, easing = NONE, speed = 1, slice_height = 1, max_slice_x_off = 1, max_col_x_off = 1, max_col_y_off = 1) => {
    $.add(object({
        OBJ_ID: 2909,
        SHADER_STRENGTH: strength,
        SHADER_SPEED: speed,
        SHADER_SLICE_HEIGHT: slice_height,
        MAX_SLICE_X_OFF: max_slice_x_off,
        MAX_COL_X_OFF: max_col_x_off,
        MAX_COL_Y_OFF: max_col_y_off,
        DURATION: duration,
    }));
    if (duration) wait(duration)
};
/**
 * Applies chromatic aberration
 * @param {number} target_x Effect strength on X axis
 * @param {number} target_y Effect strength on Y axis
 * @param {number} duration How long it takes to start the effect
 * @param {easing} easing How smoothly the effect should start
 */
let chromatic = (target_x, target_y, duration = 0, easing = NONE) => {
    $.add(object({
        OBJ_ID: 2910,
        SHADER_TARGET_X: target_x,
        SHADER_TARGET_Y: target_y,
        SHADER_USE_X: true,
        SHADER_USE_Y: true,
        EASING: easing,
        DURATION: duration,
    }));
    if (duration) wait(duration)
};

/**
 * Pixelates screen
 * @param {number} target_x How strong effect is on X axis
 * @param {number} target_y How strong effect is on Y axis
 * @param {number} duration How long it takes to start the effect
 * @param {easing} easing How smoothly the effect should start
 * @param {boolean} snap_grid Makes pixels align with game camera
 * @param {boolean} hard_edges Whether to use hard edges
 */
let pixelate = (target_x, target_y, duration = 0, easing = NONE, snap_grid = false, hard_edges = false) => {
    $.add(object({
        OBJ_ID: 2912,
        SHADER_TARGET_X: target_x,
        SHADER_TARGET_Y: target_y,
        SHADER_USE_X: true,
        SHADER_USE_Y: true,
        SHADER_SNAP_GRID: snap_grid,
        HARD_EDGES: hard_edges,
        EASING: easing,
        DURATION: duration,
    }));
    if (duration) wait(duration)
};
/**
 * Applies grayscale filter
 * @param {number} target How much of filter to apply
 * @param {color} tint_channel Color channel to tint towards
 * @param {number} duration How long it takes to start the effect
 * @param {easing} easing How smoothly the effect should start
 * @param {boolean} use_lum Uses different grayscale conversions
 */
let grayscale = (target, tint_channel = color(0), duration = 0, easing = NONE, use_lum = false) => {
    $.add(object({
        OBJ_ID: 2919,
        SHADER_STRENGTH: target,
        EASING: easing,
        DURATION: duration,
        USE_LUM: use_lum,
        GRAYSCALE_TINT_CHANNEL: tint_channel
    }));
    if (duration) wait(duration)
};
/**
 * Changes hue of screen
 * @param {number} degrees How much colors should shift
 * @param {number} duration How long it takes to start the effect
 * @param {easing} easing How smoothly the effect should start
 */
let hue_shift = (degrees, duration = 0, easing = NONE) => {
    $.add(object({
        OBJ_ID: 2922,
        SHADER_STRENGTH: degrees,
        EASING: easing,
        DURATION: duration
    }));
    if (duration) wait(duration)
};

/**
 * Bulges the screen
 * @param {number} strength How strong the effect is
 * @param {number} radius How large the effect is
 * @param {number} duration How long it takes to start the effect
 * @param {easing} easing How smoothly the effect should start
 * @param {group} center Center group of bulge
 * @param {number} offset_x Offset X of bulge
 * @param {number} offset_y Offset Y of bulge
 */
let bulge = (strength, radius, duration = 0, easing = NONE, center = group(0), offset_x = 0, offset_y = 0) => {
    $.add(object({
        OBJ_ID: 2916,
        SHADER_STRENGTH: strength,
        BULGE_RADIUS: radius,
        SHADER_CENTER_ID: center,
        SCREEN_OFFX: offset_x,
        SCREEN_OFFY: offset_y,
        DURATION: duration,
        SHADER_TARGET: center.value !== 0,
        EASING: easing,
    }));
    if (duration) wait(duration)
};

// todo
let pinch = (radius, target_x, target_y, duration = 0, easing = NONE, screen_offx = 0, screen_offy = 0, modifier = 0) => {
    $.add(object({
        OBJ_ID: 2916,
        SHADER_STRENGTH: strength,
        BULGE_RADIUS: radius,
        SHADER_CENTER_ID: center,
        SCREEN_OFFX: offset_x,
        SCREEN_OFFY: offset_y,
        DURATION: duration,
        SHADER_TARGET: center.value !== 0,
        EASING: easing,
    }));
    if (duration) wait(duration)
};

/**
 * Applies sepia filter
 * @param {number} target How much of filter to apply
 * @param {number} duration How long it takes to start the effect
 * @param {easing} easing How smoothly the effect should start
 */
let sepia = (target, duration = 0, easing = NONE) => {
    $.add(object({
        OBJ_ID: 2920,
        SHADER_STRENGTH: target,
        EASING: easing,
        DURATION: duration
    }));
    if (duration) wait(duration)
};
/**
 * Splits screen into sections
 * @param {number} target_x How many sections to add on X axis
 * @param {number} target_y How many sections to add on Y axis
 * @param {number} duration How long it takes to start the effect
 * @param {easing} easing How smoothly the effect should start
 */
let split_screen = (target_x, target_y, duration = 0, easing = NONE) => {
    $.add(object({
        OBJ_ID: 2924,
        SHADER_TARGET_X: target_x,
        SHADER_TARGET_Y: target_y,
        SHADER_USE_X: true,
        SHADER_USE_Y: true,
        EASING: easing,
        DURATION: duration
    }));
    if (duration) wait(duration)
};
/**
 * Inverts colors on screen
 * @param {number} target 
 * @param {number} duration How long it takes to start the effect
 * @param {easing} easing easing How smoothly the effect should start
 * @param {array} rgb Color to use to customize filter color
 * @param {boolean} tween Makes transitions smoother
 * @param {boolean} clamp Limits RGB values to 1
 */
let invert_color = (target, duration = 0, easing = NONE, rgb_color = rgb(255, 255, 255), tween = false, clamp = false) => {
    $.add(object({
        OBJ_ID: 2921,
        176: target,
        179: rgb_color[0],
        180: rgb_color[1],
        189: rgb_color[2],
        188: true,
        190: tween,
        194: clamp,
        EASING: easing,
        DURATION: duration
    }));
    if (duration) wait(duration)
};

module.exports = { shader_layers, shader_layer, sepia, hue_shift, grayscale, pixelate, chromatic, glitch, bulge, split_screen, invert_color }