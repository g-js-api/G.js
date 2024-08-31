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
          $.add(object({
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
*/
let frame = () => {
return {
  event: (tf) => frame_loop(tf)
}
};
/**
* Listens to when the screen stops being touched
* @param {boolean} [dual_side=false] Whether to only listen to dual side 
* @returns {event}
*/
let touch_end = (dual_side = false) => {
  return {
      event: (trig_func) =>
          $.add(object({
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
* @param {block} block_a First block to listen to
* @param {block} block_b Second block to listen to
* @param {boolean} P1 Player 1 as block a
* @param {boolean} P2 Player 2 as block a
* @returns {event}
*/
let collision = (a, b, P1 = false, P2 = false) => {
  return {
      event: (t) =>
          $.add(object({
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
* @param {block} block_a First block to listen to
* @param {block} block_b Second block to listen to
* @param {boolean} P1 Player 1 as block a
* @param {boolean} P2 Player 2 as block a
* @returns {event}
*/
let collision_exit = (a, b, P1 = false, P2 = false) => {
  return {
      event: (t) =>
          $.add(object({
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
* @returns {event}
*/
let death = () => {
  return {
      event: (t) =>
          $.add(object({
              OBJ_ID: 1812,
              ACTIVATE_GROUP: true,
              TARGET: t,
          })),
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
          $.add(object({
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
* @param {number} x X position where event is called
* @returns {event}
*/
let x_position = (position) => {
  return {
      event: (t) => $.add(spawn_trigger(t).with(obj_props.X, position).with(obj_props.Y, 2145).with(obj_props.SPAWN_TRIGGERED, 0).with(obj_props.MULTI_TRIGGER, 0)),
  };
};

/**
* Implementation of the event trigger that triggers an event
* @param {array|event_id} event Event(s) to be listened to (look at {@tutorial Events} for more info)
* @param {number} extra_id Implementation of extra ID 1
* @param {number} extra_id2 Implementation of extra ID 2
* @returns {event}
*/
let event = (ev, extra_id, extra_id2) => {
  if (typeof ev == "object") ev = ev.join('.');
  return {
      event: (t) => $.add(object({
          OBJ_ID: 3604,
          TARGET: t,
          EXTRA_ID: extra_id,
          EXTRA_ID_2: extra_id2,
          EVENTS: ev.toString()
      }))
  }
};

/**
* Represents gamescene (all functions in this type are made to be used with on())
* @typedef {object} gamescene
* @property {function} button_a Returns an event when the left side is pressed
* @property {function} button_b Returns an event when the right side is pressed
* @property {function} button_a_end Returns an event when the left side is no longer pressed
* @property {function} button_b_end Returns an event when the right side is no longer pressed
* @property {stop} stop Stops playing the song
*/
/**
* Simple input control abstraction
@returns {gamescene} 
*/
let gamescene = () => {
  // Triggers and groups
  follow_x_group = unknown_g();
  follow_y_group = unknown_g();
  hidden_group = unknown_g();

  hidden_group.alpha(0);
  follow_x_group.lock_to_player((lock_x = true), (lock_y = false));
  follow_x_group.move((x = 0), (y = 5), (duration = 0.01));
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
  $.add(({
    OBJ_ID: obj_ids.portals.SIZE_MINI,
    X: 0,
    Y: 30,
    GROUPS: hidden_group,
  }));

  // Top and bottom blocks
  $.add(({
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
  player_block = unknown_b();
  collide_block = unknown_b();

  $.add(object({
    OBJ_ID: obj_ids.special.COLLISION_BLOCK,
    DYNAMIC_BLOCK: true,
    BLOCK_A: player_block,
    X: 0,
    Y: 0,
    GROUPS: [hidden_group, follow_x_group, follow_y_group],
  }));
  $.add(({
    OBJ_ID: obj_ids.special.COLLISION_BLOCK,
    DYNAMIC_BLOCK: false,
    BLOCK_A: collide_block,
    X: 0,
    Y: 37,
    GROUPS: [hidden_group, follow_x_group],
  }));

  // D block
  $.add(({
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

module.exports = { on, touch, touch_end, collision, collision_exit, death, count, x_position, event, gamescene, frame }