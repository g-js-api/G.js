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
export declare const item_edit: (item1: any, item2: any, target: any, type1?: number, type2?: number, targ_type?: number, assign_op?: number, op1?: number, op2?: number, mod?: number, absn1?: number, absn2?: number, rfc1?: number, rfc2?: number) => import("../core").GJsObject;
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
export declare const item_comp: (item_1: any, item_2: any, type_1: any, type_2: any, compare_op: any, truei?: import("../core").$group, falsei?: import("../core").$group, mod_1?: number, mod_2?: number, tol?: number, op_1?: number, op_2?: number, absneg_1?: number, absneg_2?: number, rfc_1?: number, rfc_2?: number) => import("../core").GJsObject;
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
export declare const compare: (c1: any, op: any, c2: any, truei: any, falsei: any) => void;
