/**
 * @module control-flow
 */
import crypto from 'crypto';
import {
    $, trigger, Context, trigger_function, unknown_g, unknown_b, object, ignore_context_change,
} from '../core';
import type { Counter, TriggerFunctionGroup } from '../core';
import {
    GREATER, EQ, LESS,
} from '../constants';
import { on, collision, collision_exit, count } from './events';
import { counter } from './counter';
import { timer } from './counter';
import { move_trigger } from './general-purpose';
import { compare } from './items';

/**
* Creates a spawn trigger and returns it
* @param {any} group group to be spawned
* @param {number} time delay to spawn group
* @returns {any}
* @category Functions
* @group Control Flow
*/
export let spawn_trigger = (group: any, time = 0) => {
    return trigger({
        OBJ_ID: 1268,
        SPAWN_DURATION: time,
        TARGET: group,
    });
};

let frame_loop_setup = () => {
    let empty_tfn = trigger_function(_ => { });
    let trig_fn = trigger_function(() => {
        let move_g = unknown_g();
        let frame_loop1 = unknown_b();
        let frame_loop2 = unknown_b();
        // col 1
        $.add(object({
            OBJ_ID: 1816, // COLLISION_BLOCK
            BLOCK_A: frame_loop1,
            X: -150,
            Y: 15,
            DYNAMIC_BLOCK: true
        }));
        // col 2
        $.add(object({
            OBJ_ID: 1816, // COLLISION_BLOCK
            BLOCK_A: frame_loop2,
            X: -150,
            Y: 50,
            GROUPS: move_g,
            DYNAMIC_BLOCK: true
        }));
        on(collision(frame_loop1, frame_loop2), trigger_function(() => {
            move_g.toggle_off();
            empty_tfn.call();
        }));
        on(collision_exit(frame_loop1, frame_loop2), trigger_function(() => {
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
export let frame_loop = (tfn: any): TriggerFunctionGroup => {
    if (!fl_setup) fl_setup = frame_loop_setup();
    $.extend_trigger_func(fl_setup.empty_tfn, () => {
        tfn.call();
    });
    return fl_setup.trig_fn as TriggerFunctionGroup;
};

/**
 * Waits a specific amount of ticks
 * @param {number} frames_count How many ticks to wait for
 * @category Functions
 * @group Control Flow
 */
export let frames = (frames_count: number) => {
    let id = crypto.randomUUID();
    let oldContext = Context.current;
    let newContext = new Context(id);

    let frame_c = counter();
    let loop = frame_loop(trigger_function(() => {
        frame_c.add(1);
    }));
    on(count(frame_c.item, frames_count), trigger_function(() => {
        loop.stop();
        newContext.group.call();
    }));
    Context.set(id);
    Context.link(oldContext);
}

let rfl_setup = () => {
    let enter_group = trigger_function(() => { });
    let blockA = unknown_b();
    let blockB = unknown_b();

    let center = unknown_g();
    let target = unknown_g();
    const { obj_props } = require('../core');
    // collision blocks
    blockA.collision_block(-135, 135).with(obj_props.SCALING, 0.25).with(obj_props.GROUPS, target).add();
    blockB.collision_block(-135, 105).with(obj_props.SCALING, 0.25).with(obj_props.GROUPS, center).with(obj_props.DYNAMIC_BLOCK, true).add();
    // center
    object({
        OBJ_ID: 3807,
        X: -135,
        Y: 105,
        GROUPS: center,
        GROUP_PARENTS: center
    }).add();

    let area = trigger({
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
    let move_loop = trigger_function(() => {
        move_trigger(center, -2400, 0).with(obj_props.SILENT, true).add();
        ignore_context_change(() => center.move(2400, 0, 1));
        $.trigger_fn_context().call(1);
    });

    let timer_cycle = trigger_function(() => {
        timer(0, 1, $.trigger_fn_context(), false, false, true, 240).start();
        blockA.if_colliding(blockB, enter_group);
    });
    move_loop.call();
    timer_cycle.call();
    return { enter_group, timer_cycle };
}

let g_setup;

/**
 * Creates a loop that repeats every render frame (different from ticks, which are a constant of 1/240 seconds, while render frames are variable and can be changed in settings)
 * @param {any} fn The group to call every frame
 * @returns {TriggerFunctionGroup} Group that can be used to stop the loop
 * @category Functions
 * @group Control Flow
 */
export let render_frame_loop = (fn: any): TriggerFunctionGroup => {
    if (!g_setup) g_setup = rfl_setup();
    $.extend_trigger_func(g_setup.enter_group, () => {
        fn.call();
    });
    return g_setup.timer_cycle as TriggerFunctionGroup;
}
/**
 * Waits a specific amount of render frames
 * @param {number} frames_count How many frames to wait for
 * @category Functions
 * @group Control Flow
 */
export let render_frames = (frames_count: number) => {
    let id = crypto.randomUUID();
    let oldContext = Context.current;
    let newContext = new Context(id);

    let frame_c = counter();
    frame_c.display(135, 75);
    let loop = render_frame_loop(trigger_function(() => {
        frame_c.add(1);
    }));
    on(count(frame_c.item, frames_count), trigger_function(() => {
        loop.stop();
        newContext.group.call();
    }));
    Context.set(id);
    Context.link(oldContext);
}

/**
 * Returns a greater than condition
 * @param {Counter} count_obj Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {any}
 * @category Functions
 * @group Control Flow
 */
export let greater_than = (count_obj: Counter, other: number) => ({
    count: count_obj,
    comparison: GREATER,
    other,
});
/**
 * Returns a equal to condition
 * @param {Counter} count_obj Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {any}
 * @category Functions
 */
export let equal_to = (count_obj: Counter, other: number) => ({ count: count_obj, comparison: EQ, other });
/**
 * Returns a less than condition
 * @param {Counter} count_obj Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {any}
 * @category Functions
 */
export let less_than = (count_obj: Counter, other: number) => ({ count: count_obj, comparison: LESS, other });

/**
 * Calls a group with a delay
 * @param {number} time How much to delay by
 * @param {any} func Group to call
 * @category Functions
 */
export let call_with_delay = (time: number, func: any) => {
    $.add(trigger({
        OBJ_ID: 1268,
        SPAWN_DURATION: time,
        TARGET: func,
    }));
};

/**
* Implementation of sequence trigger
* @param {any[]} sequence_arr Sequence of groups to be called (e.g. [[group(1), 1], [group(2), 1]] is a valid input)
* @param {number} [mode=0] Mode of sequence trigger (0 = stop, 1 = loop, 2 = last)
* @param {number} [min_int=0] MinInt of sequence trigger
* @param {number} [reset=0] Reset of sequence trigger (0 = full, 1 = step)
 * @returns {any} Function that steps through the sequence once
 * @category Functions
 */
export let sequence = (sequence_arr: any[], mode = 0, min_int = 0, reset = 0) => {
    let seq_gr = trigger_function(() => {
        $.add(trigger({
            OBJ_ID: 3607,
            SEQUENCE: sequence_arr.map(x => x[0].value + '.' + x[1]).join('.'),
            MIN_INT: min_int,
            RESET: reset,
            MODE: mode
        }));
    });
    return () => (seq_gr as any).call()
};

/**
 * Creates trigger function-like systems, but can be called normally with item IDs as arguments (e.g. a remappable can be called like `my_remappable(counter1.item)`)
 * @param {Function} fn Function that remappable uses
 * @returns {any} Function to call
 * @returns {any} Function to call
 * @category Functions
 */
export let remappable = (fn: Function) => {
    let args_arr = Array(fn.length).fill(0).map((_, i) => i);
    let r = trigger_function(() => fn(...args_arr));
    return (...args: any[]) => {
        // remap fn_args to args
        let rmps: any[] = [];
        args.forEach((x, i) => rmps.push([args_arr[i], args[i]]));
        (r as any).remap(...rmps).call();
    };
}

/**
 * Loops a function a specific amount of times (defined by range)
 * @param {any[]} rang Range of numbers defining how many times to loop fn by
 * @param {Function} fn Function to loop
 * @param {number} [delay=0.05] How much to delay between cycle
 * @param {number} [delay=0.05] How much to delay between cycle
 * @category Functions
 */
export let for_loop = (rang: any[], fn: Function, delay = 0.05) => {
    const { while_loop } = require('../safe');
    let c = counter(rang[0]);
    while_loop(less_than(c, rang[rang.length - 1] + 1), () => {
        fn();
        c.add(1);
    }, delay);
};
