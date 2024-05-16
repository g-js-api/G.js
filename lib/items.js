/**
 * @module items
 */
/**
 * Implementation of Item Edit trigger
 * @param {item} item1 Item ID 1 (can be retrieved from your_counter.item)
 * @param {item} item2 Item ID 2 (can be retrieved from your_counter.item)
 * @param {item} target Target item ID (can be retrieved from your_counter.item)
 * @param {item_type} [type1=NONE] Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param {item_type} [type2=NONE] Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param {item_type} [target_type=NONE] Type of target item ID (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param {number} [assign_op=EQ] Assignment operator (EQ, ADD, SUB, MUL, DIV)
 * @param {number} [op1=ADD] Operator 1 (ADD, SUB, MUL, DIV)
 * @param {number} [op2=MUL] Operator 2 (ADD, SUB, MUL, DIV)
 * @param {number} [mod=1] How much to modify the entire operation by (influenced by op2)
 * @param {number} [absn1=NONE] Whether to get absolute/negative value of first side of operation (ABS, NEG)
 * @param {number} [absn2=NONE] Whether to get absolute/negative value of second side of operation (ABS, NEG)
 * @param {number} [rfc1=NONE] Whether to round/floor/ceil first side of operation (RND, FLR, CEI)
 * @param {number} [rfc2=NONE] Whether to round/floor/ceil second side of operation (RND, FLR, CEI)
 * @returns {object} Resulting object
 */
let item_edit = (item1, item2, target, type1 = NONE, type2 = NONE, targ_type = NONE, assign_op = EQ, op1 = ADD, op2 = MUL, mod = 1, absn1 = NONE, absn2 = NONE, rfc1 = NONE, rfc2 = NONE) => {
    return object({
        OBJ_ID: 3619,
        ITEM_ID_1: item1,
        ITEM_ID_2: item2,
        ITEM_TARGET: target,
        TYPE_1: type1,
        TYPE_2: type2,
        ITEM_TARGET_TYPE: targ_type,
        ASSIGN_OP: assign_op,
        OP_1: op1,
        OP_2: op2,
        MOD: mod,
        ABSNEG_1: absn1,
        ABSNEG_2: absn2,
        RFC_1: rfc1,
        RFC_2: rfc2
    });
}
/**
 * Implementation of Item Comp trigger
 * @param {item} item_1 Item ID 1 (can be retrieved from your_counter.item)
 * @param {item} item_2 Item ID 2 (can be retrieved from your_counter.item)
 * @param {item_type} type1 Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param {item_type} type2 Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param {number} compare_op Operator to compare item ID 1 and 2 by (EQ, GREATER, GREATER_OR_EQ, LESS, LESS_OR_EQ, NOT_EQ)
 * @param {group} [truei=group(0)] Group ID to call if comparison is true
 * @param {group} [falsei=group(0)] Group ID to call if comparison is false
 * @param {number} [mod1=1] How much to modify item ID 1 by (influenced by op1)
 * @param {number} [mod2=1] How much to modify item ID 2 by (influenced by op2)
 * @param {number} [tol=0] How much to offset the result by
 * @param {number} [op_1=MUL] Operator 1 for mod1 (ADD, SUB, MUL, DIV)
 * @param {number} [op_2=MUL] Operator 2 for mod2 (ADD, SUB, MUL, DIV)
 * @param {number} [absneg_1=NONE] Whether to get absolute/negative value of first side of operation (ABS, NEG)
 * @param {number} [absneg_2=NONE] Whether to get absolute/negative value of second side of operation (ABS, NEG)
 * @param {number} [rfc1=NONE] Whether to round/floor/ceil first side of operation (RND, FLR, CEI)
 * @param {number} [rfc2=NONE] Whether to round/floor/ceil second side of operation (RND, FLR, CEI)
 * @returns {object} Resulting object
 */
let item_comp = (item_1, item_2, type_1, type_2, compare_op, truei = group(0), falsei = group(0), mod_1 = 1, mod_2 = 1, tol = 0, op_1 = MUL, op_2 = MUL, absneg_1 = NONE, absneg_2 = NONE, rfc_1 = NONE, rfc_2 = NONE) => {
    return object({
        OBJ_ID: 3620,
        ITEM_ID_1: item_1,
        ITEM_ID_2: item_2,
        MOD: mod_1,
        MOD_2: mod_2,
        TYPE_1: type_1,
        TYPE_2: type_2,
        COMP_OP: compare_op,
        TRUE_ID: truei,
        FALSE_ID: falsei,
        TOL: tol,
        COMP_OP_1: op_1,
        COMP_OP_2: op_2,
        ABSNEG_1: absneg_1,
        ABSNEG_2: absneg_2,
        RFC_1: rfc_1,
        RFC_2: rfc_2,
    });
}
/**
 * Implementation of timers
 * @param {number} start_seconds Start seconds
 * @param {number} end_seconds End seconds
 * @param {group} target_id ID to call when timer stops
 * @param {boolean} backwards Whether to go backwards
 * @param {boolean} seconds_only Whether to only count seconds
 * @param {boolean} stop Whether to stop the timer at end_seconds
 * @param {number} time_mod How much to modify the timer by w/ multiplication (cannot be used if backwards is true)
 * @param {boolean} ignore_timewarp Whether to ignore timewarp
 * @param {boolean} no_override Whether to ignore when the timer is overridden by another
 * @returns {timer}
 */
let timer = (start_seconds, end_seconds = 0, target_id = group(0), backwards = false, seconds_only = false, stop = true, time_mod = 1, ignore_timewarp = false, no_override = false) => {
    // START_IME, STOP_TIME, STOP_CHECKED, ITEM, TARGET, TIME_MOD, IGNORE_TIMEWARP, START_PAUSED, DONT_OVERRIDE
    let c_item = counter(0, false, false, true);
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
    c_item.display = (x, y) => $.add(object({
        OBJ_ID: 1615,
        X: x,
        Y: y,
        ITEM: c_item.item,
        TIME_COUNTER: true,
        SECONDS_ONLY: seconds_only,
        COLOR: color(1),
    }));
    c_item.set_start = (x) => o.START_TIME = x;
    c_item.set_end = (x) => o.STOP_TIME = x;
    c_item.start = () => {
        $.add(o);
    };
    c_item.stop = () => {
        $.add(object({
            OBJ_ID: 3617,
            ITEM: c_item.item,
            START_STOP: true
        }))
    };
    return c_item;
}
/**
 * Compares a counter with another
 * @param {counter} c1 First counter to compare
 * @param {compare_op} op Comparison operator to use (EQ, NOT_EQ, GREATER, LESS, GREATER_OR_EQ, LESS_OR_EQ)
 * @param {counter} c2 Second counter to compare
 * @param {group} truei Group to call if comparison is true
 * @param {group} falsei Group to call if comparison is false
 */
let compare = (c1, op, c2, truei, falsei) => {
    $.add(item_comp(c1.item, c2.item, ITEM, ITEM, op, truei, falsei));
}

module.exports = {
    item_edit,
    item_comp,
    timer,
    compare
};