/**
 * Implementation of Item Edit trigger
 * @param item1 Item ID 1 (can be retrieved from your_counter.item)
 * @param item2 Item ID 2 (can be retrieved from your_counter.item)
 * @param target Target item ID (can be retrieved from your_counter.item)
 * @param type1 Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param type2 Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param target_type Type of target item ID (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param assign_op Assignment operator (EQ, ADD, SUB, MUL, DIV)
 * @param op1 Operator 1 (ADD, SUB, MUL, DIV)
 * @param op2 Operator 2 (ADD, SUB, MUL, DIV)
 * @param mod How much to modify the entire operation by (influenced by op2)
 * @param absn1 Whether to get absolute/negative value of first side of operation (ABS, NEG)
 * @param absn2 Whether to get absolute/negative value of second side of operation (ABS, NEG)
 * @param rfc1 Whether to round/floor/ceil first side of operation (RND, FLR, CEI)
 * @param rfc2 Whether to round/floor/ceil second side of operation (RND, FLR, CEI)
 * @returns Resulting object
 */
declare function item_edit(item1: item, item2: item, target: item, type1?: item_type, type2?: item_type, target_type?: item_type, assign_op?: number, op1?: number, op2?: number, mod?: number, absn1?: number, absn2?: number, rfc1?: number, rfc2?: number): object;

/**
 * Implementation of Item Comp trigger
 * @param item_1 Item ID 1 (can be retrieved from your_counter.item)
 * @param item_2 Item ID 2 (can be retrieved from your_counter.item)
 * @param type1 Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param type2 Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT)
 * @param compare_op Operator to compare item ID 1 and 2 by (EQ, GREATER, GREATER_OR_EQ, LESS, LESS_OR_EQ, NOT_EQ)
 * @param truei Group ID to call if comparison is true
 * @param falsei Group ID to call if comparison is false
 * @param mod1 How much to modify item ID 1 by (influenced by op1)
 * @param mod2 How much to modify item ID 2 by (influenced by op2)
 * @param tol How much to offset the result by
 * @param op_1 Operator 1 for mod1 (ADD, SUB, MUL, DIV)
 * @param op_2 Operator 2 for mod2 (ADD, SUB, MUL, DIV)
 * @param absneg_1 Whether to get absolute/negative value of first side of operation (ABS, NEG)
 * @param absneg_2 Whether to get absolute/negative value of second side of operation (ABS, NEG)
 * @param rfc1 Whether to round/floor/ceil first side of operation (RND, FLR, CEI)
 * @param rfc2 Whether to round/floor/ceil second side of operation (RND, FLR, CEI)
 * @returns Resulting object
 */
declare function item_comp(item_1: item, item_2: item, type1: item_type, type2: item_type, compare_op: number, truei?: group, falsei?: group, mod1?: number, mod2?: number, tol?: number, op_1?: number, op_2?: number, absneg_1?: number, absneg_2?: number, rfc1?: number, rfc2?: number): object;

/**
 * Implementation of timers
 * @param start_seconds Start seconds
 * @param end_seconds End seconds
 * @param target_id ID to call when timer stops
 * @param backwards Whether to go backwards
 * @param seconds_only Whether to only count seconds
 * @param stop Whether to stop the timer at end_seconds
 * @param time_mod How much to modify the timer by w/ multiplication (cannot be used if backwards is true)
 * @param ignore_timewarp Whether to ignore timewarp
 * @param no_override Whether to ignore when the timer is overridden by another
 * @returns
 */
declare function timer(start_seconds: number, end_seconds?: number, target_id: group, backwards?: boolean, seconds_only?: boolean, stop?: boolean, time_mod?: number, ignore_timewarp?: boolean, no_override?: boolean): timer;

/**
 * Compares a counter with another
 * @param c1 First counter to compare
 * @param op Comparison operator to use (EQ, NOT_EQ, GREATER, LESS, GREATER_OR_EQ, LESS_OR_EQ)
 * @param c2 Second counter to compare
 * @param truei Group to call if comparison is true
 * @param falsei Group to call if comparison is false
 */
declare function compare(c1: counter, op: compare_op, c2: counter, truei: group, falsei: group): void;

