/**
 * Creates a spawn trigger and returns it
 * @param group group to be spawned
 * @param time delay to spawn group
 * @returns
 */
declare function spawn_trigger(group: group, time?: number): object;

/**
 * Returns a greater than condition
 * @param counter Counter to compare to number
 * @param other Number to be compared to counter
 * @returns
 */
declare function greater_than(counter: counter, other: number): condition;

/**
 * Returns a equal to condition
 * @param counter Counter to compare to number
 * @param other Number to be compared to counter
 * @returns
 */
declare function equal_to(counter: counter, other: number): condition;

/**
 * Returns a less than condition
 * @param counter Counter to compare to number
 * @param other Number to be compared to counter
 * @returns
 */
declare function less_than(counter: counter, other: number): condition;

/**
 * Calls a group with a delay
 * @param delay How much to delay by
 * @param group Group to call
 */
declare function call_with_delay(delay: number, group: group): void;

/**
 * Implementation of sequence trigger
 * @param sequence Sequence of groups to be called (e.g. [[group(1), 1], [group(2), 1]] is a valid input)
 * @param mode Mode of sequence trigger (0 = stop, 1 = loop, 2 = last)
 * @param min_int MinInt of sequence trigger
 * @param reset Reset of sequence trigger (0 = full, 1 = step)
 * @returns Function that steps through the sequence once
 */
declare function sequence(sequence: any[], mode?: number, min_int?: number, reset?: number): Function;

/**
 * Creates trigger function-like systems, but can be called normally with item IDs as arguments (e.g. a remappable can be called like `my_remappable(counter1.item)`)
 * @param fn Function that remappable uses
 * @returns Function to call
 */
declare function remappable(fn: Function): Function;

/**
 * Loops a function a specific amount of times (defined by range)
 * @param range Range of numbers defining how many times to loop fn by
 * @param fn Function to loop
 * @param delay How much to delay between cycle
 */
declare function for_loop(range: any[], fn: Function, delay?: number): void;

