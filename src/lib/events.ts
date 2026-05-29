/**
 * @module events
 */
import {
    $, trigger, Context, unknown_g, unknown_b, object,
} from '../core';
import type { GJsEvent, Gamescene } from '../core';
import {
    obj_ids,
} from '../constants';
import { frame_loop, render_frame_loop, spawn_trigger } from './control-flow';
import { hide_player } from './general-purpose';

/**
 * Calls a group when an event occurs
 * @param {GJsEvent} event Event to listen to
 * @param {any} callback Group or trigger function
 * @category Functions
 * @group Events
 */
export const on = (event: GJsEvent, callback: any) => {
    event.event(callback);
};

/**
* Listens to when the screen is touched
* @param {boolean} [dual_side=false] Whether to only listen to dual side 
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export const touch = (dual_side = false): GJsEvent => {
    return {
        event: (trig_func) =>
            $.add(trigger({
                OBJ_ID: 1595,
                HOLD_MODE: true,
                TOGGLE_MODE: 1,
                TARGET: trig_func,
                DUAL_MODE: dual_side,
            })),
    };
};
/**
* Event that runs on every frame
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export const frame = (): GJsEvent => {
    return {
        event: (tf) => frame_loop(tf)
    }
};
/**
* Event that runs on every render frame
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export const render_frame = (): GJsEvent => {
    return {
        event: (tf) => render_frame_loop(tf)
    }
};
/**
* Listens to when the screen stops being touched
* @param {boolean} [dual_side=false] Whether to only listen to dual side 
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export const touch_end = (dual_side = false): GJsEvent => {
    return {
        event: (trig_func) =>
            $.add(trigger({
                OBJ_ID: 1595,
                HOLD_MODE: true,
                TOGGLE_MODE: 2,
                TARGET: trig_func,
                DUAL_MODE: dual_side,
            })),
    };
};
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
export const collision = (a: any, b: any, P1 = false, P2 = false): GJsEvent => {
    return {
        event: (t) =>
            $.add(trigger({
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
export const collision_exit = (a: any, b: any, P1 = false, P2 = false): GJsEvent => {
    return {
        event: (t) =>
            $.add(trigger({
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

/**
* Listens to when the player dies
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export const death = (): GJsEvent => {
    return {
        event: (t) =>
            $.add(trigger({
                OBJ_ID: 1812,
                ACTIVATE_GROUP: true,
                TARGET: t,
            })),
    };
};
/**
* Listens to when an item hits a specific number
* @param {any} it Item to listen to
* @param {number} hits Number that triggers event when the item hits this
* @param {boolean} multi Whether to trigger the event multiple time
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export const count = (it: any, hits: number, multi = true): GJsEvent => {
    return {
        event: (t) => {
            $.add(trigger({
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

/**
* Listens to when the player reaches a specific X position
* @param {number} position X position where event is called
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export const x_position = (position: number): GJsEvent => {
    const { obj_props: ops } = require('../core');
    return {
        event: (t) => $.add(spawn_trigger(t).with(ops.X, position).with(ops.Y, 2145).with(ops.SPAWN_TRIGGERED, 0).with(ops.MULTI_TRIGGER, 0)),
    };
};

/**
* Implementation of the event trigger that triggers an event
* @param {any} ev Event(s) to be listened to (look at {@tutorial Events} for more info)
* @param {number} [extra_id] Implementation of extra ID 1
* @param {number} [extra_id2] Implementation of extra ID 2
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export const event = (ev: any, extra_id?: number, extra_id2?: number): GJsEvent => {
    if (typeof ev == "object" && Array.isArray(ev)) ev = ev.join('.');
    return {
        event: (t) => $.add(trigger({
            OBJ_ID: 3604,
            TARGET: t,
            EXTRA_ID: extra_id,
            EXTRA_ID_2: extra_id2,
            EVENTS: ev.toString()
        }))
    }
};

/**
 * Simple input control abstraction
 * @returns {Gamescene}
 * @category Functions
 */
export const gamescene = (): Gamescene => {
    // Triggers and groups
    let follow_x_group = unknown_g();
    let follow_y_group = unknown_g();
    let hidden_group = unknown_g();

    hidden_group.alpha(0);
    follow_x_group.lock_to_player(true, false);
    follow_x_group.move(0, 5, 0.01);
    follow_y_group.follow_player_y();
    hide_player();

    // Portals
    $.add(object({
        OBJ_ID: obj_ids.portals.DUAL_ON,
        X: 0,
        Y: 30,
        GROUPS: hidden_group,
    }));
    $.add(object({
        OBJ_ID: obj_ids.portals.WAVE,
        X: 0,
        Y: 30,
        GROUPS: hidden_group,
    }));
    $.add(object({
        OBJ_ID: obj_ids.portals.SIZE_MINI,
        X: 0,
        Y: 30,
        GROUPS: hidden_group,
    }));

    // Top and bottom blocks
    $.add(object({
        OBJ_ID: 1,
        X: 0,
        Y: 33,
        GROUPS: [hidden_group, follow_x_group],
    }));
    $.add(object({
        OBJ_ID: 1,
        X: 0,
        Y: -12,
        GROUPS: [hidden_group, follow_x_group],
    }));

    // Collision blocks
    let player_block = unknown_b();
    let collide_block = unknown_b();

    $.add(object({
        OBJ_ID: obj_ids.special.COLLISION_BLOCK,
        DYNAMIC_BLOCK: true,
        BLOCK_A: player_block,
        X: 0,
        Y: 0,
        GROUPS: [hidden_group, follow_x_group, follow_y_group],
    }));
    $.add(object({
        OBJ_ID: obj_ids.special.COLLISION_BLOCK,
        DYNAMIC_BLOCK: false,
        BLOCK_A: collide_block,
        X: 0,
        Y: 37,
        GROUPS: [hidden_group, follow_x_group],
    }));

    // D block
    $.add(object({
        OBJ_ID: obj_ids.special.D_BLOCK,
        SCALING: 2,
        X: 0,
        Y: 15,
        GROUPS: [hidden_group, follow_x_group],
    }));

    return {
        button_a: () => {
            return collision(player_block, collide_block);
        },
        button_b: () => {
            return touch(true);
        },
        button_a_end: () => {
            return collision_exit(player_block, collide_block);
        },
        button_b_end: () => {
            return touch_end(true);
        },
        hidden_group: hidden_group,
    };
};
