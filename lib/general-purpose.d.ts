import type { OptionsTrigger } from '../core';
/**
 * Offsets the camera by a position
 * @param {number} x X offset of camera
 * @param {number} y X offset of camera
 * @param {number} [duration=0] Duration that it takes for camera position to change
 * @param {number} [easing=NONE] Easing for camera movement
 * @category Functions
 * @group General Purpose
 */
export declare let camera_offset: (x: any, y: any, duration?: number, easing?: number) => void;
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
export declare let camera_static: (gr: any, duration?: number, easing?: number, easing_rate?: number, exit_instant?: boolean, exit_static?: boolean, smooth_vel?: boolean, smooth_vel_mod?: number, follow?: boolean, x_only?: boolean, y_only?: boolean) => void;
/**
 * Makes the camera zoom in/out by a specific amount
 * @param {number} zoom_am Amount to zoom the camera in by
 * @param {number} [duration=0] How long it takes for camera to zoom in
 * @param {number} [easing=NONE] How smoothly the camera zooms in
 * @category Functions
 * @group General Purpose
 */
export declare let camera_zoom: (zoom_am: any, duration?: number, easing?: number) => void;
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
export declare let camera_mode: (free_mode?: boolean, disable_grid_snap?: boolean, edit_cam?: boolean, easing?: number, padding?: number) => void;
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
export declare let camera_rotate: (degrees: any, move_time?: number, easing?: number, add?: boolean, snap360?: boolean) => void;
/**
 * Makes one of the camera's edges a specific target object
 * @param {any} id Group ID of target object
 * @param {number} edge Defines the edge to set (LEFT_EDGE, RIGHT_EDGE, UP_EDGE, DOWN_EDGE)
 * @category Functions
 * @group General Purpose
 */
export declare let camera_edge: (id: any, edge: any) => void;
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
export declare let song: (song_id: any, loop?: boolean, preload?: boolean, channel?: number, volume?: number, speed?: number, start?: number, end?: number, fadein?: number, fadeout?: number) => any;
/**
* Teleports the player to a specific target object
* @param {any} g Group ID of target object or [x, y] coordinates
* @param {boolean} [no_effects] Weather the teleport trigger generates an effect
*/
export declare let teleport: (g: any, no_effects: any) => void;
/**
 * Adds a move trigger and returns it
 * @param {any} group Group ID of target object
 * @param {number} x X amount of how much to move the object by
 * @param {number} y Y amount of how much to move the object by
 * @returns {any} Returned object
 * @category Functions
 * @group General Purpose
 */
export declare let move_trigger: (group: any, x: any, y: any) => import("../core").GJsObject;
/**
 * Warps all time by given amount
 * @param {number} val How much to warp time by
 */
export declare let timewarp: (val: any) => void;
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
export declare let color_trigger: (channel: any, r: any, g: any, b: any, duration?: number, opacity?: number, blending?: boolean) => import("../core").GJsObject;
/**
* Returns an activated toggle trigger
* @param {any} group_id Group of object
* @returns {any} Resulting object
*/
export declare let toggle_on_trigger: (group_id: any) => import("../core").GJsObject;
/**
 * Returns an inactive toggle trigger
 * @param {any} group_id Group of object
 * @returns {any} Resulting object
 */
export declare let toggle_off_trigger: (group_id: any) => import("../core").GJsObject;
/**
* Hides player
*/
export declare let hide_player: () => void;
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
*/
export declare let gradient: (col: any, col2: any, bl: any, br: any, tl: any, tr: any, vertex_mode?: boolean, blending?: boolean, layer?: number) => import("../core").GJsObject;
/**
 * Creates a particle system
 * @param {any} props Dictionary holding particle properties (check {@tutorial Particles} for more info)
 * @param {boolean} [use_obj_color=false] Whether to make the particle system use the object color
 * @param {boolean} [animate_on_trigger=false] Whether to only start the particle system when the Animate trigger is used on the particle system instead of immediately
 * @param {boolean} [animate_active_only=false] Only makes animate_on_trigger true if the object is active
 * @param {boolean} [quick_start=false] Makes normal movement be achieved instantly instead of gradually
 * @returns {any} Returned particle system
 */
export declare let particle_system: (props: any, use_obj_color?: boolean, animate_on_trigger?: boolean, animate_active_only?: boolean, quick_start?: boolean) => import("../core").GJsObject;
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
 */
export declare let spawn_particle: (particle_group: any, pos_group?: import("../core").$group, offset_x?: number, offset_y?: number, scale?: number, scale_var?: number, rotation?: number, rotation_var?: number, offvar_x?: number, offvar_y?: number, match_rot?: boolean) => void;
/**
 * Implementation of random trigger
 * @param {any} gr1 Group 1
 * @param {any} gr2 Group 2
 * @param {number} chance Chance of either group being called
 */
export declare let random: (gr1: any, gr2: any, chance: any) => void;
/**
 * Implementation of advanced random trigger
 * @param {any[]} chances Chances of each group being called (e.g. [[group(1), 10], [group(2), 10]] is a valid input)
 */
export declare let advanced_random: (...chances: any[]) => void;
/**
* Implementation of gravity trigger
* @param {number} grav Gravity magnitude
* @param {boolean} p1 Only affect player 1
* @param {boolean} p2 Only affect player 2
* @param {boolean} pt Only affect player that touches trigger
*/
export declare let gravity: (grav: any, p1?: boolean, p2?: boolean, pt?: boolean) => void;
/**
 * Implementation of options trigger
 * @returns {OptionsTrigger} Options trigger
 */
export declare let options: () => OptionsTrigger;
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
export declare let end: (instant_end?: boolean, no_effects?: boolean, no_sfx?: boolean, spawn_id?: import("../core").$group, target_pos?: import("../core").$group) => void;
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
export declare let player_control: (p1?: boolean, p2?: boolean, stop_jump?: boolean, stop_move?: boolean, stop_rot?: boolean, stop_slide?: boolean) => void;
