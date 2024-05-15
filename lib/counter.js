/**
 * @module counter
 */
let next_free = 1;
/**
 * Represents a counter, which is a wrapper around item IDs
 * @typedef {object} counter
 * @property {item} item Item ID of a counter
 * @property {item_type} type Type of a counter
 * @property {add} add Adds a specific amount (or another counter) to the current counter
 * @property {subtract} subtract Subtracts a specific amount (or another counter) from the current counter
 * @property {multiply} multiply Multiplies the current counter by a specific amount (or another counter)
 * @property {divide} divide Divides the current counter by a specific amount (or another counter)
 * @property {set} set Sets the current counter to a specific amount or another counter
 * @property {reset} reset Resets the current counter to 0
 * @property {if_is} if_is Checks if a comparison is true, and if so calls a group (SMALLER_THAN/EQUAL_TO_LARGER_THAN)
 * @property {to_const} to_const Converts the current counter to a plain number by taking in a range of possible values and a function
 * @property {copy_to} copy_to Copies the current counter to another counter
 * @property {display} display Displays the current counter at a specific position
 * @property {to_obj} to_obj Returns item display for current counter as an object
 * @property {add_to} add_to Adds the current counter to another and resets the current counter
 * @property {subtract_from} subtract_from Subtracts the current counter from another and resets the current counter
 */

/**
 * Adds a specific amount (or another counter) to the current counter
 * @callback add
 * @param {number|counter} amount Counter or number to add to the current counter
 */

/**
 * Subtracts a specific amount (or another counter) from the current counter
 * @callback subtract
 * @param {number|counter} amount Counter or number to subtract from the current counter
 */

/**
 * Multiplies the current counter by a specific amount (or another counter)
 * @callback multiply
 * @param {number|counter} amount Counter or number to multiply the current counter by
 */

/**
 * Divides the current counter by a specific amount (or another counter)
 * @callback divide
 * @param {number|counter} amount Counter or number to divide the current counter by
 */

/**
 * Sets the current counter to a specific amount (or another counter)
 * @callback set
 * @param {number|counter} amount Counter or number to set the current counter to
 */

/**
 * Resets the current counter to 0
 * @callback reset
 */

/**
 * Returns item display for current counter as an object
 * @callback to_obj
 * @returns {object} Resulting item display
 */

/**
 * Checks if a comparison is true, and if so calls a group (SMALLER_THAN/EQUAL_TO_LARGER_THAN)
 * @callback if_is
 * @param {comparison} comparison Condition to check for between the counter and number
 * @param {number} other Number to compare the current counter to
 * @param {group} trig_func Trigger function or group to run if the comparison is true
 */

/**
 * Converts the current counter to a plain number by taking in a range of possible values and a function
 * @callback to_const
 * @param {array} range Possible range of values that the current counter is equal to
 * @param {function} func Callback function to run that takes the plain numerical value as input
 */

/**
 * Displays the current counter at a specific position
 * @callback display
 * @param {number} x X position of item display
 * @param {number} y Y position of item display
 */

/**
 * Copies the current counter to another counter
 * @callback copy_to
 * @param {counter} counter Counter to copy the current counter to
 */

/**
 * Adds the current counter to another and resets the current counter
 * @callback add_to
 * @param {counter} counter Counter to add the current counter to
 */

/**
 * Subtracts the current counter from another and resets the current counter
 * @callback subtract_from
 * @param {counter} counter Counter to be subtracted from
 */

/**
 * Creates a counter, which has methods for editing items
 * @function
 * @param {number|boolean} [num=0] Number or boolean to be represented by counter
 * @param {boolean} [use_id=false] Whether to use an existing item ID as a counter instead of creating a new item
 * @param {boolean} [persistent=false] Whether to make the counter persistent between attempts
 * @param {boolean} [timer=false] Whether to make the counter a timer
 * @returns {counter} Resulting counter
 */
let counter = (num = 0, use_id = false, persistent = false, timer = false) => {
    let id = use_id ? num : next_free++;
    if (num > 0 && !use_id) {
        if (!persistent) {
            $.add(object({
                OBJ_ID: 1817,
                COUNT: num,
                ITEM: id,
            }));
        }
    }
    if (persistent) {
        $.add(object({
            OBJ_ID: 3641,
            PERSISTENT: true,
            ITEM: id
        }));
    };
    let exports = {
        item: id,
        type: timer ? TIMER : ITEM,
        add: (amount) => {
            if (typeof amount == 'number') {
                $.add(object({
                    OBJ_ID: 1817,
                    COUNT: amount,
                    ITEM: id,
                }));
            } else if (typeof amount == 'object') {
                $.add(item_edit(amount.item, undefined, id, exports.type, NONE, exports.type, ADD));
            }
        },
        set: (amount) => {
            if (typeof amount == 'number') {
                $.add(object({
                    OBJ_ID: 1817,
                    COUNT: amount,
                    OVERRIDE_COUNT: true,
                    ITEM: id,
                }));
            } else if (typeof amount == 'object') {
                $.add(item_edit(undefined, amount.item, id, exports.type, amount.type, exports.type, EQ));
            }
        },
        subtract: (amount) => {
            if (typeof amount == 'number') {
                $.add(object({
                    OBJ_ID: 1817,
                    COUNT: -amount,
                    ITEM: id,
                }));
            } else if (typeof amount == 'object') {
                $.add(item_edit(amount.item, undefined, id, exports.type, NONE, exports.type, SUB));
            }
        },
        multiply: (amount) => {
            if (typeof amount == 'number') {
                $.add(object({
                    OBJ_ID: 1817,
                    MODIFIER: amount,
                    MULT_DIV: 1,
                    ITEM: id,
                }));
            } else if (typeof amount == 'object') {
                $.add(item_edit(amount.item, undefined, id, exports.type, NONE, exports.type, MUL));
            }
        },
        divide: (amount) => {
            if (typeof amount == 'number') {
                $.add(object({
                    OBJ_ID: 1817,
                    MODIFIER: amount,
                    MULT_DIV: 2,
                    ITEM: id,
                }));
            } else if (typeof amount == 'object') {
                $.add(item_edit(amount.item, undefined, id, exports.type, NONE, exports.type, DIV));
            }
        },
        display: (x, y) =>
            $.add(object({
                OBJ_ID: 1615,
                X: x,
                Y: y,
                ITEM: id,
                COLOR: color(1),
            })),
        to_obj: () => {
            let or = object({
                OBJ_ID: 1615,
                ITEM: id,
                COLOR: color(1)
            });
            return or;
        },
        if_is: (comparison, other, trig_func) => {
            $.add(object({
                OBJ_ID: 1811,
                TARGET: trig_func,
                COUNT: other,
                ACTIVATE_GROUP: true,
                COMPARISON: comparison,
                ITEM: id,
            }));
        },
        to_const: (range, cb) => {
            let old_ctx = current_context;
            for (let i in range) {
                i = range[i];
                let id = crypto.randomUUID();
                let context = create_context(id, true);
                cb(i);
                set_context(old_ctx);
                exports.if_is(EQUAL_TO, i, context.group);
            }
        },
        add_to: (item) => {
            item.add(exports);
            exports.reset();
        },
        copy_to: (item) => {
            $.add(item_edit(undefined, id, item.item, NONE, item.type, exports.type, EQ));
        },
        clone: () => {
            let n_counter = counter(0);
            exports.copy_to(n_counter);
            return n_counter;
        },
        subtract_from: (b) => {
            // basically (a - b) then reset b to zero
            $.add(item_edit(id, b.item, id, exports.type, b.type, exports.type, EQ, SUB));
            b.reset();
        },
        reset: () => {
            exports.set(0);
        },
    };
    if (persistent) {
        let tfr = trigger_function(() => {
            $.add(object({
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

module.exports = counter;