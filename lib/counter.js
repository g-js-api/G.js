"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timer = exports.float_counter = exports.counter = void 0;
/**
 * @module counter
 */
const crypto_1 = __importDefault(require("crypto"));
const core_1 = require("../core");
const constants_1 = require("../constants");
const items_1 = require("./items");
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
const counter = (num = 0, use_id = false, persistent = false, is_timer = false, bits) => {
    let id = use_id ? num : next_free++;
    if (num !== 0 && !use_id) {
        if (!persistent) {
            if (!bits)
                bits = num.toString(2).length;
            core_1.$.add((0, core_1.trigger)({
                OBJ_ID: 1817,
                COUNT: num,
                ITEM: id,
            }));
        }
    }
    if (persistent) {
        core_1.$.add((0, core_1.trigger)({
            OBJ_ID: 3641,
            PERSISTENT: true,
            ITEM: id,
            494: +(persistent && is_timer)
        }));
    }
    ;
    let exports = {
        item: id,
        type: is_timer ? constants_1.TIMER : constants_1.ITEM,
        bits,
        add: (amount) => {
            if (typeof amount == 'number') {
                core_1.$.add((0, core_1.trigger)({
                    OBJ_ID: 1817,
                    COUNT: amount,
                    ITEM: id,
                }));
            }
            else if (typeof amount == 'object') {
                core_1.$.add((0, items_1.item_edit)(amount.item, undefined, id, amount.type, constants_1.NONE, exports.type, constants_1.ADD));
            }
            return exports;
        },
        set: (amount) => {
            if (typeof amount == 'number') {
                core_1.$.add((0, core_1.trigger)({
                    OBJ_ID: 1817,
                    COUNT: amount,
                    OVERRIDE_COUNT: true,
                    ITEM: id,
                }));
            }
            else if (typeof amount == 'object') {
                core_1.$.add((0, items_1.item_edit)(undefined, amount.item, id, constants_1.NONE, amount.type, exports.type, constants_1.EQ));
            }
            return exports;
        },
        subtract: (amount) => {
            if (typeof amount == 'number') {
                core_1.$.add((0, core_1.trigger)({
                    OBJ_ID: 1817,
                    COUNT: -amount,
                    ITEM: id,
                }));
            }
            else if (typeof amount == 'object') {
                core_1.$.add((0, items_1.item_edit)(amount.item, undefined, id, amount.type, constants_1.NONE, exports.type, constants_1.SUB));
            }
            return exports;
        },
        multiply: (amount) => {
            if (typeof amount == 'number') {
                core_1.$.add((0, core_1.trigger)({
                    OBJ_ID: 1817,
                    MODIFIER: amount,
                    MULT_DIV: 1,
                    ITEM: id,
                }));
            }
            else if (typeof amount == 'object') {
                core_1.$.add((0, items_1.item_edit)(amount.item, undefined, id, amount.type, constants_1.NONE, exports.type, constants_1.MUL));
            }
            return exports;
        },
        divide: (amount) => {
            if (typeof amount == 'number') {
                core_1.$.add((0, core_1.trigger)({
                    OBJ_ID: 1817,
                    MODIFIER: amount,
                    MULT_DIV: 2,
                    ITEM: id,
                }));
            }
            else if (typeof amount == 'object') {
                core_1.$.add((0, items_1.item_edit)(amount.item, undefined, id, amount.type, constants_1.NONE, exports.type, constants_1.DIV));
            }
            return exports;
        },
        display: (x, y) => core_1.$.add((0, core_1.object)({
            OBJ_ID: 1615,
            X: x,
            Y: y,
            ITEM: id,
            COLOR: (0, core_1.color_fn)(1),
        })),
        to_obj: () => {
            let or = (0, core_1.object)({
                OBJ_ID: 1615,
                ITEM: id,
                COLOR: (0, core_1.color_fn)(1)
            });
            return or;
        },
        if_is: (comparison, other, trig_func) => {
            core_1.$.add((0, core_1.trigger)({
                OBJ_ID: 1811,
                TARGET: trig_func,
                COUNT: other,
                ACTIVATE_GROUP: true,
                COMPARISON: comparison,
                ITEM: id,
            }));
        },
        to_const: (range, cb) => {
            let old_ctx = core_1.Context.current;
            for (let i_ in range) {
                const i = range[i_];
                let id = crypto_1.default.randomUUID();
                let context = new core_1.Context(id, true);
                cb(i);
                core_1.Context.set(old_ctx);
                exports.if_is(constants_1.EQUAL_TO, i, context.group);
            }
        },
        add_to: (item) => {
            item.add(exports);
            exports.reset();
            return exports;
        },
        copy_to: (item) => {
            core_1.$.add((0, items_1.item_edit)(undefined, id, item.item, constants_1.NONE, item.type, exports.type, constants_1.EQ));
            return exports;
        },
        clone: () => {
            return (0, exports.counter)().set(exports);
        },
        subtract_from: (b) => {
            // basically (a - b) then reset b to zero
            core_1.$.add((0, items_1.item_edit)(id, b.item, id, exports.type, b.type, exports.type, constants_1.EQ, constants_1.SUB));
            b.reset();
            return exports;
        },
        reset: () => {
            exports.set(0);
            return exports;
        },
        abs: () => {
            core_1.$.add((0, items_1.item_edit)(undefined, exports.item, exports.item, constants_1.NONE, exports.type, exports.type, constants_1.EQ, undefined, undefined, 1, constants_1.ABS));
            return exports;
        },
        neg: () => {
            core_1.$.add((0, items_1.item_edit)(undefined, exports.item, exports.item, constants_1.NONE, exports.type, exports.type, constants_1.EQ, undefined, undefined, 1, constants_1.NEG));
            return exports;
        },
        mod: (b) => {
            let a = exports;
            let result = (0, exports.counter)();
            // Math.floor(a / b)
            core_1.$.add(typeof b == 'object' ? (0, items_1.item_edit)(a.item, b.item, result.item, a.type, b.type, result.type, constants_1.EQ, constants_1.DIV, undefined, 1, undefined, undefined, constants_1.FLR) : (0, items_1.item_edit)(a.item, constants_1.NONE, result.item, a.type, constants_1.NONE, result.type, constants_1.EQ, constants_1.DIV, constants_1.DIV, b, undefined, undefined, constants_1.FLR));
            result.multiply(b);
            // a - result
            core_1.$.add((0, items_1.item_edit)(a.item, result.item, result.item, a.type, result.type, result.type, constants_1.EQ, constants_1.SUB));
            return result;
        }
    };
    if (persistent) {
        let tfr = (0, core_1.trigger_function)(() => {
            core_1.$.add((0, core_1.trigger)({
                OBJ_ID: 1817,
                COUNT: num,
                OVERRIDE_COUNT: true,
                ITEM: id,
            }));
        });
        exports.if_is(constants_1.EQUAL_TO, 0, tfr);
    }
    return exports;
};
exports.counter = counter;
let nfloat = 1;
/**
 * Version of counter that supports floating point values.
 * @param {any} [val=0] Number or boolean to be represented by counter.
 * @param {boolean} [use_id=false] Whether to use an existing item ID.
 * @param {boolean} [persistent=false] Whether to make the counter persistent.
 * @returns {FloatCounter} Resulting counter.
 */
const float_counter = (val = 0, use_id = false, persistent = false) => {
    let fid = use_id ? val : nfloat++;
    let c_item = (0, exports.counter)(fid, true, persistent, true);
    if (val !== 0 && !use_id)
        core_1.$.add((0, items_1.item_edit)(undefined, undefined, c_item.item, constants_1.NONE, constants_1.NONE, constants_1.TIMER, constants_1.EQ, undefined, undefined, val));
    c_item.display = (x, y, seconds_only = false) => core_1.$.add((0, core_1.object)({
        OBJ_ID: 1615,
        X: x,
        Y: y,
        ITEM: c_item.item,
        TIME_COUNTER: true,
        SECONDS_ONLY: seconds_only,
        COLOR: (0, core_1.color_fn)(2),
    }));
    c_item.to_obj = () => (0, core_1.object)({
        OBJ_ID: 1615,
        ITEM: c_item.item,
        TIME_COUNTER: true,
        COLOR: (0, core_1.color_fn)(2),
    });
    c_item.add = (amount) => {
        if (typeof amount == 'number') {
            core_1.$.add((0, items_1.item_edit)(undefined, undefined, c_item.item, constants_1.NONE, constants_1.NONE, constants_1.TIMER, constants_1.ADD, undefined, undefined, amount));
        }
        else if (typeof amount == 'object') {
            core_1.$.add((0, items_1.item_edit)(amount.item, undefined, c_item.item, amount.type, constants_1.NONE, constants_1.TIMER, constants_1.ADD));
        }
        return c_item;
    };
    c_item.if_is = (comparison, other, trig_func) => {
        core_1.$.add((0, items_1.item_comp)(c_item.item, 0, constants_1.TIMER, constants_1.NONE, comparison == 2 ? 3 : comparison, trig_func, undefined, undefined, other));
    };
    c_item.subtract = (amount) => {
        if (typeof amount == 'number') {
            core_1.$.add((0, items_1.item_edit)(undefined, undefined, c_item.item, constants_1.TIMER, constants_1.NONE, constants_1.TIMER, constants_1.SUB, undefined, undefined, amount));
        }
        else if (typeof amount == 'object') {
            core_1.$.add((0, items_1.item_edit)(amount.item, undefined, c_item.item, amount.type, constants_1.NONE, constants_1.TIMER, constants_1.SUB));
        }
        return c_item;
    };
    c_item.divide = (amount) => {
        if (typeof amount == 'number') {
            core_1.$.add((0, items_1.item_edit)(undefined, undefined, c_item.item, constants_1.TIMER, constants_1.NONE, constants_1.TIMER, constants_1.DIV, undefined, undefined, amount));
        }
        else if (typeof amount == 'object') {
            core_1.$.add((0, items_1.item_edit)(amount.item, undefined, c_item.item, amount.type, constants_1.NONE, constants_1.TIMER, constants_1.DIV));
        }
        return c_item;
    };
    c_item.multiply = (amount) => {
        if (typeof amount == 'number') {
            core_1.$.add((0, items_1.item_edit)(undefined, undefined, c_item.item, constants_1.TIMER, constants_1.NONE, constants_1.TIMER, constants_1.MUL, undefined, undefined, amount));
        }
        else if (typeof amount == 'object') {
            core_1.$.add((0, items_1.item_edit)(amount.item, undefined, c_item.item, amount.type, constants_1.NONE, constants_1.TIMER, constants_1.MUL));
        }
        return c_item;
    };
    c_item.set = (amount) => {
        if (typeof amount == 'number') {
            core_1.$.add((0, items_1.item_edit)(undefined, undefined, c_item.item, constants_1.NONE, constants_1.NONE, constants_1.TIMER, constants_1.EQ, undefined, undefined, amount));
        }
        else if (typeof amount == 'object') {
            core_1.$.add((0, items_1.item_edit)(amount.item, undefined, c_item.item, amount.type, constants_1.NONE, constants_1.TIMER, constants_1.EQ));
        }
        return c_item;
    };
    c_item.reset = () => {
        c_item.set(0);
        return c_item;
    };
    c_item.abs = () => {
        core_1.$.add((0, items_1.item_edit)(undefined, c_item.item, c_item.item, constants_1.NONE, constants_1.TIMER, constants_1.TIMER, constants_1.EQ, undefined, undefined, 1, constants_1.ABS));
        return c_item;
    };
    c_item.neg = () => {
        core_1.$.add((0, items_1.item_edit)(undefined, c_item.item, c_item.item, constants_1.NONE, constants_1.TIMER, constants_1.TIMER, constants_1.EQ, undefined, undefined, 1, constants_1.NEG));
        return c_item;
    };
    c_item.round = () => {
        core_1.$.add((0, items_1.item_edit)(undefined, c_item.item, c_item.item, constants_1.NONE, constants_1.TIMER, constants_1.TIMER, constants_1.EQ, undefined, undefined, 1, undefined, undefined, constants_1.RND));
        return c_item;
    };
    c_item.floor = () => {
        core_1.$.add((0, items_1.item_edit)(undefined, c_item.item, c_item.item, constants_1.NONE, constants_1.TIMER, constants_1.TIMER, constants_1.EQ, undefined, undefined, 1, undefined, undefined, constants_1.FLR));
        return c_item;
    };
    c_item.clone = () => {
        return (0, exports.float_counter)().set(c_item);
    };
    c_item.mod = (b) => {
        let a = c_item;
        let result = (0, exports.float_counter)();
        // Math.floor(a / b)
        core_1.$.add(typeof b == 'object' ? (0, items_1.item_edit)(a.item, b.item, result.item, a.type, b.type, result.type, constants_1.EQ, constants_1.DIV, undefined, 1, undefined, undefined, constants_1.FLR) : (0, items_1.item_edit)(a.item, constants_1.NONE, result.item, a.type, constants_1.NONE, result.type, constants_1.EQ, constants_1.DIV, constants_1.DIV, b, undefined, undefined, constants_1.FLR));
        result.multiply(b);
        // a - result
        core_1.$.add((0, items_1.item_edit)(a.item, result.item, result.item, a.type, result.type, result.type, constants_1.EQ, constants_1.SUB));
        return result;
    };
    return c_item;
};
exports.float_counter = float_counter;
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
const timer = (start_seconds, end_seconds = 0, target_id = (0, core_1.group_fn)(0), backwards = false, seconds_only = false, stop = true, time_mod = 1, ignore_timewarp = false, no_override = false) => {
    // START_IME, STOP_TIME, STOP_CHECKED, ITEM, TARGET, TIME_MOD, IGNORE_TIMEWARP, START_PAUSED, DONT_OVERRIDE
    let c_item = (0, exports.counter)(0, false, false, true);
    let o = {
        OBJ_ID: 3614,
        START_TIME: start_seconds,
        STOP_TIME: end_seconds,
        STOP_CHECKED: stop,
        ITEM: c_item.item,
        TARGET: target_id,
        TIMER_TIME_MOD: backwards ? -1 : time_mod,
        IGNORE_TIMEWARP: ignore_timewarp,
        DONT_OVERRIDE: no_override
    };
    c_item.display = (x, y) => core_1.$.add((0, core_1.object)({
        OBJ_ID: 1615,
        X: x,
        Y: y,
        ITEM: c_item.item,
        TIME_COUNTER: true,
        SECONDS_ONLY: seconds_only,
        COLOR: (0, core_1.color_fn)(1),
    }));
    c_item.set_start = (x) => o.START_TIME = x;
    c_item.set_end = (x) => o.STOP_TIME = x;
    c_item.start = () => {
        core_1.$.add((0, core_1.trigger)(o));
    };
    c_item.stop = () => {
        core_1.$.add((0, core_1.trigger)({
            OBJ_ID: 3617,
            ITEM: c_item.item,
            START_STOP: true
        }));
    };
    return c_item;
};
exports.timer = timer;
