const zlib = require('zlib');
const crypto = require('crypto');

let explicit = {};

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
        eval(`class $${clas} {
      constructor(a) {
        this.value = a;
        this.type = '${clas}';
      }
	  call(delay = 0.05) {
		  $.add(spawn_trigger(this, delay))
	  }
    }
    global['${clas}'] = (x) => new $${clas}(x)`);
    });
};
writeClasses(['group/TARGET/GROUPS', 'color/TARGET_COLOR']);

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

let contexts = {
    global: {
        name: "global",
        group: group(0),
        objects: []
    },
};

let unavailable = 1;

let unknown_g = () => {
    unavailable++;
    return unavailable;
};

let current_context = 'global';
let set_context = (name) => {
    current_context = name;
}
let get_context = () => {
    return contexts[current_context];
};

let create_context = (name, set_to_default = false) => {
    contexts[name] = {
        name,
        group: group(unknown_g()),
        objects: []
    };
	last_contexts[name] = name;
    if (set_to_default) set_context(name);
    return contexts[name];
};

let trigger_function = (cb) => {
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
        if (typeof val == 'boolean') val = +val
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
    for (let i in contexts) {
        if (i !== 'global') {
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
            }
            // end
        }
        for (let x in contexts[i].objects) {
            let r = obj_to_levelstring(contexts[i].objects[x]);
            resulting += r;
        }
    }
};

let getLevelString = () => {
    prep_lvl();
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
};
for (var x in easings) global[x] = easings[x];
global.obj_props = reverse;

let last_contexts = {};

let extend_trigger_func = (t, cb) => {
		for (let i in contexts) {
			i = contexts[i];
			if (i.group == t) {
				let o = current_context;
				console.log(last_contexts);
				set_context(last_contexts[i.name]);
				cb(i.group);
				set_context(o);
			}
		}
}

let $ = {
    add,
    print: function() {
        console.log(...Array.from(arguments));
    },
    exportLevel,
    getLevelString,
    encode_level,
    decode_level,
    arr_to_levelstring,
    obj_to_levelstring,
    levelstring_to_obj,
	extend_trigger_func
};

/*
move_trigger: #[desc("Returns a move trigger as an object"), example("$.add( move_trigger(1g,10,0).with(obj_props.X,600) ) // Creates a move trigger at X 600 that moves group 1 a block to the right")]
    (
        #[desc("Group to move")] group: @group,
        #[desc("Units to move on the X axis")] x: @number,
        #[desc("Units to move on the Y axis")] y: @number,
        #[desc("Duration of movement")] duration: @number = 0,
        easing: @easing_type = NONE,
        easing_rate: @number = 2
    ) -> @object {
        return obj{
            OBJ_ID: 901,
            TARGET: group,
            MOVE_X: x * 3,
            MOVE_Y: y * 3,
            DURATION: duration,
            EASING: easing,
            EASING_RATE: easing_rate,
        }
    },
*/

let move_trigger = (group, x, y) => {
    let origin = {
        OBJ_ID: 901,
        TARGET: group,
        MOVE_X: x * 3,
        MOVE_Y: y * 3
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

let global_vars = {
    EQUAL_TO: 0,
    LARGER_THAN: 1,
    SMALLER_THAN: 2
};
for (let i in global_vars) {
    global[i] = global_vars[i];
}

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
	if (!context.wait_lst_unset) {
		last_contexts[o] = context.name;
		context.wait_lst_unset = true;
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
            if (typeof amount == "number") {
                $.add({
                    OBJ_ID: 1817,
                    COUNT: amount,
                    ITEM: id,
                });
            } else if (typeof amount == "object") {
                amount.copy_to(exports);
            }
        },
        subtract: (amount) => {
            if (typeof amount == "number") {
                $.add({
                    OBJ_ID: 1817,
                    COUNT: -amount,
                    ITEM: id,
                });
            } else if (typeof amount == "object") {
                amount.copy_to(exports);
            }
        },
        display: (x, y) =>
            $.add({
                OBJ_ID: 1615,
                X: x,
                Y: y,
                ITEM: id,
                COLOR: 1,
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
                let id = crypto.randomUUID();
                let context = create_context(id, true);
                cb(i);
                set_context(old_ctx);
                exports.if_is(EQUAL_TO, i, context.group);
            }
        },
        add_to: (item, factor = 1) => {
            let r = range(exports.bits, 0);
            for (let i in r) {
                let iw = r[i];
                x = 2 ** iw

                let r2 = trigger_function(() => {
                    exports.subtract(x)
                    item.add(x * factor)
                })

                exports.if_is(LARGER_THAN, x, r2)
                exports.if_is(EQUAL_TO, x, r2)
            }
        },
        copy_to: (item, factor = 1) => {
            // self = exports;
            temp_storage = counter(0, exports.bits);
            let r = range(exports.bits, 0);
            for (let i in r) {
                i = r[i];
                x = 2 ** i
                let r2 = trigger_function(() => {
                    exports.subtract(x)
                    temp_storage.add(x)
                    item.add(x * factor)
                })

                exports.if_is(LARGER_THAN, x, r2)
                exports.if_is(EQUAL_TO, x, r2)
            }
            temp_storage.add_to(exports)
        },
        clone: () => {
            let n_counter = counter(0, exports.bits);
            exports.copy_to(n_counter)
            return n_counter
        },
        compare: (other, cb) => {
            comp = counter(Math.max(exports.bits, other.bits))
            comp.add(exports)
            other.subtract(other)

            comp.if_is(LARGER_THAN, 0, trigger_function(() => {
                cb(1);
            }))

            comp.if_is(EQUAL_TO, 0, trigger_function(() => {
                cb(0);
            }))

            comp.if_is(SMALLER_THAN, 0, trigger_function(() => {
                cb(-1);
            }))
        },
        reset: () => {
            let bits = [512, 256, 128, 64, 32, 16, 8, 4, 2, 1];
            for (let i in bits) {
                i = bits[i];
                let t = trigger_function(() => exports.subtract(i));
                exports.if_is(LARGER_THAN, i, t);
            }

            exports.subtract(1);
        }
    };
    return exports;
};

let on = (event, callback) => {
    event.event(callback);
};

let extract = (x) => {
	for (let i in x) {
		global[i] = x[i];
	}
}

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

String.prototype.to_obj = function () {
    let or = {
        OBJ_ID: 914,
        TEXT: btoa(this),
        with: (prop, val) => {
            or[d[prop]] = val;
			return or;
        }
    }
    return or;
};


let while_loop = (count, comparison, other, trig_fn) => {
	$.extend_trigger_func(trig_fn, (g) => {
		count.if_is(comparison, other, trigger_function(() => trig_fn.call()))
	})
	trig_fn.call()
}

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


let exps = {
    $,
    counter,
    spawn_trigger,
    color_trigger,
    move_trigger,
    trigger_function,
    on,
    touch,
    touch_end,
    wait,
    range,
    get_context,
	extract,
	while_loop
};

for (let i in exps) {
    global[i] = exps[i];
}
