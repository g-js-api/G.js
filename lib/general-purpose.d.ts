/**
 * Offsets the camera by a position
 * @param x X offset of camera
 * @param y X offset of camera
 * @param duration Duration that it takes for camera position to change
 */
declare function camera_offset(x: number, y: number, duration?: number): void;

/**
 * Makes the camera static around a target object (group ID)
 * @param group Group storing object to be the center of camera
 * @param duration Duration that it takes for camera to be centered around object
 * @param easing How smoothly the camera moves to the object
 * @param exit_instant Stops static instantly
 * @param exit_static Stops static
 * @param smooth_vel Makes transition to target adapt to current camera velocity (no easing recommended)
 * @param smooth_vel_mod Modifier for smooth velocity
 * @param follow Makes camera change according to object movement
 * @param x_only Makes the camera only be static on X axis
 * @param x_only Makes the camera only be static on Y axis
 */
declare function camera_static(group: group, duration?: number, easing?: easing, exit_instant?: boolean, exit_static?: boolean, smooth_vel?: boolean, smooth_vel_mod?: number, follow?: boolean, x_only?: boolean, x_only?: boolean): void;

/**
 * Makes the camera zoom in/out by a specific amount
 * @param zoom_amount Amount to zoom the camera in by
 * @param duration How long it takes for camera to zoom in
 * @param easing How smoothly the camera zooms in
 */
declare function camera_zoom(zoom_amount: number, duration?: number, easing?: easing): void;

/**
 * Toggles free mode
 * @param free_mode Whether to toggle free mode on or off
 * @param disable_grid_snap Removes default snapping to nearest grid space for the camera center
 * @param edit_cam Whether to edit camera settings
 * @param easing Easing for camera movement (requires edit_cam to be true)
 * @param padding Padding for camera movement (requires edit_cam to be true)
 */
declare function camera_mode(free_mode?: boolean, disable_grid_snap?: boolean, edit_cam?: boolean, easing?: number, padding?: number): void;

/**
 * Rotates camera
 * @param degrees How many degrees to rotate camera by
 * @param move_time How fast rotation happens
 * @param easing How smooth rotation happens
 * @param add Adds input rotation to current camera rotation
 * @param snap360 Converts rotation to closest 360
 */
declare function camera_rotate(degrees: number, move_time?: number, easing?: easing, add?: boolean, snap360?: boolean): void;

/**
 * Makes one of the camera's edges a specific target object
 * @param id Group ID of target object
 * @param edge Defines the edge to set (LEFT_EDGE, RIGHT_EDGE, UP_EDGE, DOWN_EDGE)
 */
declare function camera_edge(id: group, edge: edge): void;

/**
 * Represents a song trigger in GD
 */
declare interface song {
    /**
     * Starts song
     */
    start: start_song;
    /**
     * Edit Song trigger implementation
     */
    edit: edit;
    /**
     * Stops playing the song
     */
    stop: stop;
}

/**
 * Starts playing the song
 */
declare type start_song = ()=>void;

/**
 * Implementation of Edit Song trigger
 * @param new_volume
 * @param new_speed
 * @param duration
 * @param stop
 * @param stop_loop
 * @param gid_1
 * @param gid_2
 * @param vol_near
 * @param vol_med
 * @param vol_far
 * @param min_dist
 * @param dist_2
 * @param dist_3
 * @param p1
 * @param p2
 * @param cam
 * @param vol_dir
 */
declare type edit = (new_volume: number, new_speed: number, duration: number, stop: boolean, stop_loop: boolean, gid_1: group, gid_2: group, vol_near: number, vol_med: number, vol_far: number, min_dist: number, dist_2: number, dist_3: number, p1: boolean, p2: boolean, cam: boolean, vol_dir: 0)=>void;

/**
 * Stops song
 */
declare type stop = ()=>void;

/**
 * Teleports the player to a specific target object
 * @param id Group ID of target object
 */
declare function teleport(id: group): void;

/**
 * Adds a move trigger and returns it
 * @param id Group ID of target object
 * @param x X amount of how much to move the object by
 * @param Y Y amount of how much to move the object by
 * @returns Returned object
 */
declare function move_trigger(id: group, x: number, Y: number): object;

/**
 * Warps all time by given amount
 * @param value How much to warp time by
 */
declare function timewarp(value: number): void;

/**
 * Creates color trigger
 * @param channel Color channel to set
 * @param r Red value in RGB to set
 * @param g Green value in RGB to set
 * @param b Blue value in RGB to set
 * @param duration Duration that it takes for color to change
 * @param opacity Opacity of color (1 = visible, 0 = invisible)
 * @param blending Whether to blend color with others
 * @returns Resulting color trigger
 */
declare function color_trigger(channel: color, r: number, g: number, b: number, duration?: number, opacity?: number, blending?: boolean): object;

/**
 * Returns an activated toggle trigger
 * @param group Group of object
 * @returns Resulting object
 */
declare function toggle_on_trigger(group: group): object;

/**
 * Returns an inactive toggle trigger
 * @param group Group of object
 * @returns Resulting object
 */
declare function toggle_off_trigger(group: group): object;

/**
 * Hides player
 */
declare function hide_player(): void;

/**
 * Creates a gradient trigger and returns it
 * @param color1 First color of gradient
 * @param color2 Second color of gradient
 * @param bl Bottom left vertex
 * @param br Bottom right vertex
 * @param tl Top left vertex
 * @param tr Top right vertex
 * @param vertex_mode Whether to use vertex mode
 * @param blending Whether to make the gradient blending
 * @param layer Layer of gradient (0-15)
 * @returns Resulting gradient trigger
 */
declare function gradient(color1: color, color2: color, bl: group, br: group, tl: group, tr: group, vertex_mode?: boolean, blending?: boolean, layer?: number): object;

/**
 * Implementation of random trigger
 * @param gr1 Group 1
 * @param gr2 Group 2
 * @param chance Chance of either group being called
 */
declare function random(gr1: group, gr2: group, chance: number): void;

/**
 * Implementation of advanced random trigger
 * @param chances Chances of each group being called (e.g. [[group(1), 10], [group(2), 10]] is a valid input)
 */
declare function advanced_random(...chances: any[]): void;

/**
 * Implementation of gravity trigger
 * @param gravity Gravity magnitude
 * @param p1 Only affect player 1
 * @param p2 Only affect player 2
 * @param pt Only affect player that touches trigger
 */
declare function gravity(gravity: number, p1: boolean, p2: boolean, pt: boolean): void;

/**
 * Represents an options trigger
 */
declare interface options {
    /**
     * Streak additive (arg = boolean, optional)
     */
    STREAK_ADDITIVE: Function;
    /**
     * Hide ground (arg = boolean, optional)
     */
    HIDE_GROUND: Function;
    /**
     * Hide middle ground (arg = boolean, optional)
     */
    HIDE_MG: Function;
    /**
     * Hide player 1 (arg = boolean, optional)
     */
    HIDE_P1: Function;
    /**
     * Hide player 2 (arg = boolean, optional)
     */
    HIDE_P2: Function;
    /**
     * Disable player 1 controls (arg = boolean, optional)
     */
    DISABLE_CONTROLS_P1: Function;
    /**
     * Disable player 2 controls (arg = boolean, optional)
     */
    DISABLE_CONTROLS_P2: Function;
    /**
     * Unlink dual gravity (arg = boolean, optional)
     */
    UNLINK_DUAL_GRAVITY: Function;
    /**
     * Hide attempts (arg = boolean, optional)
     */
    HIDE_ATTEMPTS: Function;
    /**
     * Audio on death (arg = boolean, optional)
     */
    AUDIO_ON_DEATH: Function;
    /**
     * No death SFX (arg = boolean, optional)
     */
    NO_DEATH_SFX: Function;
    /**
     * Respawn time (arg = number, required)
     */
    RESPAWN_TIME: Function;
    /**
     * Adds options trigger
     */
    add: Function;
}

/**
 * Ends level
 * @param instant_end Whether to end level instantly
 * @param no_effects Whether to remove effects
 * @param no_sfx Whether to remove SFX
 * @param spawn_id Group to spawn on end
 * @param target_pos Object defining end position
 */
declare function end(instant_end?: boolean, no_effects?: boolean, no_sfx?: boolean, spawn_id: group, target_pos: group): void;

/**
 * Implementation of player control trigger
 * @param p1 Only controls P1
 * @param p2 Only controls P2
 * @param stop_jump Stops player from jumping
 * @param stop_move Stops player from moving
 * @param stop_rot Stops player from rotating
 * @param stop_slide Stops player from sliding
 */
declare function player_control(p1?: boolean, p2?: boolean, stop_jump?: boolean, stop_move?: boolean, stop_rot?: boolean, stop_slide?: boolean): void;

