declare module "index" {
    /**
     * Extracts values from dictionary into global scope
     * @param dict - Dictionary to extract
     */
    function extract(dict: dictionary): void;
    /**
     * Creates and returns an unavailable group ID
     * @returns Resulting group ID
     */
    function unknown_g(): group;
    /**
     * Creates and returns an unavailable color ID
     * @returns Resulting color ID
     */
    function unknown_c(): color;
    /**
     * Creates and returns an unavailable block ID
     * @returns Resulting block ID
     */
    function unknown_b(): block;
    /**
     * @property name - Name of the current context
     * @property group - Group representing the current context
     * @property objects - All objects in the current context
     * @property children - Child contexts
     */
    type context = {
        name: string;
        group: group;
        objects: any[];
        children: any[];
    };
    /**
     * Creates a new context
     * @param name - Name of context
     * @param [setToDefault = false] - Whether to automatically switch to the context
     * @param [group = unknown_g()] - The group to give to the context
     */
    class Context {
        constructor(name: string, setToDefault?: boolean, group?: group);
        /**
         * The name of the current context
         */
        current: any;
        /**
         * A list of all contexts added
         */
        list: any;
        /**
         * Switches the context
         * @param name - Name or group of context to switch to
         */
        static set(name: string | group): void;
        /**
         * Converts an object into a context
         * @param context - Object to convert into a context
         */
        static add(context: context): void;
        /**
         * Adds an object into the current context
         * @param objectToAdd - Object to add into current context
         */
        static addObject(objectToAdd: any): void;
        /**
         * Links an existing context into the current one, allowing you to find the parent context of another context
         * @param context - Context to link into current
         * @param ctxLink - Optional context that should be the parent of input context
         */
        static link(context: context, ctxLink: string): void;
        /**
         * Checks if a context has a parent
         * @param ctx - Context to check for parent
         * @returns Whether context has a parent
         */
        static isLinked(ctx: context): boolean;
        /**
         * Finds a context based off of its assigned group
         * @returns Found context
         */
        static findByGroup(groupToSearch: group): context;
        /**
         * Finds a context based off of its name
         * @param name - Name of the context
         * @returns Found context
         */
        static findByName(name: string): context;
    }
    /**
     * Creates a repeating trigger system that repeats while a condition is true
     * @param condition - Condition that defines whether the loop should keep on running (less_than/equal_to/greater_than(counter, number))
     * @param func - Function to run while the condition is true
     * @param delay - Delay between each cycle
     */
    function while_loop(condition: condition, func: (...params: any[]) => any, delay: number): void;
    /**
     * @property type - String dictating that the type of the resulting dictionary is an object
     * @property obj_props - Dictionary inside of object holding the actual object properties of the object
     * @property with - Modifies/adds an object property (e.g. `object.with(obj_props.X, 15)`)
     * @property add - Adds the object
     */
    type object = dictionary;
    /**
     * @property type - String dictating that the type of the resulting dictionary is an object
     * @property obj_props - Dictionary inside of object holding the actual object properties of the object
     * @property with - Modifies/adds an object property (e.g. `object.with(obj_props.X, 15)`)
     * @property add - Adds the object
     */
    type object = dictionary;
    /**
     * Creates a "trigger function" in which triggers can be stored inside of a single group
     * @param callback - Function storing triggers to put inside of group
     * @returns Group ID of trigger function
     */
    function trigger_function(callback: (...params: any[]) => any): group;
    /**
     * Waits for a specific amount of seconds
     * @param time - How long to wait
     */
    function wait(time: number): void;
    /**
     * Helper functions and variables holding existing level info.
     */
    namespace level {
        /**
         * Array of all objects in the level.
         */
        var objects: object[];
        /**
         * Raw level string of the current level.
         */
        var raw_levelstring: string;
        /**
         * Returns an array of all the objects in the level with a property whose value matches the pattern.
         * @param prop - The property to check in each object.
         * @param pattern - The function to test the property value.
         * @returns An array of objects that match the given property and pattern.
         */
        function get_objects(prop: string | number, pattern: (...params: any[]) => any): object[];
    }
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
    type easing = {
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
     * @property type - Type of export (can be "levelstring", "savefile" or "live_editor")
     * @property options - Configuration for specific export type
     */
    type export_config = {
        type: string;
        options: save_config;
    };
    /**
     * One-size-fits-all function for exporting a level to GD
     * @param conf - Configuration for exporting level
     * @returns Levelstring if using "levelstring" type, otherwise null
     */
    function exportConfig(conf: export_config): null | string;
    /**
     * Configuration for exporting levels.
     * @property [info = false] - Whether to log information to console when finished
     * @property [group_count_warning = true] - Whether to warn that group count is surpassed (only useful if in future updates the group count is increased)
     * @property [level_name = by default, it writes to your most recent level/topmost level] - Name of level (only for exportToSavefile)
     * @property [path = path to savefile automatically detected based off of OS] - Path to CCLocalLevels.dat savefile (only for exportToSavefile)
     * @property [reencrypt = true] - Whether to reencrypt savefile after editing it, or to let GD encrypt it
     * @property [optimize = true] - Whether to optimize unused groups & triggers that point to unused groups
     * @property [replacePastObjects = true] - Whether to delete all objects added by G.js in the past & replace them with the new objects
     * @property [removeGroup = 9999] - Group to use to mark objects to be automatically deleted when re-running the script (default is 9999)
     */
    type save_config = {
        info?: boolean;
        group_count_warning?: boolean;
        level_name?: string;
        path?: string;
        reencrypt?: boolean;
        optimize?: boolean;
        replacePastObjects?: boolean;
        removeGroup?: number | group;
    };
    /**
     * Core type holding important functions for adding to levels, exporting, and modifying scripts.
     */
    namespace $ {
        /**
         * Adds an object.
         */
        var add: any;
        /**
         * Prints to console.
         * @param value - Value to print.
         */
        function print(value: any): void;
        /**
         * Returns level string of the script.
         */
        var getLevelString: any;
        /**
         * Exports script to savefile.
         */
        var exportToSavefile: any;
        /**
         * Exports script to live editor using WSLiveEditor (requires Geode).
         */
        var liveEditor: any;
        /**
         * Maps every trigger that gets added to the level
         */
        var callback_objects: any;
        /**
         * Extends a trigger function by adding more triggers to it.
         */
        var extend_trigger_func: any;
        /**
         * Returns group of current trigger function context.
         * @returns Group of current trigger function context.
         */
        function trigger_fn_context(): group;
    }
    /**
     * Ignores context changes inside of a function
     * @param fn - Function containing code where context changes should be ignored
     */
    function ignore_context_change(fn: (...params: any[]) => any): void;
    /**
     * Generates an array holding a sequence of numbers starting at the "start" parameter, ending at the "end" parameter and incrementing by "step"
     * @param start - What number to start at
     * @param end - What number to end at
     * @param step - What number to increment by
     * @returns Resulting sequence
     */
    function range(start: number, end: number, step?: number): any[];
    /**
     * @property USER_COIN - Identifier for user coin
     * @property H_BLOCK - Identifier for H block
     * @property J_BLOCK - Identifier for J block
     * @property TEXT - Identifier for text
     * @property S_BLOCK - Identifier for S block
     * @property ITEM_DISPLAY - Identifier for item display
     * @property D_BLOCK - Identifier for D block
     * @property COLLISION_BLOCK - Identifier for collision block
     */
    type special_objects = {
        USER_COIN: number;
        H_BLOCK: number;
        J_BLOCK: number;
        TEXT: number;
        S_BLOCK: number;
        ITEM_DISPLAY: number;
        D_BLOCK: number;
        COLLISION_BLOCK: number;
    };
    /**
     * @property SPAWN - Identifier for spawn trigger
     * @property ON_DEATH - Identifier for on-death trigger
     * @property ROTATE - Identifier for rotate trigger
     * @property COUNT - Identifier for count trigger
     * @property DISABLE_TRAIL - Identifier for disable trail trigger
     * @property HIDE - Identifier for hide trigger
     * @property PICKUP - Identifier for pickup trigger
     * @property COLLISION - Identifier for collision trigger
     * @property ENABLE_TRAIL - Identifier for enable trail trigger
     * @property ANIMATE - Identifier for animate trigger
     * @property TOUCH - Identifier for touch trigger
     * @property INSTANT_COUNT - Identifier for instant count trigger
     * @property BG_EFFECT_OFF - Identifier for BG effect off trigger
     * @property TOGGLE - Identifier for toggle trigger
     * @property MOVE - Identifier for move trigger
     * @property ALPHA - Identifier for alpha trigger
     * @property SHOW - Identifier for show trigger
     * @property STOP - Identifier for stop trigger
     * @property FOLLOW - Identifier for follow trigger
     * @property PULSE - Identifier for pulse trigger
     * @property BG_EFFECT_ON - Identifier for BG effect on trigger
     * @property SHAKE - Identifier for shake trigger
     * @property FOLLOW_PLAYER_Y - Identifier for follow player Y trigger
     * @property COLOR - Identifier for color trigger
     */
    type trigger_ids = {
        SPAWN: number;
        ON_DEATH: number;
        ROTATE: number;
        COUNT: number;
        DISABLE_TRAIL: number;
        HIDE: number;
        PICKUP: number;
        COLLISION: number;
        ENABLE_TRAIL: number;
        ANIMATE: number;
        TOUCH: number;
        INSTANT_COUNT: number;
        BG_EFFECT_OFF: number;
        TOGGLE: number;
        MOVE: number;
        ALPHA: number;
        SHOW: number;
        STOP: number;
        FOLLOW: number;
        PULSE: number;
        BG_EFFECT_ON: number;
        SHAKE: number;
        FOLLOW_PLAYER_Y: number;
        COLOR: number;
    };
    /**
     * @property SPEED_GREEN - Identifier for green speed portal
     * @property TELEPORT - Identifier for teleport portal
     * @property CUBE - Identifier for cube portal
     * @property MIRROR_OFF - Identifier for mirror off portal
     * @property WAVE - Identifier for wave portal
     * @property SPIDER - Identifier for spider portal
     * @property SPEED_RED - Identifier for red speed portal
     * @property GRAVITY_DOWN - Identifier for gravity down portal
     * @property SPEED_BLUE - Identifier for blue speed portal
     * @property UFO - Identifier for UFO portal
     * @property ROBOT - Identifier for robot portal
     * @property MIRROR_ON - Identifier for mirror on portal
     * @property GRAVITY_UP - Identifier for gravity up portal
     * @property DUAL_ON - Identifier for dual on portal
     * @property SIZE_MINI - Identifier for mini size portal
     * @property BALL - Identifier for ball portal
     * @property SIZE_NORMAL - Identifier for normal size portal
     * @property SHIP - Identifier for ship portal
     * @property SPEED_PINK - Identifier for pink speed portal
     * @property SPEED_YELLOW - Identifier for yellow speed portal
     * @property DUAL_OFF - Identifier for dual off portal
     */
    type portal_ids = {
        SPEED_GREEN: number;
        TELEPORT: number;
        CUBE: number;
        MIRROR_OFF: number;
        WAVE: number;
        SPIDER: number;
        SPEED_RED: number;
        GRAVITY_DOWN: number;
        SPEED_BLUE: number;
        UFO: number;
        ROBOT: number;
        MIRROR_ON: number;
        GRAVITY_UP: number;
        DUAL_ON: number;
        SIZE_MINI: number;
        BALL: number;
        SIZE_NORMAL: number;
        SHIP: number;
        SPEED_PINK: number;
        SPEED_YELLOW: number;
        DUAL_OFF: number;
    };
    /**
     * @property special - Special object IDs
     * @property triggers - Trigger object IDs
     * @property portals - Portal object IDs
     */
    type obj_ids = {
        special: special_objects;
        triggers: trigger_ids;
        portals: portal_ids;
    };
    /**
     * @property special - Special object IDs
     * @property triggers - Trigger object IDs
     * @property portals - Portal object IDs
     */
    type obj_ids = {
        special: special_objects;
        triggers: trigger_ids;
        portals: portal_ids;
    };
    /**
     * @property bite - Identifier for the bite animation
     * @property attack01 - Identifier for the first attack animation
     * @property attack01_end - Identifier for the end of the first attack animation
     * @property idle01 - Identifier for the first idle animation
     */
    type big_beast_animations = {
        bite: number;
        attack01: number;
        attack01_end: number;
        idle01: number;
    };
    /**
     * @property idle01 - Identifier for the first idle animation
     * @property idle02 - Identifier for the second idle animation
     * @property idle03 - Identifier for the third idle animation
     * @property attack01 - Identifier for the first attack animation
     * @property attack02 - Identifier for the second attack animation
     * @property attack02_end - Identifier for the end of the second attack animation
     * @property sleep - Identifier for the sleep animation
     * @property sleep_loop - Identifier for the sleep loop animation
     * @property sleep_end - Identifier for the end of the sleep animation
     * @property attack02_loop - Identifier for the loop of the second attack animation
     */
    type bat_animations = {
        idle01: number;
        idle02: number;
        idle03: number;
        attack01: number;
        attack02: number;
        attack02_end: number;
        sleep: number;
        sleep_loop: number;
        sleep_end: number;
        attack02_loop: number;
    };
    /**
     * @property idle01 - Identifier for the first idle animation
     * @property idle02 - Identifier for the second idle animation
     * @property toAttack01 - Identifier for the transition to the first attack animation
     * @property attack01 - Identifier for the first attack animation
     * @property attack02 - Identifier for the second attack animation
     * @property toAttack03 - Identifier for the transition to the third attack animation
     * @property attack03 - Identifier for the third attack animation
     * @property idle03 - Identifier for the third idle animation
     * @property fromAttack03 - Identifier for the transition from the third attack animation
     */
    type spikeball_animations = {
        idle01: number;
        idle02: number;
        toAttack01: number;
        attack01: number;
        attack02: number;
        toAttack03: number;
        attack03: number;
        idle03: number;
        fromAttack03: number;
    };
    /**
     * @property big_beast - Animation identifiers for big beast
     * @property bat - Animation identifiers for bat
     * @property spikeball - Animation identifiers for spikeball
     */
    type animations = {
        big_beast: big_beast_animations;
        bat: bat_animations;
        spikeball: spikeball_animations;
    };
    /**
     * @property big_beast - Animation identifiers for big beast
     * @property bat - Animation identifiers for bat
     * @property spikeball - Animation identifiers for spikeball
     */
    type animations = {
        big_beast: big_beast_animations;
        bat: bat_animations;
        spikeball: spikeball_animations;
    };
}

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

declare module "control-flow" {
    /**
     * Creates a spawn trigger and returns it
     * @param group - group to be spawned
     * @param time - delay to spawn group
     */
    function spawn_trigger(group: group, time: number): any;
    /**
     * Creates a loop that repeats every frame
     * @param trigger_function - The group to call every frame
     * @returns Group that can be used to stop the loop
     */
    function frame_loop(trigger_function: group): group;
    /**
     * Waits a specific amount of frames
     * @param frames - How many frames to wait for
     */
    function frames(frames: number): void;
    /**
     * Returns a greater than condition
     * @param counter - Counter to compare to number
     * @param other - Number to be compared to counter
     */
    function greater_than(counter: counter, other: number): condition;
    /**
     * Returns a equal to condition
     * @param counter - Counter to compare to number
     * @param other - Number to be compared to counter
     */
    function equal_to(counter: counter, other: number): condition;
    /**
     * Returns a less than condition
     * @param counter - Counter to compare to number
     * @param other - Number to be compared to counter
     */
    function less_than(counter: counter, other: number): condition;
    /**
     * Calls a group with a delay
     * @param delay - How much to delay by
     * @param group - Group to call
     */
    function call_with_delay(delay: number, group: group): void;
    /**
     * Implementation of sequence trigger
     * @param sequence - Sequence of groups to be called (e.g. [[group(1), 1], [group(2), 1]] is a valid input)
     * @param [mode = 0] - Mode of sequence trigger (0 = stop, 1 = loop, 2 = last)
     * @param [min_int = 0] - MinInt of sequence trigger
     * @param [reset = 0] - Reset of sequence trigger (0 = full, 1 = step)
     * @returns Function that steps through the sequence once
     */
    function sequence(sequence: any[], mode?: number, min_int?: number, reset?: number): (...params: any[]) => any;
    /**
     * Creates trigger function-like systems, but can be called normally with item IDs as arguments (e.g. a remappable can be called like `my_remappable(counter1.item)`)
     * @param fn - Function that remappable uses
     * @returns Function to call
     */
    function remappable(fn: (...params: any[]) => any): (...params: any[]) => any;
    /**
     * Loops a function a specific amount of times (defined by range)
     * @param range - Range of numbers defining how many times to loop fn by
     * @param fn - Function to loop
     * @param [delay = 0.05] - How much to delay between cycle
     */
    function for_loop(range: any[], fn: (...params: any[]) => any, delay?: number): void;
}

declare module "counter" {
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
     * @property abs - Gets absolute value from counter
     * @property neg - Converts value to negative value
     */
    type counter = {
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
        abs: (...params: any[]) => any;
        neg: (...params: any[]) => any;
    };
    /**
     * Adds a specific amount (or another counter) to the current counter
     * @param amount - Counter or number to add to the current counter
     */
    type add = (amount: number | counter) => void;
    /**
     * Subtracts a specific amount (or another counter) from the current counter
     * @param amount - Counter or number to subtract from the current counter
     */
    type subtract = (amount: number | counter) => void;
    /**
     * Multiplies the current counter by a specific amount (or another counter)
     * @param amount - Counter or number to multiply the current counter by
     */
    type multiply = (amount: number | counter) => void;
    /**
     * Divides the current counter by a specific amount (or another counter)
     * @param amount - Counter or number to divide the current counter by
     */
    type divide = (amount: number | counter) => void;
    /**
     * Sets the current counter to a specific amount (or another counter)
     * @param amount - Counter or number to set the current counter to
     */
    type set = (amount: number | counter) => void;
    /**
     * Resets the current counter to 0
     */
    type reset = () => void;
    /**
     * Returns item display for current counter as an object
     */
    type to_obj = () => any;
    /**
     * Checks if a comparison is true, and if so calls a group (SMALLER_THAN/EQUAL_TO_LARGER_THAN)
     * @param comparison - Condition to check for between the counter and number
     * @param other - Number to compare the current counter to
     * @param trig_func - Trigger function or group to run if the comparison is true
     */
    type if_is = (comparison: comparison, other: number, trig_func: group) => void;
    /**
     * Converts the current counter to a plain number by taking in a range of possible values and a function
     * @param range - Possible range of values that the current counter is equal to
     * @param func - Callback function to run that takes the plain numerical value as input
     */
    type to_const = (range: any[], func: (...params: any[]) => any) => void;
    /**
     * Displays the current counter at a specific position
     * @param x - X position of item display
     * @param y - Y position of item display
     */
    type display = (x: number, y: number) => void;
    /**
     * Copies the current counter to another counter
     * @param counter - Counter to copy the current counter to
     */
    type copy_to = (counter: counter) => void;
    /**
     * Adds the current counter to another and resets the current counter
     * @param counter - Counter to add the current counter to
     */
    type add_to = (counter: counter) => void;
    /**
     * Subtracts the current counter from another and resets the current counter
     * @param counter - Counter to be subtracted from
     */
    type subtract_from = (counter: counter) => void;
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
     * @property abs - Gets absolute value from counter
     * @property neg - Converts value to negative value
     */
    type counter = {
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
        abs: (...params: any[]) => any;
        neg: (...params: any[]) => any;
    };
    /**
     * Version of counter that supports floating point values
     * @property item - Item ID of a counter
     * @property type - Type of a counter
     * @property add - Adds a specific amount (or another counter) to the current counter
     * @property subtract - Subtracts a specific amount (or another counter) from the current counter
     * @property multiply - Multiplies the current counter by a specific amount (or another counter)
     * @property divide - Divides the current counter by a specific amount (or another counter)
     * @property set - Sets the current counter to a specific amount or another counter
     * @property reset - Resets the current counter to 0
     * @property copy_to - Copies the current counter to another counter
     * @property display - Displays the current counter at a specific position
     * @property to_obj - Returns item display for current counter as an object
     * @property add_to - Adds the current counter to another and resets the current counter
     * @property subtract_from - Subtracts the current counter from another and resets the current counter
     * @property abs - Gets absolute value from counter
     * @property neg - Converts value to negative value
     * @property round - Rounds the floating point value into an integer
     */
    type float_counter = {
        item: item;
        type: item_type;
        add: add;
        subtract: subtract;
        multiply: multiply;
        divide: divide;
        set: set;
        reset: reset;
        copy_to: copy_to;
        display: display;
        to_obj: to_obj;
        add_to: add_to;
        subtract_from: subtract_from;
        abs: (...params: any[]) => any;
        neg: (...params: any[]) => any;
        round: (...params: any[]) => any;
    };
    /**
     * Version of counter that supports floating point values
     * @property item - Item ID of a counter
     * @property type - Type of a counter
     * @property add - Adds a specific amount (or another counter) to the current counter
     * @property subtract - Subtracts a specific amount (or another counter) from the current counter
     * @property multiply - Multiplies the current counter by a specific amount (or another counter)
     * @property divide - Divides the current counter by a specific amount (or another counter)
     * @property set - Sets the current counter to a specific amount or another counter
     * @property reset - Resets the current counter to 0
     * @property copy_to - Copies the current counter to another counter
     * @property display - Displays the current counter at a specific position
     * @property to_obj - Returns item display for current counter as an object
     * @property add_to - Adds the current counter to another and resets the current counter
     * @property subtract_from - Subtracts the current counter from another and resets the current counter
     * @property abs - Gets absolute value from counter
     * @property neg - Converts value to negative value
     * @property round - Rounds the floating point value into an integer
     */
    type float_counter = {
        item: item;
        type: item_type;
        add: add;
        subtract: subtract;
        multiply: multiply;
        divide: divide;
        set: set;
        reset: reset;
        copy_to: copy_to;
        display: display;
        to_obj: to_obj;
        add_to: add_to;
        subtract_from: subtract_from;
        abs: (...params: any[]) => any;
        neg: (...params: any[]) => any;
        round: (...params: any[]) => any;
    };
}

declare module "events" {
    /**
     * Calls a group when an event occurs
     * @param event - Event to listen to
     * @param group - Group of object
     */
    function on(event: event, group: group): void;
    /**
     * Listens to when the screen is touched
     * @param [dual_side = false] - Whether to only listen to dual side
     */
    function touch(dual_side?: boolean): event;
    /**
     * Event that runs on every frame
     */
    function frame(): void;
    /**
     * Listens to when the screen stops being touched
     * @param [dual_side = false] - Whether to only listen to dual side
     */
    function touch_end(dual_side?: boolean): event;
    /**
     * Listens to when two collision blocks collide
     * @param block_a - First block to listen to
     * @param block_b - Second block to listen to
     * @param P1 - Player 1 as block a
     * @param P2 - Player 2 as block a
     */
    function collision(block_a: block, block_b: block, P1: boolean, P2: boolean): event;
    /**
     * Listens to when two collision blocks stop colliding
     * @param block_a - First block to listen to
     * @param block_b - Second block to listen to
     * @param P1 - Player 1 as block a
     * @param P2 - Player 2 as block a
     */
    function collision_exit(block_a: block, block_b: block, P1: boolean, P2: boolean): event;
    /**
     * Listens to when the player dies
     */
    function death(): event;
    /**
     * Listens to when an item hits a specific number
     * @param item - Item to listen to
     * @param num - Number that triggers event when the item hits this
     * @param multi - Whether to trigger the event multiple time
     */
    function count(item: item, num: number, multi: boolean): event;
    /**
     * Listens to when the player reaches a specific X position
     * @param x - X position where event is called
     */
    function x_position(x: number): event;
    /**
     * Implementation of the event trigger that triggers an event
     * @param event - Event(s) to be listened to (look at {@tutorial Events} for more info)
     * @param extra_id - Implementation of extra ID 1
     * @param extra_id2 - Implementation of extra ID 2
     */
    function event(event: any[] | event_id, extra_id: number, extra_id2: number): event;
    /**
     * Represents gamescene (all functions in this type are made to be used with on())
     * @property button_a - Returns an event when the left side is pressed
     * @property button_b - Returns an event when the right side is pressed
     * @property button_a_end - Returns an event when the left side is no longer pressed
     * @property button_b_end - Returns an event when the right side is no longer pressed
     * @property stop - Stops playing the song
     */
    type gamescene = {
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
    type gamescene = {
        button_a: (...params: any[]) => any;
        button_b: (...params: any[]) => any;
        button_a_end: (...params: any[]) => any;
        button_b_end: (...params: any[]) => any;
        stop: stop;
    };
    type events = {
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
}

declare module "general-purpose" {
    /**
     * Offsets the camera by a position
     * @param x - X offset of camera
     * @param y - X offset of camera
     * @param [duration = 0] - Duration that it takes for camera position to change
     */
    function camera_offset(x: number, y: number, duration?: number): void;
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
    function camera_static(group: group, duration?: number, easing?: easing, exit_instant?: boolean, exit_static?: boolean, smooth_vel?: boolean, smooth_vel_mod?: number, follow?: boolean, x_only?: boolean, x_only?: boolean): void;
    /**
     * Makes the camera zoom in/out by a specific amount
     * @param zoom_amount - Amount to zoom the camera in by
     * @param [duration = 0] - How long it takes for camera to zoom in
     * @param [easing = NONE] - How smoothly the camera zooms in
     */
    function camera_zoom(zoom_amount: number, duration?: number, easing?: easing): void;
    /**
     * Toggles free mode
     * @param [free_mode = true] - Whether to toggle free mode on or off
     * @param [disable_grid_snap = false] - Removes default snapping to nearest grid space for the camera center
     * @param [edit_cam = false] - Whether to edit camera settings
     * @param [easing = 10] - Easing for camera movement (requires edit_cam to be true)
     * @param [padding = 0.50] - Padding for camera movement (requires edit_cam to be true)
     */
    function camera_mode(free_mode?: boolean, disable_grid_snap?: boolean, edit_cam?: boolean, easing?: number, padding?: number): void;
    /**
     * Rotates camera
     * @param degrees - How many degrees to rotate camera by
     * @param [move_time = 0] - How fast rotation happens
     * @param [easing = NONE] - How smooth rotation happens
     * @param [add = false] - Adds input rotation to current camera rotation
     * @param [snap360 = false] - Converts rotation to closest 360
     */
    function camera_rotate(degrees: number, move_time?: number, easing?: easing, add?: boolean, snap360?: boolean): void;
    /**
     * Makes one of the camera's edges a specific target object
     * @param id - Group ID of target object
     * @param edge - Defines the edge to set (LEFT_EDGE, RIGHT_EDGE, UP_EDGE, DOWN_EDGE)
     */
    function camera_edge(id: group, edge: edge): void;
    /**
     * Represents a song trigger in GD
     * @property start - Starts song
     * @property edit - Edit Song trigger implementation
     * @property stop - Stops playing the song
     */
    type song = {
        start: start_song;
        edit: edit;
        stop: stop;
    };
    /**
     * Starts playing the song
     */
    type start_song = () => void;
    /**
     * Implementation of Edit Song trigger
     */
    type edit = (new_volume: number, new_speed: number, duration: number, stop: boolean, stop_loop: boolean, gid_1: group, gid_2: group, vol_near: number, vol_med: number, vol_far: number, min_dist: number, dist_2: number, dist_3: number, p1: boolean, p2: boolean, cam: boolean, vol_dir: 0) => void;
    /**
     * Stops song
     */
    type stop = () => void;
    /**
     * Represents a song trigger in GD
     * @property start - Starts song
     * @property edit - Edit Song trigger implementation
     * @property stop - Stops playing the song
     */
    type song = {
        start: start_song;
        edit: edit;
        stop: stop;
    };
    /**
     * Teleports the player to a specific target object
     * @param id - Group ID of target object
     */
    function teleport(id: group): void;
    /**
     * Adds a move trigger and returns it
     * @param id - Group ID of target object
     * @param x - X amount of how much to move the object by
     * @param Y - Y amount of how much to move the object by
     * @returns Returned object
     */
    function move_trigger(id: group, x: number, Y: number): any;
    /**
     * Warps all time by given amount
     * @param value - How much to warp time by
     */
    function timewarp(value: number): void;
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
    function color_trigger(channel: color, r: number, g: number, b: number, duration?: number, opacity?: number, blending?: boolean): any;
    /**
     * Returns an activated toggle trigger
     * @param group - Group of object
     * @returns Resulting object
     */
    function toggle_on_trigger(group: group): any;
    /**
     * Returns an inactive toggle trigger
     * @param group - Group of object
     * @returns Resulting object
     */
    function toggle_off_trigger(group: group): any;
    /**
     * Hides player
     */
    function hide_player(): void;
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
    function gradient(color1: color, color2: color, bl: group, br: group, tl: group, tr: group, vertex_mode?: boolean, blending?: boolean, layer?: number): any;
    /**
     * Creates a particle system
     * @param props - Dictionary holding particle properties (check {@tutorial Particles} for more info)
     * @param [use_obj_color = false] - Whether to make the particle system use the object color
     * @param [animate_on_trigger = false] - Whether to only start the particle system when the Animate trigger is used on the particle system instead of immediately
     * @param [animate_active_only = false] - Only makes animate_on_trigger true if the object is active
     * @param [quick_start = false] - Makes normal movement be achieved instantly instead of gradually
     * @returns Returned particle system
     */
    function particle_system(props: dictionary, use_obj_color?: boolean, animate_on_trigger?: boolean, animate_active_only?: boolean, quick_start?: boolean): any;
    /**
     * Implementation of Spawn Particle trigger
     * @param particle_group - Group ID of particle system
     * @param pos_group - Target location to spawn trigger system in
     * @param offset_x - How much to to offset the particle system from the target on the X axis
     * @param offset_y - How much to to offset the particle system from the target on the Y axis
     * @param scale - Scale of particle system
     * @param scale_var - Value to randomly add or decrease to scale
     * @param rotation - How many angles the system is rotated by
     * @param rotation_var - Value to randomly add or decrease to rotation
     * @param offvar_x - Area to randomly spawn particles in on X axis
     * @param offvar_y - Area to randomly spawn particles in on Y axis
     * @param match_rot - Makes the rotation of several particles match
     */
    function spawn_particle(particle_group: group, pos_group: group, offset_x: number, offset_y: number, scale?: number, scale_var: number, rotation: number, rotation_var: number, offvar_x: number, offvar_y: number, match_rot: boolean): void;
    /**
     * Implementation of random trigger
     * @param gr1 - Group 1
     * @param gr2 - Group 2
     * @param chance - Chance of either group being called
     */
    function random(gr1: group, gr2: group, chance: number): void;
    /**
     * Implementation of advanced random trigger
     * @param chances - Chances of each group being called (e.g. [[group(1), 10], [group(2), 10]] is a valid input)
     */
    function advanced_random(...chances: any[][]): void;
    /**
     * Implementation of gravity trigger
     * @param gravity - Gravity magnitude
     * @param p1 - Only affect player 1
     * @param p2 - Only affect player 2
     * @param pt - Only affect player that touches trigger
     */
    function gravity(gravity: number, p1: boolean, p2: boolean, pt: boolean): void;
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
    type options = {
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
    type options = {
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
    function end(instant_end: boolean, no_effects: boolean, no_sfx: boolean, spawn_id: group, target_pos: group): void;
    /**
     * Implementation of player control trigger
     * @param p1 - Only controls P1
     * @param p2 - Only controls P2
     * @param stop_jump - Stops player from jumping
     * @param stop_move - Stops player from moving
     * @param stop_rot - Stops player from rotating
     * @param stop_slide - Stops player from sliding
     */
    function player_control(p1: boolean, p2: boolean, stop_jump: boolean, stop_move: boolean, stop_rot: boolean, stop_slide: boolean): void;
}

declare module "items" {
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
    function item_edit(item1: item, item2: item, target: item, type1?: item_type, type2?: item_type, target_type?: item_type, assign_op?: number, op1?: number, op2?: number, mod?: number, absn1?: number, absn2?: number, rfc1?: number, rfc2?: number): any;
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
    function item_comp(item_1: item, item_2: item, type1: item_type, type2: item_type, compare_op: number, truei?: group, falsei?: group, mod1?: number, mod2?: number, tol?: number, op_1?: number, op_2?: number, absneg_1?: number, absneg_2?: number, rfc1?: number, rfc2?: number): any;
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
    function timer(start_seconds: number, end_seconds: number, target_id: group, backwards: boolean, seconds_only: boolean, stop?: boolean, time_mod?: number, ignore_timewarp: boolean, no_override: boolean): timer;
    /**
     * Compares a counter with another
     * @param c1 - First counter to compare
     * @param op - Comparison operator to use (EQ, NOT_EQ, GREATER, LESS, GREATER_OR_EQ, LESS_OR_EQ)
     * @param c2 - Second counter to compare
     * @param truei - Group to call if comparison is true
     * @param falsei - Group to call if comparison is false
     */
    function compare(c1: counter, op: compare_op, c2: counter, truei: group, falsei: group): void;
}

declare module "keyframes" {
    /**
     * Represents a keyframe system in GD
     * @property keyframe - Creates a single keyframe at a specific position
     * @property start - Starts a keyframe system
     * @property anim_id - ID of animation
     */
    type keyframe_system = {
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
    type keyframe = (x: number, y: number, duration: number, curve: boolean, close: boolean, easing: easing) => void;
    /**
     * Starts a keyframe system
     */
    type start = () => void;
    /**
     * Represents a keyframe system in GD
     * @property keyframe - Creates a single keyframe at a specific position
     * @property start - Starts a keyframe system
     * @property anim_id - ID of animation
     */
    type keyframe_system = {
        keyframe: keyframe;
        start: start;
        anim_id: number;
    };
}

declare module "shaders" {
    type shader_layer = number;
    /**
     * An object representing all shader layers
     * @property BG - Background layer
     * @property MG - Midground layer
     * @property B5 - Background layer 5
     * @property B4 - Background layer 4
     * @property B3 - Background layer 3
     * @property B2 - Background layer 2
     * @property B1 - Background layer 1
     * @property P - Player layer
     * @property T1 - Top layer 1
     * @property T2 - Top layer 2
     * @property T3 - Top layer 3
     * @property T4 - Top layer 4
     * @property G - Ground layer
     * @property UI - UI layer
     * @property MAX - Maximum layer
     */
    type shader_layers = {
        BG: shader_layer;
        MG: shader_layer;
        B5: shader_layer;
        B4: shader_layer;
        B3: shader_layer;
        B2: shader_layer;
        B1: shader_layer;
        P: shader_layer;
        T1: shader_layer;
        T2: shader_layer;
        T3: shader_layer;
        T4: shader_layer;
        G: shader_layer;
        UI: shader_layer;
        MAX: shader_layer;
    };
    /**
     * An object representing all shader layers
     * @property BG - Background layer
     * @property MG - Midground layer
     * @property B5 - Background layer 5
     * @property B4 - Background layer 4
     * @property B3 - Background layer 3
     * @property B2 - Background layer 2
     * @property B1 - Background layer 1
     * @property P - Player layer
     * @property T1 - Top layer 1
     * @property T2 - Top layer 2
     * @property T3 - Top layer 3
     * @property T4 - Top layer 4
     * @property G - Ground layer
     * @property UI - UI layer
     * @property MAX - Maximum layer
     */
    type shader_layers = {
        BG: shader_layer;
        MG: shader_layer;
        B5: shader_layer;
        B4: shader_layer;
        B3: shader_layer;
        B2: shader_layer;
        B1: shader_layer;
        P: shader_layer;
        T1: shader_layer;
        T2: shader_layer;
        T3: shader_layer;
        T4: shader_layer;
        G: shader_layer;
        UI: shader_layer;
        MAX: shader_layer;
    };
    type shader_layer = number;
    /**
     * Creates a glitch effect
     * @param strength - How strong the glitch effect is
     * @param duration - How long it takes to start the effect
     * @param easing - How smoothly the effect should start
     * @param speed - How fast the glitch effect is
     * @param slice_height - How high up objects get slices
     * @param max_slice_x_off - How much objects get sliced
     * @param max_col_x_off - Max offset for color effect on X axis
     * @param max_col_y_off - Max offset for color effect on Y axis
     */
    function glitch(strength: number, duration: number, easing: easing, speed?: number, slice_height?: number, max_slice_x_off?: number, max_col_x_off?: number, max_col_y_off?: number): void;
    /**
     * Applies chromatic aberration
     * @param target_x - Effect strength on X axis
     * @param target_y - Effect strength on Y axis
     * @param duration - How long it takes to start the effect
     * @param easing - How smoothly the effect should start
     */
    function chromatic(target_x: number, target_y: number, duration: number, easing: easing): void;
    /**
     * Pixelates screen
     * @param target_x - How strong effect is on X axis
     * @param target_y - How strong effect is on Y axis
     * @param duration - How long it takes to start the effect
     * @param easing - How smoothly the effect should start
     * @param snap_grid - Makes pixels align with game camera
     * @param hard_edges - Whether to use hard edges
     */
    function pixelate(target_x: number, target_y: number, duration: number, easing: easing, snap_grid: boolean, hard_edges: boolean): void;
    /**
     * Applies grayscale filter
     * @param target - How much of filter to apply
     * @param tint_channel - Color channel to tint towards
     * @param duration - How long it takes to start the effect
     * @param easing - How smoothly the effect should start
     * @param use_lum - Uses different grayscale conversions
     */
    function grayscale(target: number, tint_channel: color, duration: number, easing: easing, use_lum: boolean): void;
    /**
     * Changes hue of screen
     * @param degrees - How much colors should shift
     * @param duration - How long it takes to start the effect
     * @param easing - How smoothly the effect should start
     */
    function hue_shift(degrees: number, duration: number, easing: easing): void;
    /**
     * Bulges the screen
     * @param strength - How strong the effect is
     * @param radius - How large the effect is
     * @param duration - How long it takes to start the effect
     * @param easing - How smoothly the effect should start
     * @param center - Center group of bulge
     * @param offset_x - Offset X of bulge
     * @param offset_y - Offset Y of bulge
     */
    function bulge(strength: number, radius: number, duration: number, easing: easing, center: group, offset_x: number, offset_y: number): void;
    /**
     * Applies sepia filter
     * @param target - How much of filter to apply
     * @param duration - How long it takes to start the effect
     * @param easing - How smoothly the effect should start
     */
    function sepia(target: number, duration: number, easing: easing): void;
    /**
     * Splits screen into sections
     * @param target_x - How many sections to add on X axis
     * @param target_y - How many sections to add on Y axis
     * @param duration - How long it takes to start the effect
     * @param easing - How smoothly the effect should start
     */
    function split_screen(target_x: number, target_y: number, duration: number, easing: easing): void;
    /**
     * Inverts colors on screen
     * @param duration - How long it takes to start the effect
     * @param easing - easing How smoothly the effect should start
     * @param rgb - Color to use to customize filter color
     * @param tween - Makes transitions smoother
     * @param clamp - Limits RGB values to 1
     */
    function invert_color(target: number, duration: number, easing: easing, rgb: any[], tween: boolean, clamp: boolean): void;
}

declare module "events" {
    /**
     * Calls a group when an event occurs
     * @param event - Event to listen to
     * @param group - Group of object
     */
    function on(event: event, group: group): void;
    /**
     * Listens to when the screen is touched
     * @param [dual_side = false] - Whether to only listen to dual side
     */
    function touch(dual_side?: boolean): event;
    /**
     * Event that runs on every frame
     */
    function frame(): void;
    /**
     * Listens to when the screen stops being touched
     * @param [dual_side = false] - Whether to only listen to dual side
     */
    function touch_end(dual_side?: boolean): event;
    /**
     * Listens to when two collision blocks collide
     * @param block_a - First block to listen to
     * @param block_b - Second block to listen to
     * @param P1 - Player 1 as block a
     * @param P2 - Player 2 as block a
     */
    function collision(block_a: block, block_b: block, P1: boolean, P2: boolean): event;
    /**
     * Listens to when two collision blocks stop colliding
     * @param block_a - First block to listen to
     * @param block_b - Second block to listen to
     * @param P1 - Player 1 as block a
     * @param P2 - Player 2 as block a
     */
    function collision_exit(block_a: block, block_b: block, P1: boolean, P2: boolean): event;
    /**
     * Listens to when the player dies
     */
    function death(): event;
    /**
     * Listens to when an item hits a specific number
     * @param item - Item to listen to
     * @param num - Number that triggers event when the item hits this
     * @param multi - Whether to trigger the event multiple time
     */
    function count(item: item, num: number, multi: boolean): event;
    /**
     * Listens to when the player reaches a specific X position
     * @param x - X position where event is called
     */
    function x_position(x: number): event;
    /**
     * Implementation of the event trigger that triggers an event
     * @param event - Event(s) to be listened to (look at {@tutorial Events} for more info)
     * @param extra_id - Implementation of extra ID 1
     * @param extra_id2 - Implementation of extra ID 2
     */
    function event(event: any[] | event_id, extra_id: number, extra_id2: number): event;
    /**
     * Represents gamescene (all functions in this type are made to be used with on())
     * @property button_a - Returns an event when the left side is pressed
     * @property button_b - Returns an event when the right side is pressed
     * @property button_a_end - Returns an event when the left side is no longer pressed
     * @property button_b_end - Returns an event when the right side is no longer pressed
     * @property stop - Stops playing the song
     */
    type gamescene = {
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
    type gamescene = {
        button_a: (...params: any[]) => any;
        button_b: (...params: any[]) => any;
        button_a_end: (...params: any[]) => any;
        button_b_end: (...params: any[]) => any;
        stop: stop;
    };
    type events = {
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
}

declare module "obj_props" {
    type obj_props = {
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
}

declare module "particles" {
    /**
     * @property MAX_PARTICLES - Maximum number of particles.
     * @property DURATION - Duration of the particle effect.
     * @property LIFETIME - Lifetime of particles.
     * @property LIFETIME_VAR - Variance in particle lifetime.
     * @property EMISSION - Rate of particle emission.
     * @property ANGLE - Emission angle.
     * @property ANGLE_VAR - Variance in emission angle.
     * @property SPEED - Speed of particles.
     * @property SPEED_VAR - Variance in particle speed.
     * @property POSVAR_X - Variance in particle position along the X axis.
     * @property POSVAR_Y - Variance in particle position along the Y axis.
     * @property GRAVITY_X - Gravity effect on particles along the X axis.
     * @property GRAVITY_Y - Gravity effect on particles along the Y axis.
     * @property ACCEL_RAD - Radial acceleration.
     * @property ACCEL_RAD_VAR - Variance in radial acceleration.
     * @property ACCEL_TAN - Tangential acceleration.
     * @property ACCEL_TAN_VAR - Variance in tangential acceleration.
     * @property START_SIZE - Initial size of particles.
     * @property START_SIZE_VAR - Variance in initial size.
     * @property START_SPIN - Initial spin of particles.
     * @property START_SPIN_VAR - Variance in initial spin.
     * @property START_R - Initial red color value.
     * @property START_R_VAR - Variance in initial red color.
     * @property START_G - Initial green color value.
     * @property START_G_VAR - Variance in initial green color.
     * @property START_B - Initial blue color value.
     * @property START_B_VAR - Variance in initial blue color.
     * @property START_A - Initial alpha (opacity) value.
     * @property START_A_VAR - Variance in initial alpha value.
     * @property END_SIZE - Final size of particles.
     * @property END_SIZE_VAR - Variance in final size.
     * @property END_SPIN - Final spin of particles.
     * @property END_SPIN_VAR - Variance in final spin.
     * @property END_R - Final red color value.
     * @property END_R_VAR - Variance in final red color.
     * @property END_G - Final green color value.
     * @property END_G_VAR - Variance in final green color.
     * @property END_B - Final blue color value.
     * @property END_B_VAR - Variance in final blue color.
     * @property END_A - Final alpha (opacity) value.
     * @property END_A_VAR - Variance in final alpha value.
     * @property FADE_IN - Fade-in duration.
     * @property FADE_IN_VAR - Variance in fade-in duration.
     * @property FADE_OUT - Fade-out duration.
     * @property FADE_OUT_VAR - Variance in fade-out duration.
     * @property START_RAD - Initial radial position.
     * @property START_RAD_VAR - Variance in initial radial position.
     * @property END_RAD - Final radial position.
     * @property END_RAD_VAR - Variance in final radial position.
     * @property ROT_SEC - Rotation per second.
     * @property ROT_SEC_VAR - Variance in rotation per second.
     * @property GRAVITY_RADIUS - Radius for gravity effect.
     * @property FREE_RELATIVE_GROUPED - Indicates if particles are free, relative, or grouped.
     * @property ADDITIVE - Indicates if additive blending is used.
     * @property START_SPIN_END - Indicates if the initial spin is used at the end.
     * @property START_ROT_IS_DIR - Indicates if the initial rotation is the direction.
     * @property DYNAMIC_ROTATION - Indicates if dynamic rotation is applied.
     * @property TEXTURE - Texture used for particles.
     * @property UNIFORM_OBJ_COLOR - Uniform object color flag.
     * @property FRICTION_P - Friction parallel to direction of movement.
     * @property FRICTION_P_VAR - Variance in parallel friction.
     * @property RESPAWN - Respawn rate of particles.
     * @property RESPAWN_VAR - Variance in respawn rate.
     * @property ORDER_SENSITIVE - Indicates if the order of particles is sensitive.
     * @property START_SIZE_END - Indicates if the start size is used at the end.
     * @property START_RAD_END - Indicates if the initial radial position is used at the end.
     * @property START_RGB_VAR_SYNC - Sync variance in initial RGB values.
     * @property END_RGB_VAR_SYNC - Sync variance in final RGB values.
     * @property FRICTION_S - Friction perpendicular to direction of movement.
     * @property FRICTION_S_VAR - Variance in perpendicular friction.
     * @property FRICTION_R - Rotational friction.
     * @property FRICTION_R_VAR - Variance in rotational friction.
     */
    type particle_props = {
        MAX_PARTICLES: number;
        DURATION: number;
        LIFETIME: number;
        LIFETIME_VAR: number;
        EMISSION: number;
        ANGLE: number;
        ANGLE_VAR: number;
        SPEED: number;
        SPEED_VAR: number;
        POSVAR_X: number;
        POSVAR_Y: number;
        GRAVITY_X: number;
        GRAVITY_Y: number;
        ACCEL_RAD: number;
        ACCEL_RAD_VAR: number;
        ACCEL_TAN: number;
        ACCEL_TAN_VAR: number;
        START_SIZE: number;
        START_SIZE_VAR: number;
        START_SPIN: number;
        START_SPIN_VAR: number;
        START_R: number;
        START_R_VAR: number;
        START_G: number;
        START_G_VAR: number;
        START_B: number;
        START_B_VAR: number;
        START_A: number;
        START_A_VAR: number;
        END_SIZE: number;
        END_SIZE_VAR: number;
        END_SPIN: number;
        END_SPIN_VAR: number;
        END_R: number;
        END_R_VAR: number;
        END_G: number;
        END_G_VAR: number;
        END_B: number;
        END_B_VAR: number;
        END_A: number;
        END_A_VAR: number;
        FADE_IN: number;
        FADE_IN_VAR: number;
        FADE_OUT: number;
        FADE_OUT_VAR: number;
        START_RAD: number;
        START_RAD_VAR: number;
        END_RAD: number;
        END_RAD_VAR: number;
        ROT_SEC: number;
        ROT_SEC_VAR: number;
        GRAVITY_RADIUS: number;
        FREE_RELATIVE_GROUPED: number;
        ADDITIVE: number;
        START_SPIN_END: number;
        START_ROT_IS_DIR: number;
        DYNAMIC_ROTATION: number;
        TEXTURE: number;
        UNIFORM_OBJ_COLOR: number;
        FRICTION_P: number;
        FRICTION_P_VAR: number;
        RESPAWN: number;
        RESPAWN_VAR: number;
        ORDER_SENSITIVE: number;
        START_SIZE_END: number;
        START_RAD_END: number;
        START_RGB_VAR_SYNC: number;
        END_RGB_VAR_SYNC: number;
        FRICTION_S: number;
        FRICTION_S_VAR: number;
        FRICTION_R: number;
        FRICTION_R_VAR: number;
    };
}

declare module "block" {
    /**
     * @property if_colliding - Returns whether the block is colliding with another one
     */
    type block = {
        if_colliding: (...params: any[]) => any;
    };
    /**
     * Creates a block from a number
     * @param number - Block ID
     * @param [specific = true] - Whether to disallow G.js from using that specific block again
     */
    class $block {
        constructor(number: number, specific?: boolean);
        /**
         * @param b2 - Other block to check for collision
         * @param true_id - Group to call if colliding with b2
         * @param false_id - Group to call if not colliding with b2
         */
        if_colliding(b2: block, true_id: group, false_id: group): void;
    }
}

declare module "color" {
    /**
     * @property set - Sets color to RGB value
     * @property copy - Copy a color channel to another
     * @property pulse_hsv - Pulses color w/ HSV
     * @property pulse - Pulses color
     */
    type color = {
        set: (...params: any[]) => any;
        copy: (...params: any[]) => any;
        pulse_hsv: (...params: any[]) => any;
        pulse: (...params: any[]) => any;
    };
    /**
     * Creates a color from a number
     * @param number - Color ID
     * @param [specific = true] - Whether to disallow G.js from using that specific color again
     */
    class $color {
        constructor(number: number, specific?: boolean);
        /**
         * Sets color to RGB value
         * @param c - RGB value
         * @param [duration = 0] - How long it takes for color to change
         * @param [blending = false] - Whether to make color blending
         */
        set(c: any[], duration?: number, blending?: boolean): void;
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
}

declare module "group" {
    /**
     * @property remap - Remaps multiple IDs inside of the group to others
     * @property move - Moves the group
     * @property call - Calls the group
     * @property alpha - Alpha trigger implementation
     * @property lock_to_player - Locks group to player
     * @property stop - Stops the current group
     * @property toggle_on - Toggles the group on
     * @property toggle_off - Toggles the group off
     * @property rotate - Rotates the group
     * @property follow - Makes the group follow another
     * @property follow_lerp - Keeps an object's position proportionally between 2 others
     * @property follow_player_y - Follows player Y
     * @property move_to - Move target implementation
     * @property move_to_xy - Moves group to specific coordinate
     * @property pulse_hsv - Pulses group w/ HSV
     * @property pulse - Pulses group
     */
    type group = {
        remap: (...params: any[]) => any;
        move: (...params: any[]) => any;
        call: (...params: any[]) => any;
        alpha: (...params: any[]) => any;
        lock_to_player: (...params: any[]) => any;
        stop: (...params: any[]) => any;
        toggle_on: (...params: any[]) => any;
        toggle_off: (...params: any[]) => any;
        rotate: (...params: any[]) => any;
        follow: (...params: any[]) => any;
        follow_lerp: (...params: any[]) => any;
        follow_player_y: (...params: any[]) => any;
        move_to: (...params: any[]) => any;
        move_to_xy: (...params: any[]) => any;
        pulse_hsv: (...params: any[]) => any;
        pulse: (...params: any[]) => any;
    };
    /**
     * Creates a group from a number
     * @param number - Group ID
     * @param [specific = true] - Whether to disallow G.js from using that specific group again
     */
    class $group {
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
        * @param {boolean} silent Make move trigger take no time
         */
        move(x: number, y: number, duration: number, easing: easing, easing_rate?: number, x_multiplier?: number, y_multiplier?: number, multiply?: boolean): void;
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
         * Animate trigger implementation
         * @param [anim_id = 0] - Animation ID (can also use `animations.[monster].[animation name]`, check index module for more info about animation IDs)
         */
        animate(anim_id?: number): void;
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
}

