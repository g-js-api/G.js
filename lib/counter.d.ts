/**
 * Represents a counter, which is a wrapper around item IDs
 */
declare interface counter {
    /**
     * Item ID of a counter
     */
    item: number;
    /**
     * Type of a counter
     */
    type: string;
    /**
     * Adds a specific amount (or another counter) to the current counter
     */
    add: add_counter;
    /**
     * Subtracts a specific amount (or another counter) from the current counter
     */
    subtract: subtract;
    /**
     * Multiplies the current counter by a specific amount (or another counter)
     */
    multiply: multiply;
    /**
     * Divides the current counter by a specific amount (or another counter)
     */
    divide: divide;
    /**
     * Sets the current counter to a specific amount or another counter
     */
    set: set;
    /**
     * Resets the current counter to 0
     */
    reset: reset;
    /**
     * Checks if a comparison is true, and if so calls a group (SMALLER_THAN/EQUAL_TO_LARGER_THAN)
     */
    if_is: if_is;
    /**
     * Converts the current counter to a plain number by taking in a range of possible values and a function
     */
    to_const: to_const;
    /**
     * Copies the current counter to another counter
     */
    copy_to: copy_to;
    /**
     * Displays the current counter at a specific position
     */
    display: display;
    /**
     * Returns item display for current counter as an object
     */
    to_obj: to_obj;
    /**
     * Adds the current counter to another and resets the current counter
     */
    add_to: add_to;
    /**
     * Subtracts the current counter from another and resets the current counter
     */
    subtract_from: subtract_from;
}

declare function counter(
    num?: number | boolean,
    use_id?: boolean,
    persistent?: boolean,
    timer?: boolean
): counter;

/**
 * Adds a specific amount (or another counter) to the current counter
 * @param amount Counter or number to add to the current counter
 */
declare type add_counter = (amount: number | counter)=>void;

/**
 * Adds a specific amount (or another counter) to the current counter
 * @param amount Counter or number to subtract from the current counter
 */
declare type subtract = (amount: number | counter)=>void;

/**
 * Adds a specific amount (or another counter) to the current counter
 * @param amount Counter or number to multiply the current counter by
 */
declare type multiply = (amount: number | counter)=>void;

/**
 * Adds a specific amount (or another counter) to the current counter
 * @param amount Counter or number to divide the current counter by
 */
declare type divide = (amount: number | counter)=>void;

/**
 * Adds a specific amount (or another counter) to the current counter
 * @param amount Counter or number to set the current counter to
 */
declare type set = (amount: number | counter)=>void;

/**
 * Resets the current counter to 0
 */
declare type reset = ()=>void;

/**
 * Returns item display for current counter as an object
 * @returns Resulting item display
 */
declare type to_obj = ()=>object;

/**
 * Checks if a comparison is true, and if so calls a group (SMALLER_THAN/EQUAL_TO_LARGER_THAN)
 * @param comparison Condition to check for between the counter and number
 * @param other Number to compare the current counter to
 * @param trig_func Trigger function or group to run if the comparison is true
 */
declare type if_is = (comparison: number, other: number, trig_func: group)=>void;

/**
 * Converts the current counter to a plain number by taking in a range of possible values and a function
 * @param range Possible range of values that the current counter is equal to
 * @param func Callback function to run that takes the plain numerical value as input
 */
declare type to_const = (range: any[], func: Function)=>void;

/**
 * Displays the current counter at a specific position
 * @param x X position of item display
 * @param y Y position of item display
 */
declare type display = (x: number, y: number)=>void;

/**
 * Copies the current counter to another counter
 * @param counter Counter to copy the current counter to
 */
declare type copy_to = (counter: counter)=>void;

/**
 * Adds the current counter to another and resets the current counter
 * @param counter Counter to add the current counter to
 */
declare type add_to = (counter: counter)=>void;

/**
 * Subtracts the current counter from another and resets the current counter
 * @param counter Counter to be subtracted from
 */
declare type subtract_from = (counter: counter)=>void;

