/**
 * Creates a spawn trigger and returns it
 * @param group - group to be spawned
 * @param time - delay to spawn group
 */
declare function spawn_trigger(group: group, time: number): any;

/**
 * Extracts values from dictionary into global scope
 * @param dict - Dictionary to extract
 */
declare function extract(dict: dictionary): void;

/**
 * Creates a repeating trigger system that repeats while a condition is true
 * @param condition - Condition that defines whether the loop should keep on running (less_than/equal_to/greater_than(counter, number))
 * @param func - Function to run while the condition is true
 * @param delay - Delay between each cycle
 */
declare function while_loop(condition: condition, func: (...params: any[]) => any, delay: number): void;

/**
 * Converts a number to a group
 * @param x - The number to convert to a group.
 */
declare function group(x: number): group;

/**
 * Converts a number to a color
 * @param x - The number to convert to a color.
 */
declare function color(x: number): color;

/**
 * Converts a number to a block
 * @param x - The number to convert to a block.
 */
declare function block(x: number): block;

/**
 * Creates and returns an unavailable group ID
 * @returns Resulting group ID
 */
declare function unknown_g(): group;

/**
 * Creates and returns an unavailable color ID
 * @returns Resulting color ID
 */
declare function unknown_c(): color;

/**
 * Creates and returns an unavailable block ID
 * @returns Resulting block ID
 */
declare function unknown_b(): block;

/**
 * Creates a "trigger function" in which triggers can be stored inside of a single group
 * @param callback - Function storing triggers to put inside of group
 * @returns Group ID of trigger function
 */
declare function trigger_function(callback: (...params: any[]) => any): group;

/**
 * Waits for a specific amount of seconds
 * @param time - How long to wait
 */
declare function wait(time: number): void;

/**
 * @property EASE_IN_OUT - Ease in out easing
 * @property EASE_IN - Ease in easing
 * @property EASE_OUT - Ease out easing
 * @property EXPONENTIAL_IN_OUT - Exponential in out easing
 * @property EXPONENTIAL_IN - Exponential in easing
 * @property EXPONENTIAL_OUT - Exponential out easing
 * @property SINE_IN_OUT - Sine in out easing
 * @property SINE_IN - Sine in easing
 * @property SINE_OUT - Sine out easing
 * @property ELASTIC_IN_OUT - Elastic in out easing
 * @property ELASTIC_IN - Elastic in easing
 * @property ELASTIC_OUT - Elastic out easing
 * @property BACK_IN_OUT - Back in out easing
 * @property BACK_IN - Back in easing
 * @property BACK_OUT - Back out easing
 * @property BOUNCE_IN_OUT - Bounce in out easing
 * @property BOUNCE_IN - Bounce in easing
 * @property BOUNCE_OUT - Bounce out easing
 */
declare type easing = {
    EASE_IN_OUT: number;
    EASE_IN: number;
    EASE_OUT: number;
    EXPONENTIAL_IN_OUT: number;
    EXPONENTIAL_IN: number;
    EXPONENTIAL_OUT: number;
    SINE_IN_OUT: number;
    SINE_IN: number;
    SINE_OUT: number;
    ELASTIC_IN_OUT: number;
    ELASTIC_IN: number;
    ELASTIC_OUT: number;
    BACK_IN_OUT: number;
    BACK_IN: number;
    BACK_OUT: number;
    BOUNCE_IN_OUT: number;
    BOUNCE_IN: number;
    BOUNCE_OUT: number;
};

/**
 * Configuration for exporting levels
 * @property info - Whether to log information to console when finished
 * @property group_count_warning - Whether to warn that group count is surpassed (only useful if in future updates the group count is increased)
 * @property level_name - Name of level (only for exportToSavefile)
 * @property path - Path to CCLocalLevels.dat savefile (only for exportToSavefile)
 */
declare type save_config = {
    info: boolean;
    group_count_warning: boolean;
    level_name: string;
    path: string;
};

/**
 * Core type holding important functions for adding to levels, exporting and modifying scripts
 * @property add - Adds an object
 * @property print - Prints to console
 * @property getLevelString - Returns level string of the script
 * @property extend_trigger_func - Extends a trigger function by adding more triggers to it
 * @property exportToSavefile - Exports script to savefile
 * @property liveEditor - Exports script to live editor using WSLiveEditor (requires Geode)
 * @property trigger_fn_context - Returns group of current trigger function context
 */
declare type $ = {
    add: add;
    print: print;
    getLevelString: getLevelString;
    extend_trigger_func: extend_trigger_func;
    exportToSavefile: exportToSavefile;
    liveEditor: liveEditor;
    trigger_fn_context: trigger_fn_context;
};

/**
 * Adds an object
 * @param object - Object to add
 */
declare type add = (object: any) => void;

/**
 * Prints to console
 * @param value - Value to print
 */
declare type print = (value: any) => void;

/**
 * Extends a trigger function by adding more triggers to it
 * @param trigger_func - Trigger function to extend
 * @param callback - Function that adds more triggers to trigger_func
 */
declare type extend_trigger_func = (trigger_func: group, callback: (...params: any[]) => any) => void;

/**
 * Returns level string
 * @param config - Configuration for exporting to levelstring
 */
declare type getLevelString = (config: save_config) => string;

/**
 * Exports script to savefile
 * @param config - Configuration for exporting to savefile
 */
declare type exportToSavefile = (config: save_config) => void;

/**
 * Exports script to live editor using WSLiveEditor (requires Geode)
 * @param config - Configuration for exporting to live editor
 */
declare type liveEditor = (config: save_config) => void;

/**
 * Returns group of current trigger function context
 */
declare type trigger_fn_context = () => group;

/**
 * Creates a particle system
 * @param props - Dictionary holding particle properties (check {@tutorial Particles} for more info)
 * @param [use_obj_color = false] - Whether to make the particle system use the object color
 * @param [animate_on_trigger = false] - Whether to only start the particle system when the Animate trigger is used on the particle system instead of immediately
 * @param [animate_active_only = false] - Only makes animate_on_trigger true if the object is active
 * @param [quick_start = false] - Makes normal movement be achieved instantly instead of gradually
 * @returns Returned particle system
 */
declare function particle_system(props: dictionary, use_obj_color?: boolean, animate_on_trigger?: boolean, animate_active_only?: boolean, quick_start?: boolean): any;

/**
 * Generates an array holding a sequence of numbers starting at the "start" parameter, ending at the "end" parameter and incrementing by "step"
 * @param start - What number to start at
 * @param end - What number to end at
 * @param step - What number to increment by
 * @returns Resulting sequence
 */
declare function range(start: number, end: number, step?: number): any[];

/**
 * Represents gamescene (all functions in this type are made to be used with on())
 * @property button_a - Returns an event when the left side is pressed
 * @property button_b - Returns an event when the right side is pressed
 * @property button_a_end - Returns an event when the left side is no longer pressed
 * @property button_b_end - Returns an event when the right side is no longer pressed
 * @property stop - Stops playing the song
 */
declare type gamescene = {
    button_a: (...params: any[]) => any;
    button_b: (...params: any[]) => any;
    button_a_end: (...params: any[]) => any;
    button_b_end: (...params: any[]) => any;
    stop: stop;
};

/**
 * Represents gamescene (all functions in this type are made to be used with on())
 * @property button_a - Returns an event when the left side is pressed
 * @property button_b - Returns an event when the right side is pressed
 * @property button_a_end - Returns an event when the left side is no longer pressed
 * @property button_b_end - Returns an event when the right side is no longer pressed
 * @property stop - Stops playing the song
 */
declare type gamescene = {
    button_a: (...params: any[]) => any;
    button_b: (...params: any[]) => any;
    button_a_end: (...params: any[]) => any;
    button_b_end: (...params: any[]) => any;
    stop: stop;
};

/**
 * Returns a greater than condition
 * @param counter - Counter to compare to number
 * @param other - Number to be compared to counter
 */
declare function greater_than(counter: counter, other: number): condition;

/**
 * Returns a equal to condition
 * @param counter - Counter to compare to number
 * @param other - Number to be compared to counter
 */
declare function equal_to(counter: counter, other: number): condition;

/**
 * Returns a less than condition
 * @param counter - Counter to compare to number
 * @param other - Number to be compared to counter
 */
declare function less_than(counter: counter, other: number): condition;

/**
 * Calls a group with a delay
 * @param delay - How much to delay by
 * @param group - Group to call
 */
declare function call_with_delay(delay: number, group: group): void;

/**
 * Implementation of sequence trigger
 * @param sequence - Sequence of groups to be called (e.g. [[group(1), 1], [group(2), 1]] is a valid input)
 * @param [mode = 0] - Mode of sequence trigger (0 = stop, 1 = loop, 2 = last)
 * @param [min_int = 0] - MinInt of sequence trigger
 * @param [reset = 0] - Reset of sequence trigger (0 = full, 1 = step)
 * @returns Function that steps through the sequence once
 */
declare function sequence(sequence: any[], mode?: number, min_int?: number, reset?: number): (...params: any[]) => any;

/**
 * Creates trigger function-like systems, but can be called normally with item IDs as arguments (e.g. a remappable can be called like `my_remappable(counter1.item)`)
 * @param fn - Function that remappable uses
 * @returns Function to call
 */
declare function remappable(fn: (...params: any[]) => any): (...params: any[]) => any;

/**
 * Loops a function a specific amount of times (defined by range)
 * @param range - Range of numbers defining how many times to loop fn by
 * @param fn - Function to loop
 * @param [delay = 0.05] - How much to delay between cycle
 */
declare function for_loop(range: any[], fn: (...params: any[]) => any, delay?: number): void;

/**
 * Represents a counter, which is a wrapper around item IDs
 * @property item - Item ID of a counter
 * @property type - Type of a counter
 * @property add - Adds a specific amount (or another counter) to the current counter
 * @property subtract - Subtracts a specific amount (or another counter) from the current counter
 * @property multiply - Multiplies the current counter by a specific amount (or another counter)
 * @property divide - Divides the current counter by a specific amount (or another counter)
 * @property set - Sets the current counter to a specific amount or another counter
 * @property reset - Resets the current counter to 0
 * @property if_is - Checks if a comparison is true, and if so calls a group (SMALLER_THAN/EQUAL_TO_LARGER_THAN)
 * @property to_const - Converts the current counter to a plain number by taking in a range of possible values and a function
 * @property copy_to - Copies the current counter to another counter
 * @property display - Displays the current counter at a specific position
 * @property to_obj - Returns item display for current counter as an object
 * @property add_to - Adds the current counter to another and resets the current counter
 * @property subtract_from - Subtracts the current counter from another and resets the current counter
 */
declare type counter = {
    item: item;
    type: item_type;
    add: add;
    subtract: subtract;
    multiply: multiply;
    divide: divide;
    set: set;
    reset: reset;
    if_is: if_is;
    to_const: to_const;
    copy_to: copy_to;
    display: display;
    to_obj: to_obj;
    add_to: add_to;
    subtract_from: subtract_from;
};

/**
 * Adds an object
 * @param object - Object to add
 */
declare type add = (object: any) => void;

/**
 * Subtracts a specific amount (or another counter) from the current counter
 * @param amount - Counter or number to subtract from the current counter
 */
declare type subtract = (amount: number | counter) => void;

/**
 * Multiplies the current counter by a specific amount (or another counter)
 * @param amount - Counter or number to multiply the current counter by
 */
declare type multiply = (amount: number | counter) => void;

/**
 * Divides the current counter by a specific amount (or another counter)
 * @param amount - Counter or number to divide the current counter by
 */
declare type divide = (amount: number | counter) => void;

/**
 * Sets the current counter to a specific amount (or another counter)
 * @param amount - Counter or number to set the current counter to
 */
declare type set = (amount: number | counter) => void;

/**
 * Resets the current counter to 0
 */
declare type reset = () => void;

/**
 * Returns item display for current counter as an object
 */
declare type to_obj = () => any;

/**
 * Checks if a comparison is true, and if so calls a group (SMALLER_THAN/EQUAL_TO_LARGER_THAN)
 * @param comparison - Condition to check for between the counter and number
 * @param other - Number to compare the current counter to
 * @param trig_func - Trigger function or group to run if the comparison is true
 */
declare type if_is = (comparison: comparison, other: number, trig_func: group) => void;

/**
 * Converts the current counter to a plain number by taking in a range of possible values and a function
 * @param range - Possible range of values that the current counter is equal to
 * @param func - Callback function to run that takes the plain numerical value as input
 */
declare type to_const = (range: any[], func: (...params: any[]) => any) => void;

/**
 * Displays the current counter at a specific position
 * @param x - X position of item display
 * @param y - Y position of item display
 */
declare type display = (x: number, y: number) => void;

/**
 * Copies the current counter to another counter
 * @param counter - Counter to copy the current counter to
 */
declare type copy_to = (counter: counter) => void;

/**
 * Adds the current counter to another and resets the current counter
 * @param counter - Counter to add the current counter to
 */
declare type add_to = (counter: counter) => void;

/**
 * Subtracts the current counter from another and resets the current counter
 * @param counter - Counter to be subtracted from
 */
declare type subtract_from = (counter: counter) => void;

/**
 * Represents a counter, which is a wrapper around item IDs
 * @property item - Item ID of a counter
 * @property type - Type of a counter
 * @property add - Adds a specific amount (or another counter) to the current counter
 * @property subtract - Subtracts a specific amount (or another counter) from the current counter
 * @property multiply - Multiplies the current counter by a specific amount (or another counter)
 * @property divide - Divides the current counter by a specific amount (or another counter)
 * @property set - Sets the current counter to a specific amount or another counter
 * @property reset - Resets the current counter to 0
 * @property if_is - Checks if a comparison is true, and if so calls a group (SMALLER_THAN/EQUAL_TO_LARGER_THAN)
 * @property to_const - Converts the current counter to a plain number by taking in a range of possible values and a function
 * @property copy_to - Copies the current counter to another counter
 * @property display - Displays the current counter at a specific position
 * @property to_obj - Returns item display for current counter as an object
 * @property add_to - Adds the current counter to another and resets the current counter
 * @property subtract_from - Subtracts the current counter from another and resets the current counter
 */
declare type counter = {
    item: item;
    type: item_type;
    add: add;
    subtract: subtract;
    multiply: multiply;
    divide: divide;
    set: set;
    reset: reset;
    if_is: if_is;
    to_const: to_const;
    copy_to: copy_to;
    display: display;
    to_obj: to_obj;
    add_to: add_to;
    subtract_from: subtract_from;
};

/**
 * Calls a group when an event occurs
 * @param event - Event to listen to
 * @param group - Group of object
 */
declare function on(event: event, group: group): void;

/**
 * Listens to when the screen is touched
 * @param [dual_side = false] - Whether to only listen to dual side
 */
declare function touch(dual_side?: boolean): event;

/**
 * Listens to when the screen stops being touched
 * @param [dual_side = false] - Whether to only listen to dual side
 */
declare function touch_end(dual_side?: boolean): event;

/**
 * Listens to when two collision blocks collide
 * @param block_a - First block to listen to
 * @param block_b - Second block to listen to
 */
declare function collision(block_a: block, block_b: block): event;

/**
 * Listens to when two collision blocks stop colliding
 * @param block_a - First block to listen to
 * @param block_b - Second block to listen to
 */
declare function collision_exit(block_a: block, block_b: block): event;

/**
 * Listens to when the player dies
 */
declare function death(): event;

/**
 * Listens to when an item hits a specific number
 * @param item - Item to listen to
 * @param num - Number that triggers event when the item hits this
 * @param multi - Whether to trigger the event multiple time
 */
declare function count(item: item, num: number, multi: boolean): event;

/**
 * Listens to when the player reaches a specific X position
 * @param x - X position where event is called
 */
declare function x_position(x: number): event;

/**
 * Implementation of the event trigger that triggers an event
 * @param event - Event(s) to be listened to (look at {@tutorial Events} for more info)
 * @param extra_id - Implementation of extra ID 1
 * @param extra_id2 - Implementation of extra ID 2
 */
declare function event(event: any[] | event_id, extra_id: group, extra_id2: group): event;

/**
 * Offsets the camera by a position
 * @param x - X offset of camera
 * @param y - X offset of camera
 * @param [duration = 0] - Duration that it takes for camera position to change
 */
declare function camera_offset(x: number, y: number, duration?: number): void;

/**
 * Makes the camera static around a target object (group ID)
 * @param group - Group storing object to be the center of camera
 * @param [duration = 0] - Duration that it takes for camera to be centered around object
 * @param [easing = NONE] - How smoothly the camera moves to the object
 * @param [exit_instant = false] - Stops static instantly
 * @param [exit_static = false] - Stops static
 * @param [smooth_vel = false] - Makes transition to target adapt to current camera velocity (no easing recommended)
 * @param [smooth_vel_mod = 0] - Modifier for smooth velocity
 * @param [follow = false] - Makes camera change according to object movement
 * @param [x_only = false] - Makes the camera only be static on X axis
 * @param [x_only = false] - Makes the camera only be static on Y axis
 */
declare function camera_static(group: group, duration?: number, easing?: easing, exit_instant?: boolean, exit_static?: boolean, smooth_vel?: boolean, smooth_vel_mod?: number, follow?: boolean, x_only?: boolean, x_only?: boolean): void;

/**
 * Makes the camera zoom in/out by a specific amount
 * @param zoom_amount - Amount to zoom the camera in by
 * @param [duration = 0] - How long it takes for camera to zoom in
 * @param [easing = NONE] - How smoothly the camera zooms in
 */
declare function camera_zoom(zoom_amount: number, duration?: number, easing?: easing): void;

/**
 * Toggles free mode
 * @param [free_mode = true] - Whether to toggle free mode on or off
 * @param [disable_grid_snap = false] - Removes default snapping to nearest grid space for the camera center
 * @param [edit_cam = false] - Whether to edit camera settings
 * @param [easing = 10] - Easing for camera movement (requires edit_cam to be true)
 * @param [padding = 0.50] - Padding for camera movement (requires edit_cam to be true)
 */
declare function camera_mode(free_mode?: boolean, disable_grid_snap?: boolean, edit_cam?: boolean, easing?: number, padding?: number): void;

/**
 * Rotates camera
 * @param degrees - How many degrees to rotate camera by
 * @param [move_time = 0] - How fast rotation happens
 * @param [easing = NONE] - How smooth rotation happens
 * @param [add = false] - Adds input rotation to current camera rotation
 * @param [snap360 = false] - Converts rotation to closest 360
 */
declare function camera_rotate(degrees: number, move_time?: number, easing?: easing, add?: boolean, snap360?: boolean): void;

/**
 * Makes one of the camera's edges a specific target object
 * @param id - Group ID of target object
 * @param edge - Defines the edge to set (LEFT_EDGE, RIGHT_EDGE, UP_EDGE, DOWN_EDGE)
 */
declare function camera_edge(id: group, edge: edge): void;

/**
 * Represents a song trigger in GD
 * @property start - Starts song
 * @property edit - Edit Song trigger implementation
 * @property stop - Stops playing the song
 */
declare type song = {
    start: start_song;
    edit: edit;
    stop: stop;
};

/**
 * Starts playing the song
 */
declare type start_song = () => void;

/**
 * Implementation of Edit Song trigger
 */
declare type edit = (new_volume: number, new_speed: number, duration: number, stop: boolean, stop_loop: boolean, gid_1: group, gid_2: group, vol_near: number, vol_med: number, vol_far: number, min_dist: number, dist_2: number, dist_3: number, p1: boolean, p2: boolean, cam: boolean, vol_dir: 0) => void;

/**
 * Stops song
 */
declare type stop = () => void;

/**
 * Represents a song trigger in GD
 * @property start - Starts song
 * @property edit - Edit Song trigger implementation
 * @property stop - Stops playing the song
 */
declare type song = {
    start: start_song;
    edit: edit;
    stop: stop;
};

/**
 * Teleports the player to a specific target object
 * @param id - Group ID of target object
 */
declare function teleport(id: group): void;

/**
 * Adds a move trigger and returns it
 * @param id - Group ID of target object
 * @param x - X amount of how much to move the object by
 * @param Y - Y amount of how much to move the object by
 * @returns Returned object
 */
declare function move_trigger(id: group, x: number, Y: number): any;

/**
 * Warps all time by given amount
 * @param value - How much to warp time by
 */
declare function timewarp(value: number): void;

/**
 * Creates color trigger
 * @param channel - Color channel to set
 * @param r - Red value in RGB to set
 * @param g - Green value in RGB to set
 * @param b - Blue value in RGB to set
 * @param [duration = 0] - Duration that it takes for color to change
 * @param [opacity = 1] - Opacity of color (1 = visible, 0 = invisible)
 * @param [blending = false] - Whether to blend color with others
 * @returns Resulting color trigger
 */
declare function color_trigger(channel: color, r: number, g: number, b: number, duration?: number, opacity?: number, blending?: boolean): any;

/**
 * Returns an activated toggle trigger
 * @param group - Group of object
 * @returns Resulting object
 */
declare function toggle_on_trigger(group: group): any;

/**
 * Returns an inactive toggle trigger
 * @param group - Group of object
 * @returns Resulting object
 */
declare function toggle_off_trigger(group: group): any;

/**
 * Hides player
 */
declare function hide_player(): void;

/**
 * Creates a gradient trigger and returns it
 * @param color1 - First color of gradient
 * @param color2 - Second color of gradient
 * @param bl - Bottom left vertex
 * @param br - Bottom right vertex
 * @param tl - Top left vertex
 * @param tr - Top right vertex
 * @param [vertex_mode = true] - Whether to use vertex mode
 * @param [blending = false] - Whether to make the gradient blending
 * @param [layer = 0] - Layer of gradient (0-15)
 * @returns Resulting gradient trigger
 */
declare function gradient(color1: color, color2: color, bl: group, br: group, tl: group, tr: group, vertex_mode?: boolean, blending?: boolean, layer?: number): any;

/**
 * Implementation of random trigger
 * @param gr1 - Group 1
 * @param gr2 - Group 2
 * @param chance - Chance of either group being called
 */
declare function random(gr1: group, gr2: group, chance: number): void;

/**
 * Implementation of advanced random trigger
 * @param chances - Chances of each group being called (e.g. [[group(1), 10], [group(2), 10]] is a valid input)
 */
declare function advanced_random(...chances: any[][]): void;

/**
 * Implementation of gravity trigger
 * @param gravity - Gravity magnitude
 * @param p1 - Only affect player 1
 * @param p2 - Only affect player 2
 * @param pt - Only affect player that touches trigger
 */
declare function gravity(gravity: number, p1: boolean, p2: boolean, pt: boolean): void;

/**
 * Represents an options trigger
 * @property STREAK_ADDITIVE - Streak additive (arg = boolean, optional)
 * @property HIDE_GROUND - Hide ground (arg = boolean, optional)
 * @property HIDE_MG - Hide middle ground (arg = boolean, optional)
 * @property HIDE_P1 - Hide player 1 (arg = boolean, optional)
 * @property HIDE_P2 - Hide player 2 (arg = boolean, optional)
 * @property DISABLE_CONTROLS_P1 - Disable player 1 controls (arg = boolean, optional)
 * @property DISABLE_CONTROLS_P2 - Disable player 2 controls (arg = boolean, optional)
 * @property UNLINK_DUAL_GRAVITY - Unlink dual gravity (arg = boolean, optional)
 * @property HIDE_ATTEMPTS - Hide attempts (arg = boolean, optional)
 * @property AUDIO_ON_DEATH - Audio on death (arg = boolean, optional)
 * @property NO_DEATH_SFX - No death SFX (arg = boolean, optional)
 * @property RESPAWN_TIME - Respawn time (arg = number, required)
 * @property add - Adds options trigger
 */
declare type options = {
    STREAK_ADDITIVE: (...params: any[]) => any;
    HIDE_GROUND: (...params: any[]) => any;
    HIDE_MG: (...params: any[]) => any;
    HIDE_P1: (...params: any[]) => any;
    HIDE_P2: (...params: any[]) => any;
    DISABLE_CONTROLS_P1: (...params: any[]) => any;
    DISABLE_CONTROLS_P2: (...params: any[]) => any;
    UNLINK_DUAL_GRAVITY: (...params: any[]) => any;
    HIDE_ATTEMPTS: (...params: any[]) => any;
    AUDIO_ON_DEATH: (...params: any[]) => any;
    NO_DEATH_SFX: (...params: any[]) => any;
    RESPAWN_TIME: (...params: any[]) => any;
    add: (...params: any[]) => any;
};

/**
 * Represents an options trigger
 * @property STREAK_ADDITIVE - Streak additive (arg = boolean, optional)
 * @property HIDE_GROUND - Hide ground (arg = boolean, optional)
 * @property HIDE_MG - Hide middle ground (arg = boolean, optional)
 * @property HIDE_P1 - Hide player 1 (arg = boolean, optional)
 * @property HIDE_P2 - Hide player 2 (arg = boolean, optional)
 * @property DISABLE_CONTROLS_P1 - Disable player 1 controls (arg = boolean, optional)
 * @property DISABLE_CONTROLS_P2 - Disable player 2 controls (arg = boolean, optional)
 * @property UNLINK_DUAL_GRAVITY - Unlink dual gravity (arg = boolean, optional)
 * @property HIDE_ATTEMPTS - Hide attempts (arg = boolean, optional)
 * @property AUDIO_ON_DEATH - Audio on death (arg = boolean, optional)
 * @property NO_DEATH_SFX - No death SFX (arg = boolean, optional)
 * @property RESPAWN_TIME - Respawn time (arg = number, required)
 * @property add - Adds options trigger
 */
declare type options = {
    STREAK_ADDITIVE: (...params: any[]) => any;
    HIDE_GROUND: (...params: any[]) => any;
    HIDE_MG: (...params: any[]) => any;
    HIDE_P1: (...params: any[]) => any;
    HIDE_P2: (...params: any[]) => any;
    DISABLE_CONTROLS_P1: (...params: any[]) => any;
    DISABLE_CONTROLS_P2: (...params: any[]) => any;
    UNLINK_DUAL_GRAVITY: (...params: any[]) => any;
    HIDE_ATTEMPTS: (...params: any[]) => any;
    AUDIO_ON_DEATH: (...params: any[]) => any;
    NO_DEATH_SFX: (...params: any[]) => any;
    RESPAWN_TIME: (...params: any[]) => any;
    add: (...params: any[]) => any;
};

/**
 * Ends level
 * @param instant_end - Whether to end level instantly
 * @param no_effects - Whether to remove effects
 * @param no_sfx - Whether to remove SFX
 * @param spawn_id - Group to spawn on end
 * @param target_pos - Object defining end position
 */
declare function end(instant_end: boolean, no_effects: boolean, no_sfx: boolean, spawn_id: group, target_pos: group): void;

/**
 * Implementation of player control trigger
 * @param p1 - Only controls P1
 * @param p2 - Only controls P2
 * @param stop_jump - Stops player from jumping
 * @param stop_move - Stops player from moving
 * @param stop_rot - Stops player from rotating
 * @param stop_slide - Stops player from sliding
 */
declare function player_control(p1: boolean, p2: boolean, stop_jump: boolean, stop_move: boolean, stop_rot: boolean, stop_slide: boolean): void;

/**
 * Implementation of Item Edit trigger
 * @param item1 - Item ID 1 (can be retrieved from your_counter.item)
 * @param item2 - Item ID 2 (can be retrieved from your_counter.item)
 * @param target - Target item ID (can be retrieved from your_counter.item)
 * @param [type1 = NONE] - Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param [type2 = NONE] - Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param [target_type = NONE] - Type of target item ID (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param [assign_op = EQ] - Assignment operator (EQ, ADD, SUB, MUL, DIV)
 * @param [op1 = ADD] - Operator 1 (ADD, SUB, MUL, DIV)
 * @param [op2 = MUL] - Operator 2 (ADD, SUB, MUL, DIV)
 * @param [mod = 1] - How much to modify the entire operation by (influenced by op2)
 * @param [absn1 = NONE] - Whether to get absolute/negative value of first side of operation (ABS, NEG)
 * @param [absn2 = NONE] - Whether to get absolute/negative value of second side of operation (ABS, NEG)
 * @param [rfc1 = NONE] - Whether to round/floor/ceil first side of operation (RND, FLR, CEI)
 * @param [rfc2 = NONE] - Whether to round/floor/ceil second side of operation (RND, FLR, CEI)
 * @returns Resulting object
 */
declare function item_edit(item1: item, item2: item, target: item, type1?: item_type, type2?: item_type, target_type?: item_type, assign_op?: number, op1?: number, op2?: number, mod?: number, absn1?: number, absn2?: number, rfc1?: number, rfc2?: number): any;

/**
 * Implementation of Item Comp trigger
 * @param item_1 - Item ID 1 (can be retrieved from your_counter.item)
 * @param item_2 - Item ID 2 (can be retrieved from your_counter.item)
 * @param type1 - Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param type2 - Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param compare_op - Operator to compare item ID 1 and 2 by (EQ, GREATER, GREATER_OR_EQ, LESS, LESS_OR_EQ, NOT_EQ)
 * @param [truei = group(0)] - Group ID to call if comparison is true
 * @param [falsei = group(0)] - Group ID to call if comparison is false
 * @param [mod1 = 1] - How much to modify item ID 1 by (influenced by op1)
 * @param [mod2 = 1] - How much to modify item ID 2 by (influenced by op2)
 * @param [tol = 0] - How much to offset the result by
 * @param [op_1 = MUL] - Operator 1 for mod1 (ADD, SUB, MUL, DIV)
 * @param [op_2 = MUL] - Operator 2 for mod2 (ADD, SUB, MUL, DIV)
 * @param [absneg_1 = NONE] - Whether to get absolute/negative value of first side of operation (ABS, NEG)
 * @param [absneg_2 = NONE] - Whether to get absolute/negative value of second side of operation (ABS, NEG)
 * @param [rfc1 = NONE] - Whether to round/floor/ceil first side of operation (RND, FLR, CEI)
 * @param [rfc2 = NONE] - Whether to round/floor/ceil second side of operation (RND, FLR, CEI)
 * @returns Resulting object
 */
declare function item_comp(item_1: item, item_2: item, type1: item_type, type2: item_type, compare_op: number, truei?: group, falsei?: group, mod1?: number, mod2?: number, tol?: number, op_1?: number, op_2?: number, absneg_1?: number, absneg_2?: number, rfc1?: number, rfc2?: number): any;

/**
 * Implementation of timers
 * @param start_seconds - Start seconds
 * @param end_seconds - End seconds
 * @param target_id - ID to call when timer stops
 * @param backwards - Whether to go backwards
 * @param seconds_only - Whether to only count seconds
 * @param stop - Whether to stop the timer at end_seconds
 * @param time_mod - How much to modify the timer by w/ multiplication (cannot be used if backwards is true)
 * @param ignore_timewarp - Whether to ignore timewarp
 * @param no_override - Whether to ignore when the timer is overridden by another
 */
declare function timer(start_seconds: number, end_seconds: number, target_id: group, backwards: boolean, seconds_only: boolean, stop?: boolean, time_mod?: number, ignore_timewarp: boolean, no_override: boolean): timer;

/**
 * Compares a counter with another
 * @param c1 - First counter to compare
 * @param op - Comparison operator to use (EQ, NOT_EQ, GREATER, LESS, GREATER_OR_EQ, LESS_OR_EQ)
 * @param c2 - Second counter to compare
 * @param truei - Group to call if comparison is true
 * @param falsei - Group to call if comparison is false
 */
declare function compare(c1: counter, op: compare_op, c2: counter, truei: group, falsei: group): void;

/**
 * Represents a keyframe system in GD
 * @property keyframe - Creates a single keyframe at a specific position
 * @property start - Starts a keyframe system
 * @property anim_id - ID of animation
 */
declare type keyframe_system = {
    keyframe: keyframe;
    start: start;
    anim_id: number;
};

/**
 * Creates a single keyframe at a specific position
 * @param x - X position of keyframe
 * @param y - Y position of keyframe
 * @param duration - Duration of keyframe
 * @param curve - Whether to make the keyframe curved
 * @param close - Whether to set the keyframe as the last one + loop back to first keyframe
 * @param easing - How smoothly the keyframe moves
 */
declare type keyframe = (x: number, y: number, duration: number, curve: boolean, close: boolean, easing: easing) => void;

/**
 * Starts a keyframe system
 */
declare type start = () => void;

/**
 * Represents a keyframe system in GD
 * @property keyframe - Creates a single keyframe at a specific position
 * @property start - Starts a keyframe system
 * @property anim_id - ID of animation
 */
declare type keyframe_system = {
    keyframe: keyframe;
    start: start;
    anim_id: number;
};

declare type events = {
    NONE: number;
    TINY_LANDING: number;
    FEATHER_LANDING: number;
    SOFT_LANDING: number;
    NORMAL_LANDING: number;
    HARD_LANDING: number;
    HIT_HEAD: number;
    ORB_TOUCHED: number;
    ORB_ACTIVATED: number;
    PAD_ACTIVATED: number;
    GRAVITY_INVERTED: number;
    GRAVITY_RESTORED: number;
    NORMAL_JUMP: number;
    ROBOT_BOOST_START: number;
    ROBOT_BOOST_STOP: number;
    UFO_JUMP: number;
    SHIP_BOOST_START: number;
    SHIP_BOOST_END: number;
    SPIDER_TELEPORT: number;
    BALL_SWITCH: number;
    SWING_SWITCH: number;
    WAVE_PUSH: number;
    WAVE_RELEASE: number;
    DASH_START: number;
    DASH_STOP: number;
    TELEPORTED: number;
    PORTAL_NORMAL: number;
    PORTAL_SHIP: number;
    PORTAL_BALL: number;
    PORTAL_UFO: number;
    PORTAL_WAVE: number;
    PORTAL_ROBOT: number;
    PORTAL_SPIDER: number;
    PORTAL_SWING: number;
    YELLOW_ORB: number;
    PINK_ORB: number;
    RED_ORB: number;
    GRAVITY_ORB: number;
    GREEN_ORB: number;
    DROP_ORB: number;
    CUSTOM_ORB: number;
    DASH_ORB: number;
    GRAVITY_DASH_ORB: number;
    SPIDER_ORB: number;
    TELEPORT_ORB: number;
    YELLOW_PAD: number;
    PINK_PAD: number;
    RED_PAD: number;
    GRAVITY_PAD: number;
    SPIDER_PAD: number;
    PORTAL_GRAVITY_FLIP: number;
    PORTAL_GRAVITY_NORMAL: number;
    PORTAL_GRAVITY_INVERT: number;
    PORTAL_FLIP: number;
    PORTAL_UNFLIP: number;
    PORTAL_NORMAL_SCALE: number;
    PORTAL_MINI_SCALE: number;
    PORTAL_DUAL_ON: number;
    PORTAL_DUAL_OFF: number;
    PORTAL_TELEPORT: number;
    CHECKPOINT: number;
    DESTROY_BLOCK: number;
    USER_COIN: number;
    PICKUP_ITEM: number;
    CHECKPOINT_RESPAWN: number;
    FALL_LOW: number;
    FALL_MED: number;
    FALL_HIGH: number;
    FALL_VHIGH: number;
    JUMP_PUSH: number;
    JUMP_RELEASE: number;
    LEFT_PUSH: number;
    LEFT_RELEASE: number;
    RIGHT_PUSH: number;
    RIGHT_RELEASE: number;
    PLAYER_REVERSED: number;
    FALL_SPEED_LOW: number;
    FALL_SPEED_MED: number;
    FALL_SPEED_HIGH: number;
};

declare type obj_props = {
    OBJ_ID: number;
    X: number;
    Y: number;
    HORIZONTAL_FLIP: number;
    VERTICAL_FLIP: number;
    ROTATION: number;
    TRIGGER_RED: number;
    TRIGGER_GREEN: number;
    TRIGGER_BLUE: number;
    DURATION: number;
    TOUCH_TRIGGERED: number;
    PORTAL_CHECKED: number;
    PLAYER_COLOR_1: number;
    PLAYER_COLOR_2: number;
    BLENDING: number;
    EDITOR_LAYER_1: number;
    COLOR: number;
    COLOR_2: number;
    TARGET_COLOR: number;
    Z_LAYER: number;
    Z_ORDER: number;
    MOVE_X: number;
    MOVE_Y: number;
    EASING: number;
    TEXT: number;
    SCALING: number;
    GROUP_PARENT: number;
    OPACITY: number;
    ACTIVE_TRIGGER: number;
    HVS_ENABLED: number;
    COLOR_2_HVS_ENABLED: number;
    HVS: number;
    COLOR_2_HVS: number;
    FADE_IN: number;
    HOLD: number;
    FADE_OUT: number;
    PULSE_HSV: number;
    COPIED_COLOR_HVS: number;
    COPIED_COLOR_ID: number;
    TARGET: number;
    TARGET_TYPE: number;
    YELLOW_TELEPORTATION_PORTAL_DISTANCE: number;
    ACTIVATE_GROUP: number;
    GROUPS: number;
    LOCK_TO_PLAYER_X: number;
    LOCK_TO_PLAYER_Y: number;
    COPY_OPACITY: number;
    EDITOR_LAYER_2: number;
    SPAWN_TRIGGERED: number;
    SPAWN_DURATION: number;
    DONT_FADE: number;
    MAIN_ONLY: number;
    DETAIL_ONLY: number;
    DONT_ENTER: number;
    ROTATE_DEGREES: number;
    TIMES_360: number;
    LOCK_OBJECT_ROTATION: number;
    TARGET_POS: number;
    X_MOD: number;
    Y_MOD: number;
    STRENGTH: number;
    ANIMATION_GID: number;
    COUNT: number;
    SUBTRACT_COUNT: number;
    PICKUP_MODE: number;
    ITEM: number;
    HOLD_MODE: number;
    TOGGLE_MODE: number;
    INTERVAL: number;
    EASING_RATE: number;
    EXCLUSIVE: number;
    MULTI_TRIGGER: number;
    COMPARISON: number;
    DUAL_MODE: number;
    SPEED: number;
    DELAY: number;
    Y_OFFSET: number;
    ACTIVATE_ON_EXIT: number;
    DYNAMIC_BLOCK: number;
    BLOCK_B: number;
    GLOW_DISABLED: number;
    ROTATION_SPEED: number;
    DISABLE_ROTATION: number;
    USE_TARGET: number;
    TARGET_POS_AXES: number;
    EDITOR_DISABLE: number;
    HIGH_DETAIL: number;
    COUNT_MULTI_ACTIVATE: number;
    MAX_SPEED: number;
    RANDOMIZE_START: number;
    ANIMATION_SPEED: number;
    LINKED_GROUP: number;
    EXIT_STATIC: number;
    FREE_MODE: number;
    EDIT_FREE_CAM_SETTINGS: number;
    FREE_CAM_EASING: number;
    FREE_CAM_PADDING: number;
    ORD: number;
    REVERSED: number;
    SONG_START: number;
    TIMEWARP_TIME_MOD: number;
    ANIMATE_ON_TRIGGER: number;
    SCALE_X: number;
    SCALE_Y: number;
    PERSPECTIVE_X: number;
    PERSPECTIVE_Y: number;
    ONLY_MOVE: number;
    PLAYER_1: number;
    OVERRIDE_COUNT: number;
    FOLLOW_CAMERA_X: number;
    FOLLOW_CAMERA_Y: number;
    FOLLOW_CAMERA_X_MOD: number;
    FOLLOW_CAMERA_Y_MOD: number;
    PARTICLE_DATA: number;
    USE_OBJ_COLOR: number;
    UNIFORM_OBJ_COLOR: number;
    GRAVITY: number;
    SCALE_X_BY: number;
    SCALE_Y_BY: number;
    ADV_RAND_STRING: number;
    DIV_BY_X: number;
    DIV_BY_Y: number;
    STREAK_ADDITIVE: number;
    UNLINK_DUAL_GRAVITY: number;
    HIDE_GROUND: number;
    HIDE_P1: number;
    HIDE_P2: number;
    CAMERA_EDGE: number;
    DISABLE_CONTROLS_P1: number;
    KEEP_VELOCITY: number;
    CHANGE_CHANNEL: number;
    GR_BLENDING: number;
    HIDE_MG: number;
    PLAYER_ONLY: number;
    DISABLE_CONTROLS_P2: number;
    PLAYER_2: number;
    _PT: number;
    GR_LAYER: number;
    GR_BL: number;
    GR_BR: number;
    GR_TL: number;
    GR_TR: number;
    GR_VERTEX_MODE: number;
    GR_DISABLE: number;
    GR_ID: number;
    QUICK_START: number;
    FOLLOW_GROUP: number;
    FOLLOW_EASING: number;
    ANIMATE_ACTIVE_ONLY: number;
    FOLLOW_P1: number;
    FOLLOW_P2: number;
    P_GROUPS: number;
    DISABLE_GRID_SNAP: number;
    ZOOM: number;
    ANIM_ID: number;
    ORDER_INDEX: number;
    CLOSE_LOOP: number;
    CURVE: number;
    SECONDS_ONLY: number;
    SONG_ID: number;
    SNAP_360: number;
    PREP: number;
    LOAD_PREP: number;
    SONG_SPEED: number;
    SONG_PITCH: number;
    SONG_VOLUME: number;
    SONG_REVERB: number;
    SONG_FADE_IN: number;
    SONG_END: number;
    SONG_FADE_OUT: number;
    FFT: number;
    SONG_LOOP: number;
    STOP_LOOP: number;
    IS_UNIQUE: number;
    UNIQUE_ID: number;
    SONG_STOP: number;
    CHANGE_VOLUME: number;
    CHANGE_SPEED: number;
    OVERRIDE: number;
    VOL_NEAR: number;
    VOL_MED: number;
    VOL_FAR: number;
    MIN_DIST: number;
    DIST_2: number;
    DIST_3: number;
    CAM: number;
    EVENTS: number;
    SONG_CHANNEL: number;
    SFX_PRELOAD: number;
    MIN_INTERVAL: number;
    SEQUENCE: number;
    MODE: number;
    MIN_INT: number;
    RESET: number;
    RESET_FULL_STEP: number;
    REMAPS: number;
    EXTRA_ID: number;
    MODIFIER: number;
    RELATIVE_ROT: number;
    SMOOTH_VELOCITY: number;
    SMOOTH_VELOCITY_MODIFIER: number;
    SFX_GROUP: number;
    PREVIEW_OPACITY: number;
    VOLUME_DIRECTION: number;
    NO_EFFECTS: number;
    NO_SFX: number;
    EXIT_INSTANT: number;
    TIME_COUNTER: number;
    START_TIME: number;
    DONT_OVERRIDE: number;
    IGNORE_TIMEWARP: number;
    TIMER_TIME_MOD: number;
    START_PAUSED: number;
    START_STOP: number;
    STOP_TIME: number;
    STOP_CHECKED: number;
    TYPE_1: number;
    TYPE_2: number;
    MOD: number;
    ASSIGN_OP: number;
    OP_1: number;
    OP_2: number;
    MOD_2: number;
    TOL: number;
    RFC_1: number;
    RFC_2: number;
    INSTANT_END: number;
    IGNORE_VOLUME_TEST: number;
    SOUND_DURATION: number;
    PERSISTENT: number;
    REVERB_TYPE: number;
    REVERB_ENABLE: number;
    TIME_MOD: number;
    POSITION_X_MOD: number;
    ROTATION_MOD: number;
    SCALE_X_MOD: number;
    LINE_OPACITY: number;
    EXTRA_ID_2: number;
    HIDE_ATTEMPTS: number;
    STOP_JUMP: number;
    STOP_MOVE: number;
    STOP_ROT: number;
    STOP_SLIDE: number;
    POSITION_Y_MOD: number;
    SCALE_Y_MOD: number;
    EDIT_RESPAWN_TIME: number;
    RESPAWN_TIME: number;
    AUDIO_ON_DEATH: number;
    NO_DEATH_SFX: number;
    RELATIVE_SCALE: number;
    ABSNEG_1: number;
    ABSNEG_2: number;
    ITEM_TARGET: number;
    GROUP_ID_2: number;
    GROUP_ID_1: number;
    COMP_OP_2: number;
    SFX_ID: number;
    COMP_OP_1: number;
    COMP_OP: number;
    CHANCE: number;
    ADD: number;
    ITEM_ID_1: number;
    FALSE_ID: number;
    BLOCK_A: number;
    CENTER: number;
    ITEM_ID_2: number;
    TRUE_ID: number;
    MULT_DIV: number;
};

/**
 * Converts a number to a block
 * @param x - The number to convert to a block.
 */
declare function block(x: number): block;

/**
 * Creates a block from a number
 * @param number - Block ID
 * @param [specific = true] - Whether to disallow G.js from using that specific block again
 */
declare class $block {
    constructor(number: number, specific?: boolean);
    /**
     * @param b2 - Other block to check for collision
     * @param true_id - Group to call if colliding with b2
     * @param false_id - Group to call if not colliding with b2
     */
    if_colliding(b2: block, true_id: group, false_id: group): void;
}

/**
 * Converts a number to a color
 * @param x - The number to convert to a color.
 */
declare function color(x: number): color;

/**
 * Creates a color from a number
 * @param number - Color ID
 * @param [specific = true] - Whether to disallow G.js from using that specific color again
 */
declare class $color {
    constructor(number: number, specific?: boolean);
    /**
     * Sets color to RGB value
     * @param c - RGB value
     * @param [duration = 0] - How long it takes for color to change
     * @param [blending = false] - Whether to make color blending
     * @param [delay_trig = true] - Whether to do wait(duration)
     */
    set(c: any[], duration?: number, blending?: boolean, delay_trig?: boolean): void;
    /**
     * Copy a color channel to another
     * @param c - Color channel to be copied
     * @param [duration = 0] - Duration of color change
     * @param [hvs = "0a1a1a0a0"] - HVS color to copy
     * @param [blending = false] - Toggle blending on color
     * @param [opacity = 1] - Channel opacity
     * @param [copy_opacity = false] - Copy target opacity
     */
    copy(c: color, duration?: number, hvs?: string, blending?: boolean, opacity?: number, copy_opacity?: boolean): void;
    /**
     * Pulses color w/ HSV
     * @param h - Hue
     * @param s - Saturation
     * @param b - Brightness
     * @param [s_checked = false] - Saturation is checked
     * @param [b_checked = false] - Brightness is checked
     * @param [fade_in = 0] - Fade in
     * @param [hold = 0] - Hold
     * @param [fade_out = 0] - Fade out
     * @param [exclusive = false] - Whether to prioritize over simultaneous pulses
     */
    pulse_hsv(h: number, s: number, b: number, s_checked?: boolean, b_checked?: boolean, fade_in?: number, hold?: number, fade_out?: number, exclusive?: number): void;
    /**
     * Pulses color
     * @param color - RGB color to pulse
     * @param [fade_in = 0] - Fade in
     * @param [hold = 0] - Hold
     * @param [fade_out = 0] - Fade out
     * @param [exclusive = false] - Whether to prioritize over simultaneous pulses
     */
    pulse(color: any[], fade_in?: number, hold?: number, fade_out?: number, exclusive?: number): void;
}

/**
 * Converts a number to a group
 * @param x - The number to convert to a group.
 */
declare function group(x: number): group;

/**
 * Creates a group from a number
 * @param number - Group ID
 * @param [specific = true] - Whether to disallow G.js from using that specific group again
 */
declare class $group {
    constructor(number: number, specific?: boolean);
    /**
     * Remaps multiple IDs inside of the group to others
     * @param remaps - Array of groups to remap, e.g. remap([group(1), group(2)], [group(4), group(3)]) is valid
     */
    remap(...remaps: any[][]): void;
    /**
     * Moves the group
     * @param x - Movement on X axis
     * @param y - Movement on Y axis
     * @param duration - Duration for move trigger
     * @param easing - How smoothly object moves
     * @param easing_rate - Easing rate for move trigger
     * @param x_multiplier - How much to multiply the amount by on X axis
     * @param y_multiplier - How much to multiply the amount by on Y axis
     * @param multiply - Whether to fit the amount of units moved into GD units (multiplying by 3 does this)
     * @param delay_trig - Whether to do wait(duration)
     */
    move(x: number, y: number, duration: number, easing: easing, easing_rate?: number, x_multiplier?: number, y_multiplier?: number, multiply?: boolean, delay_trig?: boolean): void;
    /**
     * Scales the group
     * @param center - Center of group for scaling
     * @param scale_x - Scaling on X axis
     * @param scale_y - Scaling on Y axis
     * @param [duration = 0] - Duration for scale trigger
     * @param [easing = NONE] - How smoothly object gets scaled
     * @param [easing_rate = 2] - Easing rate for scale trigger
     * @param [x_divide = false] - Whether to divide the current scaling by scale_x
     * @param [y_divide = false] - Whether to divide the current scaling by scale_y
     * @param [move_only = false] - Whether to emulate the effect of scaling without actually scaling the group by moving the group instead
     * @param [relative_scale = false] - Bases scaling on the reference object
     * @param [relative_rot = false] - Whether to rotate the X and Y axis
     */
    scale(center: group, scale_x: number, scale_y: number, duration?: number, easing?: easing, easing_rate?: number, x_divide?: boolean, y_divide?: boolean, move_only?: boolean, relative_scale?: boolean, relative_rot?: boolean): void;
    /**
     * Calls the group
     * @param delay - How long to delay the group being called
     */
    call(delay: number): void;
    /**
     * Alpha trigger implementation
     * @param opacity - Changed opacity
     * @param duration - How long it takes for the opacity to change
     */
    alpha(opacity?: number, duration: number): void;
    /**
     * Locks group to player
     * @param [lock_x = true] - Whether to lock to X axis of player
     * @param [lock_y = true] - Whether to lock to Y axis of player
     * @param [duration = 999] - How long group is locked to player
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
     * @param center - Group to rotate around
     * @param degrees - How many degrees to rotate
     * @param [duration = 0] - How long it takes for the group to rotate
     * @param [easing = NONE] - How smoothly the object rotates
     * @param [easing_rate = 2] - Easing rate of rotation
     * @param [lock_object_rotation = false] - Whether to turn on "lock object rotation"
     */
    rotate(center: group, degrees: number, duration?: number, easing?: easing, easing_rate?: number, lock_object_rotation?: boolean): void;
    /**
     * Makes the group follow another
     * @param other - Group to follow
     * @param x_mod - How much to speed up/slow down movement on X axis
     * @param y_mod - How much to speed up/slow down movement on Y axis
     * @param duration - How long to follow other group
     */
    follow(other: group, x_mod?: number, y_mod?: number, duration?: number): void;
    /**
     * Keeps an object's position proportionally between 2 others
     * @param groupA - Group of object A to follow
     * @param groupB - Group of object B to follow
     * @param weight - How much of the way the group should be kept in
     * @param duration - How long to follow
     */
    follow_lerp(groupA: group, groupB: group, weight?: number, duration?: number): void;
    /**
     * Follows player Y
     * @param [speed = 0] - How fast group snaps to player Y position
     * @param [delay = 0] - Delay of movement
     * @param [offset = 0] - Offset of group
     * @param [max_speed = 0] - How fast movement of group can be
     * @param [duration = 0] - How long the group is locked to player Y axis
     */
    follow_player_y(speed?: number, delay?: number, offset?: number, max_speed?: number, duration?: number): void;
    /**
     * Move target implementation
     * @param target - Group to move to
     * @param duration - How long it takes to move to target
     * @param x_only - Whether to only move on X axis
     * @param y_only - Whether to only move on Y axis
     * @param easing - Easing of movement
     * @param easing_rate - Easing rate of movement
     */
    move_to(target: group, duration: number, x_only: boolean, y_only: boolean, easing: easing, easing_rate?: number): void;
    /**
     * Moves group to specific coordinate
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param [duration = 0] - Duration of movement
     * @param [easing = 0] - Easing of movement
     * @param [easing_rate = 2] - Easing rate of movement
     */
    move_to_xy(x: number, y: number, duration?: number, easing?: easing, easing_rate?: number): void;
    /**
     * Pulses group w/ HSV
     * @param h - Hue
     * @param s - Saturation
     * @param b - Brightness
     * @param [s_checked = false] - Saturation is checked
     * @param [b_checked = false] - Brightness is checked
     * @param [fade_in = 0] - Fade in
     * @param [hold = 0] - Hold
     * @param [fade_out = 0] - Fade out
     * @param [exclusive = false] - Whether to prioritize over simultaneous pulses
     */
    pulse_hsv(h: number, s: number, b: number, s_checked?: boolean, b_checked?: boolean, fade_in?: number, hold?: number, fade_out?: number, exclusive?: number): void;
    /**
     * Pulses group
     * @param color - RGB color to pulse
     * @param [fade_in = 0] - Fade in
     * @param [hold = 0] - Hold
     * @param [fade_out = 0] - Fade out
     * @param [exclusive = false] - Whether to prioritize over simultaneous pulses
     */
    pulse(color: any[], fade_in?: number, hold?: number, fade_out?: number, exclusive?: number): void;
}

