const zlib = require('zlib');
const crypto = require('crypto');

let explicit = {};

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

let spawn_trigger = (group, time = 0) => {
  return {
    OBJ_ID: 1268,
    SPAWN_DURATION: time,
    TARGET: group,
  };
};

let writeClasses = (arr) => {
  arr.forEach((class_) => {
    let clases = class_.split('/');
    let clas = clases.shift();
    clases.forEach((expl) => {
      explicit[expl] = clas;
    });

    if (clas == 'group') {
      eval(`class $${clas} {
        constructor(a) {
          this.value = a;
          this.type = '${clas}';
        }
        move(x, y, duration = 0, easing = NONE, easing_rate = 2, x_multiplier = 1, y_multiplier = 1, multiply = true, delay_trig = true) {
              $.add({
                  OBJ_ID: 901,
                  TARGET: this,
                  MOVE_X: multiply ? x * 3 * x_multiplier : x,
                  MOVE_Y: multiply ? y * 3 * y_multiplier : y,
                  DURATION: duration,
                  EASING: easing,
                  EASING_RATE: easing_rate,
              })
              if (delay_trig) wait(duration);
        }
        call(delay = 0) {
          $.add(spawn_trigger(this, delay))
        }
        
        alpha(opacity = 1, duration = 0) {
           $.add({
               OBJ_ID: 1007,
               TARGET: this,
               OPACITY: opacity,
               DURATION: duration,
           })
           wait(duration)
       }

       lock_to_player(lock_x = true, lock_y = true, duration = 999) {
        $.add({
            OBJ_ID: 901,
            TARGET: this,
            DURATION: duration,
            LOCK_TO_PLAYER_X: lock_x,
            LOCK_TO_PLAYER_Y: lock_y,
        })
      }

        follow_player_y(speed = 1, delay = 0, offset = 0, max_speed = 0, duration = 999) {
        $.add({
            OBJ_ID: 1814,
            SPEED : speed,
            DELAY : delay,
            Y_OFFSET : offset,
            MAX_SPEED : max_speed,
            TARGET: this,
            DURATION: duration,
        })
    }

      }
      global['${clas}'] = (x) => new $${clas}(x)`);
    } else if (clas == 'color') {
      eval(`class $${clas} {
      constructor(a) {
        this.value = a;
        this.type = '${clas}';
      }
      set(c, duration = 0, blending = false) {
        $.add({
          OBJ_ID: 899,
          DURATION: duration,
          TRIGGER_RED: c[0],
          TRIGGER_GREEN: c[1],
          TRIGGER_BLUE: c[2],
          OPACITY: c[3] || 1,
          BLENDING: blending,
          TARGET_COLOR: this,
          ACTIVE_TRIGGER: true,
        })
        wait(duration)
      }
    }
    global['${clas}'] = (x) => new $${clas}(x)`);
    } else {
      eval(`class $${clas} {
      constructor(a) {
        this.value = a;
        this.type = '${clas}';
      }
    }
    global['${clas}'] = (x) => new $${clas}(x)`);
    }
  });
};

writeClasses([
  'group/TARGET/GROUPS',
  'color/TARGET_COLOR/COLOR/COLOR_2',
  'block/BLOCK_A/BLOCK_B',
]);

let d = {
  1: 'OBJ_ID',
  2: 'X',
  3: 'Y',
  4: 'HORIZONTAL_FLIP',
  5: 'VERTICAL_FLIP',
  6: 'ROTATION',
  7: 'TRIGGER_RED',
  8: 'TRIGGER_GREEN',
  9: 'TRIGGER_BLUE',
  10: 'DURATION',
  11: 'TOUCH_TRIGGERED',
  13: 'PORTAL_CHECKED',
  15: 'PLAYER_COLOR_1',
  16: 'PLAYER_COLOR_2',
  17: 'BLENDING',
  20: 'EDITOR_LAYER_1',
  21: 'COLOR',
  22: 'COLOR_2',
  23: 'TARGET_COLOR',
  24: 'Z_LAYER',
  25: 'Z_ORDER',
  28: 'MOVE_X',
  29: 'MOVE_Y',
  30: 'EASING',
  31: 'TEXT',
  32: 'SCALING',
  34: 'GROUP_PARENT',
  35: 'OPACITY',
  36: 'ACTIVE_TRIGGER',
  41: 'HVS_ENABLED',
  42: 'COLOR_2_HVS_ENABLED',
  43: 'HVS',
  44: 'COLOR_2_HVS',
  45: 'FADE_IN',
  46: 'HOLD',
  47: 'FADE_OUT',
  48: 'PULSE_HSV',
  49: 'COPIED_COLOR_HVS',
  50: 'COPIED_COLOR_ID',
  51: 'TARGET',
  52: 'TARGET_TYPE',
  54: 'YELLOW_TELEPORTATION_PORTAL_DISTANCE',
  56: 'ACTIVATE_GROUP',
  57: 'GROUPS',
  58: 'LOCK_TO_PLAYER_X',
  59: 'LOCK_TO_PLAYER_Y',
  60: 'COPY_OPACITY',
  61: 'EDITOR_LAYER_2',
  62: 'SPAWN_TRIGGERED',
  63: 'SPAWN_DURATION',
  64: 'DONT_FADE',
  65: 'MAIN_ONLY',
  66: 'DETAIL_ONLY',
  67: 'DONT_ENTER',
  68: 'ROTATE_DEGREES',
  69: 'TIMES_360',
  70: 'LOCK_OBJECT_ROTATION',
  71: 'TARGET_POS',
  72: 'X_MOD',
  73: 'Y_MOD',
  75: 'STRENGTH',
  76: 'ANIMATION_ID',
  77: 'COUNT',
  78: 'SUBTRACT_COUNT',
  79: 'PICKUP_MODE',
  80: 'ITEM',
  696969: 'BLOCK_A', // using this as placeholder for ID 80
  81: 'HOLD_MODE',
  82: 'TOGGLE_MODE',
  84: 'INTERVAL',
  85: 'EASING_RATE',
  86: 'EXCLUSIVE',
  87: 'MULTI_TRIGGER',
  88: 'COMPARISON',
  89: 'DUAL_MODE',
  90: 'SPEED',
  91: 'DELAY',
  92: 'Y_OFFSET',
  93: 'ACTIVATE_ON_EXIT',
  94: 'DYNAMIC_BLOCK',
  95: 'BLOCK_B',
  96: 'GLOW_DISABLED',
  97: 'ROTATION_SPEED',
  98: 'DISABLE_ROTATION',
  100: 'USE_TARGET',
  101: 'TARGET_POS_AXES',
  102: 'EDITOR_DISABLE',
  103: 'HIGH_DETAIL',
  104: 'COUNT_MULTI_ACTIVATE',
  105: 'MAX_SPEED',
  106: 'RANDOMIZE_START',
  107: 'ANIMATION_SPEED',
  108: 'LINKED_GROUP',
};

let unavailable_g = 1;
let unavailable_c = 1;
let unavailable_b = 0;

let unknown_g = () => {
  unavailable_g++;
  return group(unavailable_g);
};

let unknown_c = () => {
  unavailable_c++;
  return color(unavailable_c);
};

let unknown_b = () => {
  unavailable_b++;
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

let trigger_function = (cb, autocall = true) => {
  let old_context = current_context;
  let context = create_context(crypto.randomUUID(), true);
  cb(context.group);
  set_context(old_context);
  return context.group;
};

let add_to_context = (obj) => {
  get_context().objects.push(obj);
};

let reverse = {};
for (var i in d) {
  reverse[d[i]] = i;
}

let levelstring_to_obj = (string) => {
  let objects = [];
  string
    .split(';')
    .slice(0, -1)
    .forEach((x) => {
      let r = {};
      let spl = x.split(',');
      spl.forEach((x, i) => {
        // 0, 2, 4, 8, etc..
        if (i % 2 == 0) {
          r[d[x]] = null;
        } else {
          if (x.includes('.')) x = x.split('.');
          if (typeof x == 'string' && !isNaN(parseInt(x))) x = parseInt(x);
          if (
            typeof x == 'object' &&
            !x.filter((e) => isNaN(parseInt(e))).length
          )
            x = x.map((e) => parseInt(e));
          if (typeof x == 'boolean') x = +x;
          r[d[spl[i - 1]]] = x;
        }
      });
      objects.push(r);
    });
  return objects;
};
let obj_to_levelstring = (l) => {
  let res = '';
  // { x: 15, Y: 10 };
  for (var d_ in l) {
    let val = l[d_];
    let key = reverse[d_];
    if (typeof val == 'boolean') val = +val;
    if (explicit[d_] && !val.value) {
      if (typeof val == 'object' && key == '57') {
        val = val.map((x) => x.value).join('.');
      } else {
        throw `Expected type "${
          explicit[d[parseInt(key)]]
        }", got "${typeof val}"`;
      }
    } else if (explicit[d_] && val.value) {
      if (val.type == explicit[d_]) {
        val = val.value;
      } else {
        throw `Expected type "${explicit[d_]}", got "${val.type}"`;
      }
    }
    if (key == '696969') {
      key = '80';
    }
    res += `${key},${val},`;
  }
  return res.slice(0, -1) + ';';
};
let arr_to_levelstring = (a) => {
  let str = '';
  a.forEach((x) => (str += obj_to_levelstring(x)));
  return str;
};

let encode_level = (level_string) => {
  let gzipped = zlib.gzipSync(level_string);
  let base64_encoded = gzipped.toString('base64url');
  return base64_encoded;
};

function decode_level(data) {
  const base64_decoded = Buffer.from(data, 'base64url');
  const decompressed = zlib.gunzipSync(base64_decoded);
  return decompressed.toString();
}

let resulting = '';

let add = (o) => {
  let newo = o;
  if (newo.with) delete newo.with;
  add_to_context(newo);
};

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
          object.GROUPS = context.group;
        } else {
          if (Array.isArray(object.GROUPS)) {
            object.GROUPS.push(context.group);
          } else {
            object.GROUPS = [object.GROUPS, context.group];
          }
        }

        object.SPAWN_TRIGGERED = 1;
        object.MULTI_TRIGGER = 1;
        // end
      }
    }
    for (let x in contexts[i].objects) {
      let r = obj_to_levelstring(contexts[i].objects[x]);
      resulting += r;
    }
  }
};

let getLevelString = (options = {}) => {
  prep_lvl();
  if (unavailable_g <= 999) {
    if (options.info) {
      console.log('Finished, result stats:');
      console.log('Object count:', resulting.split(';').length - 1);
      console.log('Group count:', unavailable_g);
    }
  } else {
    if (
      (options.hasOwnProperty('object_count_warning') &&
        options.object_count_warning == true) ||
      !options.hasOwnProperty('object_count_warning')
    )
      throw `Group count surpasses the limit! (${unavailable_g}/999)`;
  }
  return resulting;
};
let exportLevel = () => {
  prep_lvl();
  return encode_level(resulting);
};

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

let $ = {
  add,
  print: function () {
    console.log(...Array.from(arguments));
  },
  exportLevel,
  getLevelString,
  encode_level,
  decode_level,
  arr_to_levelstring,
  obj_to_levelstring,
  levelstring_to_obj,
  extend_trigger_func,
};

let move_trigger = (group, x, y) => {
  let origin = {
    OBJ_ID: 901,
    TARGET: group,
    MOVE_X: x * 3,
    MOVE_Y: y * 3,
  };
  origin.with = (a, b) => {
    origin[d[a]] = b;
    return origin;
  };
  return origin;
};

let color_trigger = (
  channel,
  r,
  g,
  b,
  duration = 0,
  opacity = 1,
  blending = false
) => {
  let origin = {
    OBJ_ID: 899,
    DURATION: duration,
    TRIGGER_RED: r,
    TRIGGER_GREEN: g,
    TRIGGER_BLUE: b,
    OPACITY: opacity,
    BLENDING: blending,
    TARGET_COLOR: channel,
  };
  origin.with = (a, b) => {
    origin[d[a]] = b;
    return origin;
  };
  return origin;
};

const range = (start, end, step) => {
  start > 0 ? start-- : null;
  end > 0 ? end-- : null;
  var range = [];
  var typeofStart = typeof start;
  var typeofEnd = typeof end;

  if (step === 0) {
    throw TypeError('Step cannot be zero.');
  }

  if (typeofStart == 'undefined' || typeofEnd == 'undefined') {
    throw TypeError('Must pass start and end arguments.');
  } else if (typeofStart != typeofEnd) {
    throw TypeError('Start and end arguments must be of same type.');
  }

  typeof step == 'undefined' && (step = 1);

  if (end < start) {
    step = -step;
  }

  if (typeofStart == 'number') {
    while (step > 0 ? end >= start : end <= start) {
      range.push(start);
      start += step;
    }
  } else if (typeofStart == 'string') {
    if (start.length != 1 || end.length != 1) {
      throw TypeError('Only strings with one character are supported.');
    }

    start = start.charCodeAt(0);
    end = end.charCodeAt(0);

    while (step > 0 ? end >= start : end <= start) {
      range.push(String.fromCharCode(start));
      start += step;
    }
  } else {
    throw TypeError('Only string and number types are supported');
  }

  return range;
};

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

let next_free = 0;

let counter = (num = 0, bits = 16) => {
  let id = next_free++;
  if (num > 0) {
    $.add({
      OBJ_ID: 1817,
      COUNT: num,
      ITEM: id,
    });
  }
  let exports = {
    item: id,
    bits,
    add: (amount) => {
      if (typeof amount == 'number') {
        $.add({
          OBJ_ID: 1817,
          COUNT: amount,
          ITEM: id,
        });
      } else if (typeof amount == 'object') {
        amount.copy_to(exports);
      }
    },
    subtract: (amount) => {
      if (typeof amount == 'number') {
        $.add({
          OBJ_ID: 1817,
          COUNT: -amount,
          ITEM: id,
        });
      } else if (typeof amount == 'object') {
        amount.copy_to(exports);
      }
    },
    display: (x, y) =>
      $.add({
        OBJ_ID: 1615,
        X: x,
        Y: y,
        ITEM: id,
        COLOR: color(1),
      }),
    if_is: (comparison, other, trig_func) => {
      $.add({
        OBJ_ID: 1811,
        TARGET: trig_func,
        COUNT: other,
        ACTIVATE_GROUP: true,
        COMPARISON: comparison,
        ITEM: id,
      });
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
    add_to: (item, factor = 1) => {
      /*
      let r = range(exports.bits, 0);
      for (let i in r) {
        let iw = r[i];
        x = 2 ** iw;

        let r2 = trigger_function(() => {
          exports.subtract(x);
          item.add(x * factor);
        });

        exports.if_is(LARGER_THAN, x, r2);
        exports.if_is(EQUAL_TO, x, r2);
      }*/
      while_loop(greater_than(exports, 0), () => {
        exports.subtract(1);
        item.add(1);
      });
    },
    copy_to: (item, factor = 1) => {
      // self = exports;
      temp_storage = counter(0, exports.bits);
      let r = range(exports.bits, 0);
      for (let i in r) {
        i = r[i];
        x = 2 ** i;
        let r2 = trigger_function(() => {
          exports.subtract(x);
          temp_storage.add(x);
          item.add(x * factor);
        });

        exports.if_is(LARGER_THAN, x, r2);
        exports.if_is(EQUAL_TO, x, r2);
      }
      temp_storage.add_to(exports);

      /*let temp = counter(0);
      while_loop(item, EQUAL_TO);
      */
    },
    clone: () => {
      let n_counter = counter(0, exports.bits);
      exports.copy_to(n_counter);
      return n_counter;
    },
    subtract_from: (b) => {
      // basically (a - b) then reset b to zero
      /*
        a = counter(100)
        b = counter(70)
        wait(1)
        b.subtract_from(a)
        // a is now 30, b is now 0
        */

      let a = exports;
      while_loop(greater_than(a, 0), () => {
        a.subtract(1);
        b.subtract(1);
      });
    },
    compare: (other, cb) => {
      comp = counter(0, Math.max(exports.bits, other.bits));
      exports.copy_to(comp);
      other.copy_to(comp, -1);

      exports.if_is(
        SMALLER_THAN,
        0,
        trigger_function(() => {
          cb(-1);
        })
      );
      exports.if_is(
        EQUAL_TO,
        0,
        trigger_function(() => {
          cb(0);
        })
      );
      exports.if_is(
        LARGER_THAN,
        0,
        trigger_function(() => {
          cb(1);
        })
      );
    },
    reset: () => {
      while_loop(greater_than(exports, 0), () => {
        exports.subtract(1);
      });
    },
    multiply: (factor) => {
      if (typeof factor == 'number') {
        temp = counter(0, exports.bits);
        exports.add_to(temp, factor);
        temp.add_to(exports);
      } else if (typeof factor == 'object') {
        let tmp = exports.clone(); // clones current counter
        while_loop(factor, LARGER_THAN, 1, () => {
          tmp.copy_to(exports); // adds clone to current counter (basically adding again)
          factor.subtract(1); // subtract cloned factor
        });
      }
    },
    multiply_neg: (factor) => {
      if (typeof factor == 'number') {
        temp = counter(0, exports.bits);
        exports.add_to(temp, factor);
        temp.add_to(exports);
      } else if (typeof factor == 'object') {
        factor = factor.clone();
        while_loop(factor, SMALLER_THAN, -1, () => {
          let tmp = exports.clone();
          tmp.add_to(exports);
          factor.add(1);
        });
      }
    },
  };
  return exports;
};

let toggle_on_trigger = (group) => {
  return {
    OBJ_ID: 1049,
    TARGET: group,
    ACTIVATE_GROUP: true,
  };
};

let toggle_off_trigger = (group) => {
  return {
    OBJ_ID: 1049,
    TARGET: group,
    ACTIVATE_GROUP: false,
  };
};

let on = (event, callback) => {
  event.event(callback);
};

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

let x_position = (position) => {
  return {
    event: (t) => $.add(spawn_trigger(t).with(X, position).with(Y, 2145)),
  };
};

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

let greater_than = (count, other) => ({
  count,
  comparison: LARGER_THAN,
  other,
});

let equal_to = (count, other) => ({ count, comparison: EQUAL_TO, other });
let less_than = (count, other) => ({ count, comparison: SMALLER_THAN, other });

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

let hide_player = () => {
  $.add({
    OBJ_ID: 1612,
  });
};

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
  EQUAL_TO: 0,
  LARGER_THAN: 1,
  SMALLER_THAN: 2,
  $,
  counter,
  spawn_trigger,
  color_trigger,
  move_trigger,
  trigger_function,
  on,
  touch,
  touch_end,
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
  hide_player,
  gamescene,
  rgb: (r, g, b) => [r, g, b],
};

extract(exps);
