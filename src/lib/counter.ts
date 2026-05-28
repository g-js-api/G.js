/**
 * @module counter
 */
import crypto from 'crypto';
import {
    $, trigger, Context, trigger_function, group_fn as group, color_fn as color, object,
} from '../core';
import type { Counter, FloatCounter, GJsObject } from '../core';
import {
    ITEM, TIMER, NONE, ADD, EQ, SUB, MUL, DIV, RND, FLR, CEI, ABS, NEG, EQUAL_TO,
} from '../constants';
import { item_edit, item_comp } from './items';

let next_free = 1;

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
export const counter = (num: any = 0, use_id = false, persistent = false, is_timer = false, bits?: number): Counter => {
    let id = use_id ? num : next_free++;
    if (num !== 0 && !use_id) {
        if (!persistent) {
            if (!bits) bits = num.toString(2).length
            $.add(trigger({
                OBJ_ID: 1817,
                COUNT: num,
                ITEM: id,
            }));
        }
    }
    if (persistent) {
        $.add(trigger({
            OBJ_ID: 3641,
            PERSISTENT: true,
            ITEM: id,
            494: +(persistent && is_timer)
        }));
    };
    let exports: Counter = {
        item: id,
        type: is_timer ? TIMER : ITEM,
        bits,
        add: (amount) => {
            if (typeof amount == 'number') {
                $.add(trigger({
                    OBJ_ID: 1817,
                    COUNT: amount,
                    ITEM: id,
                }));
            } else if (typeof amount == 'object') {
                $.add(item_edit(amount.item, undefined, id, amount.type, NONE, exports.type, ADD));
            }
            return exports;
        },
        set: (amount) => {
            if (typeof amount == 'number') {
                $.add(trigger({
                    OBJ_ID: 1817,
                    COUNT: amount,
                    OVERRIDE_COUNT: true,
                    ITEM: id,
                }));
            } else if (typeof amount == 'object') {
                $.add(item_edit(undefined, amount.item, id, NONE, amount.type, exports.type, EQ));
            }
            return exports;
        },
        subtract: (amount) => {
            if (typeof amount == 'number') {
                $.add(trigger({
                    OBJ_ID: 1817,
                    COUNT: -amount,
                    ITEM: id,
                }));
            } else if (typeof amount == 'object') {
                $.add(item_edit(amount.item, undefined, id, amount.type, NONE, exports.type, SUB));
            }
            return exports;
        },
        multiply: (amount) => {
            if (typeof amount == 'number') {
                $.add(trigger({
                    OBJ_ID: 1817,
                    MODIFIER: amount,
                    MULT_DIV: 1,
                    ITEM: id,
                }));
            } else if (typeof amount == 'object') {
                $.add(item_edit(amount.item, undefined, id, amount.type, NONE, exports.type, MUL));
            }
            return exports;
        },
        divide: (amount) => {
            if (typeof amount == 'number') {
                $.add(trigger({
                    OBJ_ID: 1817,
                    MODIFIER: amount,
                    MULT_DIV: 2,
                    ITEM: id,
                }));
            } else if (typeof amount == 'object') {
                $.add(item_edit(amount.item, undefined, id, amount.type, NONE, exports.type, DIV));
            }
            return exports;
        },
        display: (x, y) =>
            $.add(object({
                OBJ_ID: 1615,
                X: x,
                Y: y,
                ITEM: id,
                COLOR: color(1),
            })),
        to_obj: (): GJsObject => {
            let or = object({
                OBJ_ID: 1615,
                ITEM: id,
                COLOR: color(1)
            });
            return or;
        },
        if_is: (comparison, other, trig_func) => {
            $.add(trigger({
                OBJ_ID: 1811,
                TARGET: trig_func,
                COUNT: other,
                ACTIVATE_GROUP: true,
                COMPARISON: comparison,
                ITEM: id,
            }));
        },
        to_const: (range, cb) => {
            let old_ctx = Context.current;
            for (let i_ in range) {
                const i = range[i_];
                let id = crypto.randomUUID();
                let context = new Context(id, true);
                cb(i);
                Context.set(old_ctx);
                exports.if_is(EQUAL_TO, i, context.group);
            }
        },
        add_to: (item) => {
            item.add(exports);
            exports.reset();
            return exports;
        },
        copy_to: (item) => {
            $.add(item_edit(undefined, id, item.item, NONE, item.type, exports.type, EQ));
            return exports;
        },
        clone: () => {
            return counter().set(exports);
        },
        subtract_from: (b) => {
            // basically (a - b) then reset b to zero
            $.add(item_edit(id, b.item, id, exports.type, b.type, exports.type, EQ, SUB));
            b.reset();
            return exports;
        },
        reset: () => {
            exports.set(0);
            return exports;
        },
        abs: () => {
            $.add(item_edit(undefined, exports.item, exports.item, NONE, exports.type, exports.type, EQ, undefined, undefined, 1, ABS));
            return exports;
        },
        neg: () => {
            $.add(item_edit(undefined, exports.item, exports.item, NONE, exports.type, exports.type, EQ, undefined, undefined, 1, NEG));
            return exports;
        },
        mod: (b) => {
            let a = exports;
            let result = counter();
            // Math.floor(a / b)
            $.add(typeof b == 'object' ? item_edit(a.item, (b as any).item, result.item, a.type, (b as any).type, result.type, EQ, DIV, undefined, 1, undefined, undefined, FLR) : item_edit(a.item, NONE, result.item, a.type, NONE, result.type, EQ, DIV, DIV, b, undefined, undefined, FLR));
            result.multiply(b);
            // a - result
            $.add(item_edit(a.item, result.item, result.item, a.type, result.type, result.type, EQ, SUB));
            return result;
        }
    };
    if (persistent) {
        let tfr = trigger_function(() => {
            $.add(trigger({
                OBJ_ID: 1817,
                COUNT: num,
                OVERRIDE_COUNT: true,
                ITEM: id,
            }));
        });
        exports.if_is(EQUAL_TO, 0, tfr);
    }
    return exports;
};

let nfloat = 1;

/**
 * Version of counter that supports floating point values.
 * @param {any} [val=0] Number or boolean to be represented by counter.
 * @param {boolean} [use_id=false] Whether to use an existing item ID.
 * @param {boolean} [persistent=false] Whether to make the counter persistent.
 * @returns {FloatCounter} Resulting counter.
 * @category Functions
 * @group Counter
 */
export const float_counter = (val = 0, use_id = false, persistent = false): FloatCounter => {
    let fid = use_id ? val : nfloat++;
    let c_item = counter(fid, true, persistent, true) as any;
    if (val !== 0 && !use_id) $.add(item_edit(undefined, undefined, (c_item as any).item, NONE, NONE, TIMER, EQ, undefined, undefined, val));
    (c_item as any).display = (x, y, seconds_only = false) => $.add(object({
        OBJ_ID: 1615,
        X: x,
        Y: y,
        ITEM: (c_item as any).item,
        TIME_COUNTER: true,
        SECONDS_ONLY: seconds_only,
        COLOR: color(2),
    }));
    (c_item as any).to_obj = () => object({
        OBJ_ID: 1615,
        ITEM: (c_item as any).item,
        TIME_COUNTER: true,
        COLOR: color(2),
    });
    (c_item as any).add = (amount) => {
        if (typeof amount == 'number') {
            $.add(item_edit(undefined, undefined, (c_item as any).item, NONE, NONE, TIMER, ADD, undefined, undefined, amount));
        } else if (typeof amount == 'object') {
            $.add(item_edit(amount.item, undefined, (c_item as any).item, amount.type, NONE, TIMER, ADD));
        }
        return c_item;
    }
    (c_item as any).if_is = (comparison, other, trig_func) => {
        $.add(item_comp((c_item as any).item, 0, TIMER, NONE, comparison == 2 ? 3 : comparison, trig_func, undefined, undefined, other));
    };
    (c_item as any).subtract = (amount) => {
        if (typeof amount == 'number') {
            $.add(item_edit(undefined, undefined, (c_item as any).item, TIMER, NONE, TIMER, SUB, undefined, undefined, amount));
        } else if (typeof amount == 'object') {
            $.add(item_edit(amount.item, undefined, (c_item as any).item, amount.type, NONE, TIMER, SUB));
        }
        return c_item;
    }
    (c_item as any).divide = (amount) => {
        if (typeof amount == 'number') {
            $.add(item_edit(undefined, undefined, (c_item as any).item, TIMER, NONE, TIMER, DIV, undefined, undefined, amount));
        } else if (typeof amount == 'object') {
            $.add(item_edit(amount.item, undefined, (c_item as any).item, amount.type, NONE, TIMER, DIV));
        }
        return c_item;
    }
    (c_item as any).multiply = (amount) => {
        if (typeof amount == 'number') {
            $.add(item_edit(undefined, undefined, (c_item as any).item, TIMER, NONE, TIMER, MUL, undefined, undefined, amount));
        } else if (typeof amount == 'object') {
            $.add(item_edit(amount.item, undefined, (c_item as any).item, amount.type, NONE, TIMER, MUL));
        }
        return c_item;
    }
    (c_item as any).set = (amount) => {
        if (typeof amount == 'number') {
            $.add(item_edit(undefined, undefined, (c_item as any).item, NONE, NONE, TIMER, EQ, undefined, undefined, amount));
        } else if (typeof amount == 'object') {
            $.add(item_edit(amount.item, undefined, (c_item as any).item, amount.type, NONE, TIMER, EQ));
        }
        return c_item;
    };
    (c_item as any).reset = () => {
        (c_item as any).set(0);
        return c_item;
    }
    (c_item as any).abs = () => {
        $.add(item_edit(undefined, (c_item as any).item, (c_item as any).item, NONE, TIMER, TIMER, EQ, undefined, undefined, 1, ABS));
        return c_item;
    };
    (c_item as any).neg = () => {
        $.add(item_edit(undefined, (c_item as any).item, (c_item as any).item, NONE, TIMER, TIMER, EQ, undefined, undefined, 1, NEG));
        return c_item;
    };
    (c_item as any).round = () => {
        $.add(item_edit(undefined, (c_item as any).item, (c_item as any).item, NONE, TIMER, TIMER, EQ, undefined, undefined, 1, undefined, undefined, RND));
        return c_item;
    };
    (c_item as any).floor = () => {
        $.add(item_edit(undefined, (c_item as any).item, (c_item as any).item, NONE, TIMER, TIMER, EQ, undefined, undefined, 1, undefined, undefined, FLR));
        return c_item;
    };
    (c_item as any).clone = () => {
        return float_counter().set(c_item);
    }
    (c_item as any).mod = (b) => {
        let a = c_item as any;
        let result = float_counter();
        // Math.floor(a / b)
        $.add(typeof b == 'object' ? item_edit(a.item, (b as any).item, (result as any).item, a.type, (b as any).type, (result as any).type, EQ, DIV, undefined, 1, undefined, undefined, FLR) : item_edit(a.item, NONE, (result as any).item, a.type, NONE, (result as any).type, EQ, DIV, DIV, b, undefined, undefined, FLR));
        (result as any).multiply(b);
        // a - result
        $.add(item_edit(a.item, (result as any).item, (result as any).item, a.type, (result as any).type, (result as any).type, EQ, SUB));
        return result;
    }
    return c_item as FloatCounter;
}

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
 */
export const timer = (start_seconds, end_seconds = 0, target_id = group(0), backwards = false, seconds_only = false, stop = true, time_mod = 1, ignore_timewarp = false, no_override = false): Counter => {
    // START_IME, STOP_TIME, STOP_CHECKED, ITEM, TARGET, TIME_MOD, IGNORE_TIMEWARP, START_PAUSED, DONT_OVERRIDE
    let c_item = counter(0, false, false, true);
    let o: any = {
        OBJ_ID: 3614,
        START_TIME: start_seconds,
        STOP_TIME: end_seconds,
        STOP_CHECKED: stop,
        ITEM: (c_item as any).item,
        TARGET: target_id,
        TIMER_TIME_MOD: backwards ? -1 : time_mod,
        IGNORE_TIMEWARP: ignore_timewarp,
        DONT_OVERRIDE: no_override
    };
    (c_item as any).display = (x, y) => $.add(object({
        OBJ_ID: 1615,
        X: x,
        Y: y,
        ITEM: (c_item as any).item,
        TIME_COUNTER: true,
        SECONDS_ONLY: seconds_only,
        COLOR: color(1),
    }));
    (c_item as any).set_start = (x) => o.START_TIME = x;
    (c_item as any).set_end = (x) => o.STOP_TIME = x;
    (c_item as any).start = () => {
        $.add(trigger(o));
    };
    (c_item as any).stop = () => {
        $.add(trigger({
            OBJ_ID: 3617,
            ITEM: (c_item as any).item,
            START_STOP: true
        }))
    };
    return c_item;
}
