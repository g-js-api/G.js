/**
 * @module index
 * @exports index
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
  event,
  gamescene,
  frame,
  render_frame
} = require('./lib/events');
const {
  spawn_trigger,
  remappable,
  sequence,
  call_with_delay,
  equal_to,
  less_than,
  greater_than,
  for_loop,
  frame_loop,
  frames,
  render_frames,
  render_frame_loop
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
  player_control,
  particle_system,
  spawn_particle
} = require('./lib/general-purpose');
const {
  shader_layers,
  shader_layer,
  sepia,
  hue_shift,
  grayscale,
  pixelate,
  chromatic,
  glitch,
  bulge,
  split_screen
} = require('./lib/shaders.js');
const keyframe_system = require('./lib/keyframes.js');
const particle_props = require('./properties/particles.js');
const events = require('./properties/game_events.js');
const log = require('./lib/log.js');
const WebSocket = require('ws');
const crypto = require('crypto');
const LevelReader = require('./reader');
const $group = require('./types/group.js');
const $color = require('./types/color.js');
const $block = require('./types/block.js');
const d = require('./properties/obj_props.js');
const { counter, float_counter } = require('./lib/counter');

let explicit = {};

/**
 * Extracts values from dictionary into global scope
 * @param {dictionary} dict Dictionary to extract
 */
let extract = (x) => {
  for (let i in x) {
    global[i] = x[i];
  }
};

global.all_known = {
  groups: [],
  colors: [],
  blocks: []
}

let [unavailable_g, unavailable_c, unavailable_b] = [0, 0, 0];

let get_new = (n, prop, push = true) => {
  let arr = all_known[prop];
  if (arr.length == 0) {
    arr.push(1);
    return 1;
  }
  arr.sort((a, b) => a - b);
  if (arr[0] > 1 && push) {
    arr.unshift(1);
    return 1;
  }
  let result;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + 1) {
      result = arr[i - 1] + 1;
      break;
    }
  }
  if (!result) result = arr[arr.length - 1] + 1;
  if (push) all_known[prop].push(result);
  return result;
};
/**
 * Creates and returns an unavailable group ID
 * @returns {group} Resulting group ID
 */
let unknown_g = () => {
  // todo: make this not use group 0
  unavailable_g++;
  unavailable_g = get_new(unavailable_g, 'groups');
  return new $group(unavailable_g);
};
/**
 * Creates and returns an unavailable color ID
 * @returns {color} Resulting color ID
 */
let unknown_c = () => {
  unavailable_c++;
  unavailable_c = get_new(unavailable_c, 'colors');
  return new $color(unavailable_c);
};
/**
 * Creates and returns an unavailable block ID
 * @returns {block} Resulting block ID
 */
let unknown_b = () => {
  unavailable_b++;
  unavailable_b = get_new(unavailable_b, 'blocks');
  return new $block(unavailable_b);
};

/**
 * @typedef {object} context
 * @property {string} name Name of the current context
 * @property {group} group Group representing the current context
 * @property {array} objects All objects in the current context
 * @property {array} children Child contexts
 */
/**
 * Class allowing you to interfere with contexts, which are wrappers that assign groups to different objects
 * @class
 * @constructor
 * @public
 */
class Context {
  /**
   * Creates a new context
   * @param {string} name Name of context
   * @param {boolean} [setToDefault=false] Whether to automatically switch to the context
   * @param {group} [group=unknown_g()] The group to give to the context
   */
  constructor(name, setToDefault = false, group = unknown_g()) {
    this.name = name;
    this.group = group;
    this.objects = [];
    this.children = [];
    Context.last_contexts[name] = name;
    if (setToDefault) Context.set(name);
    Context.add(this);
  }
  static last_contexts = {};
  static last_context_children = {};
  /**
   * The name of the current context
   */
  static current = "global";
  /**
   * A list of all contexts added
   */
  static list = {};
  /**
   * Switches the context
   * @param {string|group} name Name or group of context to switch to
   */
  static set(name) {
    if (typeof name == 'object' && name?.value) {
      Context.current = Context.findByGroup(name).name;
      return;
    };
    Context.current = name;
  }
  /**
   * Converts an object into a context
   * @param {context} context Object to convert into a context
   */
  static add(context) {
    Context.list[context.name] = context;
  }
  /**
   * Adds an object into the current context
   * @param {object} objectToAdd Object to add into current context
   */
  static addObject(objectToAdd) {
    if (objectToAdd.type == "object") {
      objectToAdd = callback_objects_fn(objectToAdd) || objectToAdd;
      Context.findByName(Context.current).objects.push(objectToAdd.obj_props);
      return;
    }
    Context.findByName(Context.current).objects.push(objectToAdd);
  }
  /**
   * Links an existing context into the current one, allowing you to find the parent context of another context
   * @param {context} context Context to link into current
   * @param {string} ctxLink Optional context that should be the parent of input context
   */
  static link(context, ctxLink = undefined) {
    let input_context = Context.findByName(context);
    let curr_ctx = !ctxLink ? Context.findByName(Context.current) : Context.findByName(ctxLink);
    if (Context.isLinked(input_context)) {
      input_context.linked_to = curr_ctx.linked_to;
      Context.last_context_children[input_context.linked_to] = context;
    } else {
      input_context.linked_to = curr_ctx.name;
      Context.last_contexts[context] = input_context.name;
      Context.last_context_children[context] = curr_ctx.name;
    }
    curr_ctx.children.push(context);
  }
  /**
   * Checks if a context has a parent
   * @param {context} ctx Context to check for parent
   * @returns {boolean} Whether context has a parent
   */
  static isLinked(ctx) {
    return 'linked_to' in ctx;
  }
  /**
   * Finds a context based off of its assigned group
   * @param {group} groupToSearch 
   * @returns {context} Found context
   */
  static findByGroup(groupToSearch) {
    if (typeof groupToSearch == "number") {
      groupToSearch = group(groupToSearch);
    } else if (!groupToSearch instanceof $group) {
      throw new Error(`Expected number or $group instance, got ${groupToSearch} with type ${typeof groupToSearch}`)
    }
    for (const key in Context.list) {
      if (Context.list[key].group.value == groupToSearch.value) {
        return Context.list[key];
      }
    }
  }
  /**
   * Finds a context based off of its name
   * @param {string} name Name of the context
   * @returns {context} Found context
   */
  static findByName(name) {
    return Context.list[name];
  }
}

Context.add(new Context("global"))

let findDeepestChildContext = (name) => {
  let cond = true;
  let res_name = name;
  while (cond) {
    cond = !!Context.last_context_children[name];
    if (cond) {
      res_name = Context.last_context_children[res_name];
      cond = !!Context.last_context_children[res_name];
    } else { break };
  }
  return res_name;
};

/**
 * Creates a repeating trigger system that repeats while a condition is true
 * @param {condition} condition Condition that defines whether the loop should keep on running (less_than/equal_to/greater_than(counter, number))
 * @param {function} func Function to run while the condition is true
 * @param {number} delay Delay between each cycle
 */
let while_loop = (r, triggerFunction, del = 0.05) => {
  if (r === true) r = equal_to(counter(-1, true), 0);
  let { count, comparison, other } = r;
  let oldContextName = Context.current;

  let newContext = new Context(crypto.randomUUID());
  let check_func;
  if (oldContextName == "global") {
    check_func = trigger_function(() => {
      compare(count, comparison, other, newContext.group);
    });
  } else {
    compare(count, comparison, other, newContext.group);
  }

  Context.set(newContext.name);
  triggerFunction(newContext.group);
  Context.set(oldContextName);

  triggerFunction = newContext.group;

  let context = Context.findByGroup(triggerFunction);
  let currentG = Context.findByName(findDeepestChildContext(context.name)).group;
  if (!currentG) {
    currentG = triggerFunction;
  }
  $.extend_trigger_func(currentG, () => {
    // Context.findByName(oldContextName)
    oldContextName == "global" ? check_func.call(del) : Context.findByName(oldContextName).group.call(del);
  });
  if (check_func) check_func.call(del);
};

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
  global.group = (x) => new $group(x);
  /**
   * Converts a number to a color
   * @global
   * @param {number} x - The number to convert to a color.
   * @returns {color}
   */
  global.color = (x) => new $color(x);
  /**
   * Converts a number to a block
   * @global
   * @param {number} x - The number to convert to a block.
   * @returns {block}
   */
  global.block = (x) => new $block(x);
}

writeClasses([
  'group/TARGET/GROUPS/GROUP_PARENTS/GR_BL/GR_BR/GR_TL/GR_TR/TRUE_ID/FALSE_ID/ANIMATION_GID/TARGET_POS/FOLLOW/CENTER/TARGET_DIR_CENTER/SHADER_CENTER_ID',
  'color/TARGET/TARGET_COLOR/COLOR/COLOR_2/SHADER_TINT_CHANNEL',
  'block/BLOCK_A/BLOCK_B',
]);

/**
 * @typedef {dictionary} object
 * @property {string} type String dictating that the type of the resulting dictionary is an object
 * @property {dictionary} obj_props Dictionary inside of object holding the actual object properties of the object
 * @property {function} with Modifies/adds an object property (e.g. `object.with(obj_props.X, 15)`)
 * @property {function} add Adds the object
 */

/**
 * Takes a dictionary with object props & converts into an object
 * @param {dictionary} dict Dictionary to convert to object
 * @returns {object}
 */
let object = (dict) => {
  let return_val = {
    type: 'object',
    obj_props: dict,
    with: (prop, val) => {
      if (typeof prop == "string" && isNaN(parseInt(prop))) {
        dict[prop] = val;
        return return_val;
      }
      dict[d[prop] || prop] = val;
      return return_val;
    },
    // copied old $.add code here so I can migrate to enforcing object() usage in the future
    add: () => Context.addObject(return_val)
  };
  return return_val;
};

let triggerPositioningAllowed = true;
let verticalPos = true;
let tstart = 1500;
let tlimit = 1500;
let trigger_iter = 0;

/**
 * Takes a dictionary with object props & converts into a trigger
 * @param {dictionary} dict Dictionary to convert to trigger
 * @returns {object}
 */
let trigger = (dict) => {
  let iobj = object(dict);
  if (triggerPositioningAllowed) {
    if (verticalPos) {
      if (Context.list[Context.current].name !== 'global') iobj.obj_props.X = (Math.floor((trigger_iter * 30) / tlimit) * 30);
      iobj.obj_props.Y = tlimit - ((trigger_iter * 30) % tlimit) + tstart;
    } else {
      let xMovementAllowed = Context.list[Context.current].name !== 'global';
      if (xMovementAllowed) iobj.obj_props.X = ((trigger_iter * 30) % tlimit);
      iobj.obj_props.Y = xMovementAllowed ? tlimit - (Math.floor((trigger_iter * 30) / tlimit) * 30) + tstart : tlimit - ((trigger_iter * 30) % tlimit) + tstart;
    }
  }
  iobj.obj_props.ORD = trigger_iter;
  trigger_iter++;
  return iobj;
};

/**
 * Creates a "trigger function" in which triggers can be stored inside of a single group
 * @param {function} callback Function storing triggers to put inside of group
 * @returns {group} Group ID of trigger function
 */
let trigger_function = (cb) => {
  let oldContext = Context.current;
  let newContext = new Context(crypto.randomUUID(), true);
  cb(newContext.group);
  Context.set(oldContext);
  return newContext.group;
};

/**
 * Waits for a specific amount of seconds
 * @param {number} time How long to wait
 */
let wait = (time) => {
  if (time == 0) return;
  let id = crypto.randomUUID();
  let oldContext = Context.current;
  let newContext = new Context(id);
  $.add(spawn_trigger(newContext.group, time));
  Context.set(id);
  Context.link(newContext.name, oldContext);
};

let reverse = {};
for (var i in d) {
  reverse[d[i]] = i;
}

// stuff for custom things
let dot_separated_keys = [57, 442, 274];
dot_separated_keys = dot_separated_keys.map(x => x.toString())

let levelstring_to_obj = (string) => {
  let objects = [];
  string
    .split(';')
    .slice(0, -1)
    .forEach((x) => {
      let r = {};
      let spl = x.split(',');
      spl.forEach((x, i) => {
        if (!(i % 2)) {
          let obj_prop = parseInt(x);
          let value = spl[i + 1];
          // if (value.split('.').length > 2) console.log(value, obj_prop)
          if (typeof value == 'string' && value.includes('.') && dot_separated_keys.includes(obj_prop.toString())) {
            value = value.split('.').map(x => parseInt(x));
          }
          if (!isNaN(parseFloat(value))) value = parseFloat(value);
          if (!isNaN(parseInt(value)) && typeof value !== 'number') value = parseInt(value);
          r[d[obj_prop] || obj_prop] = value;
        }
      });
      objects.push(r);
    });
  return objects;
};

/**
 * Helper functions and variables holding existing level info.
 * @namespace level
 */
let level = {
  /**
   * Array of all objects in the level.
   * @type {Array<Object>}
   */
  objects: [],

  /**
   * Raw level string of the current level.
   * @type {string}
   */
  raw_levelstring: '',

  /**
   * Returns an array of all the objects in the level with a property whose value matches the pattern.
   * @param {string|number} prop - The property to check in each object.
   * @param {Function} pattern - The function to test the property value.
   * @returns {Array<Object>} An array of objects that match the given property and pattern.
   */
  get_objects: function (prop, pattern) {
    let level_arr = levelstring_to_obj(this.raw_levelstring);
    return level_arr.filter(o => {
      let cond_1 = prop in o || d[prop] in o, cond_2;
      if (cond_1) cond_2 = pattern(o[prop] || o[d[prop]]);
      return cond_1 && cond_2;
    });
  }
};

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
  7187327378823: '71',
  3478234: '71',
  45893: '392',
  237894: '10',
  347832: '70',
  34982398: '188',
  4376890: '512',
  4895490381243: '51',
  45890903: '290',
  487999230: '179',
  40943900394: '191',
  93423877: '181',
  8765437289: '182',
  645789320: '180',
  8765434: '188',
  21678934: '190'
};

let find_free = (str) => {
  let startIndex = 0;
  let endIndex;

  while ((endIndex = str.indexOf(';', startIndex)) !== -1) {
    let segment = str.substring(startIndex, endIndex);
    startIndex = endIndex + 1;

    if (!segment) continue;

    level.objects.push(segment);
    level.raw_levelstring += segment + ';';

    let ro = segment.split(',');
    for (let i = 0; i < ro.length; i += 2) {
      let key = ro[i];
      let value = ro[i + 1];
      switch (key) {
        case "57":
          let detected_groups = value.split('.').map(Number).filter(num => num !== remove_group);
          for (let group of detected_groups) {
            if (!all_known.groups.includes(group)) all_known.groups.push(group);
            unavailable_g = get_new(group, 'groups', false);
          }
          break;
        case "21":
        case "22":
          let detected_color = parseInt(value);
          if (!all_known.colors.includes(detected_color)) all_known.colors.push(detected_color);
          unavailable_c = get_new(detected_color, 'colors', false);
          break;
        case "80":
        case "95":
          let detected_block = parseInt(value);
          if (!all_known.blocks.includes(detected_block)) all_known.blocks.push(detected_block);
          unavailable_b = get_new(detected_block, 'blocks', false);
          break;
      }
    }
  }
};
let obj_to_levelstring = (l) => {
  let res = '';
  // { x: 15, Y: 10 };
  for (var d_ in l) {
    let val = l[d_];
    let key = reverse[d_];
    if (!isNaN(parseInt(d_))) key = d_
    if (typeof val == 'boolean') val = +val;
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

let add = (...objects) => {
  objects.forEach(o => {
    if (o?.type !== "object") {
      process.emitWarning('Using plain dictionaries as an argument to $.add is deprecated and using the object() function will be enforced in the future.', {
        type: 'DeprecationWarning',
        detail: 'Wrap the object() function around the dictionary as an argument to $.add instead of using plain dictionaries.'
      });
    }
    if (o?.type == "object") {
      o.add(); // does the same thing as below, only reason $.add is not removed is so I can customize $.add in the future
      return;
    };
    let newo = o;
    if (newo.with) delete newo.with;
    Context.addObject(newo);
  });
};
let remove_group = 9999;
let already_prepped = false;
let indexOfFrom = (array, value, startIndex) => {
  let newArr = array.slice(startIndex);
  return newArr.indexOf(value) !== -1 ? newArr.indexOf(value) + (array.length - newArr.length) : -1;
}
let ifInGroups = (groupsArr, group) => {
  groupsArr?.value == undefined ? (groupsArr.map(x => x.value).includes(group.value)) : groupsArr.value == group.value;
}
// removes contexts if they are empty + any unnecessary triggers associating with them
let optimize = () => {
  for (let child in Context.last_context_children) {
    let parent = Context.list[Context.last_context_children[child]];
    let childCtx = Context.list[child];
    // handles empty contexts
    if (childCtx.objects.length === 0) {
      delete Context.list[child];
      let emptyCallIndex = parent.objects.map(x => {
        if (!x?.TARGET) return false;
        return x.TARGET.value == childCtx.group.value;
      });
      parent.objects = parent.objects.filter((_, i) => i !== indexOfFrom(emptyCallIndex, true, i));
    }
  };
};

let prep_lvl = (optimize_op = true, replace = true) => {
  if (already_prepped) return;
  if (optimize_op) optimize();
  let name = 'GLOBAL_FULL';
  Context.add(new Context(name, true, group(0)))
  Context.last_contexts[name] = name;
  // contexts.global.group.call();
  for (let i in Context.list) {
    // undefined prop filter
    for (let object in Context.findByName(i).objects) {
      object = Context.findByName(i).objects[object];
      for (let prop in object) {
        if (object[prop] == undefined) delete object[prop];
      };
    }
    // main preparation
    if (!(+(i !== 'GLOBAL_FULL') ^ +(i !== 'global'))) { // XOR if it was logical
      let context = Context.findByName(i);
      // gives groups to objects in context
      let objects = context.objects;
      for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        if (replace) {
          if (!object.GROUPS) {
            object.GROUPS = [context.group, group(remove_group)];
          } else {
            if (Array.isArray(object.GROUPS)) {
              object.GROUPS.push(context.group, group(remove_group));
            } else {
              object.GROUPS = [object.GROUPS, context.group, group(remove_group)];
            }
          }
        } else {
          if (!object.GROUPS) {
            object.GROUPS = [context.group];
          } else {
            if (Array.isArray(object.GROUPS)) {
              object.GROUPS.push(context.group);
            } else {
              object.GROUPS = [object.GROUPS, context.group];
            }
          }
        }
        if (!(object.hasOwnProperty("SPAWN_TRIGGERED") || object.hasOwnProperty(obj_props.SPAWN_TRIGGERED))) {
          object.SPAWN_TRIGGERED = 1;
        }
        if (!(object.hasOwnProperty("MULTI_TRIGGER") || object.hasOwnProperty(obj_props.MULTI_TRIGGER))) {
          object.MULTI_TRIGGER = 1;
        }
        // end
      }
    } else {
      let context = Context.findByName(i);
      let objects = context.objects;
      for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        if (replace) {
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
    }
    for (let x in Context.findByName(i).objects) {
      let r = obj_to_levelstring(Context.findByName(i).objects[x]);
      resulting += r;
    }
  }
  already_prepped = true;
};

let limit = remove_group;
let warn_lvlstr = true;
let getLevelString = (options = {}) => {
  if (warn_lvlstr) process.emitWarning('Using $.getLevelString is deprecated and will be removed in the future.', {
    type: 'DeprecationWarning',
    detail: `Migrate by using \`await $.exportConfig({ type: 'levelstring', options: <your options here> })\`. Note that instead of using $.exportConfig at the end of the program, use it at the top, below the G.js import but above all other code.`
  });
  prep_lvl();
  if (unavailable_g <= limit) {
    if (options.info) {
      console.log('Finished, result stats:');
      console.log('Object count:', resulting.split(';').length - 1);
      console.log('Group count:', unavailable_g - 1);
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

let callback_objects_fn = x => x;
let callback_objects = (cb) => {
  callback_objects_fn = cb
};

let extend_trigger_func = (t, cb) => {
  const context = Context.findByGroup(t);
  const oldContext = Context.current;
  Context.set(Context.last_contexts[context.name]);
  cb(context.group);
  Context.set(oldContext);
};

let remove_past_objects = (lvlstring) => {
  // remove_group
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
  process.emitWarning('Using $.exportToSavefile is deprecated and will be removed in the future.', {
    type: 'DeprecationWarning',
    detail: `Migrate by using \`await $.exportConfig({ type: 'savefile', options: <your options here> })\`. Note that instead of using $.exportConfig at the end of the program, use it at the top, below the G.js import but above all other code.`
  });
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
    await level.save();
  })()
};

/**
 * @typedef {Object} export_config
 * @property {string} type Type of export (can be "levelstring", "savefile" or "live_editor")
 * @property {save_config} options Configuration for specific export type
 */
/**
 * One-size-fits-all function for exporting a level to GD
 * @param {export_config} conf Configuration for exporting level
 * @returns {null|string} Levelstring if using "levelstring" type, otherwise null
 */
let exportConfig = (conf) => {
  return new Promise(async (resolve) => {
    let options = conf.options;
    triggerPositioningAllowed = conf?.options?.triggerPositioningAllowed ?? true;
    verticalPos = conf?.options?.verticalPositioning ?? true
    if (conf?.options?.replacePastObjects == undefined) {
      conf.options.replacePastObjects = true;
      options.replacePastObjects = true;
    }
    if (conf?.options?.removeGroup !== undefined) {
      remove_group = typeof conf.options.removeGroup == "number" ? conf.options.removeGroup : conf.options.removeGroup?.value
    };
    switch (conf.type) {
      case "levelstring":
        prep_lvl(conf?.options?.optimize, conf?.options?.replacePastObjects);
        if (unavailable_g <= limit) {
          if (options?.info) {
            console.log('Finished, result stats:');
            console.log('Object count:', resulting.split(';').length - 1);
            console.log('Group count:', unavailable_g);
            console.log('Color count:', unavailable_c);
          }
        } else {
          if (
            (options?.hasOwnProperty('group_count_warning') &&
              options?.group_count_warning == true) ||
            !options?.hasOwnProperty('group_count_warning')
          )
            throw new Error(`Group count surpasses the limit! (${unavailable_g}/${limit})`);
        }
        resolve(resulting);
        break;

      case "savefile":
        const sf_level = await new LevelReader(options?.level_name, options?.path, options?.reencrypt);
        level.level_reader = sf_level;
        if (!sf_level.data.levelstring) throw new Error(`Level "${sf_level.data.name}" has not been initialized, add any object to initialize the level then rerun this script`);
        let last = conf?.options?.replacePastObjects ? remove_past_objects(sf_level.data.levelstring, sf_level.data.name) : sf_level.data.levelstring;
        find_free(last);
        resolve(true);
        process.on('beforeExit', error => {
          if (!error) {
            prep_lvl(conf?.options?.optimize, conf?.options?.replacePastObjects);
            if (unavailable_g <= limit) {
              if (options?.info) {
                console.log(`Writing to level: ${sf_level.data.name}`);
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
            sf_level.set(last);
            sf_level.save();
            process.exit(0);
          }
        });
        break;
      case "live_editor":
        let socket = new WebSocket('ws://127.0.0.1:1313');
        socket.addEventListener('message', (event) => {
          event = JSON.parse(event.data);
          if (event.response) {
            find_free(event.response.split(';').slice(1).join(';'));
            level.raw_levelstring = event.response;
            resolve(true);
          }
          if (event.status !== "successful") throw new Error(`Live editor failed, ${event.error}: ${event.message}`)
        });

        socket.addEventListener('open', (event) => {
          if (conf?.options?.replacePastObjects) {
            socket.send(JSON.stringify({
              action: 'REMOVE_OBJECTS',
              group: remove_group,
            })); // clears extra objects 
          }
          socket.send(JSON.stringify({
            action: 'GET_LEVEL_STRING',
            close: true
          })); // thing to get free groups
          process.on('beforeExit', error => {
            if (!error) {
              let socket2 = new WebSocket('ws://127.0.0.1:1313');
              socket2.addEventListener('message', (event) => {
                event = JSON.parse(event.data);
                if (event.response) {
                  find_free(event.response.split(';').slice(1).join(';'));
                }
                if (event.status !== "successful") throw new Error(`Live editor failed, ${event.error}: ${event.message}`)
              });
              socket2.addEventListener('open', async (event) => {
                let pre_lvlstr = await exportConfig({ type: "levelstring", options });
                let lvlString = group_arr(pre_lvlstr.split(';'), 250).map(x => x.join(';'));
                if (!error) {
                  lvlString.forEach((chunk, i) => {
                    setTimeout(() => {
                      socket2.send(JSON.stringify({
                        action: 'ADD_OBJECTS',
                        objects: chunk + ';',
                        close: i == lvlString.length - 1
                      }));
                      if (i == lvlString.length - 1) process.exit(0);
                    }, i * 75);
                  });
                }
              });
            }
          });
        });

        socket.addEventListener('error', () => {
          throw new Error(`Connecting to WSLiveEditor failed! Make sure you have installed the WSLiveEditor mod inside of Geode and have the editor open!`);
        });
        break;
      default: throw new Error(`The "${conf.type}" configuration type is not valid!`)
    }
  });
};

const group_arr = (arr, x) => arr.reduce((acc, _, i) => (i % x ? acc[acc.length - 1].push(arr[i]) : acc.push([arr[i]]), acc), []);

let liveEditor = (conf) => {
  process.emitWarning('Using $.liveEditor is deprecated and will be removed in the future.', {
    type: 'DeprecationWarning',
    detail: `Migrate by using \`await $.exportConfig({ type: 'live_editor', options: <your options here> })\`. Note that instead of using $.exportConfig at the end of the program, use it at the top, below the G.js import but above all other code.`
  });
  const socket = new WebSocket('ws://127.0.0.1:1313');
  warn_lvlstr = false;
  let lvlString = group_arr($.getLevelString(conf).split(';'), 250).map(x => x.join(';'));
  socket.addEventListener('message', (event) => {
    event = JSON.parse(event.data);
    if (event.status !== "successful") throw new Error(`Live editor failed, ${event.error}: ${event.message}`)
  });

  socket.addEventListener('open', (event) => {
    socket.send(JSON.stringify({
      action: 'REMOVE',
      group: remove_group,
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
 * Configuration for exporting levels.
 * @typedef {object} save_config 
 * @property {boolean} [info=false] Whether to log information to console when finished
 * @property {boolean} [group_count_warning=true] Whether to warn that group count is surpassed (only useful if in future updates the group count is increased)
 * @property {string} [level_name=by default, it writes to your most recent level/topmost level] Name of level (only for exportToSavefile)
 * @property {string} [path=path to savefile automatically detected based off of OS] Path to CCLocalLevels.dat savefile (only for exportToSavefile)
 * @property {boolean} [reencrypt=true] Whether to reencrypt savefile after editing it, or to let GD encrypt it
 * @property {boolean} [optimize=true] Whether to optimize unused groups & triggers that point to unused groups
 * @property {boolean} [replacePastObjects=true] Whether to delete all objects added by G.js in the past & replace them with the new objects
 * @property {number|group} [removeGroup=9999] Group to use to mark objects to be automatically deleted when re-running the script (default is 9999)
 * @property {boolean} [triggerPositioningAllowed=true] Whether to allow G.js to automatically position added triggers
 * @property {boolean} [verticalPositioning=true] Whether to position triggers vertically or horizontally in terms of order
*/
/**
 * Core type holding important functions for adding to levels, exporting, and modifying scripts.
 * @namespace $
 */
let $ = {
  /**
   * Adds an object.
   * @param {object} object - Object to add (wrap `object()` function around a dictionary).
   */
  add,

  /***
   * Configures how to export the script to Geometry Dash (must be used at the top of the script)
   * @param {export_config} config Configuration for exporting
   */
  exportConfig,

  /**
   * Prints to console.
   * @param {*} value - Value to print.
   */
  print: (...args) => console.log(...args),

  /**
   * Returns level string of the script.
   * @deprecated Replaced by `$.exportConfig({ type: "levelstring", options: ... })`
   * @param {save_config} config - Configuration for exporting to level string.
   * @returns {string} Resulting level string.
   */
  getLevelString,

  /**
   * Exports script to savefile.
   * @deprecated Replaced by `$.exportConfig({ type: "savefile", options: ... })`
   * @param {save_config} config - Configuration for exporting to savefile.
   */
  exportToSavefile,

  /**
   * Exports script to live editor using WSLiveEditor (requires Geode).
   * @deprecated Replaced by `$.exportConfig({ type: "live_editor", options: ... })`
   * @param {save_config} config - Configuration for exporting to live editor.
   */
  liveEditor,

  /**
   * Maps every trigger that gets added to the level
   * @param {function} callback - Function that maps triggers added to the level.
   */
  callback_objects,

  /**
   * Extends a trigger function by adding more triggers to it.
   * @param {group} trigger_func - Trigger function to extend.
   * @param {function} callback - Function that adds more triggers to `trigger_func`.
   */
  extend_trigger_func,
  /**
   * Returns group of current trigger function context.
   * @returns {group} Group of current trigger function context.
   */
  trigger_fn_context: () => Context.findByName(Context.current).group
};


/**
 * Ignores context changes inside of a function
 * @param {function} fn Function containing code where context changes should be ignored
 */
let ignore_context_change = (fn) => {
  let old_context = Context.current;
  fn();
  Context.set(old_context);
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
};
for (let i in refs) {
  i = refs[i];
  i.forEach((x, i) => {
    if (x) {
      global[x] = i;
    }
  })
}
String.prototype.to_obj = function () {
  let or = object({
    OBJ_ID: 914,
    TEXT: btoa(this)
  });
  return or;
};


/**
 * Generates the HVS string from an HSV color
 * @param {number} hue 
 * @param {number} sat 
 * @param {number} bright 
 * @param {boolean} sat_checked 
 * @param {boolean} bright_checked 
 * @returns {string} Resulting HVS string (used in HVS and COLOR_2_HVS)
 */
let hsv = (hue, sat, bright, sat_checked = false, bright_checked = false) => {
  return [hue, sat, bright, +sat_checked, +bright_checked].join("a");
}
/**
 * @typedef {Object} special_objects
 * @property {number} USER_COIN - Identifier for user coin
 * @property {number} H_BLOCK - Identifier for H block
 * @property {number} J_BLOCK - Identifier for J block
 * @property {number} TEXT - Identifier for text
 * @property {number} S_BLOCK - Identifier for S block
 * @property {number} ITEM_DISPLAY - Identifier for item display
 * @property {number} D_BLOCK - Identifier for D block
 * @property {number} COLLISION_BLOCK - Identifier for collision block
 */

/**
 * @typedef {Object} trigger_ids
 * @property {number} SPAWN - Identifier for spawn trigger
 * @property {number} ON_DEATH - Identifier for on-death trigger
 * @property {number} ROTATE - Identifier for rotate trigger
 * @property {number} COUNT - Identifier for count trigger
 * @property {number} DISABLE_TRAIL - Identifier for disable trail trigger
 * @property {number} HIDE - Identifier for hide trigger
 * @property {number} PICKUP - Identifier for pickup trigger
 * @property {number} COLLISION - Identifier for collision trigger
 * @property {number} ENABLE_TRAIL - Identifier for enable trail trigger
 * @property {number} ANIMATE - Identifier for animate trigger
 * @property {number} TOUCH - Identifier for touch trigger
 * @property {number} INSTANT_COUNT - Identifier for instant count trigger
 * @property {number} BG_EFFECT_OFF - Identifier for BG effect off trigger
 * @property {number} TOGGLE - Identifier for toggle trigger
 * @property {number} MOVE - Identifier for move trigger
 * @property {number} ALPHA - Identifier for alpha trigger
 * @property {number} SHOW - Identifier for show trigger
 * @property {number} STOP - Identifier for stop trigger
 * @property {number} FOLLOW - Identifier for follow trigger
 * @property {number} PULSE - Identifier for pulse trigger
 * @property {number} BG_EFFECT_ON - Identifier for BG effect on trigger
 * @property {number} SHAKE - Identifier for shake trigger
 * @property {number} FOLLOW_PLAYER_Y - Identifier for follow player Y trigger
 * @property {number} COLOR - Identifier for color trigger
 */

/**
 * @typedef {Object} portal_ids
 * @property {number} SPEED_GREEN - Identifier for green speed portal
 * @property {number} TELEPORT - Identifier for teleport portal
 * @property {number} CUBE - Identifier for cube portal
 * @property {number} MIRROR_OFF - Identifier for mirror off portal
 * @property {number} WAVE - Identifier for wave portal
 * @property {number} SPIDER - Identifier for spider portal
 * @property {number} SPEED_RED - Identifier for red speed portal
 * @property {number} GRAVITY_DOWN - Identifier for gravity down portal
 * @property {number} SPEED_BLUE - Identifier for blue speed portal
 * @property {number} UFO - Identifier for UFO portal
 * @property {number} ROBOT - Identifier for robot portal
 * @property {number} MIRROR_ON - Identifier for mirror on portal
 * @property {number} GRAVITY_UP - Identifier for gravity up portal
 * @property {number} DUAL_ON - Identifier for dual on portal
 * @property {number} SIZE_MINI - Identifier for mini size portal
 * @property {number} BALL - Identifier for ball portal
 * @property {number} SIZE_NORMAL - Identifier for normal size portal
 * @property {number} SHIP - Identifier for ship portal
 * @property {number} SPEED_PINK - Identifier for pink speed portal
 * @property {number} SPEED_YELLOW - Identifier for yellow speed portal
 * @property {number} DUAL_OFF - Identifier for dual off portal
 */

/**
 * @typedef {Object} obj_ids
 * @property {special_objects} special Special object IDs
 * @property {trigger_ids} triggers Trigger object IDs
 * @property {portal_ids} portals Portal object IDs
 */

/**
 * Object containing various IDs for objects, triggers, and portals.
 * @type {obj_ids}
 */
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

/**
 * @typedef {Object} big_beast_animations
 * @property {number} bite - Identifier for the bite animation
 * @property {number} attack01 - Identifier for the first attack animation
 * @property {number} attack01_end - Identifier for the end of the first attack animation
 * @property {number} idle01 - Identifier for the first idle animation
 */

/**
 * @typedef {Object} bat_animations
 * @property {number} idle01 - Identifier for the first idle animation
 * @property {number} idle02 - Identifier for the second idle animation
 * @property {number} idle03 - Identifier for the third idle animation
 * @property {number} attack01 - Identifier for the first attack animation
 * @property {number} attack02 - Identifier for the second attack animation
 * @property {number} attack02_end - Identifier for the end of the second attack animation
 * @property {number} sleep - Identifier for the sleep animation
 * @property {number} sleep_loop - Identifier for the sleep loop animation
 * @property {number} sleep_end - Identifier for the end of the sleep animation
 * @property {number} attack02_loop - Identifier for the loop of the second attack animation
 */

/**
 * @typedef {Object} spikeball_animations
 * @property {number} idle01 - Identifier for the first idle animation
 * @property {number} idle02 - Identifier for the second idle animation
 * @property {number} toAttack01 - Identifier for the transition to the first attack animation
 * @property {number} attack01 - Identifier for the first attack animation
 * @property {number} attack02 - Identifier for the second attack animation
 * @property {number} toAttack03 - Identifier for the transition to the third attack animation
 * @property {number} attack03 - Identifier for the third attack animation
 * @property {number} idle03 - Identifier for the third idle animation
 * @property {number} fromAttack03 - Identifier for the transition from the third attack animation
 */

/**
 * @typedef {Object} animations
 * @property {big_beast_animations} big_beast - Animation identifiers for big beast
 * @property {bat_animations} bat - Animation identifiers for bat
 * @property {spikeball_animations} spikeball - Animation identifiers for spikeball
 */

/**
 * Object containing various animation IDs for big beast, bat, and spikeball.
 * @type {animations}
 */
let animations = {
  big_beast: {
    bite: 0,
    attack01: 1,
    attack01_end: 2,
    idle01: 3
  },
  bat: {
    idle01: 0,
    idle02: 1,
    idle03: 2,
    attack01: 3,
    attack02: 4,
    attack02_end: 5,
    sleep: 6,
    sleep_loop: 7,
    sleep_end: 8,
    attack02_loop: 9
  },
  spikeball: {
    idle01: 0,
    idle02: 1,
    toAttack01: 2,
    attack01: 3,
    attack02: 4,
    toAttack03: 5,
    attack03: 6,
    idle03: 7,
    fromAttack03: 8
  }
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
  obj_ids,
  animations,
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
  Context,
  extract,
  while_loop,
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
  levelstring_to_obj,
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
  particle_props,
  object,
  Context,
  ignore_context_change,
  level,
  shader_layers,
  shader_layer,
  sepia,
  hue_shift,
  grayscale,
  pixelate,
  chromatic,
  glitch,
  bulge,
  split_screen,
  float_counter,
  frame_loop,
  frames,
  frame,
  log,
  spawn_particle,
  LevelReader,
  render_frame,
  render_frames,
  render_frame_loop,
  trigger,
  reverse: () => {
    $.add(trigger({
      OBJ_ID: 1917
    }));
  },
  rgb: (r, g, b) => [r, g, b],
  rgba: (r, g, b, a) => [r, g, b, a],
  hsv
};
extract(exps);