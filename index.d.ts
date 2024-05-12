/**
 * Extracts values from dictionary into global scope
 * @param dict Dictionary to extract
 */
declare function extract(dict: object): void;

/**
 * Creates a repeating trigger system that repeats while a condition is true
 * @param condition Condition that defines whether the loop should keep on running (less_than/equal_to/greater_than(counter, number))
 * @param func Function to run while the condition is true
 * @param delay Delay between each cycle
 */
declare function while_loop(condition: object, func: Function, delay: number): void;

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
 * @param callback Function storing triggers to put inside of group
 * @returns Group ID of trigger function
 */
declare function trigger_function(callback: Function): group;

/**
 * Waits for a specific amount of seconds
 * @param time How long to wait
 */
declare function wait(time: number): void;

declare interface easing {
    /**
     * Ease in out easing
     */
    EASE_IN_OUT: number;
    /**
     * Ease in easing
     */
    EASE_IN: number;
    /**
     * Ease out easing
     */
    EASE_OUT: number;
    /**
     * Exponential in out easing
     */
    EXPONENTIAL_IN_OUT: number;
    /**
     * Exponential in easing
     */
    EXPONENTIAL_IN: number;
    /**
     * Exponential out easing
     */
    EXPONENTIAL_OUT: number;
    /**
     * Sine in out easing
     */
    SINE_IN_OUT: number;
    /**
     * Sine in easing
     */
    SINE_IN: number;
    /**
     * Sine out easing
     */
    SINE_OUT: number;
    /**
     * Elastic in out easing
     */
    ELASTIC_IN_OUT: number;
    /**
     * Elastic in easing
     */
    ELASTIC_IN: number;
    /**
     * Elastic out easing
     */
    ELASTIC_OUT: number;
    /**
     * Back in out easing
     */
    BACK_IN_OUT: number;
    /**
     * Back in easing
     */
    BACK_IN: number;
    /**
     * Back out easing
     */
    BACK_OUT: number;
    /**
     * Bounce in out easing
     */
    BOUNCE_IN_OUT: number;
    /**
     * Bounce in easing
     */
    BOUNCE_IN: number;
    /**
     * Bounce out easing
     */
    BOUNCE_OUT: number;
}

/**
 * Configuration for exporting levels
 */
declare interface save_config {
    /**
     * Whether to log information to console when finished
     */
    info: boolean;
    /**
     * Whether to warn that group count is surpassed (only useful if in future updates the group count is increased)
     */
    group_count_warning: boolean;
    /**
     * Name of level (only for exportToSavefile)
     */
    level_name: string;
}

/**
 * Core type holding important functions for adding to levels, exporting and modifying scripts
 */
declare interface $ {
    /**
     * Adds an object
     */
    add: add;
    /**
     * Prints to console
     */
    print: print;
    /**
     * Returns level string of the script
     */
    getLevelString: getLevelString;
    /**
     * Extends a trigger function by adding more triggers to it
     */
    extend_trigger_func: extend_trigger_func;
    /**
     * Exports script to savefile
     */
    exportToSavefile: exportToSavefile;
    /**
     * Exports script to live editor using WSLiveEditor (requires Geode)
     */
    liveEditor: liveEditor;
    /**
     * Returns group of current trigger function context
     */
    trigger_fn_context: trigger_fn_context;
}

/**
 * Adds an object
 * @param object Object to add
 */
declare type add = (object: object)=>void;

/**
 * Prints to console
 * @param value Value to print
 */
declare type print = (value: any)=>void;

/**
 * Extends a trigger function by adding more triggers to it
 * @param trigger_func Trigger function to extend
 * @param callback Function that adds more triggers to trigger_func
 */
declare type extend_trigger_func = (trigger_func: group, callback: Function)=>void;

/**
 * Returns level string
 * @param config Configuration for exporting to levelstring
 * @returns Resulting level string
 */
declare type getLevelString = (config: save_config)=>string;

/**
 * Exports script to savefile
 * @param config Configuration for exporting to savefile
 */
declare type exportToSavefile = (config: save_config)=>void;

/**
 * Exports script to live editor using WSLiveEditor (requires Geode)
 * @param config Configuration for exporting to live editor
 */
declare type liveEditor = (config: save_config)=>void;

/**
 * Returns group of current trigger function context
 * @returns Group of current trigger function context
 */
declare type trigger_fn_context = ()=>group;

/**
 * Creates a particle system
 * @param props Dictionary holding particle properties (check {@tutorial Particles} for more info)
 * @param use_obj_color Whether to make the particle system use the object color
 * @param animate_on_trigger Whether to only start the particle system when the Animate trigger is used on the particle system instead of immediately
 * @param animate_active_only Only makes animate_on_trigger true if the object is active
 * @param quick_start Makes normal movement be achieved instantly instead of gradually
 * @returns Returned particle system
 */
declare function particle_system(props: object, use_obj_color?: boolean, animate_on_trigger?: boolean, animate_active_only?: boolean, quick_start?: boolean): object;

/**
 * Generates an array holding a sequence of numbers starting at the "start" parameter, ending at the "end" parameter and incrementing by "step"
 * @param start What number to start at
 * @param end What number to end at
 * @param step What number to increment by
 * @returns Resulting sequence
 */
declare function range(start: number, end: number, step?: number): any[];

/**
 * Represents gamescene (all functions in this type are made to be used with on())
 */
declare interface gamescene {
    /**
     * Returns an event when the left side is pressed
     */
    button_a: Function;
    /**
     * Returns an event when the right side is pressed
     */
    button_b: Function;
    /**
     * Returns an event when the left side is no longer pressed
     */
    button_a_end: Function;
    /**
     * Returns an event when the right side is no longer pressed
     */
    button_b_end: Function;
    /**
     * Stops playing the song
     */
    stop: stop;
}

