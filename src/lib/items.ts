/**
 * @module items
 */
import { trigger, group_fn as group } from '../core';
import {
    NONE, EQ, ADD, SUB, MUL, DIV, RND, FLR, CEI, ABS, NEG,
} from '../constants';

/**
 * Implementation of Item Edit trigger
 * @param {any} item1 Item ID 1 (can be retrieved from your_counter.item)
 * @param {any} item2 Item ID 2 (can be retrieved from your_counter.item)
 * @param {any} target Target item ID (can be retrieved from your_counter.item)
 * @param {number} [type1=NONE] Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param {number} [type2=NONE] Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param {number} [target_type=NONE] Type of target item ID (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param {number} [assign_op=EQ] Assignment operator (EQ, ADD, SUB, MUL, DIV)
 * @param {number} [op1=ADD] Operator 1 (ADD, SUB, MUL, DIV)
 * @param {number} [op2=MUL] Operator 2 (ADD, SUB, MUL, DIV)
 * @param {number} [mod=1] How much to modify the entire operation by (influenced by op2)
 * @param {number} [absn1=NONE] Whether to get absolute/negative value of first side of operation (ABS, NEG)
 * @param {number} [absn2=NONE] Whether to get absolute/negative value of second side of operation (ABS, NEG)
 * @param {number} [rfc1=NONE] Whether to round/floor/ceil first side of operation (RND, FLR, CEI)
 * @param {number} [rfc2=NONE] Whether to round/floor/ceil second side of operation (RND, FLR, CEI)
 * @returns {any} Resulting object
 * @category Functions
 * @group Items
 */
export const item_edit = (item1, item2, target, type1 = NONE, type2 = NONE, targ_type = NONE, assign_op = EQ, op1 = ADD, op2 = MUL, mod = 1, absn1 = NONE, absn2 = NONE, rfc1 = NONE, rfc2 = NONE) => {
    return trigger({
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
 * @param {any} item_1 Item ID 1 (can be retrieved from your_counter.item)
 * @param {any} item_2 Item ID 2 (can be retrieved from your_counter.item)
 * @param {number} type_1 Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param {number} type_2 Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param {number} compare_op Operator to compare item ID 1 and 2 by (EQ, GREATER, GREATER_OR_EQ, LESS, LESS_OR_EQ, NOT_EQ)
 * @param {any} [truei=group(0)] Group ID to call if comparison is true
 * @param {any} [falsei=group(0)] Group ID to call if comparison is false
 * @param {number} [mod_1=1] How much to modify item ID 1 by (influenced by op1)
 * @param {number} [mod_2=1] How much to modify item ID 2 by (influenced by op2)
 * @param {number} [tol=0] How much to offset the result by
 * @param {number} [op_1=MUL] Operator 1 for mod1 (ADD, SUB, MUL, DIV)
 * @param {number} [op_2=MUL] Operator 2 for mod2 (ADD, SUB, MUL, DIV)
 * @param {number} [absneg_1=NONE] Whether to get absolute/negative value of first side of operation (ABS, NEG)
 * @param {number} [absneg_2=NONE] Whether to get absolute/negative value of second side of operation (ABS, NEG)
 * @param {number} [rfc_1=NONE] Whether to round/floor/ceil first side of operation (RND, FLR, CEI)
 * @param {number} [rfc_2=NONE] Whether to round/floor/ceil second side of operation (RND, FLR, CEI)
 * @returns {any} Resulting object
 * @category Functions
 * @group Items
 */
export const item_comp = (item_1, item_2, type_1, type_2, compare_op, truei = group(0), falsei = group(0), mod_1 = 1, mod_2 = 1, tol = 0, op_1 = MUL, op_2 = MUL, absneg_1 = NONE, absneg_2 = NONE, rfc_1 = NONE, rfc_2 = NONE) => {
    return trigger({
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
 * Compares a counter with another
 * @param {any} c1 First counter to compare
 * @param {number} op Comparison operator to use (EQ, NOT_EQ, GREATER, LESS, GREATER_OR_EQ, LESS_OR_EQ)
 * @param {any} c2 Second counter to compare
 * @param {any} truei Group to call if comparison is true
 * @param {any} falsei Group to call if comparison is false
 * @category Functions
 * @group Items
 */
export const compare = (c1, op, c2, truei, falsei) => {
    if (typeof c2 == "number") {
        trigger({}).add(); // dummy to trigger $.add which is used via trigger(...).add() or $.add
        // Wait, Context.addObject is used.
        // Actually, item_comp returns a trigger object.
        // I should use $.add(item_comp(...))
        const { $ } = require('../core');
        $.add(item_comp(c1.item, 0, c1.type, NONE, op, truei, falsei, undefined, c2));
        return;
    }
    const { $ } = require('../core');
    $.add(item_comp(c1.item, c2.item, c1.type, c2.type, op, truei, falsei));
}
