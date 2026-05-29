"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.player_control = exports.end = exports.options = exports.gravity = exports.advanced_random = exports.random = exports.spawn_particle = exports.particle_system = exports.gradient = exports.hide_player = exports.toggle_off_trigger = exports.toggle_on_trigger = exports.color_trigger = exports.timewarp = exports.move_trigger = exports.teleport = exports.song = exports.camera_edge = exports.camera_rotate = exports.camera_mode = exports.camera_zoom = exports.camera_static = exports.camera_offset = void 0;
/**
 * @module general-purpose
 */
const core_1 = require("../core");
const constants_1 = require("../constants");
const particles_1 = __importDefault(require("../properties/particles"));
/**
 * Offsets the camera by a position
 * @param {number} x X offset of camera
 * @param {number} y Y offset of camera
 * @param {number} [duration=0] Duration that it takes for camera position to change
 * @param {number} [easing=NONE] Easing for camera movement
 * @category Functions
 * @group General Purpose
 */
let camera_offset = (x, y, duration = 0, easing = constants_1.NONE) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 1916,
        155: 1,
        MOVE_X: x * 3,
        MOVE_Y: y * 3,
        ACTIVE_TRIGGER: true,
        DURATION: duration,
        EASING_RATE: easing
    }));
    if (duration)
        (0, core_1.wait)(duration);
};
exports.camera_offset = camera_offset;
/**
 * Makes the camera static around a target object (group ID)
 * @param {any} gr Group storing object to be the center of camera
 * @param {number} [duration=0] Duration that it takes for camera to be centered around object
 * @param {number} [easing=NONE] How smoothly the camera moves to the object
 * @param {number} [easing_rate=0] How smoothly the effect should start
 * @param {boolean} [exit_instant=false] Stops static instantly
 * @param {boolean} [exit_static=false] Stops static
 * @param {boolean} [smooth_vel=false] Makes transition to target adapt to current camera velocity (no easing recommended)
 * @param {number} [smooth_vel_mod=0] Modifier for smooth velocity
 * @param {boolean} [follow=false] Makes camera change according to object movement
 * @param {boolean} [x_only=false] Makes the camera only be static on X axis
 * @param {boolean} [y_only=false] Makes the camera only be static on Y axis
 * @category Functions
 * @group General Purpose
 */
let camera_static = (gr, duration = 0, easing = constants_1.NONE, easing_rate = 0, exit_instant = false, exit_static = false, smooth_vel = false, smooth_vel_mod = 0, follow = false, x_only = false, y_only = false) => {
    if (x_only && y_only)
        throw new Error("Only one of the x_only or y_only arguments must be true, but both values are true!");
    let axisval = !x_only && !y_only ? 0 : (x_only ? 1 : 2);
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 1914,
        155: 1,
        DURATION: duration,
        TARGET_POS_AXES: axisval,
        ACTIVE_OBJECT: true,
        TARGET_POS: gr,
        FOLLOW_GROUP: follow,
        EASING: easing,
        EASING_RATE: easing_rate,
        SMOOTH_VELOCITY: smooth_vel,
        SMOOTH_VELOCITY_MODIFIER: smooth_vel_mod,
        EXIT_INSTANT: exit_instant,
        EXIT_STATIC: exit_static
    }));
    if (duration)
        (0, core_1.wait)(duration);
};
exports.camera_static = camera_static;
/**
 * Makes the camera zoom in/out by a specific amount
 * @param {number} zoom_am Amount to zoom the camera in by
 * @param {number} [duration=0] How long it takes for camera to zoom in
 * @param {number} [easing=NONE] How smoothly the camera zooms in
 * @category Functions
 * @group General Purpose
 */
let camera_zoom = (zoom_am, duration = 0, easing = constants_1.NONE) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 1913,
        ZOOM: zoom_am,
        DURATION: duration,
        EASING: easing
    }));
};
exports.camera_zoom = camera_zoom;
/**
 * Toggles free mode
 * @param {boolean} [free_mode=true] Whether to toggle free mode on or off
 * @param {boolean} [disable_grid_snap=false] Removes default snapping to nearest grid space for the camera center
 * @param {boolean} [edit_cam=false] Whether to edit camera settings
 * @param {number} [easing=10] Easing for camera movement (requires edit_cam to be true)
 * @param {number} [padding=0.50] Padding for camera movement (requires edit_cam to be true)
 * @category Functions
 * @group General Purpose
 */
let camera_mode = (free_mode = true, disable_grid_snap = false, edit_cam = false, easing = 10, padding = 0.50) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 2925,
        FREE_MODE: free_mode,
        EDIT_FREE_CAM_SETTINGS: edit_cam,
        FREE_CAM_EASING: easing,
        FREE_CAM_PADDING: padding,
        DISABLE_GRID_SNAP: disable_grid_snap
    }));
};
exports.camera_mode = camera_mode;
/**
 * Rotates camera
 * @param {number} degrees How many degrees to rotate camera by
 * @param {number} [move_time=0] How fast rotation happens
 * @param {number} [easing=NONE] How smooth rotation happens
 * @param {boolean} [add=false] Adds input rotation to current camera rotation
 * @param {boolean} [snap360=false] Converts rotation to closest 360
 * @category Functions
 * @group General Purpose
 */
let camera_rotate = (degrees, move_time = 0, easing = constants_1.NONE, add = false, snap360 = false) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 2015,
        DURATION: move_time,
        EASING: easing,
        ROTATE_DEGREES: degrees,
        ADD: add,
        SNAP_360: snap360
    }));
};
exports.camera_rotate = camera_rotate;
/**
 * Makes one of the camera's edges a specific target object
 * @param {any} id Group ID of target object
 * @param {number} edge Defines the edge to set (LEFT_EDGE, RIGHT_EDGE, UP_EDGE, DOWN_EDGE)
 * @category Functions
 * @group General Purpose
 */
let camera_edge = (id, edge) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 2062,
        TARGET: id,
        CAMERA_EDGE: edge
    }));
};
exports.camera_edge = camera_edge;
/**
 * Implementation of song trigger in GD
 * @param {number} song_id ID of song in-game
 * @param {boolean} [loop=false] Whether to loop the song
 * @param {boolean} [preload=true] Whether to preload the song first before playing
 * @param {number} [channel=0] What channel to put the song on
 * @param {number} [volume=1] Volume of song
 * @param {number} [speed=0] Speed of song
 * @param {number} [start=0] Where the song should start in MS
 * @param {number} [end=0] Where the song should end in MS
 * @param {number} [fadein=0] When to fade the song in
 * @param {number} [fadeout=0] When to fade the song out
 * @returns {any}
 * @category Functions
 * @group General Purpose
 */
let song = (song_id, loop = false, preload = true, channel = 0, volume = 1, speed = 0, start = 0, end = 0, fadein = 0, fadeout = 0) => {
    if (preload) {
        let m_obj = {
            OBJ_ID: 1934,
            SONG_ID: song_id,
            SONG_CHANNEL: channel,
            SONG_VOLUME: volume,
            SONG_SPEED: speed,
            SONG_START: start,
            SONG_END: end,
            SONG_FADE_IN: fadein,
            SONG_FADE_OUT: fadeout,
            SONG_LOOP: loop,
            PREP: true
        };
        core_1.$.add((0, core_1.trigger)(m_obj));
        let al_load = false;
        let exp = {
            start: () => {
                if (al_load)
                    core_1.$.add((0, core_1.trigger)(m_obj));
                core_1.$.add((0, core_1.trigger)({
                    OBJ_ID: 1934,
                    SONG_CHANNEL: channel,
                    LOAD_PREP: true
                }));
                if (!al_load)
                    al_load = true;
            },
            edit: (new_volume = volume, new_speed = speed, duration = 0.5, stop = false, stop_loop = false, gid_1 = (0, core_1.group_fn)(0), gid_2 = (0, core_1.group_fn)(0), vol_near = 1, vol_med = 0.5, vol_far = 0, min_dist = 0, dist_2 = 0, dist_3 = 0, p1 = false, p2 = false, cam = false, vol_dir = 0) => {
                core_1.$.add((0, core_1.trigger)({
                    OBJ_ID: 3605,
                    DURATION: duration,
                    SONG_CHANNEL: channel,
                    SONG_SPEED: new_speed,
                    SONG_VOLUME: new_volume,
                    SONG_STOP: stop,
                    STOP_LOOP: stop_loop,
                    CHANGE_SPEED: new_speed !== speed,
                    CHANGE_VOLUME: new_volume !== volume,
                    GROUP_ID_1: gid_1,
                    GROUP_ID_2: gid_2,
                    VOL_NEAR: vol_near,
                    VOL_MED: vol_med,
                    VOL_FAR: vol_far,
                    MIN_DIST: min_dist,
                    DIST_2: dist_2,
                    DIST_3: dist_3,
                    P1: p1,
                    P2: p2,
                    CAM: cam,
                    VOLUME_DIRECTION: vol_dir
                }));
            },
            stop: () => {
                exp.edit(volume, speed, 0.5, true, true);
                // loop ? false : true, loop ? true : false
            }
        };
        return exp;
    }
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 1934,
        SONG_ID: song_id,
        SONG_CHANNEL: channel,
        SONG_VOLUME: volume,
        SONG_SPEED: speed,
        SONG_START: start,
        SONG_END: end,
        SONG_FADE_IN: fadein,
        SONG_FADE_OUT: fadeout,
        SONG_LOOP: loop
    }));
};
exports.song = song;
/**
* Teleports the player to a specific target object
* @param {any} g Group ID of target object or [x, y] coordinates
* @param {boolean} [no_effects] Weather the teleport trigger generates an effect
 * @category Functions
*/
let teleport = (g, no_effects) => {
    if (g?.length) {
        core_1.$.add((0, core_1.trigger)({
            OBJ_ID: 3022,
            X: g[0],
            Y: g[1],
            155: 1,
            13: 1,
            ACTIVE_TRIGGER: 1,
            350: 1,
            NO_EFFECTS: no_effects
        }));
        return;
    }
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 3022,
        155: 1,
        13: 1,
        ACTIVE_TRIGGER: 1,
        TARGET: g,
        350: 1
    }));
};
exports.teleport = teleport;
/**
 * Adds a move trigger and returns it
 * @param {any} group Group ID of target object
 * @param {number} x X amount of how much to move the object by
 * @param {number} y Y amount of how much to move the object by
 * @returns {any} Returned object
 * @category Functions
 * @group General Purpose
 */
let move_trigger = (group, x, y) => {
    return (0, core_1.trigger)({
        OBJ_ID: 901,
        TARGET: group,
        MOVE_X: x * 3,
        MOVE_Y: y * 3,
    });
};
exports.move_trigger = move_trigger;
/**
 * Warps all time by given amount
 * @param {number} val How much to warp time by
 * @category Functions
 */
let timewarp = (val) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 1935,
        TIMEWARP_TIME_MOD: val
    }));
};
exports.timewarp = timewarp;
/**
* Creates color trigger
* @param {any} channel Color channel to set
* @param {number} r Red value in RGB to set
* @param {number} g Green value in RGB to set
* @param {number} b Blue value in RGB to set
* @param {number} [duration=0] Duration that it takes for color to change
* @param {number} [opacity=1] Opacity of color (1 = visible, 0 = invisible)
* @param {boolean} [blending=false] Whether to blend color with others
* @returns {any} Resulting color trigger
* @category Functions
* @group General Purpose
*/
let color_trigger = (channel, r, g, b, duration = 0, opacity = 1, blending = false) => {
    return (0, core_1.trigger)({
        OBJ_ID: 899,
        DURATION: duration,
        TRIGGER_RED: r,
        TRIGGER_GREEN: g,
        TRIGGER_BLUE: b,
        OPACITY: opacity,
        BLENDING: blending,
        TARGET_COLOR: channel,
    });
};
exports.color_trigger = color_trigger;
/**
 * Returns an activated toggle trigger
 * @param {any} group_id Group of object
 * @returns {any} Resulting object
 * @category Functions
 */
let toggle_on_trigger = (group_id) => {
    return (0, core_1.trigger)({
        OBJ_ID: 1049,
        TARGET: group_id,
        ACTIVATE_GROUP: true,
    });
};
exports.toggle_on_trigger = toggle_on_trigger;
/**
 * Returns an inactive toggle trigger
 * @param {any} group_id Group of object
 * @returns {any} Resulting object
 * @category Functions
 */
let toggle_off_trigger = (group_id) => {
    return (0, core_1.trigger)({
        OBJ_ID: 1049,
        TARGET: group_id,
        ACTIVATE_GROUP: false,
    });
};
exports.toggle_off_trigger = toggle_off_trigger;
/**
 * Hides player
 * @category Functions
 */
let hide_player = () => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 1612,
    }));
};
exports.hide_player = hide_player;
let gradient_id = 0;
/**
 * Creates a gradient trigger and returns it
 * @param {any} col First color of gradient
 * @param {any} col2 Second color of gradient
 * @param {any} bl Bottom left vertex
 * @param {any} br Bottom right vertex
 * @param {any} tl Top left vertex
 * @param {any} tr Top right vertex
 * @param {boolean} [vertex_mode=true] Whether to use vertex mode
 * @param {boolean} [blending=false] Whether to make the gradient blending
 * @param {number} [layer=0] Layer of gradient (0-15)
 * @returns {any} Resulting gradient trigger
 * @category Functions
 */
let gradient = (col, col2, bl, br, tl, tr, vertex_mode = true, blending = false, layer = 0) => {
    return (0, core_1.trigger)({
        OBJ_ID: 2903,
        GR_BL: bl,
        GR_BR: br,
        GR_TL: tl,
        GR_TR: tr,
        GR_ID: gradient_id++,
        COLOR: col,
        COLOR_2: col2,
        GR_VERTEX_MODE: vertex_mode,
        GR_BLENDING: blending,
        GR_LAYER: layer
    });
};
exports.gradient = gradient;
/**
 * Creates a particle system
 * @param {any} props Dictionary holding particle properties (check {@tutorial Particles} for more info)
 * @param {boolean} [use_obj_color=false] Whether to make the particle system use the object color
 * @param {boolean} [animate_on_trigger=false] Whether to only start the particle system when the Animate trigger is used on the particle system instead of immediately
 * @param {boolean} [animate_active_only=false] Only makes animate_on_trigger true if the object is active
 * @param {boolean} [quick_start=false] Makes normal movement be achieved instantly instead of gradually
 * @returns {any} Returned particle system
 * @category Functions
 */
let particle_system = (props, use_obj_color = false, animate_on_trigger = false, animate_active_only = false, quick_start = false) => {
    let datalist = Array(72).fill(0);
    for (let i in props) {
        let x = props[i];
        if (typeof x == "boolean")
            x = +x;
        datalist[particles_1.default[i]] = x;
    }
    ;
    datalist = datalist.join('a');
    return (0, core_1.object)({
        OBJ_ID: 2065,
        PARTICLE_DATA: datalist,
        USE_OBJ_COLOR: use_obj_color,
        UNIFORM_OBJ_COLOR: "UNIFORM_OBJ_COLOR" in props ? props.UNIFORM_OBJ_COLOR : false,
        ANIMATE_ON_TRIGGER: animate_on_trigger,
        ANIMATE_ACTIVE_ONLY: animate_active_only,
        QUICK_START: quick_start
    });
};
exports.particle_system = particle_system;
/**
 * Implementation of Spawn Particle trigger
 * @param {any} particle_group Group ID of particle system
 * @param {any} pos_group Target location to spawn trigger system in
 * @param {number} offset_x How much to to offset the particle system from the target on the X axis
 * @param {number} offset_y How much to to offset the particle system from the target on the Y axis
 * @param {number} scale Scale of particle system
 * @param {number} scale_var Value to randomly add or decrease to scale
 * @param {number} rotation How many angles the system is rotated by
 * @param {number} rotation_var Value to randomly add or decrease to rotation
 * @param {number} offvar_x Area to randomly spawn particles in on X axis
 * @param {number} offvar_y Area to randomly spawn particles in on Y axis
 * @param {boolean} match_rot Makes the rotation of several particles match
 * @category Functions
 */
let spawn_particle = (particle_group, pos_group = (0, core_1.group_fn)(0), offset_x = 0, offset_y = 0, scale = 1, scale_var = 0, rotation = 0, rotation_var = 0, offvar_x = 0, offvar_y = 0, match_rot = false) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 3608,
        TARGET: particle_group,
        TARGET_POS: pos_group,
        547: offset_x,
        548: offset_y,
        549: offvar_x,
        550: offvar_y,
        551: match_rot,
        552: rotation,
        553: rotation_var,
        554: scale,
        555: scale_var,
    }));
};
exports.spawn_particle = spawn_particle;
/**
 * Implementation of random trigger
 * @param {any} gr1 Group 1
 * @param {any} gr2 Group 2
 * @param {number} chance Chance of either group being called
 * @category Functions
 */
let random = (gr1, gr2, chance) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 1912,
        GROUP_ID_1: gr1,
        GROUP_ID_2: gr2,
        CHANCE: chance
    }));
};
exports.random = random;
/**
 * Implementation of advanced random trigger
 * @param {any[]} chances Chances of each group being called (e.g. [[group(1), 10], [group(2), 10]] is a valid input)
 * @category Functions
 */
let advanced_random = (...chances) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 2068,
        ADV_RAND_STRING: chances.map(x => x[0].value + '.' + x[1]).join('.')
    }));
};
exports.advanced_random = advanced_random;
/**
 * Implementation of gravity trigger
 * @param {number} grav Gravity magnitude
 * @param {boolean} p1 Only affect player 1
 * @param {boolean} p2 Only affect player 2
 * @param {boolean} pt Only affect player that touches trigger
 * @category Functions
 */
let gravity = (grav, p1 = false, p2 = false, pt = false) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 2066,
        GRAVITY: grav,
        PLAYER_1: p1,
        PLAYER_2: p2,
        _PT: pt
    }));
};
exports.gravity = gravity;
/**
 * Implementation of options trigger
 * @returns {OptionsTrigger} Options trigger
 * @category Functions
 */
let options = () => {
    let ob = {
        OBJ_ID: 2899
    };
    return {
        STREAK_ADDITIVE: (v = true) => ob.STREAK_ADDITIVE = v ? 1 : -1,
        HIDE_GROUND: (v = true) => ob.HIDE_GROUND = v ? 1 : -1,
        HIDE_MG: (v = true) => ob.HIDE_MG = v ? 1 : -1,
        HIDE_P1: (v = true) => ob.HIDE_P1 = v ? 1 : -1,
        HIDE_P2: (v = true) => ob.HIDE_P2 = v ? 1 : -1,
        DISABLE_CONTROLS_P1: (v = true) => ob.DISABLE_CONTROLS_P1 = v ? 1 : -1,
        DISABLE_CONTROLS_P2: (v = true) => ob.DISABLE_CONTROLS_P2 = v ? 1 : -1,
        UNLINK_DUAL_GRAVITY: (v = true) => ob.UNLINK_DUAL_GRAVITY = v ? 1 : -1,
        HIDE_ATTEMPTS: (v = true) => ob.HIDE_ATTEMPTS = v ? 1 : -1,
        AUDIO_ON_DEATH: (v = true) => ob.AUDIO_ON_DEATH = v ? 1 : -1,
        NO_DEATH_SFX: (v = true) => ob.NO_DEATH_SFX = v ? 1 : -1,
        RESPAWN_TIME: (v) => {
            ob.EDIT_RESPAWN_TIME = 1;
            ob.RESPAWN_TIME = v;
        },
        add: () => core_1.$.add((0, core_1.trigger)(ob))
    };
};
exports.options = options;
/**
 * Ends level
 * @param {boolean} [instant_end=false] Whether to end level instantly
 * @param {boolean} [no_effects=false] Whether to remove effects
 * @param {boolean} [no_sfx=false] Whether to remove SFX
 * @param {any} [spawn_id=group(0)] Group to spawn on end
 * @param {any} [target_pos=group(0)] Object defining end position
 * @category Functions
 * @group General Purpose
 */
let end = (instant_end = false, no_effects = false, no_sfx = false, spawn_id = (0, core_1.group_fn)(0), target_pos = (0, core_1.group_fn)(0)) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 3600,
        GROUP_ID_1: spawn_id,
        GROUP_ID_2: target_pos,
        NO_EFFECTS: no_effects,
        NO_SFX: no_sfx,
        INSTANT_END: instant_end
    }));
};
exports.end = end;
/**
 * Implementation of player control trigger
 * @param {boolean} [p1=false] Only controls P1
 * @param {boolean} [p2=false] Only controls P2
 * @param {boolean} [stop_jump=false] Stops player from jumping
 * @param {boolean} [stop_move=false] Stops player from moving
 * @param {boolean} [stop_rot=false] Stops player from rotating
 * @param {boolean} [stop_slide=false] Stops player from sliding
 * @category Functions
 * @group General Purpose
 */
let player_control = (p1 = false, p2 = false, stop_jump = false, stop_move = false, stop_rot = false, stop_slide = false) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 1932,
        PLAYER_1: p1,
        PLAYER_2: p2,
        STOP_JUMP: stop_jump,
        STOP_MOVE: stop_move,
        STOP_ROT: stop_rot,
        STOP_SLIDE: stop_slide
    }));
};
exports.player_control = player_control;
