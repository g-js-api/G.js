/**
 * @requires group
 * @requires color
 * @requires block
 */
const {
  on,
  touch,
  touch_end,
  collision,
  collision_exit,
  death,
  count,
  x_position,
  event
} = require('./lib/events');
const {
  remappable,
  sequence,
  call_with_delay,
  equal_to,
  less_than,
  greater_than,
  for_loop
} = require('./lib/control-flow');
const {
  item_edit,
  item_comp,
  timer,
  compare
} = require('./lib/items');
const {
  camera_offset,
  camera_static,
  camera_zoom,
  camera_mode,
  camera_rotate,
  camera_edge,
  song,
  teleport,
  move_trigger,
  timewarp,
  color_trigger,
  toggle_on_trigger,
  toggle_off_trigger,
  hide_player,
  gradient,
  random,
  advanced_random,
  gravity,
  options,
  end,
  player_control
} = require('./lib/general-purpose');
const keyframe_system = require('./lib/keyframes.js');
const all_particles = require('./properties/particles.js');
const events = require('./properties/game_events.js');
const WebSocket = require('ws');
const crypto = require('crypto');
const LevelReader = require('./reader');
const zlib = require('zlib');
const $group = require('./types/group.js');
const $color = require('./types/color.js');
const $block = require('./types/block.js');
const d = require('./properties/obj_props.js');
const counter = require('./lib/counter');

let explicit = {};

/**
* Creates a spawn trigger and returns it
* @param {group} group group to be spawned
* @param {number} time delay to spawn group
* @returns {object}
*/
let spawn_trigger = (group, time = 0) => {
  let origin = {
      OBJ_ID: 1268,
      SPAWN_DURATION: time,
      TARGET: group,
  };
  origin.with = (a, b) => {
      origin[d[a]] = b;
      return origin;
  };
  return origin;
};

/**
 * Extracts values from dictionary into global scope
 * @param {dictionary} dict Dictionary to extract
 */
let extract = (x) => {
  for (let i in x) {
    global[i] = x[i];
  }
};

let find_context = (group) => {
  for (let i in contexts) {
    if (contexts[i].group.value == group.value) {
      return contexts[i];
    }
  }
};

/**
 * Creates a repeating trigger system that repeats while a condition is true
 * @param {condition} condition Condition that defines whether the loop should keep on running (less_than/equal_to/greater_than(counter, number))
 * @param {function} func Function to run while the condition is true
 * @param {number} delay Delay between each cycle
 */
let while_loop = (r, trig_fn, del = 0.05) => {
  let { count, comparison, other } = r;
  let old_context = current_context;

  let context = create_context(crypto.randomUUID());
  count.if_is(comparison, other, context.group);

  set_context(context.name);
  trig_fn(context.group);
  set_context(old_context);

  trig_fn = context.group;

  let ctx_name = find_context(trig_fn).name;
  let curr_g = contexts[last_context_children[ctx_name]];

  if (curr_g) {
      curr_g = curr_g.group;
  } else {
      curr_g = trig_fn;
  }

  $.extend_trigger_func(curr_g, () => {
      contexts[old_context].group.call(del);
  });
};

let all_known = {
  groups: [],
  colors: [],
  blocks: []
}

let writeClasses = (arr) => {
  arr.forEach((class_) => {
    let clases = class_.split('/');
    let clas = clases.shift();
    clases.forEach((expl) => {
      if (explicit[expl]) {
        explicit[expl] = [explicit[expl], clas];
        return;
      }
      explicit[expl] = clas;
    });
  });
  /**
   * Converts a number to a group
   * @global
   * @param {number} x - The number to convert to a group.
   * @returns {group}
   */
  global['group'] = (x) => new $group(x);
  /**
   * Converts a number to a color
   * @global
   * @param {number} x - The number to convert to a color.
   * @returns {color}
   */
  global['color'] = (x) => new $color(x);
  /**
   * Converts a number to a block
   * @global
   * @param {number} x - The number to convert to a block.
   * @returns {block}
   */
  global['block'] = (x) => new $block(x);
}

writeClasses([
  'group/TARGET/GROUPS/GR_BL/GR_BR/GR_TL/GR_TR/TRUE_ID/FALSE_ID/ANIMATION_GID/TARGET_POS/EXTRA_ID/EXTRA_ID_2/FOLLOW',
  'color/TARGET/TARGET_COLOR/COLOR/COLOR_2',
  'block/BLOCK_A/BLOCK_B',
]);

let [unavailable_g, unavailable_c, unavailable_b] = [0, 0, 0];

let get_new = (n, prop) => {
  if (all_known[prop].indexOf(n) == -1) return n;
  let cond = true;
  while (cond) {
    cond = all_known[prop].indexOf(n) != -1;
    n++;
  }
  return n;
};

/**
 * Creates and returns an unavailable group ID
 * @returns {group} Resulting group ID
 */
let unknown_g = () => {
  // todo: make this not use group 0
  unavailable_g++;
  unavailable_g = get_new(unavailable_g, 'groups');
  return group(unavailable_g);
};
/**
 * Creates and returns an unavailable color ID
 * @returns {color} Resulting color ID
 */
let unknown_c = () => {
  unavailable_c++;
  unavailable_c = get_new(unavailable_c, 'colors');
  return color(unavailable_c);
};
/**
 * Creates and returns an unavailable block ID
 * @returns {block} Resulting block ID
 */
let unknown_b = () => {
  unavailable_b++;
  unavailable_b = get_new(unavailable_b, 'blocks');
  return block(unavailable_b);
};

let contexts = {
  global: {
    name: 'global',
    group: unknown_g(),
    objects: [],
  },
};

let last_context_children = {};

let current_context = 'global';
let set_context = (name) => {
  current_context = name;
};
let get_context = () => {
  return contexts[current_context];
};

/**
 * Creates a "trigger function" in which triggers can be stored inside of a single group
 * @param {function} callback Function storing triggers to put inside of group
 * @returns {group} Group ID of trigger function
 */
let trigger_function = (cb, autocall = true) => {
  let old_context = current_context;
  let context = create_context(crypto.randomUUID(), true);
  cb(context.group);
  set_context(old_context);
  return context.group;
};

/**
 * Waits for a specific amount of seconds
 * @param {number} time How long to wait
 */
let wait = (time) => {
  let id = crypto.randomUUID();
  let o = current_context;
  let context = create_context(id);
  $.add(spawn_trigger(context.group, time));
  if (get_context().linked_to) {
      context.linked_to = get_context().linked_to;
      last_context_children[context.linked_to] = id;
  } else {
      context.linked_to = o;
      last_contexts[o] = context.name;
      last_context_children[o] = id;
  }
  set_context(id);
};

let create_context = (name, set_to_default = false) => {
  contexts[name] = {
    name,
    group: unknown_g(),
    objects: [],
  };
  last_contexts[name] = name;
  if (set_to_default) set_context(name);
  return contexts[name];
};

let add_to_context = (obj) => {
  get_context().objects.push(obj);
};

let reverse = {};
for (var i in d) {
  reverse[d[i]] = i;
}

// stuff for custom things

let dot_separated_keys = [57, 442];
dot_separated_keys = dot_separated_keys.map(x => x.toString())

let mappings = {
  696969: '80',
  420420: '80',
  6942069: '95',
  6969: '51',
  42069420: '88',
  32984398: '51',
  584932: '71',
  78534: '480',
  45389: '481',
  93289: '482',
  8754: '51',
  8459: '71',
  3478234: '71',
  45893: '392',
  237894: '10',
  347832: '70'
}
let obj_to_levelstring = (l) => {
  let res = '';
  // { x: 15, Y: 10 };
  for (var d_ in l) {
    let val = l[d_];
    let key = reverse[d_];
    if (!isNaN(parseInt(d_))) key = d_
    if (typeof val == 'boolean') val = +val;
    // if (d_ == "GR_LAYER") console.log(val, key)
    if (explicit[d_] && !val.hasOwnProperty('value')) { // if type is explicitly required for current object property and it is not a group/color/block
      if (typeof val == 'object' && dot_separated_keys.includes(key)) { // if val is an array and it is dot separated
        val = val.map((x) => x.value).filter(x => x && x != '').join('.');
      } else {
        throw `Expected type "${explicit[d[parseInt(key)]]
        }", got "${typeof val}"`;
      }
    } else if (explicit[d_] && val.value) {
      let cond = typeof explicit[d_] == "string" ? (val.type == explicit[d_]) : (explicit[d_].includes(val.type));
      if (cond) {
        val = val.value;
      } else {
        throw `Expected type "${explicit[d_]}", got "${val.type}"`;
      }
    }
    if (mappings.hasOwnProperty(key)) {
      key = mappings[key];
    }
    res += `${key},${val},`;
  }
  return res.slice(0, -1) + ';';
};
let resulting = '';

let add = (o) => {
  let newo = o;
  if (newo.with) delete newo.with;
  add_to_context(newo);
};

let remove_group = 9999;

let prep_lvl = () => {
  let name = 'GLOBAL_FULL';
  contexts[name] = {
    name,
    group: group(0),
    objects: [],
  };
  last_contexts[name] = name;
  set_context(name);
  contexts.global.group.call();
  for (let i in contexts) {
    if (i !== 'GLOBAL_FULL') {
      let context = contexts[i];
      // gives groups to objects in context
      let objects = context.objects;
      for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        if (!object.GROUPS) {
          object.GROUPS = [context.group, group(remove_group)];
        } else {
          if (Array.isArray(object.GROUPS)) {
            object.GROUPS.push(context.group, group(remove_group));
          } else {
            object.GROUPS = [object.GROUPS, context.group, group(remove_group)];
          }
        }

        object.SPAWN_TRIGGERED = 1;
        object.MULTI_TRIGGER = 1;
        // end
      }
    } else {
      let context = contexts[name];
      let objects = context.objects;
      for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        if (!object.GROUPS) {
          object.GROUPS = group(remove_group);
        } else {
          if (Array.isArray(object.GROUPS)) {
            object.GROUPS.push(group(remove_group));
          } else {
            object.GROUPS = [object.GROUPS, group(remove_group)];
          }
        }
      }
    }
    for (let x in contexts[i].objects) {
      let r = obj_to_levelstring(contexts[i].objects[x]);
      resulting += r;
    }
  }
};

let limit = 9999;
let getLevelString = (options = {}) => {
  prep_lvl();
  if (unavailable_g <= limit) {
    if (options.info) {
      console.log('Finished, result stats:');
      console.log('Object count:', resulting.split(';').length - 1);
      console.log('Group count:', unavailable_g);
      console.log('Color count:', unavailable_c);
    }
  } else {
    if (
      (options.hasOwnProperty('group_count_warning') &&
        options.group_count_warning == true) ||
      !options.hasOwnProperty('group_count_warning')
    )
      throw new Error(`Group count surpasses the limit! (${unavailable_g}/${limit})`);
  }
  return resulting;
};

/**
 * @typedef {object} easing
 * @property {number} EASE_IN_OUT Ease in out easing
 * @property {number} EASE_IN Ease in easing
 * @property {number} EASE_OUT Ease out easing
 * @property {number} EXPONENTIAL_IN_OUT Exponential in out easing
 * @property {number} EXPONENTIAL_IN Exponential in easing
 * @property {number} EXPONENTIAL_OUT Exponential out easing
 * @property {number} SINE_IN_OUT Sine in out easing
 * @property {number} SINE_IN Sine in easing
 * @property {number} SINE_OUT Sine out easing
 * @property {number} ELASTIC_IN_OUT Elastic in out easing
 * @property {number} ELASTIC_IN Elastic in easing
 * @property {number} ELASTIC_OUT Elastic out easing
 * @property {number} BACK_IN_OUT Back in out easing
 * @property {number} BACK_IN Back in easing
 * @property {number} BACK_OUT Back out easing
 * @property {number} BOUNCE_IN_OUT Bounce in out easing
 * @property {number} BOUNCE_IN Bounce in easing
 * @property {number} BOUNCE_OUT Bounce out easing
*/
let easings = {
  ELASTIC_OUT: 6,
  BACK_IN_OUT: 16,
  BOUNCE_IN: 8,
  BACK_OUT: 18,
  EASE_OUT: 3,
  EASE_IN: 2,
  EASE_IN_OUT: 1,
  ELASTIC_IN_OUT: 4,
  BOUNCE_OUT: 9,
  EXPONENTIAL_IN: 11,
  EXPONENTIAL_OUT: 12,
  SINE_IN_OUT: 13,
  BOUNCE_IN_OUT: 7,
  SINE_IN: 14,
  ELASTIC_IN: 5,
  SINE_OUT: 15,
  EXPONENTIAL_IN_OUT: 10,
  BACK_IN: 17,
  NONE: 0,
};
extract(easings);
global.obj_props = reverse;

let last_contexts = {};
let extend_trigger_func = (t, cb) => {
  for (let i in contexts) {
    i = contexts[i];
    if (i.group == t) {
      let o = current_context;
      set_context(last_contexts[i.name]);
      cb(i.group);
      set_context(o);
    }
  }
};

let remove_past_objects = (lvlstring, name) => {
  // remove_group
  if (!lvlstring) throw new Error(`Level "${name}" has not been initialized, add any object to initialize the level then rerun this script`);
  return lvlstring.split(';').filter(x => {
    let keep = true;
    let spl = x.split(',');
    spl.forEach((z, i) => {
      if (!(i % 2)) {
        if (z == "57") {
          let groups = spl[i + 1]
          if (groups.includes('.')) {
            groups = groups.split('.');
            if (groups.includes(remove_group.toString())) {
              keep = false;
            }
          } else {
            if (groups == remove_group) {
              keep = false;
            }
          }
        }
      }
    })
    return keep;
  }).join(';');
}
let exportToSavefile = (options = {}) => {
  (async () => {
    const level = await new LevelReader(options.level_name, options.path);
    let last = remove_past_objects(level.data.levelstring, level.data.name);
    prep_lvl();
    if (unavailable_g <= limit) {
      if (options.info) {
        console.log(`Writing to level: ${level.data.name}`);
        console.log('Finished, result stats:');
        console.log('Object count:', resulting.split(';').length - 1);
        console.log('Group count:', unavailable_g);
        console.log('Color count:', unavailable_c);
      }
    } else {
      if (
        (options.hasOwnProperty('group_count_warning') &&
          options.group_count_warning == true) ||
        !options.hasOwnProperty('group_count_warning')
      )
        throw new Error(`Group count surpasses the limit! (${unavailable_g}/${limit})`);
    }
    last += resulting;
    level.set(last);
    level.save();
  })()
};

const group_arr = (arr, x) => arr.reduce((acc, _, i) => (i % x ? acc[acc.length - 1].push(arr[i]) : acc.push([arr[i]]), acc), []);

let liveEditor = (conf) => {
  const socket = new WebSocket('ws://127.0.0.1:1313');
  let lvlString = group_arr($.getLevelString(conf).split(';'), 250).map(x => x.join(';'));
  socket.addEventListener('message', (event) => {
    event = JSON.parse(event.data);
    if (event.status !== "successful") throw new Error(`Live editor failed, ${event.error}: ${event.message}`)
  });

  socket.addEventListener('open', (event) => {
    socket.send(JSON.stringify({
      action: 'REMOVE',
      group: 9999,
    })); // clears extra objects
    lvlString.forEach((chunk, i) => {
      setTimeout(() => {
        socket.send(JSON.stringify({
          action: 'ADD',
          objects: chunk + ';',
          close: i == lvlString.length - 1
        }));
      }, i * 75);
    });
  });

  socket.addEventListener('error', () => {
    throw new Error(`Connecting to WSLiveEditor failed! Make sure you have installed the WSLiveEditor mod inside of Geode!`);
  });
};
/**
 * Configuration for exporting levels
 * @typedef {object} save_config 
 * @property {boolean} info Whether to log information to console when finished
 * @property {boolean} group_count_warning Whether to warn that group count is surpassed (only useful if in future updates the group count is increased)
 * @property {string} level_name Name of level (only for exportToSavefile)
 * @property {string} path Path to CCLocalLevels.dat savefile (only for exportToSavefile)
 */
/**
 * Core type holding important functions for adding to levels, exporting and modifying scripts
 * @typedef {object} $
 * @property {add} add Adds an object
 * @property {print} print Prints to console
 * @property {getLevelString} getLevelString Returns level string of the script
 * @property {extend_trigger_func} extend_trigger_func Extends a trigger function by adding more triggers to it
 * @property {exportToSavefile} exportToSavefile Exports script to savefile
 * @property {liveEditor} liveEditor Exports script to live editor using WSLiveEditor (requires Geode)
 * @property {trigger_fn_context} trigger_fn_context Returns group of current trigger function context
 */
/**
 * Adds an object
 * @callback add
 * @param {object} object Object to add
 */
/**
 * Prints to console
 * @callback print
 * @param {*} value Value to print 
 */
/**
 * Extends a trigger function by adding more triggers to it
 * @callback extend_trigger_func
 * @param {group} trigger_func Trigger function to extend
 * @param {function} callback Function that adds more triggers to trigger_func
 */
/**
 * Returns level string
 * @callback getLevelString
 * @param {save_config} config Configuration for exporting to levelstring
 * @returns {string} Resulting level string
 */
/**
 * Exports script to savefile
 * @callback exportToSavefile
 * @param {save_config} config Configuration for exporting to savefile
 */
/**
 * Exports script to live editor using WSLiveEditor (requires Geode)
 * @callback liveEditor
 * @param {save_config} config Configuration for exporting to live editor
 */
/**
 * Returns group of current trigger function context
 * @callback trigger_fn_context
 * @returns {group} Group of current trigger function context
 */

let $ = {
  add,
  print: function () {
    console.log(...Array.from(arguments));
  },
  getLevelString,
  extend_trigger_func,
  exportToSavefile,
  liveEditor,
  trigger_fn_context: () => get_context().group,
};



/**
 * Creates a particle system
 * @param {dictionary} props Dictionary holding particle properties (check {@tutorial Particles} for more info)
 * @param {boolean} [use_obj_color=false] Whether to make the particle system use the object color
 * @param {boolean} [animate_on_trigger=false] Whether to only start the particle system when the Animate trigger is used on the particle system instead of immediately
 * @param {boolean} [animate_active_only=false] Only makes animate_on_trigger true if the object is active 
 * @param {boolean} [quick_start=false] Makes normal movement be achieved instantly instead of gradually
 * @returns {object} Returned particle system
 */
let particle_system = (props, use_obj_color = false, animate_on_trigger = false, animate_active_only = false, quick_start = false) => {
  let datalist = Array(72).fill(0);
  for (let i in props) {
    let x = props[i];
    if (typeof x == "boolean") x = +x;
    datalist[all_particles[i]] = x;
  };
  datalist = datalist.join('a');
  let origin = {
    OBJ_ID: 2065,
    PARTICLE_DATA: datalist,
    USE_OBJ_COLOR: use_obj_color,
    UNIFORM_OBJ_COLOR: "UNIFORM_OBJ_COLOR" in props ? props.UNIFORM_OBJ_COLOR : false,
    ANIMATE_ON_TRIGGER: animate_on_trigger,
    ANIMATE_ACTIVE_ONLY: animate_active_only,
    QUICK_START: quick_start
  };
  origin.with = (a, b) => {
    origin[d[a]] = b;
    return origin;
  };
  return origin;
};


/**
 * Generates an array holding a sequence of numbers starting at the "start" parameter, ending at the "end" parameter and incrementing by "step"
 * @param {number} start What number to start at
 * @param {number} end What number to end at
 * @param {number} step What number to increment by
 * @returns {array} Resulting sequence
 */
function range(start, end, step = 1) {
  let sw = false;
  if (start > end) {
    sw = true;
    [start, end] = [end, start]; // Swap start and end
    step = Math.abs(step); // Ensure step is positive
  }

  let result = Array.from({ length: Math.ceil((end - start) / step) }, (_, i) => start + i * step);
  if (sw) result = result.reverse();
  return result;
};


let refs = {
  types: [null, "ITEM", "TIMER", "POINTS", "TIME", "ATTEMPT"],
  ops: ["EQ", "ADD", "SUB", "MUL", "DIV"],
  compare_ops: [null, "GREATER", "GREATER_OR_EQ", "LESS", "LESS_OR_EQ", "NOT_EQ"],
  absneg: [null, "ABS", "NEG"],
  rfc: [null, "RND", "FLR", "CEI"],
}
for (let i in refs) {
  i = refs[i];
  i.forEach((x, i) => {
    if (x) {
      global[x] = i
    }
  })
}
/**
 * Converts a string to a text object and returns it
 * @returns {object} Resulting text object
 */
String.prototype.to_obj = function () {
  let or = {
    OBJ_ID: 914,
    TEXT: btoa(this),
    with: (prop, val) => {
      or[d[prop]] = val;
      return or;
    },
  };
  return or;
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
  $.add({
    OBJ_ID: obj_ids.portals.DUAL_ON,
    X: 0,
    Y: 30,
    GROUPS: hidden_group,
  });
  $.add({
    OBJ_ID: obj_ids.portals.WAVE,
    X: 0,
    Y: 30,
    GROUPS: hidden_group,
  });
  $.add({
    OBJ_ID: obj_ids.portals.SIZE_MINI,
    X: 0,
    Y: 30,
    GROUPS: hidden_group,
  });

  // Top and bottom blocks
  $.add({
    OBJ_ID: 1,
    X: 0,
    Y: 33,
    GROUPS: [hidden_group, follow_x_group],
  });
  $.add({
    OBJ_ID: 1,
    X: 0,
    Y: -12,
    GROUPS: [hidden_group, follow_x_group],
  });

  // Collision blocks
  player_block = unknown_b();
  collide_block = unknown_b();

  $.add({
    OBJ_ID: obj_ids.special.COLLISION_BLOCK,
    DYNAMIC_BLOCK: true,
    BLOCK_A: player_block,
    X: 0,
    Y: 0,
    GROUPS: [hidden_group, follow_x_group, follow_y_group],
  });
  $.add({
    OBJ_ID: obj_ids.special.COLLISION_BLOCK,
    DYNAMIC_BLOCK: false,
    BLOCK_A: collide_block,
    X: 0,
    Y: 37,
    GROUPS: [hidden_group, follow_x_group],
  });

  // D block
  $.add({
    OBJ_ID: obj_ids.special.D_BLOCK,
    SCALING: 2,
    X: 0,
    Y: 15,
    GROUPS: [hidden_group, follow_x_group],
  });

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

let obj_ids = {
  special: {
    USER_COIN: 1329,
    H_BLOCK: 1859,
    J_BLOCK: 1813,
    TEXT: 914,
    S_BLOCK: 1829,
    ITEM_DISPLAY: 1615,
    D_BLOCK: 1755,
    COLLISION_BLOCK: 1816,
  },
  triggers: {
    SPAWN: 1268,
    ON_DEATH: 1812,
    ROTATE: 1346,
    COUNT: 1611,
    DISABLE_TRAIL: 33,
    HIDE: 1612,
    PICKUP: 1817,
    COLLISION: 1815,
    ENABLE_TRAIL: 32,
    ANIMATE: 1585,
    TOUCH: 1595,
    INSTANT_COUNT: 1811,
    BG_EFFECT_OFF: 1819,
    TOGGLE: 1049,
    MOVE: 901,
    ALPHA: 1007,
    SHOW: 1613,
    STOP: 1616,
    FOLLOW: 1347,
    PULSE: 1006,
    BG_EFFECT_ON: 1818,
    SHAKE: 1520,
    FOLLOW_PLAYER_Y: 1814,
    COLOR: 899,
  },
  portals: {
    SPEED_GREEN: 202,
    TELEPORT: 747,
    CUBE: 12,
    MIRROR_OFF: 46,
    WAVE: 660,
    SPIDER: 1331,
    SPEED_RED: 1334,
    GRAVITY_DOWN: 10,
    SPEED_BLUE: 201,
    UFO: 111,
    ROBOT: 745,
    MIRROR_ON: 45,
    GRAVITY_UP: 11,
    DUAL_ON: 286,
    SIZE_MINI: 101,
    BALL: 47,
    SIZE_NORMAL: 99,
    SHIP: 13,
    SPEED_PINK: 203,
    SPEED_YELLOW: 200,
    DUAL_OFF: 287,
  },
};

let exps = {
  // constants
  EQUAL_TO: 0,
  LARGER_THAN: 1,
  SMALLER_THAN: 2,
  BG: color(1000),
  GROUND: color(1001),
  LINE: color(1002),
  _3DLINE: color(1003),
  OBJECT: color(1004),
  GROUND2: color(1009),
  MODE_STOP: 0,
  MODE_LOOP: 1,
  MODE_LAST: 2,
  LEFT_EDGE: 1,
  RIGHT_EDGE: 2,
  UP_EDGE: 3,
  DOWN_EDGE: 4,
  // functions & objects
  $,
  counter,
  spawn_trigger,
  color_trigger,
  move_trigger,
  trigger_function,
  item_comp,
  compare,
  on,
  touch,
  touch_end,
  collision,
  collision_exit,
  death,
  count,
  x_position,
  wait,
  range,
  get_context,
  extract,
  while_loop,
  obj_ids,
  find_context,
  greater_than,
  equal_to,
  less_than,
  unknown_g,
  unknown_c,
  unknown_b,
  toggle_on_trigger,
  toggle_off_trigger,
  item_edit,
  hide_player,
  gamescene,
  keyframe_system,
  obj_to_levelstring,
  teleport,
  camera_offset,
  camera_static,
  camera_zoom,
  camera_mode,
  camera_rotate,
  camera_edge,
  timer,
  song,
  call_with_delay,
  for_loop,
  gradient,
  random,
  advanced_random,
  gravity,
  options,
  sequence,
  remappable,
  particle_system,
  end,
  player_control,
  timewarp,
  event,
  events,
  reverse: () => {
    $.add({
      OBJ_ID: 1917
    });
  },
  rgb: (r, g, b) => [r, g, b],
  rgba: (r, g, b, a) => [r, g, b, a],
};

extract(exps);