/**
 * Calls a group when an event occurs
 * @param event Event to listen to
 * @param group Group of object
 */
declare function on(event: event, group: group): void;

/**
 * Listens to when the screen is touched
 * @param dual_side Whether to only listen to dual side
 * @returns
 */
declare function touch(dual_side?: boolean): event;

/**
 * Listens to when the screen stops being touched
 * @param dual_side Whether to only listen to dual side
 * @returns
 */
declare function touch_end(dual_side?: boolean): event;

/**
 * Listens to when two collision blocks collide
 * @param block_a First block to listen to
 * @param block_b Second block to listen to
 * @returns
 */
declare function collision(block_a: block, block_b: block): event;

/**
 * Listens to when two collision blocks stop colliding
 * @param block_a First block to listen to
 * @param block_b Second block to listen to
 * @returns
 */
declare function collision_exit(block_a: block, block_b: block): event;

/**
 * Listens to when the player dies
 * @returns
 */
declare function death(): event;

/**
 * Listens to when an item hits a specific number
 * @param item Item to listen to
 * @param num Number that triggers event when the item hits this
 * @param multi Whether to trigger the event multiple time
 * @returns
 */
declare function count(item: item, num: number, multi: boolean): event;

/**
 * Listens to when the player reaches a specific X position
 * @param x X position where event is called
 * @returns
 */
declare function x_position(x: number): event;

/**
 * Implementation of the event trigger that triggers an event
 * @param event Event(s) to be listened to (look at {@tutorial Events} for more info)
 * @param extra_id Implementation of extra ID 1
 * @param extra_id2 Implementation of extra ID 2
 * @returns
 */
declare function event(event: any[] | event_id, extra_id: group, extra_id2: group): event;

