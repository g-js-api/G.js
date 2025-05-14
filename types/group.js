/**
 * @module group
 */
/**
 * @typedef {object} group
 * @property {function} remap Remaps multiple IDs inside of the group to others
 * @property {function} move Moves the group
 * @property {function} call Calls the group
 * @property {function} alpha Alpha trigger implementation
 * @property {function} lock_to_player Locks group to player
 * @property {function} stop Stops the current group
 * @property {function} toggle_on Toggles the group on
 * @property {function} toggle_off Toggles the group off
 * @property {function} rotate Rotates the group
 * @property {function} follow Makes the group follow another
 * @property {function} follow_lerp Keeps an object's position proportionally between 2 others
 * @property {function} follow_player_y Follows player Y
 * @property {function} move_to Move target implementation
 * @property {function} move_to_xy Moves group to specific coordinate
 * @property {function} pulse_hsv Pulses group w/ HSV
 * @property {function} pulse Pulses group
 */
/**
 * Representation of groups
 * @class
 * @constructor
 * @public
 */
class $group {
    /**
     * Creates a group from a number
     * @param {number} number Group ID
     * @param {boolean} [specific=true] Whether to disallow G.js from using that specific group again
     */
    constructor(a, specific = true) {
        this.value = a;
        this.type = 'group';
        if (specific && !all_known.groups.includes(a)) all_known.groups.push(a);
    }
    /**
    * Remaps multiple IDs inside of the group to others
    * @param {...array} remaps Array of groups to remap, e.g. remap([group(1), group(2)], [group(4), group(3)]) is valid
    */
    remap(...mps) {
        mps = mps.map(x => (x[0].value ? x[0].value : x[0]) + '.' + (x[1].value ? x[1].value : x[1])).join('.');
        this.remaps = mps;
        return this;
    }
    /**
     * Moves the group
     * @param {number} x Movement on X axis
     * @param {number} y Movement on Y axis
     * @param {number} duration Duration for move trigger
     * @param {easing} easing How smoothly object moves
     * @param {number} easing_rate Easing rate for move trigger
     * @param {number} x_multiplier How much to multiply the amount by on X axis
     * @param {number} y_multiplier How much to multiply the amount by on Y axis
     * @param {boolean} multiply Whether to fit the amount of units moved into GD units (multiplying by 3 does this)
     * * @param {boolean} silent Make move trigger take no time
     */
    move(x, y, duration = 0, easing = NONE, easing_rate = 2, x_multiplier = 1, y_multiplier = 1, multiply = true, silent = false) {
        $.add(trigger({
            OBJ_ID: 901,
            TARGET: this,
            MOVE_X: multiply ? x * 3 * x_multiplier : x * x_multiplier,
            MOVE_Y: multiply ? y * 3 * y_multiplier : y * y_multiplier,
            DURATION: duration,
            EASING: easing,
            EASING_RATE: easing_rate,
        }).with(544, silent));
        wait(duration);
    }

    /**
     * Scales the group
     * @param {group} center Center of group for scaling
     * @param {number} scale_x Scaling on X axis
     * @param {number} scale_y Scaling on Y axis
     * @param {number} [duration=0] Duration for scale trigger
     * @param {easing} [easing=NONE] How smoothly object gets scaled
     * @param {number} [easing_rate=2] Easing rate for scale trigger
     * @param {boolean} [x_divide=false] Whether to divide the current scaling by scale_x
     * @param {boolean} [y_divide=false] Whether to divide the current scaling by scale_y
     * @param {boolean} [move_only=false] Whether to emulate the effect of scaling without actually scaling the group by moving the group instead
     * @param {boolean} [relative_scale=false] Bases scaling on the reference object
     * @param {boolean} [relative_rot=false] Whether to rotate the X and Y axis
     */
    scale(center, scale_x, scale_y, duration = 0, easing = NONE, easing_rate = 2, x_divide = false, y_divide = false, move_only = false, relative_scale = false, relative_rot = false) {
        $.add(trigger({
            OBJ_ID: 2067,
            CENTER: center,
            DURATION: duration,
            EASING_RATE: easing_rate,
            SCALE_X_BY: scale_x,
            SCALE_Y_BY: scale_y,
            DIV_BY_X: x_divide,
            DIV_BY_Y: y_divide,
            ONLY_MOVE: move_only,
            RELATIVE_SCALE: relative_scale,
            RELATIVE_ROT: relative_rot,
        }))
    }
    /**
     * Animate trigger implementation
     * @param {number} [anim_id=0] Animation ID (can also use `animations.[monster].[animation name]`, check index module for more info about animation IDs)
     */
    animate(anim_id = 0) {
        $.add(trigger({
            OBJ_ID: 1585,
            TARGET: this,
            ANIMATION_GID: anim_id
        }));
    }
    /**
     * Calls the group
     * @param {number} delay How long to delay the group being called
     */
    call(delay = 0) {
        let tr = spawn_trigger(this, delay);
        if (this.remaps) tr.obj_props.REMAPS = this.remaps;
        $.add(tr);
    }
    /**
     * Alpha trigger implementation
     * @param {number} opacity Changed opacity
     * @param {number} duration How long it takes for the opacity to change
     */
    alpha(opacity = 1, duration = 0) {
        $.add(trigger({
            OBJ_ID: 1007,
            TARGET: this,
            OPACITY: opacity,
            DURATION: duration,
        }));
        wait(duration);
    }
    /**
     * Locks group to player
     * @param {boolean} [lock_x=true] Whether to lock to X axis of player
     * @param {boolean} [lock_y=true] Whether to lock to Y axis of player
     * @param {number} [duration=999] How long group is locked to player
     */
    lock_to_player(lock_x = true, lock_y = true, duration = 999) {
        $.add(trigger({
            OBJ_ID: 901,
            TARGET: this,
            DURATION: duration,
            LOCK_TO_PLAYER_X: lock_x,
            LOCK_TO_PLAYER_Y: lock_y,
        }));
    }

    /**
     * Stops the current group
     */
    stop() {
        $.add(trigger({
            OBJ_ID: 1616,
            TARGET: this,
        }));
    }
    /**
     * Pauses the current group
     */
    pause() {
        $.add(trigger({
            OBJ_ID: 1616,
            TARGET: this,
            STOP_PAUSE_RESUME: 1
        }));
    }

    /**
     * Resumes the current group
     */
    resume() {
        $.add(trigger({
            OBJ_ID: 1616,
            TARGET: this,
            STOP_PAUSE_RESUME: 2
        }));
    }

    /**
     * Toggles the group on
     */
    toggle_on() {
        $.add(trigger({
            OBJ_ID: 1049,
            TARGET: this,
            ACTIVATE_GROUP: true,
        }));
    }
    /**
     * Toggles the group off
     */
    toggle_off() {
        $.add(trigger({
            OBJ_ID: 1049,
            TARGET: this,
            ACTIVATE_GROUP: false,
        }));
    }
    /**
     * Rotates the group
     * @param {group} center Group to rotate around
     * @param {number} degrees How many degrees to rotate
     * @param {number} [duration=0] How long it takes for the group to rotate
     * @param {easing} [easing=NONE] How smoothly the object rotates
     * @param {number} [easing_rate=2] Easing rate of rotation
     * @param {boolean} [lock_object_rotation=false] Whether to turn on "lock object rotation"
     */
    rotate(center, degrees, duration = 0, easing = NONE, easing_rate = 2, lock_object_rotation = false) {
        $.add(trigger({
            OBJ_ID: 1346,
            TARGET: this,
            CENTER: center,
            ROTATE_DEGREES: degrees,
            DURATION: duration,
            EASING: easing.id,
            EASING_RATE: easing_rate,
            LOCK_OBJECT_ROTATION: lock_object_rotation
        }));
        wait(duration);
    }

    /**
     * Makes the group follow another
     * @param {group} other Group to follow
     * @param {number} x_mod How much to speed up/slow down movement on X axis
     * @param {number} y_mod How much to speed up/slow down movement on Y axis
     * @param {number} duration How long to follow other group
     */
    follow(other, x_mod = 1, y_mod = 1, duration = 999) {
        $.add(trigger({
            OBJ_ID: 1347,
            X_MOD: x_mod,
            Y_MOD: y_mod,
            DURATION: duration,
            TARGET: this,
            FOLLOW: other,
        }));
    }
    /**
     * Keeps an object's position proportionally between 2 others
     * @param {group} groupA Group of object A to follow
     * @param {group} groupB Group of object B to follow
     * @param {number} weight How much of the way the group should be kept in
     * @param {number} duration How long to follow
     */
    follow_lerp(groupA, groupB, weight = 0.5, duration = 999) {
        this.follow(groupA, 1 - weight, 1 - weight, duration);
        this.follow(groupB, weight, weight, duration)
    }

    /**
     * Follows player Y
     * @param {number} [speed=0] How fast group snaps to player Y position
     * @param {number} [delay=0] Delay of movement
     * @param {number} [offset=0] Offset of group
     * @param {number} [max_speed=0] How fast movement of group can be
     * @param {number} [duration=0] How long the group is locked to player Y axis
     */
    follow_player_y(speed = 1, delay = 0, offset = 0, max_speed = 0, duration = 999) {
        $.add(trigger({
            OBJ_ID: 1814,
            SPEED: speed,
            DELAY: delay,
            Y_OFFSET: offset,
            MAX_SPEED: max_speed,
            TARGET: this,
            DURATION: duration,
        }));
    }
    /**
     * Move target implementation
     * @param {group} target Group to move to
     * @param {number} duration How long it takes to move to target
     * @param {boolean} x_only Whether to only move on X axis
     * @param {boolean} y_only Whether to only move on Y axis
     * @param {easing} easing Easing of movement
     * @param {number} easing_rate Easing rate of movement
     */
    move_to(target, duration = 0, x_only = false, y_only = false, easing = NONE, easing_rate = 2) {
        $.add(trigger({
            OBJ_ID: 901,
            TARGET: this,
            USE_TARGET: true,
            TARGET_POS_AXES: x_only && y_only ? 0 : (x_only ? 1 : (y_only ? 2 : 0)),
            TARGET_POS: target,
            DURATION: duration,
            EASING: easing,
            EASING_RATE: easing_rate,
        }));
        wait(duration);
    }
    /**
     * Moves group to specific coordinate
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {number} [duration=0] Duration of movement
     * @param {easing} [easing=0] Easing of movement
     * @param {number} [easing_rate=2] Easing rate of movement
     */
    move_to_xy(x, y, duration = 0, easing = NONE, easing_rate = 2) {
        if (!x && !y) throw new Error("At least one coordinate must be specified!");
        let target = unknown_g();
        $.add(trigger({
            OBJ_ID: 1765,
            X: x ? x : 0,
            Y: y ? y : 0,
            GROUPS: target,
        }));
        $.add(trigger({
            OBJ_ID: 1007,
            X: 0,
            Y: 75 * 30,
            TARGET: target,
            OPACITY: 0,
            DURATION: 0,
        }));
        this.move_to(target, duration, !y, !x, easing, easing_rate);
    }
    /**
     * Pulses group w/ HSV
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
            TARGET_TYPE: 1,
        }));
        wait(fade_in + hold + fade_out);
    }
    /**
     * Pulses group
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
            TARGET_TYPE: 1,
        }));
        wait(fade_in + hold + fade_out);
    }
}

module.exports = $group
