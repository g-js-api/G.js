"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamescene = exports.event = exports.x_position = exports.count = exports.death = exports.collision_exit = exports.collision = exports.touch_end = exports.render_frame = exports.frame = exports.touch = exports.on = void 0;
/**
 * @module events
 */
const core_1 = require("../core");
const constants_1 = require("../constants");
const control_flow_1 = require("./control-flow");
const general_purpose_1 = require("./general-purpose");
/**
 * Calls a group when an event occurs
 * @param {GJsEvent} event Event to listen to
 * @param {any} callback Group or trigger function
 * @category Functions
 * @group Events
 */
const on = (event, callback) => {
    event.event(callback);
};
exports.on = on;
/**
* Listens to when the screen is touched
* @param {boolean} [dual_side=false] Whether to only listen to dual side
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
const touch = (dual_side = false) => {
    return {
        event: (trig_func) => core_1.$.add((0, core_1.trigger)({
            OBJ_ID: 1595,
            HOLD_MODE: true,
            TOGGLE_MODE: 1,
            TARGET: trig_func,
            DUAL_MODE: dual_side,
        })),
    };
};
exports.touch = touch;
/**
* Event that runs on every frame
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
const frame = () => {
    return {
        event: (tf) => (0, control_flow_1.frame_loop)(tf)
    };
};
exports.frame = frame;
/**
* Event that runs on every render frame
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
const render_frame = () => {
    return {
        event: (tf) => (0, control_flow_1.render_frame_loop)(tf)
    };
};
exports.render_frame = render_frame;
/**
* Listens to when the screen stops being touched
* @param {boolean} [dual_side=false] Whether to only listen to dual side
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
const touch_end = (dual_side = false) => {
    return {
        event: (trig_func) => core_1.$.add((0, core_1.trigger)({
            OBJ_ID: 1595,
            HOLD_MODE: true,
            TOGGLE_MODE: 2,
            TARGET: trig_func,
            DUAL_MODE: dual_side,
        })),
    };
};
exports.touch_end = touch_end;
/**
* Listens to when two collision blocks collide
* @param {any} a First block to listen to
* @param {any} b Second block to listen to
* @param {boolean} P1 Player 1 as block a
* @param {boolean} P2 Player 2 as block a
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
const collision = (a, b, P1 = false, P2 = false) => {
    return {
        event: (t) => core_1.$.add((0, core_1.trigger)({
            OBJ_ID: 1815,
            BLOCK_A: a,
            BLOCK_B: b,
            ACTIVATE_GROUP: true,
            ACTIVATE_ON_EXIT: false,
            TARGET: t,
            PLAYER_1: P1,
            PLAYER_2: P2,
        })),
    };
};
exports.collision = collision;
/**
* Listens to when two collision blocks stop colliding
* @param {any} a First block to listen to
* @param {any} b Second block to listen to
* @param {boolean} P1 Player 1 as block a
* @param {boolean} P2 Player 2 as block a
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
const collision_exit = (a, b, P1 = false, P2 = false) => {
    return {
        event: (t) => core_1.$.add((0, core_1.trigger)({
            OBJ_ID: 1815,
            BLOCK_A: a,
            BLOCK_B: b,
            ACTIVATE_GROUP: true,
            ACTIVATE_ON_EXIT: true,
            TARGET: t,
            PLAYER_1: P1,
            PLAYER_2: P2,
        })),
    };
};
exports.collision_exit = collision_exit;
/**
* Listens to when the player dies
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
const death = () => {
    return {
        event: (t) => core_1.$.add((0, core_1.trigger)({
            OBJ_ID: 1812,
            ACTIVATE_GROUP: true,
            TARGET: t,
        })),
    };
};
exports.death = death;
/**
* Listens to when an item hits a specific number
* @param {any} it Item to listen to
* @param {number} hits Number that triggers event when the item hits this
* @param {boolean} multi Whether to trigger the event multiple time
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
const count = (it, hits, multi = true) => {
    return {
        event: (t) => {
            core_1.$.add((0, core_1.trigger)({
                OBJ_ID: 1611,
                ACTIVATE_GROUP: true,
                TARGET: t,
                ITEM: it,
                COUNT: hits,
                COUNT_MULTI_ACTIVATE: multi,
            }));
        },
    };
};
exports.count = count;
/**
* Listens to when the player reaches a specific X position
* @param {number} position X position where event is called
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
const x_position = (position) => {
    const { obj_props: ops } = require('../core');
    return {
        event: (t) => core_1.$.add((0, control_flow_1.spawn_trigger)(t).with(ops.X, position).with(ops.Y, 2145).with(ops.SPAWN_TRIGGERED, 0).with(ops.MULTI_TRIGGER, 0)),
    };
};
exports.x_position = x_position;
/**
* Implementation of the event trigger that triggers an event
* @param {any} ev Event(s) to be listened to (look at {@tutorial Events} for more info)
* @param {number} [extra_id] Implementation of extra ID 1
* @param {number} [extra_id2] Implementation of extra ID 2
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
const event = (ev, extra_id, extra_id2) => {
    if (typeof ev == "object" && Array.isArray(ev))
        ev = ev.join('.');
    return {
        event: (t) => core_1.$.add((0, core_1.trigger)({
            OBJ_ID: 3604,
            TARGET: t,
            EXTRA_ID: extra_id,
            EXTRA_ID_2: extra_id2,
            EVENTS: ev.toString()
        }))
    };
};
exports.event = event;
/**
* Simple input control abstraction
@returns {Gamescene}
*/
const gamescene = () => {
    // Triggers and groups
    let follow_x_group = (0, core_1.unknown_g)();
    let follow_y_group = (0, core_1.unknown_g)();
    let hidden_group = (0, core_1.unknown_g)();
    hidden_group.alpha(0);
    follow_x_group.lock_to_player(true, false);
    follow_x_group.move(0, 5, 0.01);
    follow_y_group.follow_player_y();
    (0, general_purpose_1.hide_player)();
    // Portals
    core_1.$.add((0, core_1.object)({
        OBJ_ID: constants_1.obj_ids.portals.DUAL_ON,
        X: 0,
        Y: 30,
        GROUPS: hidden_group,
    }));
    core_1.$.add((0, core_1.object)({
        OBJ_ID: constants_1.obj_ids.portals.WAVE,
        X: 0,
        Y: 30,
        GROUPS: hidden_group,
    }));
    core_1.$.add((0, core_1.object)({
        OBJ_ID: constants_1.obj_ids.portals.SIZE_MINI,
        X: 0,
        Y: 30,
        GROUPS: hidden_group,
    }));
    // Top and bottom blocks
    core_1.$.add((0, core_1.object)({
        OBJ_ID: 1,
        X: 0,
        Y: 33,
        GROUPS: [hidden_group, follow_x_group],
    }));
    core_1.$.add((0, core_1.object)({
        OBJ_ID: 1,
        X: 0,
        Y: -12,
        GROUPS: [hidden_group, follow_x_group],
    }));
    // Collision blocks
    let player_block = (0, core_1.unknown_b)();
    let collide_block = (0, core_1.unknown_b)();
    core_1.$.add((0, core_1.object)({
        OBJ_ID: constants_1.obj_ids.special.COLLISION_BLOCK,
        DYNAMIC_BLOCK: true,
        BLOCK_A: player_block,
        X: 0,
        Y: 0,
        GROUPS: [hidden_group, follow_x_group, follow_y_group],
    }));
    core_1.$.add((0, core_1.object)({
        OBJ_ID: constants_1.obj_ids.special.COLLISION_BLOCK,
        DYNAMIC_BLOCK: false,
        BLOCK_A: collide_block,
        X: 0,
        Y: 37,
        GROUPS: [hidden_group, follow_x_group],
    }));
    // D block
    core_1.$.add((0, core_1.object)({
        OBJ_ID: constants_1.obj_ids.special.D_BLOCK,
        SCALING: 2,
        X: 0,
        Y: 15,
        GROUPS: [hidden_group, follow_x_group],
    }));
    return {
        button_a: () => {
            return (0, exports.collision)(player_block, collide_block);
        },
        button_b: () => {
            return (0, exports.touch)(true);
        },
        button_a_end: () => {
            return (0, exports.collision_exit)(player_block, collide_block);
        },
        button_b_end: () => {
            return (0, exports.touch_end)(true);
        },
        hidden_group: hidden_group,
    };
};
exports.gamescene = gamescene;
