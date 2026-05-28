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
 * @public
 * @category Types
 */
export declare class $group {
    /**
     * Creates a group from a number
     * @param {number} number Group ID
     * @param {boolean} [specific=true] Whether to disallow G.js from using that specific group again
     */
    constructor(a: any, specific?: boolean);
    /**
    * Remaps multiple IDs inside of the group to others
    * @param {...array} remaps Array of groups to remap, e.g. remap([group(1), group(2)], [group(4), group(3)]) is valid
    */
    remap(...mps: any[]): this;
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
    move(x: any, y: any, duration?: number, easing?: any, easing_rate?: number, x_multiplier?: number, y_multiplier?: number, multiply?: boolean, silent?: boolean): void;
    /**
     * Combines a move trigger with a follow trigger to allow for more precise decimal movement (up to 2 decimal places)
     * @param {number} x Units to move on the X axis (10 units per grid square)
     * @param {number} y Units to move on the Y axis (10 units per grid square)
     * @param {number} duration Duration of movement
     * @param {easing} easing How smoothly object moves
     * @param {number} easing_rate Easing rate for move trigger
     * @param {boolean} single Saves groups and objects if the group only contains one object
     */
    precise_move(x: any, y: any, duration: any, easing?: any, easing_rate?: number, single?: boolean): void;
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
    scale(center: any, scale_x: any, scale_y: any, duration?: number, easing?: any, easing_rate?: number, x_divide?: boolean, y_divide?: boolean, move_only?: boolean, relative_scale?: boolean, relative_rot?: boolean): void;
    /**
     * Animate trigger implementation
     * @param {number} [anim_id=0] Animation ID (can also use `animations.[monster].[animation name]`, check index module for more info about animation IDs)
     */
    animate(anim_id?: number): void;
    /**
     * Calls the group
     * @param {number} delay How long to delay the group being called
     */
    call(delay?: number): void;
    /**
     * Alpha trigger implementation
     * @param {number} opacity Changed opacity
     * @param {number} duration How long it takes for the opacity to change
     */
    alpha(opacity?: number, duration?: number): void;
    /**
     * Locks group to player
     * @param {boolean} [lock_x=true] Whether to lock to X axis of player
     * @param {boolean} [lock_y=true] Whether to lock to Y axis of player
     * @param {number} [duration=999] How long group is locked to player
     */
    lock_to_player(lock_x?: boolean, lock_y?: boolean, duration?: number): void;
    /**
     * Stops the current group
     */
    stop(): void;
    /**
     * Pauses the current group
     */
    pause(): void;
    /**
     * Resumes the current group
     */
    resume(): void;
    /**
     * Toggles the group on
     */
    toggle_on(): void;
    /**
     * Toggles the group off
     */
    toggle_off(): void;
    /**
     * Rotates the group
     * @param {group} center Group to rotate around
     * @param {number} degrees How many degrees to rotate
     * @param {number} [duration=0] How long it takes for the group to rotate
     * @param {easing} [easing=NONE] How smoothly the object rotates
     * @param {number} [easing_rate=2] Easing rate of rotation
     * @param {boolean} [lock_object_rotation=false] Whether to turn on "lock object rotation"
     */
    rotate(center: any, degrees: any, duration?: number, easing?: any, easing_rate?: number, lock_object_rotation?: boolean): void;
    /**
     * Makes the group follow another
     * @param {group} other Group to follow
     * @param {number} x_mod How much to speed up/slow down movement on X axis
     * @param {number} y_mod How much to speed up/slow down movement on Y axis
     * @param {number} duration How long to follow other group
     */
    follow(other: any, x_mod?: number, y_mod?: number, duration?: number): void;
    /**
     * Keeps an object's position proportionally between 2 others
     * @param {group} groupA Group of object A to follow
     * @param {group} groupB Group of object B to follow
     * @param {number} weight How much of the way the group should be kept in
     * @param {number} duration How long to follow
     */
    follow_lerp(groupA: any, groupB: any, weight?: number, duration?: number): void;
    /**
     * Follows player Y
     * @param {number} [speed=0] How fast group snaps to player Y position
     * @param {number} [delay=0] Delay of movement
     * @param {number} [offset=0] Offset of group
     * @param {number} [max_speed=0] How fast movement of group can be
     * @param {number} [duration=0] How long the group is locked to player Y axis
     */
    follow_player_y(speed?: number, delay?: number, offset?: number, max_speed?: number, duration?: number): void;
    /**
     * Move target implementation
     * @param {group} target Group to move to
     * @param {number} duration How long it takes to move to target
     * @param {boolean} x_only Whether to only move on X axis
     * @param {boolean} y_only Whether to only move on Y axis
     * @param {easing} easing Easing of movement
     * @param {number} easing_rate Easing rate of movement
     */
    move_to(target: any, duration?: number, x_only?: boolean, y_only?: boolean, easing?: any, easing_rate?: number): void;
    /**
     * Moves group to specific coordinate
     * @param {number} x X coordinate
     * @param {number} y Y coordinate
     * @param {number} [duration=0] Duration of movement
     * @param {easing} [easing=0] Easing of movement
     * @param {number} [easing_rate=2] Easing rate of movement
     */
    move_to_xy(x: any, y: any, duration?: number, easing?: any, easing_rate?: number): void;
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
    pulse_hsv(h: any, s: any, b: any, s_checked?: boolean, b_checked?: boolean, fade_in?: number, hold?: number, fade_out?: number, exclusive?: boolean): void;
    /**
     * Pulses group
     * @param {array} color RGB color to pulse
     * @param {number} [fade_in=0] Fade in
     * @param {number} [hold=0] Hold
     * @param {number} [fade_out=0] Fade out
     * @param {number} [exclusive=false] Whether to prioritize over simultaneous pulses
     */
    pulse(c: any, fade_in?: number, hold?: number, fade_out?: number, exclusive?: boolean): void;
}
export default $group;
