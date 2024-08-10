/**
 * @module control-flow
 */
/**
* Creates a spawn trigger and returns it
* @param {group} group group to be spawned
* @param {number} time delay to spawn group
* @returns {object}
*/
let spawn_trigger = (group, time = 0) => {
    return object({
        OBJ_ID: 1268,
        SPAWN_DURATION: time,
        TARGET: group,
    });
};
/**
 * Creates a loop that repeats every frame
 * @param {group} trigger_function The group to call every frame
 * @returns {group} Group that can be used to stop the loop
 */
let frame_loop = (tfn) => {
    let trig_fn = trigger_function(() => {
        let move_g = unknown_g();
        let frame_loop1 = unknown_b();
        let frame_loop2 = unknown_b();
        // col 1
        $.add(object({
            OBJ_ID: obj_ids.special.COLLISION_BLOCK,
            BLOCK_A: frame_loop1,
            X: -150,
            Y: 15,
            DYNAMIC_BLOCK: true
        }));
        // col 2
        $.add(object({
            OBJ_ID: obj_ids.special.COLLISION_BLOCK,
            BLOCK_A: frame_loop2,
            X: -150,
            Y: 50,
            GROUPS: move_g,
            DYNAMIC_BLOCK: true
        }));
        on(collision(frame_loop1, frame_loop2), trigger_function(() => {
            move_g.toggle_off();
            tfn.call();
        }));
        on(collision_exit(frame_loop1, frame_loop2), trigger_function(() => {
            move_g.toggle_on();
            tfn.call();
        }));
        move_g.move(0, -10); // start loop
    });
    trig_fn.call();
    return trig_fn;
};

/**
 * Waits a specific amount of frames
 * @param {number} frames How many frames to wait for
 */
let frames = (frames) => {
    let id = crypto.randomUUID();
    let oldContext = Context.current;
    let newContext = new Context(id);
  
    let frame_c = counter();
    let loop = frame_loop(trigger_function(() => {
        frame_c.add(1);
    }));
    on(count(frame_c.item, frames), trigger_function(() => {
        loop.stop();
        newContext.group.call();
    }));
    Context.set(id);
    Context.link(oldContext);
  }
  
/**
 * Returns a greater than condition
 * @param {counter} counter Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {condition}
 */
let greater_than = (count, other) => ({
    count,
    comparison: LARGER,
    other,
});
/**
 * Returns a equal to condition
 * @param {counter} counter Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {condition}
 */
let equal_to = (count, other) => ({ count, comparison: EQ, other });
/**
 * Returns a less than condition
 * @param {counter} counter Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {condition}
 */
let less_than = (count, other) => ({ count, comparison: LESS, other });

/**
 * Calls a group with a delay
 * @param {number} delay How much to delay by
 * @param {group} group Group to call
 */
let call_with_delay = (time, func) => {
    $.add(object({
        OBJ_ID: 1268,
        SPAWN_DURATION: time,
        TARGET: func,
    }));
};

/**
* Implementation of sequence trigger
* @param {array} sequence Sequence of groups to be called (e.g. [[group(1), 1], [group(2), 1]] is a valid input)
* @param {number} [mode=0] Mode of sequence trigger (0 = stop, 1 = loop, 2 = last)
* @param {number} [min_int=0] MinInt of sequence trigger
* @param {number} [reset=0] Reset of sequence trigger (0 = full, 1 = step)
* @returns {function} Function that steps through the sequence once
*/
let sequence = (sequence, mode = 0, min_int = 0, reset = 0) => {
    let seq_gr = trigger_function(() => {
        $.add(object({
            OBJ_ID: 3607,
            SEQUENCE: sequence.map(x => x[0].value + '.' + x[1]).join('.'),
            MIN_INT: min_int,
            RESET: reset,
            MODE: mode
        }));
    });
    return () => seq_gr.call()
};

/**
 * Creates trigger function-like systems, but can be called normally with item IDs as arguments (e.g. a remappable can be called like `my_remappable(counter1.item)`)
 * @param {function} fn Function that remappable uses
 * @returns {function} Function to call
 */
let remappable = (fn) => {
    let args_arr = Array(fn.length).fill(0).map((_, i) => i);
    let r = trigger_function(() => fn(...args_arr));
    return (...args) => {
        // remap fn_args to args
        let rmps = [];
        args.forEach((x, i) => rmps.push([args_arr[i], args[i]]));
        r.remap(...rmps).call();
    };
}

/**
 * Loops a function a specific amount of times (defined by range)
 * @param {array} range Range of numbers defining how many times to loop fn by
 * @param {function} fn Function to loop
 * @param {number} [delay=0.05] How much to delay between cycle
 */
let for_loop = (rang, fn, delay = 0.05) => {
    let c = counter(rang[0]);
    while_loop(less_than(c, rang[rang.length - 1] + 1), () => {
        fn();
        c.add(1);
    }, delay);
};

module.exports = { remappable, sequence, call_with_delay, equal_to, less_than, greater_than, for_loop, spawn_trigger, frame_loop, frames }