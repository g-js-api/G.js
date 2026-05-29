import type { GJsEvent, Gamescene } from '../core';
/**
 * Calls a group when an event occurs
 * @param {GJsEvent} event Event to listen to
 * @param {any} callback Group or trigger function
 * @category Functions
 * @group Events
 */
export declare const on: (event: GJsEvent, callback: any) => void;
/**
* Listens to when the screen is touched
* @param {boolean} [dual_side=false] Whether to only listen to dual side
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export declare const touch: (dual_side?: boolean) => GJsEvent;
/**
* Event that runs on every frame
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export declare const frame: () => GJsEvent;
/**
* Event that runs on every render frame
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export declare const render_frame: () => GJsEvent;
/**
* Listens to when the screen stops being touched
* @param {boolean} [dual_side=false] Whether to only listen to dual side
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export declare const touch_end: (dual_side?: boolean) => GJsEvent;
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
export declare const collision: (a: any, b: any, P1?: boolean, P2?: boolean) => GJsEvent;
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
export declare const collision_exit: (a: any, b: any, P1?: boolean, P2?: boolean) => GJsEvent;
/**
* Listens to when the player dies
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export declare const death: () => GJsEvent;
/**
* Listens to when an item hits a specific number
* @param {any} it Item to listen to
* @param {number} hits Number that triggers event when the item hits this
* @param {boolean} multi Whether to trigger the event multiple time
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export declare const count: (it: any, hits: number, multi?: boolean) => GJsEvent;
/**
* Listens to when the player reaches a specific X position
* @param {number} position X position where event is called
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export declare const x_position: (position: number) => GJsEvent;
/**
* Implementation of the event trigger that triggers an event
* @param {any} ev Event(s) to be listened to (look at {@tutorial Events} for more info)
* @param {number} [extra_id] Implementation of extra ID 1
* @param {number} [extra_id2] Implementation of extra ID 2
* @returns {GJsEvent}
* @category Functions
* @group Events
*/
export declare const event: (ev: any, extra_id?: number, extra_id2?: number) => GJsEvent;
/**
 * Simple input control abstraction
 * @returns {Gamescene}
 * @category Functions
 */
export declare const gamescene: () => Gamescene;
