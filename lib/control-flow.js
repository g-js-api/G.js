/**
* Creates a spawn trigger and returns it
* @param {group} group group to be spawned
* @param {number} time delay to spawn group
* @returns {object}
*/
let spawn_trigger = (group, time = 0) => {
    return {
        OBJ_ID: 1268,
        SPAWN_DURATION: time,
        TARGET: group,
    };
};

/**
 * Returns a greater than condition
 * @param {counter} counter Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {condition}
 */
let greater_than = (count, other) => ({
    count,
    comparison: LARGER_THAN,
    other,
});
/**
 * Returns a equal to condition
 * @param {counter} counter Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {condition}
 */
let equal_to = (count, other) => ({ count, comparison: EQUAL_TO, other });
/**
 * Returns a less than condition
 * @param {counter} counter Counter to compare to number
 * @param {number} other Number to be compared to counter
 * @returns {condition}
 */
let less_than = (count, other) => ({ count, comparison: SMALLER_THAN, other });

/**
 * Creates a repeating trigger system that repeats while a condition is true
 * @param {condition} condition Condition that defines whether the loop should keep on running (less_than/equal_to/greater_than(counter, number))
 * @param {function} func Function to run while the condition is true
 * @param {number} delay Delay between each cycle
 */
let while_loop = (r, trig_fn, del = 0.05) => {
    let { count, comparison, other } = r;
    let old_context = current_context;

    let context = create_context(crypto.randomUUID());
    count.if_is(comparison, other, context.group);

    set_context(context.name);
    trig_fn(context.group);
    set_context(old_context);

    trig_fn = context.group;

    let ctx_name = find_context(trig_fn).name;
    let curr_g = contexts[last_context_children[ctx_name]];

    if (curr_g) {
        curr_g = curr_g.group;
    } else {
        curr_g = trig_fn;
    }

    $.extend_trigger_func(curr_g, () => {
        contexts[old_context].group.call(del);
    });
};

/**
 * Calls a group with a delay
 * @param {number} delay How much to delay by
 * @param {group} group Group to call
 */
let call_with_delay = (time, func) => {
    $.add({
        OBJ_ID: 1268,
        SPAWN_DURATION: time,
        TARGET: func,
    });
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
        $.add({
            OBJ_ID: 3607,
            SEQUENCE: sequence.map(x => x[0].value + '.' + x[1]).join('.'),
            MIN_INT: min_int,
            RESET: reset,
            MODE: mode
        })
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
    while_loop(less_than(c, rang[rang.length - 1]), () => {
        fn();
        c.add(1);
    }, delay);
};

module.exports = { remappable, sequence, call_with_delay, while_loop, equal_to, less_than, greater_than, spawn_trigger, for_loop }