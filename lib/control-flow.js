"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.for_loop = exports.remappable = exports.sequence = exports.call_with_delay = exports.less_than = exports.equal_to = exports.greater_than = exports.render_frames = exports.render_frame_loop = exports.frames = exports.frame_loop = exports.spawn_trigger = void 0;
/**
 * @module control-flow
 */
const crypto_1 = __importDefault(require("crypto"));
const core_1 = require("../core");
const constants_1 = require("../constants");
const events_1 = require("./events");
const counter_1 = require("./counter");
const counter_2 = require("./counter");
const general_purpose_1 = require("./general-purpose");
/**
* Creates a spawn trigger and returns it
* @param {any} group group to be spawned
* @param {number} time delay to spawn group
* @returns {any}
* @category Functions
* @group Control Flow
*/
let spawn_trigger = (group, time = 0) => {
    return (0, core_1.trigger)({
        OBJ_ID: 1268,
        SPAWN_DURATION: time,
        TARGET: group,
    });
};
exports.spawn_trigger = spawn_trigger;
let frame_loop_setup = () => {
    let empty_tfn = (0, core_1.trigger_function)(_ => { });
    let trig_fn = (0, core_1.trigger_function)(() => {
        let move_g = (0, core_1.unknown_g)();
        let frame_loop1 = (0, core_1.unknown_b)();
        let frame_loop2 = (0, core_1.unknown_b)();
        // col 1
        core_1.$.add((0, core_1.object)({
            OBJ_ID: 1816, // COLLISION_BLOCK
            BLOCK_A: frame_loop1,
            X: -150,
            Y: 15,
            DYNAMIC_BLOCK: true
        }));
        // col 2
        core_1.$.add((0, core_1.object)({
            OBJ_ID: 1816, // COLLISION_BLOCK
            BLOCK_A: frame_loop2,
            X: -150,
            Y: 50,
            GROUPS: move_g,
            DYNAMIC_BLOCK: true
        }));
        (0, events_1.on)((0, events_1.collision)(frame_loop1, frame_loop2), (0, core_1.trigger_function)(() => {
            move_g.toggle_off();
            empty_tfn.call();
        }));
        (0, events_1.on)((0, events_1.collision_exit)(frame_loop1, frame_loop2), (0, core_1.trigger_function)(() => {
            move_g.toggle_on();
            empty_tfn.call();
        }));
        move_g.move(0, -10); // start loop
    });
    trig_fn.call();
    return { trig_fn, empty_tfn };
};
let fl_setup;
/**
 * Creates a loop that repeats every tick
 * @param {any} tfn The group to call every tick
 * @returns {TriggerFunctionGroup} Group that can be used to stop the loop
 * @category Functions
 * @group Control Flow
 */
let frame_loop = (tfn) => {
    if (!fl_setup)
        fl_setup = frame_loop_setup();
    core_1.$.extend_trigger_func(fl_setup.empty_tfn, () => {
        tfn.call();
    });
    return fl_setup.trig_fn;
};
exports.frame_loop = frame_loop;
/**
 * Waits a specific amount of ticks
 * @param {number} frames_count How many ticks to wait for
 * @category Functions
 * @group Control Flow
 */
let frames = (frames_count) => {
    let id = crypto_1.default.randomUUID();
    let oldContext = core_1.Context.current;
    let newContext = new core_1.Context(id);
    let frame_c = (0, counter_1.counter)();
    let loop = (0, exports.frame_loop)((0, core_1.trigger_function)(() => {
        frame_c.add(1);
    }));
    (0, events_1.on)((0, events_1.count)(frame_c.item, frames_count), (0, core_1.trigger_function)(() => {
        loop.stop();
        newContext.group.call();
    }));
    core_1.Context.set(id);
    core_1.Context.link(oldContext);
};
exports.frames = frames;
let rfl_setup = () => {
    let enter_group = (0, core_1.trigger_function)(() => { });
    let blockA = (0, core_1.unknown_b)();
    let blockB = (0, core_1.unknown_b)();
    let center = (0, core_1.unknown_g)();
    let target = (0, core_1.unknown_g)();
    const { obj_props } = require('../core');
    // collision blocks
    blockA.collision_block(-135, 135).with(obj_props.SCALING, 0.25).with(obj_props.GROUPS, target).add();
    blockB.collision_block(-135, 105).with(obj_props.SCALING, 0.25).with(obj_props.GROUPS, center).with(obj_props.DYNAMIC_BLOCK, true).add();
    // center
    (0, core_1.object)({
        OBJ_ID: 3807,
        X: -135,
        Y: 105,
        GROUPS: center,
        GROUP_PARENTS: center
    }).add();
    let area = (0, core_1.trigger)({
        OBJ_ID: 3006,
        AREA_LENGTH: 30000,
        AREA_MOVE_DIST: -30000,
        AREA_EASING: 2,
        AREA_EASING_2: 2,
        AREA_RELATIVE: true,
        TARGET: target,
        CENTER: center,
        AREA_MOD_FRONT: 1,
        AREA_MOD_BACK: 1,
        DIR_BUTTON_INWARDS: 1,
        DURATION: 0.5,
        155: 1,
        36: 1,
    });
    area.add();
    let move_loop = (0, core_1.trigger_function)(() => {
        (0, general_purpose_1.move_trigger)(center, -2400, 0).with(obj_props.SILENT, true).add();
        (0, core_1.ignore_context_change)(() => center.move(2400, 0, 1));
        core_1.$.trigger_fn_context().call(1);
    });
    let timer_cycle = (0, core_1.trigger_function)(() => {
        (0, counter_2.timer)(0, 1, core_1.$.trigger_fn_context(), false, false, true, 240).start();
        blockA.if_colliding(blockB, enter_group);
    });
    move_loop.call();
    timer_cycle.call();
    return { enter_group, timer_cycle };
};
let g_setup;
/**
 * Creates a loop that repeats every render frame (different from ticks, which are a constant of 1/240 seconds, while render frames are variable and can be changed in settings)
 * @param {any} fn The group to call every frame
 * @returns {TriggerFunctionGroup} Group that can be used to stop the loop
 * @category Functions
 * @group Control Flow
 */
let render_frame_loop = (fn) => {
    if (!g_setup)
        g_setup = rfl_setup();
    core_1.$.extend_trigger_func(g_setup.enter_group, () => {
        fn.call();
    });
    return g_setup.timer_cycle;
};
exports.render_frame_loop = render_frame_loop;
/**
 * Waits a specific amount of render frames
 * @param {number} frames_count How many frames to wait for
 * @category Functions
 * @group Control Flow
 */
let render_frames = (frames_count) => {
    let id = crypto_1.default.randomUUID();
    let oldContext = core_1.Context.current;
    let newContext = new core_1.Context(id);
    let frame_c = (0, counter_1.counter)();
    frame_c.display(135, 75);
    let loop = (0, exports.render_frame_loop)((0, core_1.trigger_function)(() => {
        frame_c.add(1);
    }));
    (0, events_1.on)((0, events_1.count)(frame_c.item, frames_count), (0, core_1.trigger_function)(() => {
        loop.stop();
        newContext.group.call();
    }));
    core_1.Context.set(id);
    core_1.Context.link(oldContext);
};
exports.render_frames = render_frames;
/**
 * Returns a greater than condition
 * @param {Counter} count_obj Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {any}
 * @category Functions
 * @group Control Flow
 */
let greater_than = (count_obj, other) => ({
    count: count_obj,
    comparison: constants_1.GREATER,
    other,
});
exports.greater_than = greater_than;
/**
 * Returns a equal to condition
 * @param {Counter} count_obj Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {any}
 * @category Functions
 */
let equal_to = (count_obj, other) => ({ count: count_obj, comparison: constants_1.EQ, other });
exports.equal_to = equal_to;
/**
 * Returns a less than condition
 * @param {Counter} count_obj Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {any}
 * @category Functions
 */
let less_than = (count_obj, other) => ({ count: count_obj, comparison: constants_1.LESS, other });
exports.less_than = less_than;
/**
 * Calls a group with a delay
 * @param {number} time How much to delay by
 * @param {any} func Group to call
 * @category Functions
 */
let call_with_delay = (time, func) => {
    core_1.$.add((0, core_1.trigger)({
        OBJ_ID: 1268,
        SPAWN_DURATION: time,
        TARGET: func,
    }));
};
exports.call_with_delay = call_with_delay;
/**
* Implementation of sequence trigger
* @param {any[]} sequence_arr Sequence of groups to be called (e.g. [[group(1), 1], [group(2), 1]] is a valid input)
* @param {number} [mode=0] Mode of sequence trigger (0 = stop, 1 = loop, 2 = last)
* @param {number} [min_int=0] MinInt of sequence trigger
* @param {number} [reset=0] Reset of sequence trigger (0 = full, 1 = step)
 * @returns {any} Function that steps through the sequence once
 * @category Functions
 */
let sequence = (sequence_arr, mode = 0, min_int = 0, reset = 0) => {
    let seq_gr = (0, core_1.trigger_function)(() => {
        core_1.$.add((0, core_1.trigger)({
            OBJ_ID: 3607,
            SEQUENCE: sequence_arr.map(x => x[0].value + '.' + x[1]).join('.'),
            MIN_INT: min_int,
            RESET: reset,
            MODE: mode
        }));
    });
    return () => seq_gr.call();
};
exports.sequence = sequence;
/**
 * Creates trigger function-like systems, but can be called normally with item IDs as arguments (e.g. a remappable can be called like `my_remappable(counter1.item)`)
 * @param {Function} fn Function that remappable uses
 * @returns {any} Function to call
 * @returns {any} Function to call
 * @category Functions
 */
let remappable = (fn) => {
    let args_arr = Array(fn.length).fill(0).map((_, i) => i);
    let r = (0, core_1.trigger_function)(() => fn(...args_arr));
    return (...args) => {
        // remap fn_args to args
        let rmps = [];
        args.forEach((x, i) => rmps.push([args_arr[i], args[i]]));
        r.remap(...rmps).call();
    };
};
exports.remappable = remappable;
/**
 * Loops a function a specific amount of times (defined by range)
 * @param {any[]} rang Range of numbers defining how many times to loop fn by
 * @param {Function} fn Function to loop
 * @param {number} [delay=0.05] How much to delay between cycle
 * @param {number} [delay=0.05] How much to delay between cycle
 * @category Functions
 */
let for_loop = (rang, fn, delay = 0.05) => {
    const { while_loop } = require('../safe');
    let c = (0, counter_1.counter)(rang[0]);
    while_loop((0, exports.less_than)(c, rang[rang.length - 1] + 1), () => {
        fn();
        c.add(1);
    }, delay);
};
exports.for_loop = for_loop;
