/**
 * @module events
 */
/**
 * Calls a group when an event occurs
 * @param {event} event Event to listen to
 * @param {group} group Group of object
 */
let on = (event, callback) => {
    event.event(callback);
};

/**
 * Listens to when the screen is touched
 * @param {boolean} [dual_side=false] Whether to only listen to dual side 
 * @returns {event}
 */
let touch = (dual_side = false) => {
    return {
        event: (trig_func) =>
            $.add({
                OBJ_ID: 1595,
                HOLD_MODE: true,
                TOGGLE_MODE: 1,
                TARGET: trig_func,
                DUAL_MODE: dual_side,
            }),
    };
};
/**
 * Listens to when the screen stops being touched
 * @param {boolean} [dual_side=false] Whether to only listen to dual side 
 * @returns {event}
 */
let touch_end = (dual_side = false) => {
    return {
        event: (trig_func) =>
            $.add({
                OBJ_ID: 1595,
                HOLD_MODE: true,
                TOGGLE_MODE: 2,
                TARGET: trig_func,
                DUAL_MODE: dual_side,
            }),
    };
};
/**
 * Listens to when two collision blocks collide
 * @param {block} block_a First block to listen to
 * @param {block} block_b Second block to listen to
 * @returns {event}
 */
let collision = (a, b) => {
    return {
        event: (t) =>
            $.add({
                OBJ_ID: 1815,
                BLOCK_A: a,
                BLOCK_B: b,
                ACTIVATE_GROUP: true,
                ACTIVATE_ON_EXIT: false,
                TARGET: t,
            }),
    };
};

/**
 * Listens to when two collision blocks stop colliding
 * @param {block} block_a First block to listen to
 * @param {block} block_b Second block to listen to
 * @returns {event}
 */
let collision_exit = (a, b) => {
    return {
        event: (t) =>
            $.add({
                OBJ_ID: 1815,
                BLOCK_A: a,
                BLOCK_B: b,
                ACTIVATE_GROUP: true,
                ACTIVATE_ON_EXIT: true,
                TARGET: t,
            }),
    };
};

/**
 * Listens to when the player dies
 * @returns {event}
 */
let death = () => {
    return {
        event: (t) =>
            $.add({
                OBJ_ID: 1812,
                ACTIVATE_GROUP: true,
                TARGET: t,
            }),
    };
};
/**
 * Listens to when an item hits a specific number
 * @param {item} item Item to listen to
 * @param {number} num Number that triggers event when the item hits this 
 * @param {boolean} multi Whether to trigger the event multiple time
 * @returns {event}
 */
let count = (it, hits, multi = true) => {
    return {
        event: (t) => {
            $.add({
                OBJ_ID: 1611,
                ACTIVATE_GROUP: true,
                TARGET: t,
                ITEM: it,
                COUNT: hits,
                COUNT_MULTI_ACTIVATE: multi,
            });
        },
    };
};

/**
 * Listens to when the player reaches a specific X position
 * @param {number} x X position where event is called
 * @returns {event}
 */
let x_position = (position) => {
    return {
        event: (t) => $.add(spawn_trigger(t).with(obj_props.X, position).with(obj_props.Y, 2145)),
    };
};

/**
 * Implementation of the event trigger that triggers an event
 * @param {array|event_id} event Event(s) to be listened to (look at {@tutorial Events} for more info)
 * @param {group} extra_id Implementation of extra ID 1
 * @param {group} extra_id2 Implementation of extra ID 2
 * @returns {event}
 */
let event = (ev, extra_id = group(0), extra_id2 = group(0)) => {
    if (typeof ev == "object") ev = ev.join('.');
    return {
        event: (t) => $.add({
            OBJ_ID: 3604,
            TARGET: t,
            EXTRA_ID: extra_id,
            EXTRA_ID_2: extra_id2,
            EVENTS: ev.toString()
        })
    }
};

module.exports = { on, touch, touch_end, collision, collision_exit, death, count, x_position, event }