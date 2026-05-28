import type { Counter, TriggerFunctionGroup } from '../core';
/**
* Creates a spawn trigger and returns it
* @param {any} group group to be spawned
* @param {number} time delay to spawn group
* @returns {any}
* @category Functions
* @group Control Flow
*/
export declare let spawn_trigger: (group: any, time?: number) => import("../core").GJsObject;
/**
 * Creates a loop that repeats every tick
 * @param {any} tfn The group to call every tick
 * @returns {TriggerFunctionGroup} Group that can be used to stop the loop
 * @category Functions
 * @group Control Flow
 */
export declare let frame_loop: (tfn: any) => TriggerFunctionGroup;
/**
 * Waits a specific amount of ticks
 * @param {number} frames_count How many ticks to wait for
 * @category Functions
 * @group Control Flow
 */
export declare let frames: (frames_count: number) => void;
/**
 * Creates a loop that repeats every render frame (different from ticks, which are a constant of 1/240 seconds, while render frames are variable and can be changed in settings)
 * @param {any} fn The group to call every frame
 * @returns {TriggerFunctionGroup} Group that can be used to stop the loop
 * @category Functions
 * @group Control Flow
 */
export declare let render_frame_loop: (fn: any) => TriggerFunctionGroup;
/**
 * Waits a specific amount of render frames
 * @param {number} frames_count How many frames to wait for
 * @category Functions
 * @group Control Flow
 */
export declare let render_frames: (frames_count: number) => void;
/**
 * Returns a greater than condition
 * @param {Counter} count_obj Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {any}
 * @category Functions
 * @group Control Flow
 */
export declare let greater_than: (count_obj: Counter, other: number) => {
    count: Counter;
    comparison: number;
    other: number;
};
/**
 * Returns a equal to condition
 * @param {Counter} count_obj Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {any}
 */
export declare let equal_to: (count_obj: Counter, other: number) => {
    count: Counter;
    comparison: number;
    other: number;
};
/**
 * Returns a less than condition
 * @param {Counter} count_obj Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {any}
 */
export declare let less_than: (count_obj: Counter, other: number) => {
    count: Counter;
    comparison: number;
    other: number;
};
/**
 * Calls a group with a delay
 * @param {number} time How much to delay by
 * @param {any} func Group to call
 */
export declare let call_with_delay: (time: number, func: any) => void;
/**
* Implementation of sequence trigger
* @param {any[]} sequence_arr Sequence of groups to be called (e.g. [[group(1), 1], [group(2), 1]] is a valid input)
* @param {number} [mode=0] Mode of sequence trigger (0 = stop, 1 = loop, 2 = last)
* @param {number} [min_int=0] MinInt of sequence trigger
* @param {number} [reset=0] Reset of sequence trigger (0 = full, 1 = step)
* @returns {any} Function that steps through the sequence once
*/
export declare let sequence: (sequence_arr: any[], mode?: number, min_int?: number, reset?: number) => () => any;
/**
 * Creates trigger function-like systems, but can be called normally with item IDs as arguments (e.g. a remappable can be called like `my_remappable(counter1.item)`)
 * @param {Function} fn Function that remappable uses
 * @returns {any} Function to call
 */
export declare let remappable: (fn: Function) => (...args: any[]) => void;
/**
 * Loops a function a specific amount of times (defined by range)
 * @param {any[]} rang Range of numbers defining how many times to loop fn by
 * @param {Function} fn Function to loop
 * @param {number} [delay=0.05] How much to delay between cycle
 */
export declare let for_loop: (rang: any[], fn: Function, delay?: number) => void;
