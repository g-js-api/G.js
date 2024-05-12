const crypto = require('crypto');

/**
 * Offsets the camera by a position
 * @param {number} x X offset of camera
 * @param {number} y X offset of camera
 * @param {number} [duration=0] Duration that it takes for camera position to change
 */
let camera_offset = (x, y, duration = 0, easing = NONE) => {
    $.add({
        OBJ_ID: 1916,
        155: 1,
        MOVE_X: x * 3,
        MOVE_Y: y * 3,
        ACTIVE_TRIGGER: true,
        DURATION: duration,
        EASING_RATE: easing
    });
    if (duration) wait(duration);
};
/**
 * Makes the camera static around a target object (group ID)
 * @param {group} group Group storing object to be the center of camera
 * @param {number} [duration=0] Duration that it takes for camera to be centered around object
 * @param {easing} [easing=NONE] How smoothly the camera moves to the object
 * @param {boolean} [exit_instant=false] Stops static instantly
 * @param {boolean} [exit_static=false] Stops static
 * @param {boolean} [smooth_vel=false] Makes transition to target adapt to current camera velocity (no easing recommended)
 * @param {number} [smooth_vel_mod=0] Modifier for smooth velocity
 * @param {boolean} [follow=false] Makes camera change according to object movement
 * @param {boolean} [x_only=false] Makes the camera only be static on X axis
 * @param {boolean} [x_only=false] Makes the camera only be static on Y axis
 */
let camera_static = (gr, duration = 0, easing = NONE, exit_instant = false, exit_static = false, smooth_vel = false, smooth_vel_mod = 0, follow = false, x_only = false, y_only = false) => {
    if (x_only && y_only) throw new Error("Only one of the x_only or y_only arguments must be true, but both values are true!");
    let axisval = !x_only && !y_only ? 0 : (x_only ? 1 : 2);
    $.add({
        OBJ_ID: 1914,
        155: 1,
        DURATION: duration,
        TARGET_POS_AXES: axisval,
        ACTIVE_OBJECT: true,
        TARGET_POS: gr,
        FOLLOW_GROUP: follow,
        EASING: easing,
        SMOOTH_VELOCITY: smooth_vel,
        SMOOTH_VELOCITY_MODIFIER: smooth_vel_mod,
        EXIT_INSTANT: exit_instant,
        EXIT_STATIC: exit_static
    });
    if (duration) wait(duration);
};
/**
 * Makes the camera zoom in/out by a specific amount
 * @param {number} zoom_amount Amount to zoom the camera in by
 * @param {number} [duration=0] How long it takes for camera to zoom in
 * @param {easing} [easing=NONE] How smoothly the camera zooms in
 */
let camera_zoom = (zoom_am, duration = 0, easing = NONE) => {
    $.add({
        OBJ_ID: 1913,
        ZOOM: zoom_am,
        DURATION: duration,
        EASING: easing
    });
};
/**
 * Toggles free mode
 * @param {boolean} [free_mode=true] Whether to toggle free mode on or off
 * @param {boolean} [disable_grid_snap=false] Removes default snapping to nearest grid space for the camera center
 * @param {boolean} [edit_cam=false] Whether to edit camera settings
 * @param {number} [easing=10] Easing for camera movement (requires edit_cam to be true)
 * @param {number} [padding=0.50] Padding for camera movement (requires edit_cam to be true)
 */
let camera_mode = (free_mode = true, disable_grid_snap = false, edit_cam = false, easing = 10, padding = 0.50) => {
    $.add({
        OBJ_ID: 2925,
        FREE_MODE: free_mode,
        EDIT_FREE_CAM_SETTINGS: edit_cam,
        FREE_CAM_EASING: easing,
        FREE_CAM_PADDING: padding,
        DISABLE_GRID_SNAP: disable_grid_snap
    });
};
/**
 * Rotates camera
 * @param {number} degrees How many degrees to rotate camera by
 * @param {number} [move_time=0] How fast rotation happens
 * @param {easing} [easing=NONE] How smooth rotation happens
 * @param {boolean} [add=false] Adds input rotation to current camera rotation
 * @param {boolean} [snap360=false] Converts rotation to closest 360
 */
let camera_rotate = (degrees, move_time = 0, easing = NONE, add = false, snap360 = false) => {
    $.add({
        OBJ_ID: 2015,
        DURATION: move_time,
        EASING: easing,
        ROTATE_DEGREES: degrees,
        ADD: add,
        SNAP_360: snap360
    });
};

/**
 * Makes one of the camera's edges a specific target object
 * @param {group} id Group ID of target object
 * @param {edge} edge Defines the edge to set (LEFT_EDGE, RIGHT_EDGE, UP_EDGE, DOWN_EDGE)
 */
let camera_edge = (id, edge) => {
    $.add({
        OBJ_ID: 2062,
        TARGET: id,
        CAMERA_EDGE: edge
    });
};

/**
* Represents a song trigger in GD
* @typedef {object} song
* @property {start_song} start Starts song
* @property {edit} edit Edit Song trigger implementation
* @property {stop} stop Stops playing the song
*/
/**
 * Starts playing the song
 * @callback start_song
 */
/**
 * Implementation of Edit Song trigger
 * @callback edit
 * @param {number} new_volume 
 * @param {number} new_speed 
 * @param {number} duration 
 * @param {boolean} stop 
 * @param {boolean} stop_loop 
 * @param {group} gid_1 
 * @param {group} gid_2 
 * @param {number} vol_near 
 * @param {number} vol_med 
 * @param {number} vol_far 
 * @param {number} min_dist 
 * @param {number} dist_2 
 * @param {number} dist_3 
 * @param {boolean} p1 
 * @param {boolean} p2 
 * @param {boolean} cam 
 * @param {0} vol_dir 
 */
/**
 * Stops song
 * @callback stop
 */
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
 * @returns {song}
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
        $.add(m_obj);
        let al_load = false;
        let exp = {
            start: () => {
                if (al_load) $.add(m_obj);
                $.add({
                    OBJ_ID: 1934,
                    SONG_CHANNEL: channel,
                    LOAD_PREP: true
                });
                if (!al_load) al_load = true;
            },
            edit: (new_volume = volume, new_speed = speed, duration = 0.5, stop = false, stop_loop = false, gid_1 = group(0), gid_2 = group(0), vol_near = 1, vol_med = 0.5, vol_far = 0, min_dist = 0, dist_2 = 0, dist_3 = 0, p1 = false, p2 = false, cam = false, vol_dir = 0) => {
                $.add({
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
                });
            },
            stop: () => {
                exp.edit(volume, speed, 0.5, true, true);
                // loop ? false : true, loop ? true : false
            }
        };
        return exp;
    }
    $.add({
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
    });
}

/**
* Teleports the player to a specific target object
* @param {group} id Group ID of target object
*/
let teleport = (g) => {
    if (g?.length) {
        $.add({
            OBJ_ID: 3022,
            X: g[0],
            Y: g[1],
            155: 1,
            13: 1,
            ACTIVE_TRIGGER: 1,
            350: 1
        });
        return;
    }
    $.add({
        OBJ_ID: 3022,
        155: 1,
        13: 1,
        ACTIVE_TRIGGER: 1,
        TARGET: g,
        350: 1
    });
};

/**
 * Adds a move trigger and returns it
 * @param {group} id Group ID of target object
 * @param {number} x X amount of how much to move the object by
 * @param {number} Y Y amount of how much to move the object by
 * @returns {object} Returned object
 */
let move_trigger = (group, x, y) => {
    let origin = {
        OBJ_ID: 901,
        TARGET: group,
        MOVE_X: x * 3,
        MOVE_Y: y * 3,
    };
    origin.with = (a, b) => {
        origin[d[a]] = b;
        return origin;
    };
    return origin;
};
/**
 * Warps all time by given amount
 * @param {number} value How much to warp time by
 */
let timewarp = (val) => {
    $.add({
        OBJ_ID: 1935,
        TIMEWARP_TIME_MOD: val
    });
};

/**
* Creates color trigger
* @param {color} channel Color channel to set
* @param {number} r Red value in RGB to set
* @param {number} g Green value in RGB to set
* @param {number} b Blue value in RGB to set
* @param {number} [duration=0] Duration that it takes for color to change
* @param {number} [opacity=1] Opacity of color (1 = visible, 0 = invisible)
* @param {boolean} [blending=false] Whether to blend color with others
* @returns {object} Resulting color trigger
*/
let color_trigger = (
    channel,
    r,
    g,
    b,
    duration = 0,
    opacity = 1,
    blending = false
) => {
    let origin = {
        OBJ_ID: 899,
        DURATION: duration,
        TRIGGER_RED: r,
        TRIGGER_GREEN: g,
        TRIGGER_BLUE: b,
        OPACITY: opacity,
        BLENDING: blending,
        TARGET_COLOR: channel,
    };
    origin.with = (a, b) => {
        origin[d[a]] = b;
        return origin;
    };
    return origin;
};
/**
* Returns an activated toggle trigger
* @param {group} group Group of object
* @returns {object} Resulting object
*/
let toggle_on_trigger = (group) => {
    return {
        OBJ_ID: 1049,
        TARGET: group,
        ACTIVATE_GROUP: true,
    };
};

/**
 * Returns an inactive toggle trigger
 * @param {group} group Group of object
 * @returns {object} Resulting object
 */
let toggle_off_trigger = (group) => {
    return {
        OBJ_ID: 1049,
        TARGET: group,
        ACTIVATE_GROUP: false,
    };
};

/**
* Hides player
*/
let hide_player = () => {
    $.add({
        OBJ_ID: 1612,
    });
};

/**
* Creates a gradient trigger and returns it
* @param {color} color1 First color of gradient
* @param {color} color2 Second color of gradient
* @param {group} bl Bottom left vertex
* @param {group} br Bottom right vertex
* @param {group} tl Top left vertex
* @param {group} tr Top right vertex
* @param {boolean} [vertex_mode=true] Whether to use vertex mode
* @param {boolean} [blending=false] Whether to make the gradient blending
* @param {number} [layer=0] Layer of gradient (0-15)
* @returns {object} Resulting gradient trigger
*/
let gradient = (col, col2, bl, br, tl, tr, vertex_mode = true, blending = false, layer = 0) => {
    let origin = {
        OBJ_ID: 2903,
        GR_BL: bl,
        GR_BR: br,
        GR_TL: tl,
        GR_TR: tr,
        GR_ID: grad_id,
        COLOR: col,
        COLOR_2: col2,
        GR_VERTEX_MODE: vertex_mode,
        GR_BLENDING: blending,
        GR_LAYER: layer
    };
    origin.with = (a, b) => {
        origin[d[a]] = b;
        return origin;
    };
    return origin;
};

/**
 * Implementation of random trigger
 * @param {group} gr1 Group 1
 * @param {group} gr2 Group 2
 * @param {number} chance Chance of either group being called
 */
let random = (gr1, gr2, chance) => {
    $.add({
        OBJ_ID: 1912,
        GROUP_ID_1: gr1,
        GROUP_ID_2: gr2,
        CHANCE: chance
    });
};
/**
 * Implementation of advanced random trigger
 * @param {array} chances Chances of each group being called (e.g. [[group(1), 10], [group(2), 10]] is a valid input)
 */
let advanced_random = (...chances) => {
    $.add({
        OBJ_ID: 2068,
        ADV_RAND_STRING: chances.map(x => x[0].value + '.' + x[1]).join('.')
    });
}

/**
* Implementation of gravity trigger
* @param {number} gravity Gravity magnitude
* @param {boolean} p1 Only affect player 1
* @param {boolean} p2 Only affect player 2
* @param {boolean} pt Only affect player that touches trigger
*/
let gravity = (grav, p1 = false, p2 = false, pt = false) => {
    $.add({
        OBJ_ID: 2066,
        GRAVITY: grav,
        PLAYER_1: p1,
        PLAYER_2: p2,
        _PT: pt
    })
};

/**
 * Represents an options trigger
 * @typedef {object} options
 * @property {function} STREAK_ADDITIVE Streak additive (arg = boolean, optional)
 * @property {function} HIDE_GROUND Hide ground (arg = boolean, optional)
 * @property {function} HIDE_MG Hide middle ground (arg = boolean, optional)
 * @property {function} HIDE_P1 Hide player 1 (arg = boolean, optional)
 * @property {function} HIDE_P2 Hide player 2 (arg = boolean, optional)
 * @property {function} DISABLE_CONTROLS_P1 Disable player 1 controls (arg = boolean, optional)
 * @property {function} DISABLE_CONTROLS_P2 Disable player 2 controls (arg = boolean, optional)
 * @property {function} UNLINK_DUAL_GRAVITY Unlink dual gravity (arg = boolean, optional)
 * @property {function} HIDE_ATTEMPTS Hide attempts (arg = boolean, optional)
 * @property {function} AUDIO_ON_DEATH Audio on death (arg = boolean, optional)
 * @property {function} NO_DEATH_SFX No death SFX (arg = boolean, optional)
 * @property {function} RESPAWN_TIME Respawn time (arg = number, required)
 * @property {function} add Adds options trigger
 */
/**
 * Implementation of options trigger
 * @returns {options} Options trigger
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
        add: () => $.add(ob)
    };
};

/**
 * Ends level
 * @param {boolean} instant_end Whether to end level instantly
 * @param {boolean} no_effects Whether to remove effects
 * @param {boolean} no_sfx Whether to remove SFX
 * @param {group} spawn_id Group to spawn on end
 * @param {group} target_pos Object defining end position
 */
let end = (instant_end = false, no_effects = false, no_sfx = false, spawn_id = group(0), target_pos = group(0)) => {
    $.add({
        OBJ_ID: 3600,
        GROUP_ID_1: spawn_id,
        GROUP_ID_2: target_pos,
        NO_EFFECTS: no_effects,
        NO_SFX: no_sfx,
        INSTANT_END: instant_end
    });
};
/**
 * Implementation of player control trigger
 * @param {boolean} p1 Only controls P1
 * @param {boolean} p2 Only controls P2
 * @param {boolean} stop_jump Stops player from jumping
 * @param {boolean} stop_move Stops player from moving
 * @param {boolean} stop_rot Stops player from rotating
 * @param {boolean} stop_slide Stops player from sliding
 */
let player_control = (p1 = false, p2 = false, stop_jump = false, stop_move = false, stop_rot = false, stop_slide = false) => {
    $.add({
        OBJ_ID: 1932,
        PLAYER_1: p1,
        PLAYER_2: p2,
        STOP_JUMP: stop_jump,
        STOP_MOVE: stop_move,
        STOP_ROT: stop_rot,
        STOP_SLIDE: stop_slide
    });
}

module.exports = {
    camera_offset,
    camera_static,
    camera_zoom,
    camera_mode,
    camera_rotate,
    camera_edge,
    song,
    teleport,
    move_trigger,
    timewarp,
    color_trigger,
    toggle_on_trigger,
    toggle_off_trigger,
    hide_player,
    gradient,
    random,
    advanced_random,
    gravity,
    options,
    end,
    player_control
};