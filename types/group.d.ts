declare interface group {
    /**
     * Remaps multiple IDs inside of the group to others
     */
    remap: Function;
    /**
     * Moves the group
     */
    move: Function;
    /**
     * Calls the group
     */
    call: Function;
    /**
     * Alpha trigger implementation
     */
    alpha: Function;
    /**
     * Locks group to player
     */
    lock_to_player: Function;
    /**
     * Stops the current group
     */
    stop: Function;
    /**
     * Toggles the group on
     */
    toggle_on: Function;
    /**
     * Toggles the group off
     */
    toggle_off: Function;
    /**
     * Rotates the group
     */
    rotate: Function;
    /**
     * Makes the group follow another
     */
    follow: Function;
    /**
     * Keeps an object's position proportionally between 2 others
     */
    follow_lerp: Function;
    /**
     * Follows player Y
     */
    follow_player_y: Function;
    /**
     * Move target implementation
     */
    move_to: Function;
    /**
     * Moves group to specific coordinate
     */
    move_to_xy: Function;
    /**
     * Pulses group w/ HSV
     */
    pulse_hsv: Function;
    /**
     * Pulses group
     */
    pulse: Function;
}

declare class $group {
    /**
     * Representation of groups
     */
    constructor(number: number, specific?: boolean);

    /**
     * Remaps multiple IDs inside of the group to others
     * @param remaps Array of groups to remap, e.g. remap([group(1), group(2)], [group(4), group(3)]) is valid
     */
    remap(...remaps: any[]): void;

    /**
     * Moves the group
     * @param x Movement on X axis
     * @param y Movement on Y axis
     * @param duration Duration for move trigger
     * @param easing How smoothly object moves
     * @param easing_rate Easing rate for move trigger
     * @param x_multiplier How much to multiply the amount by on X axis
     * @param y_multiplier How much to multiply the amount by on Y axis
     * @param multiply Whether to fit the amount of units moved into GD units (multiplying by 3 does this)
     * @param delay_trig Whether to do wait(duration)
     */
    move(x: number, y: number, duration?: number, easing: easing, easing_rate?: number, x_multiplier?: number, y_multiplier?: number, multiply?: boolean, delay_trig?: boolean): void;

    /**
     * Scales the group
     * @param center Center of group for scaling
     * @param scale_x Scaling on X axis
     * @param scale_y Scaling on Y axis
     * @param duration Duration for scale trigger
     * @param easing How smoothly object gets scaled
     * @param easing_rate Easing rate for scale trigger
     * @param x_divide Whether to divide the current scaling by scale_x
     * @param y_divide Whether to divide the current scaling by scale_y
     * @param move_only Whether to emulate the effect of scaling without actually scaling the group by moving the group instead
     * @param relative_scale Bases scaling on the reference object
     * @param relative_rot Whether to rotate the X and Y axis
     */
    scale(center: group, scale_x: number, scale_y: number, duration?: number, easing?: easing, easing_rate?: number, x_divide?: boolean, y_divide?: boolean, move_only?: boolean, relative_scale?: boolean, relative_rot?: boolean): void;

    /**
     * Calls the group
     * @param delay How long to delay the group being called
     */
    call(delay?: number): void;

    /**
     * Alpha trigger implementation
     * @param opacity Changed opacity
     * @param duration How long it takes for the opacity to change
     */
    alpha(opacity?: number, duration?: number): void;

    /**
     * Locks group to player
     * @param lock_x Whether to lock to X axis of player
     * @param lock_y Whether to lock to Y axis of player
     * @param duration How long group is locked to player
     */
    lock_to_player(lock_x?: boolean, lock_y?: boolean, duration?: number): void;

    /**
     * Stops the current group
     */
    stop(): void;

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
     * @param center Group to rotate around
     * @param degrees How many degrees to rotate
     * @param duration How long it takes for the group to rotate
     * @param easing How smoothly the object rotates
     * @param easing_rate Easing rate of rotation
     * @param lock_object_rotation Whether to turn on "lock object rotation"
     */
    rotate(center: group, degrees: number, duration?: number, easing?: easing, easing_rate?: number, lock_object_rotation?: boolean): void;

    /**
     * Makes the group follow another
     * @param other Group to follow
     * @param x_mod How much to speed up/slow down movement on X axis
     * @param y_mod How much to speed up/slow down movement on Y axis
     * @param duration How long to follow other group
     */
    follow(other: group, x_mod?: number, y_mod?: number, duration?: number): void;

    /**
     * Keeps an object's position proportionally between 2 others
     * @param groupA Group of object A to follow
     * @param groupB Group of object B to follow
     * @param weight How much of the way the group should be kept in
     * @param duration How long to follow
     */
    follow_lerp(groupA: group, groupB: group, weight?: number, duration?: number): void;

    /**
     * Follows player Y
     * @param speed How fast group snaps to player Y position
     * @param delay Delay of movement
     * @param offset Offset of group
     * @param max_speed How fast movement of group can be
     * @param duration How long the group is locked to player Y axis
     */
    follow_player_y(speed?: number, delay?: number, offset?: number, max_speed?: number, duration?: number): void;

    /**
     * Move target implementation
     * @param target Group to move to
     * @param duration How long it takes to move to target
     * @param x_only Whether to only move on X axis
     * @param y_only Whether to only move on Y axis
     * @param easing Easing of movement
     * @param easing_rate Easing rate of movement
     */
    move_to(target: group, duration?: number, x_only?: boolean, y_only?: boolean, easing: easing, easing_rate?: number): void;

    /**
     * Moves group to specific coordinate
     * @param x X coordinate
     * @param y Y coordinate
     * @param duration Duration of movement
     * @param easing Easing of movement
     * @param easing_rate Easing rate of movement
     */
    move_to_xy(x: number, y: number, duration?: number, easing?: easing, easing_rate?: number): void;

    /**
     * Pulses group w/ HSV
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
     * Pulses group
     * @param color RGB color to pulse
     * @param fade_in Fade in
     * @param hold Hold
     * @param fade_out Fade out
     * @param exclusive Whether to prioritize over simultaneous pulses
     */
    pulse(color: any[], fade_in?: number, hold?: number, fade_out?: number, exclusive?: number): void;

}

