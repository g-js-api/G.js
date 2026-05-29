import type { Counter, FloatCounter } from '../core';
/**
 * Creates a counter, which has methods for editing items.
 * @param {any} [num=0] Number or boolean to be represented by counter.
 * @param {boolean} [use_id=false] Whether to use an existing item ID as a counter instead of creating a new item.
 * @param {boolean} [persistent=false] Whether to make the counter persistent between attempts.
 * @param {boolean} [is_timer=false] Whether to make the counter a timer.
 * @param {number} [bits] Amount of bits in a counter.
 * @returns {Counter} Resulting counter.
 * @category Functions
 * @group Counter
 */
export declare const counter: (num?: any, use_id?: boolean, persistent?: boolean, is_timer?: boolean, bits?: number) => Counter;
/**
 * Version of counter that supports floating point values.
 * @param {any} [val=0] Number or boolean to be represented by counter.
 * @param {boolean} [use_id=false] Whether to use an existing item ID.
 * @param {boolean} [persistent=false] Whether to make the counter persistent.
 * @returns {FloatCounter} Resulting counter.
 * @category Functions
 * @group Counter
 */
export declare const float_counter: (val?: number, use_id?: boolean, persistent?: boolean) => FloatCounter;
/**
 * Implementation of timers.
 * @param {number} start_seconds Start seconds.
 * @param {number} [end_seconds=0] End seconds.
 * @param {any} [target_id=group(0)] ID to call when timer stops.
 * @param {boolean} [backwards=false] Whether to go backwards.
 * @param {boolean} [seconds_only=false] Whether to only count seconds.
 * @param {boolean} [stop=true] Whether to stop the timer at end_seconds.
 * @param {number} [time_mod=1] How much to modify the timer by w/ multiplication (cannot be used if backwards is true).
 * @param {boolean} [ignore_timewarp=false] Whether to ignore timewarp.
 * @param {boolean} [no_override=false] Whether to ignore when the timer is overridden by another.
 * @returns {Counter}
 * @category Functions
 */
export declare const timer: (start_seconds: any, end_seconds?: number, target_id?: import("../core").$group, backwards?: boolean, seconds_only?: boolean, stop?: boolean, time_mod?: number, ignore_timewarp?: boolean, no_override?: boolean) => Counter;
