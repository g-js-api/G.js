const WebSocket = require('ws');
const LevelReader = require('./reader');
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
      explicit[expl] = clas;
    });

    if (clas == 'group') {
      eval(`class $${clas} {
        constructor(a, specific = true) {
          this.value = a;
          this.type = '${clas}';
		  if (specific) all_known.groups.push(a);
        }
		remap(...mps) {
			mps = mps.map(x => (x[0].value ? x[0].value : x[0]) + '.' + (x[1].value ? x[1].value : x[1])).join('.');
			this.remaps = mps;
			return this;
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
              if (delay_trig && duration !== 0) wait(duration);
        }
        call(delay = 0) {
		  let tr = spawn_trigger(this, delay);
		  if (this.remaps) tr.REMAPS = this.remaps;
          $.add(tr);
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
	  
	  stop() {
		  $.add({
				OBJ_ID: 1616,
				TARGET: this,
		  });
	  }
	  
	  toggle_on() {
		$.add({
            OBJ_ID: 1049,
            TARGET: this,
            ACTIVATE_GROUP: true,
        });
	  }
	  
	  toggle_off() {
		$.add({
            OBJ_ID: 1049,
            TARGET: this,
            ACTIVATE_GROUP: false,
        });
	  }
	
	rotate(center, degrees, duration = 0, easing = NONE, easing_rate = 2, lock_object_rotation = false) {
		$.add({
            OBJ_ID: 1346,
            TARGET: this,
            CENTER: center,
            ROTATE_DEGREES: degrees,
            DURATION: duration,
            EASING: easing.id,
            EASING_RATE: easing_rate,
            LOCK_OBJECT_ROTATION: lock_object_rotation
        });
        if (duration) wait(duration);
	}
	
	follow(other, x_mod = 1, y_mod = 1, duration = 999) {
		 $.add({
            OBJ_ID: 1347,
            X_MOD: x_mod,
            Y_MOD: y_mod,
            DURATION: duration,
            TARGET: this,
            FOLLOW: other,
        });
	}
	
	follow_lerp(groupA, groupB, weight = 0.5, duration = 999) {
		this.follow(groupA, 1 - weight, 1 - weight, duration);
	}
	
    follow_player_y(speed = 1, delay = 0, offset = 0, max_speed = 0, duration = 999) {
        $.add({
            OBJ_ID: 1814,
            SPEED: speed,
            DELAY: delay,
            Y_OFFSET: offset,
            MAX_SPEED: max_speed,
            TARGET: this,
            DURATION: duration,
        })
    }
	
	move_to(target, duration = 0, x_only = false, y_only = false, easing = NONE, easing_rate = 2) {
		 $.add({
            OBJ_ID: 901,
            TARGET: this,
            USE_TARGET: true,

            TARGET_POS_AXES: x_only && y_only ? 0 : (x_only ? 1 : (y_only ? 2 : 0)),
            TARGET_POS: target,

            DURATION: duration,
            EASING: easing,
            EASING_RATE: easing_rate,
        })
        wait(duration);
	}
	
	move_to_xy(x = null, y = null, duration = 0, easing = NONE, easing_rate = 2) {
		if (!x && !y) throw new Error("At least one coordinate must be specified!");
		let target = unknown_g();
		$.add({
            OBJ_ID: 1765,
            X: x ? x : 0,
            Y: y ? y : 0,
            GROUPS: target,
        });
		$.add({
            OBJ_ID: 1007,
			X: 0,
			Y: 75 * 30,
            TARGET: target,
            OPACITY: 0,
            DURATION: 0,
        });
	}
	
	pulse_hsv(h, s, b, s_checked = false, b_checked = false, fade_in = 0, hold = 0, fade_out = 0, exclusive = false) {
		$.add({
            OBJ_ID: 1006,
            COPIED_COLOR_HVS: [h, s, b, +s_checked, +b_checked].join("a"), 
            EXCLUSIVE: exclusive,
            FADE_IN: fade_in,
            HOLD: hold,
            FADE_OUT: fade_out,
            TARGET: this,
            PULSE_HSV: true,
            TARGET_TYPE: 1,
        });
        wait(fade_in + hold + fade_out);
	}
	
	pulse(c, fade_in = 0, hold = 0, fade_out = 0, exclusive = false) {
		 $.add({
            OBJ_ID: 1006,
            TRIGGER_RED: c[0],
            TRIGGER_GREEN: c[1],
            TRIGGER_BLUE: c[2],
            EXCLUSIVE: exclusive,
            FADE_IN: fade_in,
            HOLD: hold,
            FADE_OUT: fade_out,
            TARGET: this,
            PULSE_HSV: false,
            TARGET_TYPE: 1,
        })
        wait(fade_in + hold + fade_out)
	}

      }
      global['${clas}'] = (x) => new $${clas}(x)`);
    } else if (clas == 'color') {
      eval(`class $${clas} {
      constructor(a, specific = true) {
        this.value = a;
        this.type = '${clas}';
		if (specific) all_known.colors.push(a);
      }
      set(c, duration = 0, blending = false, delay_trig = true) {
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
        if (delay_trig && duration !== 0) wait(duration);
      }
	  copy(c, duration = 0, hvs = "0a1a1a0a0a", blending = false, opacity = 1, copy_opacity = false) {
		$.add({
            OBJ_ID: 899,
            DURATION: duration,
            COPIED_COLOR_ID: c,
            COPIED_COLOR_HVS: hvs,
            COPY_OPACITY: copy_opacity,
            OPACITY: opacity,
            BLENDING: blending,
            TARGET_COLOR: this,
            36: 1,
        })
        if (duration) wait(duration);
	  }
		pulse_hsv(h, s, b, s_checked = false, b_checked = false, fade_in = 0, hold = 0, fade_out = 0, exclusive = false) {
			$.add({
				OBJ_ID: 1006,
				COPIED_COLOR_HVS: [h, s, b, +s_checked, +b_checked].join("a"), 
				EXCLUSIVE: exclusive,
				FADE_IN: fade_in,
				HOLD: hold,
				FADE_OUT: fade_out,
				TARGET: this,
				PULSE_HSV: true,
			});
			wait(fade_in + hold + fade_out);
		}
		
		pulse(c, fade_in = 0, hold = 0, fade_out = 0, exclusive = false) {
			 $.add({
				OBJ_ID: 1006,
				TRIGGER_RED: c[0],
				TRIGGER_GREEN: c[1],
				TRIGGER_BLUE: c[2],
				EXCLUSIVE: exclusive,
				FADE_IN: fade_in,
				HOLD: hold,
				FADE_OUT: fade_out,
				TARGET: this,
				PULSE_HSV: false,
			})
			wait(fade_in + hold + fade_out)
		}
    }
    global['${clas}'] = (x) => new $${clas}(x)`);
    } else if (clas == 'block') {
      eval(`class $${clas} {
      constructor(a, specific = true) {
        this.value = a;
        this.type = '${clas}';
		if (specific) all_known.blocks.push(a);
      }
	  if_colliding(b2, true_id, false_id) {
		  // todo: P1, P2, PP
		  let j = {
			  OBJ_ID: 3609,
			  BLOCK_A: this,
			  BLOCK_B: b2
		  };
		  if (true_id) j.TRUE_ID = true_id;
		  if (false_id) j.FALSE_ID = false_id;
		  $.add(j);
	  }
    }
    global['${clas}'] = (x) => new $${clas}(x)`);
    }
  });
};

writeClasses([
  'group/TARGET/GROUPS/GR_BL/GR_BR/GR_TL/GR_TR/TRUE_ID/FALSE_ID/ANIMATION_GID/TARGET_POS',
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
	237894: 'CHANCE',
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
	6969: "ITEM_TARGET",
	32984398: "TRUE_ID",
	8754: "GROUP_ID_1",
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
	8459: "GROUP_ID_2",
	584932: "FALSE_ID",
    72: 'X_MOD',
    73: 'Y_MOD',
    75: 'STRENGTH',
    76: 'ANIMATION_GID',
    77: 'COUNT',
    78: 'SUBTRACT_COUNT',
    79: 'PICKUP_MODE',
    80: 'ITEM',
    696969: 'BLOCK_A', // using this as placeholder for ID 80
	420420: 'ITEM_ID_1',
    81: 'HOLD_MODE',
    82: 'TOGGLE_MODE',
    84: 'INTERVAL',
    85: 'EASING_RATE',
    86: 'EXCLUSIVE',
    87: 'MULTI_TRIGGER',
    88: 'COMPARISON',
	42069420: 'MULT_DIV',
    89: 'DUAL_MODE',
    90: 'SPEED',
    91: 'DELAY',
    92: 'Y_OFFSET',
    93: 'ACTIVATE_ON_EXIT',
    94: 'DYNAMIC_BLOCK',
    95: 'BLOCK_B',
	6942069: 'ITEM_ID_2',
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
    109: "CAMERA_ZOOM",
	110: "EXIT_STATIC",
    111: "FREE_MODE",
    112: "EDIT_FREE_CAM_SETTINGS",
    113: "FREE_CAM_EASING",
    114: "FREE_CAM_PADDING",
	115: "ORD",
    118: "REVERSED",
    119: "SONG_START",
    120: "TIMEWARP_TIME_MOD",
    128: "SCALE_X",
    129: "SCALE_Y",
    131: "PERSPECTIVE_X",
    132: "PERSPECTIVE_Y",
    133: "ONLY_MOVE",
    138: "PLAYER_1",
    139: "OVERRIDE_COUNT",
    141: "FOLLOW_CAMERA_X",
    142: "FOLLOW_CAMERA_Y",
    143: "FOLLOW_CAMERA_X_MOD",
    144: "FOLLOW_CAMERA_Y_MOD",
    148: "GRAVITY",
    150: "SCALE_X_BY",
    151: "SCALE_Y_BY",
    152: "ADV_RAND_STRING",
    153: "DIV_BY_X",
    154: "DIV_BY_Y",
    159: "STREAK_ADDITIVE",
    160: "UNLINK_DUAL_GRAVITY",
    161: "HIDE_GROUND",
    162: "HIDE_P1",
    163: "HIDE_P2",
    164: "CAMERA_EDGE",
	165: "DISABLE_CONTROLS_P1",
    169: "KEEP_VELOCITY",
    171: "CHANGE_CHANNEL",
	174: "GR_BLENDING",
    195: "HIDE_MG",
    198: "PLAYER_ONLY",
    199: "DISABLE_CONTROLS_P2",
    200: "PLAYER_2",
    201: "_PT",
    202: "GR_LAYER",
    203: "GR_BL",
    204: "GR_BR",
    205: "GR_TL",
    206: "GR_TR",
    207: "GR_VERTEX_MODE",
    208: "GR_DISABLE",
    209: "GR_ID",
    212: "FOLLOW_GROUP",
    213: "FOLLOW_EASING",
    215: "FOLLOW_P1",
    216: "FOLLOW_P2",
    274: "P_GROUPS",
    370: "DISABLE_GRID_SNAP",
	373: "ANIM_ID",
	374: "ORDER_INDEX",
	376: "CLOSE_LOOP",
	378: "CURVE",
	389: "SECONDS_ONLY",
	392: "SONG_ID",
	45893: "SFX_ID",
	399: "PREP",
	400: "LOAD_PREP",
	404: "SONG_SPEED",
	405: "SONG_PITCH",
	406: "SONG_VOLUME",
	407: "SONG_REVERB",
	408: "SONG_START",
	409: "SONG_FADE_IN",
	410: "SONG_END",
	411: "SONG_FADE_OUT",
	412: "FFT",
	413: "SONG_LOOP",
	414: "STOP_LOOP",
	415: "IS_UNIQUE",
	416: "UNIQUE_ID",
	417: "SONG_STOP",
	418: "CHANGE_VOLUME",
	419: "CHANGE_SPEED",
	420: "OVERRIDE",
	421: "VOL_NEAR",
	422: "VOL_MED",
	423: "VOL_FAR",
	424: "MIN_DIST",
	425: "DIST_2",
	426: "DIST_3",
	428: "CAM",
	432: "SONG_CHANNEL",
	433: "SFX_PRELOAD",
	434: "MIN_INTERVAL",
	435: "SEQUENCE",
	436: "MODE",
	437: "MIN_INT",
	438: "RESET",
	439: "RESET_FULL_STEP",
	453: "SMOOTH_VELOCITY",
	454: "SMOOTH_VELOCITY_MODIFIER",
	455: "SFX_GROUP",
	458: "VOLUME_DIRECTION",
	465: "EXIT_INSTANT",
	466: "TIME_COUNTER",
	467: "START_TIME",
	468: "DONT_OVERRIDE",
	469: "IGNORE_TIMEWARP",
	470: "TIMER_TIME_MOD",
	471: "START_PAUSED",
	472: "START_STOP",
	473: "STOP_TIME",
	474: "STOP_CHECKED",
	476: "TYPE_1",
	477: "TYPE_2",
	478: "TARGET_TYPE",
	479: "MOD",
	480: "ASSIGN_OP",
	78534: "COMP_OP_1",
	481: "OP_1",
	45389: "COMP_OP_2",
	482: "OP_2",
	93289: "COMP_OP",
	483: "MOD_2",
	484: "TOL",
	485: "RFC_1",
	486: "RFC_2",
	489: "IGNORE_VOLUME+TEST",
	490: "SOUND_DURATION",
	491: "PERSISTENT",
	442: "REMAPS",
	456: "PREVIEW_OPACITY",
	502: "REVERB_TYPE",
	503: "REVERB_ENABLE",
	520: "TIME_MOD",
	521: "POSITION_X_MOD",
	522: "ROTATION_MOD",
	523: "SCALE_X_MOD",
	524: "LINE_OPACITY",
	532: "HIDE_ATTEMPTS",
	545: "POSITION_Y_MOD",
	546: "SCALE_Y_MOD",
	573: "EDIT_RESPAWN_TIME",
	574: "RESPAWN_TIME",
	575: "AUDIO_ON_DEATH",
	576: "NO_DEATH_SFX",
	578: "ABSNEG_1",
	579: "ABSNEG_2",
};
let [ unavailable_g, unavailable_c, unavailable_b ] = [0, 0, 0];

let get_new = (n, prop) => {
	if (all_known[prop].indexOf(n) == -1) return n;
	let cond = true;
	while (cond) {
		cond = all_known[prop].indexOf(n) != -1;
		n++;
	}
	return n;
};

let unknown_g = () => {
  // todo: make this not use group 0
  unavailable_g++;
  unavailable_g = get_new(unavailable_g, 'groups');
  return group(unavailable_g);
};

let unknown_c = () => {
  unavailable_c++;
  unavailable_c = get_new(unavailable_c, 'colors');
  return color(unavailable_c);
};

let unknown_b = () => {
  unavailable_b++;
  unavailable_b = get_new(unavailable_c++, 'blocks');
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
	45893: '392',
	237894: '10',
}

let camera_offset = (x, y, duration = 0, easing = NONE) => {
	$.add({
		OBJ_ID: 1916,
		155: 1,
		MOVE_X: x * 3,
		MOVE_Y: y * 3,
		ACTIVE_TRIGGER: true,
		DURATION: duration,
		EASING_RATE: easing
	});
	if (duration) wait(duration);
};

let camera_static = (gr, duration = 0.5, easing = NONE, exit_instant = false, exit_static = false, smooth_vel = false, smooth_vel_mod = 0, follow = false, x_only = false, y_only = false) => {
	if (x_only && y_only) throw new Error("Only one of the x_only or y_only arguments must be true, but both values are true!");
	let axisval = !x_only && !y_only ? 0 : (x_only ? 1 : 2);
	$.add({
		OBJ_ID: 1914,
		155: 1,
		DURATION: duration,
		TARGET_POS_AXES: axisval,
		ACTIVE_OBJECT: true,
		TARGET_POS: gr,
		FOLLOW_GROUP: follow,
		EASING: easing,
		SMOOTH_VELOCITY: smooth_vel,
		SMOOTH_VELOCITY_MODIFIER: smooth_vel_mod,
		EXIT_INSTANT: exit_instant,
		EXIT_STATIC: exit_static
	});
	if (duration) wait(duration);
};
let song = (song_id, loop = false, preload = true, channel = 0, volume = 1, speed = 0, start = 0, end = 0, fadein = 0, fadeout = 0) => {
	if (preload) {
		let m_obj = {
			OBJ_ID: 1934,
			SONG_ID: song_id,
			SONG_CHANNEL: channel,
			SONG_VOLUME: volume,
			SONG_SPEED: speed,
			SONG_START: start,
			SONG_END: end,
			SONG_FADE_IN: fadein,
			SONG_FADE_OUT: fadeout,
			SONG_LOOP: loop,
			PREP: true
		};
		$.add(m_obj);
		let al_load = false;
		let exp = {
			start: () => {
				if (al_load) $.add(m_obj);
				$.add({
					OBJ_ID: 1934,
					SONG_CHANNEL: channel,
					LOAD_PREP: true
				});
				if (!al_load) al_load = true;
			},
			edit: (new_volume = volume, new_speed = speed, duration = 0.5, stop = false, stop_loop = false, gid_1 = group(0), gid_2 = group(0), vol_near = 1, vol_med = 0.5, vol_far = 0, min_dist = 0, dist_2 = 0, dist_3 = 0, p1 = false, p2 = false, cam = false, vol_dir = 0) => {
				// SONG_CHANNEL, 138 (P1), 200 (P2),
				// SONG_SPEED (404) int, SONG_VOLUME (406) int, SONG_STOP (417) bool, STOP_LOOP (414) bool, CHANGE_SPEED (419) bool, CHANGE_VOLUME (418) bool, GROUP ID 1 (51) int, GROUP ID 2 (71) int, VOL_NEAR (421), VOL_MED (422), VOL_FAR (423) int, MIN_DIST (424) int, DIST_2 (425) int, DIST_3 (426) int, 
				// CAM (428) bool, VOLUME_DIRECTION (458) int[0-6]
				$.add({
					OBJ_ID: 3605,
					SONG_CHANNEL: channel,
					SONG_SPEED: new_speed,
					SONG_VOLUME: new_volume,
					SONG_STOP: stop,
					STOP_LOOP: stop_loop,
					CHANGE_SPEED: new_speed !== speed,
					CHANGE_VOLUME: new_volume !== volume,
					GROUP_ID_1: gid_1,
					GROUP_ID_2: gid_2,
					VOL_NEAR: vol_near,
					VOL_MED: vol_med,
					VOL_FAR: vol_far,
					MIN_DIST: min_dist,
					DIST_2: dist_2,
					DIST_3: dist_3,
					P1: p1,
					P2: p2,
					CAM: cam,
					VOLUME_DIRECTION: vol_dir
				});
			},
			stop: () => {
				exp.edit(volume, speed, 0.5, true, true);
				// loop ? false : true, loop ? true : false
			}
		};
		return exp;
	}
	$.add({
		OBJ_ID: 1934,
		SONG_ID: song_id,
		SONG_CHANNEL: channel,
		SONG_VOLUME: volume,
		SONG_SPEED: speed,
		SONG_START: start,
		SONG_END: end,
		SONG_FADE_IN: fadein,
		SONG_FADE_OUT: fadeout,
		SONG_LOOP: loop
	});
}
let teleport = (g) => {
	if (g?.length) {
		$.add({
			OBJ_ID: 3022,
			X: g[0],
			Y: g[1],
			155: 1,
			13: 1,
			ACTIVE_TRIGGER: 1,
			350: 1
		});
		return;
	}
	$.add({
		OBJ_ID: 3022,
		155: 1,
		13: 1,
		ACTIVE_TRIGGER: 1,
		TARGET: g,
		350: 1
	});
};

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
	if (!isNaN(parseInt(d_))) key = d_
    if (typeof val == 'boolean') val = +val;
	// if (d_ == "GR_LAYER") console.log(val, key)
    if (explicit[d_] && !val.hasOwnProperty('value')) { // if type is explicitly required for current object property and it is not a group/color/block
      if (typeof val == 'object' && dot_separated_keys.includes(key)) { // if val is an array and it is dot separated
        val = val.map((x) => x.value).filter(x => x && x != '').join('.');
      } else {
		  console.log(val)
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
    if (mappings.hasOwnProperty(key)) {
      key = mappings[key];
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
          object.GROUPS = [ context.group, group(remove_group) ];
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
      (options.hasOwnProperty('object_count_warning') &&
        options.object_count_warning == true) ||
      !options.hasOwnProperty('object_count_warning')
    )
      throw new Error(`Group count surpasses the limit! (${unavailable_g}/${limit})`);
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
	const level = await new LevelReader(options.level_name);
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
      (options.hasOwnProperty('object_count_warning') &&
        options.object_count_warning == true) ||
      !options.hasOwnProperty('object_count_warning')
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
  exportToSavefile,
  liveEditor,
  trigger_fn_context: () => get_context().group,
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

let next_free = 1;
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

let item_edit = (item1, item2, target, type1 = NONE, type2 = NONE, targ_type = NONE, assign_op = EQ, op1 = ADD, op2 = MUL, mod = 1, absn1 = NONE, absn2 = NONE, rfc1 = NONE, rfc2 = NONE) => {
	let or = {
		OBJ_ID: 3619,
		ITEM_ID_1: item1,
		ITEM_ID_2: item2,
		ITEM_TARGET: target,
		TYPE_1: type1,
		TYPE_2: type2,
		TARGET_TYPE: targ_type,
		ASSIGN_OP: assign_op,
		OP_1: op1,
		OP_2: op2,
		MOD: mod,
		ABSNEG_1: absn1,
		ABSNEG_2: absn2,
		RFC_1: rfc1,
		RFC_2: rfc2,
		with: (prop, val) => {
		  or[d[prop]] = val;
		  return or;
		},
	};
	return or;
}

let item_comp = (item_1, item_2, type_1, type_2, compare_op, truei = group(0), falsei = group(0), mod_1 = 1, mod_2 = 1, tol = 0, op_1 = MUL, op_2 = MUL, absneg_1 = NONE, absneg_2 = NONE, rfc_1 = NONE, rfc_2 = NONE) => {
	let or = {
		OBJ_ID: 3620,
		ITEM_ID_1: item_1,
		ITEM_ID_2: item_2,
		MOD: mod_1,
		MOD_2: mod_2,
		TYPE_1: type_1,
		TYPE_2: type_2,
		COMP_OP: compare_op,
		TRUE_ID: truei,
		FALSE_ID: falsei,
		TOL: tol,
		COMP_OP_1: op_1,
		COMP_OP_2: op_2,
		ABSNEG_1: absneg_1,
		ABSNEG_2: absneg_2,
		RFC_1: rfc_1,
		RFC_2: rfc_2,
		with: (prop, val) => {
		  or[d[prop]] = val;
		  return or;
		},
	};
	return or;
}

let counter = (num = 0, use_id = false, persistent = false, timer = false) => {
  let id = use_id ? num : next_free++;
  if (num > 0 && !use_id) {
	if (!persistent) {
		$.add({
		  OBJ_ID: 1817,
		  COUNT: num,
		  ITEM: id,
		});
	}
  }
  if (persistent) {
	  $.add({
		  OBJ_ID: 3641,
		  PERSISTENT: true,
		  ITEM: id
	  });
  };
  let exports = {
    item: id,
	type: timer ? TIMER : ITEM,
    add: (amount) => {
      if (typeof amount == 'number') {
        $.add({
          OBJ_ID: 1817,
          COUNT: amount,
          ITEM: id,
        });
      } else if (typeof amount == 'object') {
        $.add(item_edit(id, amount.item, id, exports.type, amount.type, exports.type, EQ, ADD));
      }
    },
	set: (amount) => {
		if (typeof amount == 'number') {
			 $.add({
			  OBJ_ID: 1817,
			  COUNT: amount,
			  OVERRIDE_COUNT: true,
			  ITEM: id,
			});
		} else if (typeof amount == 'object') {
			exports.reset();
			$.add(item_edit(id, amount.item, id, exports.type, amount.type, exports.type, EQ, ADD));
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
        $.add(item_edit(id, amount.item, id, exports.type, amount.type, exports.type, EQ, SUB));
      }
    },
	multiply: (amount) => {
      if (typeof amount == 'number') {
        $.add({
          OBJ_ID: 1817,
          COUNT: amount,
		  MULT_DIV: 2,
          ITEM: id,
        });
      } else if (typeof amount == 'object') {
        $.add(item_edit(id, amount.item, id, exports.type, amount.type, exports.type, EQ, MUL));
      }
    },
	divide: (amount) => {
      if (typeof amount == 'number') {
        $.add({
          OBJ_ID: 1817,
          COUNT: amount,
		  MULT_DIV: 1,
          ITEM: id,
        });
      } else if (typeof amount == 'object') {
        $.add(item_edit(id, amount.item, id, exports.type, amount.type, exports.type, EQ, DIV));
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
	to_obj: () => {
		let or = {
			OBJ_ID: 1615,
			ITEM: id,
			COLOR: color(1),
			with: (prop, val) => {
			  or[d[prop]] = val;
			  return or;
			},
		};
		return or;
	},
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
      item.add(exports);
	  exports.reset();
    },
    copy_to: (item, factor = 1) => {
      $.add(item_edit(id, 0, item.item, exports.type, NONE, item.type, EQ, ADD));
    },
    clone: () => {
      let n_counter = counter(0);
      exports.copy_to(n_counter);
      return n_counter;
    },
    subtract_from: (b) => {
      // basically (a - b) then reset b to zero
      $.add(item_edit(id, b.item, id, exports.type, b.type, exports.type, EQ, SUB));
	  b.reset();
    },
    reset: () => {
      exports.set(0);
    },
  };
  if (persistent) {
		let tfr = trigger_function(() => {
			$.add({
			  OBJ_ID: 1817,
			  COUNT: num,
			  OVERRIDE_COUNT: true,
			  ITEM: id,
			});
		});
		exports.if_is(EQUAL_TO, 0, tfr);
	}
  return exports;
};

let timer = (start_seconds, end_seconds = 0, target_id = group(0), backwards = false, seconds_only = false, stop = true, time_mod = 1, ignore_timewarp = false, no_override = false) => {
	 // START_IME, STOP_TIME, STOP_CHECKED, ITEM, TARGET, TIME_MOD, IGNORE_TIMEWARP, START_PAUSED, DONT_OVERRIDE
	let c_item = counter(0, false, false, true);
	let o = {
		OBJ_ID: 3614,
		START_TIME: start_seconds,
		STOP_TIME: end_seconds,
		STOP_CHECKED: stop,
		ITEM: c_item.item,
		TARGET: target_id,
		TIMER_TIME_MOD: backwards ? -1 : time_mod,
		IGNORE_TIMEWARP: ignore_timewarp,
		DONT_OVERRIDE: no_override
	};
	c_item.display = (x, y) => $.add({
        OBJ_ID: 1615,
        X: x,
        Y: y,
        ITEM: c_item.item,
		TIME_COUNTER: true,
		SECONDS_ONLY: seconds_only,
        COLOR: color(1),
    });
	c_item.set_start = (x) => o.START_TIME = x;
	c_item.set_end = (x) => o.STOP_TIME = x;
	c_item.start = () => {
		$.add(o);
	};
	c_item.stop = () => {
		$.add({
			OBJ_ID: 3617,
			ITEM: c_item.item,
			START_STOP: true
		})
	};
	return c_item;
}

let compare = (c1, op, c2, truei, falsei) => {
	$.add(item_comp(c1.item, c2.item, ITEM, ITEM, op, truei, falsei));
}

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

let ksys_id = 1;
let keyframe_system = (gr, same = false) => {
	let ksys_gr = same ? gr : unknown_g();
	let oi = 0;
	let tksys_id = ksys_id;
	let o = {
		keyframe: (x, y, duration = 0.50, curve = false, close = false, easing = NONE) => {
			let o = {
				OBJ_ID: 3032,
				X: x,
				Y: y,
				DURATION: duration,
				CURVE: curve,
				CLOSE_LOOP: close,
				GROUPS: ksys_gr,
				ANIM_ID: tksys_id,
				EASING: easing,
				524: 1,
				ACTIVE_TRIGGER: 1,
				155: 2
			};
			if (oi > 0) o.ORDER_INDEX = oi;
			$.add(o);
			oi++;
		},
		start: () => {
			$.add({
				OBJ_ID: 3033,
				ANIMATION_GID: ksys_gr,
				TARGET: gr,
				TIME_MOD: 1,
				POSITION_X_MOD: 1,
				POSITION_Y_MOD: 1,
				ROTATION_MOD: 1,
				SCALE_X_MOD: 1,
				SCALE_Y_MOD: 1
			});
		},
		anim_id: ksys_id
	};
	ksys_id++;
	return o
};

let call_with_delay = (time, func) => {
	$.add({
		OBJ_ID: 1268,
		SPAWN_DURATION: time,
		TARGET: func,
	});
};

let for_loop = (rang, fn, delay = 0.05) => {
	let c = counter(rang[0]);
	while_loop(less_than(c, rang[rang.length - 1]), () => {
		fn();
		c.add(1);
	}, delay);
};

let gradient = (col, col2, bl, br, tl, tr, vertex_mode = true, blending = false, layer = 0) => {
	let origin = {
		OBJ_ID: 2903,
		GR_BL: bl,
		GR_BR: br,
		GR_TL: tl,
		GR_TR: tr,
		GR_ID: grad_id,
		COLOR: col,
		COLOR_2: col2,
		GR_VERTEX_MODE: true,
		GR_LAYER: layer
	};
	origin.with = (a, b) => {
		origin[d[a]] = b;
		return origin;
	};
	return origin;	
};

let random = (gr1, gr2, chance) => {
	$.add({ 
		OBJ_ID: 1912,
		GROUP_ID_1: gr1,
		GROUP_ID_2: gr2,
		
	});
};

let advanced_random = (...chances) => {
	$.add({
		OBJ_ID: 2068,
		ADV_RAND_STRING: chances.map(x => x[0].value + '.' + x[1]).join('.')
	});
}

let gravity = (grav, p1, p2, pt) => {
	$.add({
		OBJ_ID: 2066,
		PLAYER_1: p1,
		PLAYER_2: p2,
		_PT: pt
	})
};

let options = () => {
	let ob = {
		OBJ_ID: 2899
	};
	return {
		STREAK_ADDITIVE: (v = true) => ob.STREAK_ADDITIVE = v ? 1 : -1,
		HIDE_GROUND: (v = true) => ob.HIDE_GROUND = v ? 1 : -1,
		HIDE_MG: (v = true) => ob.HIDE_MG = v ? 1 : -1,
		HIDE_P1: (v = true) => ob.HIDE_P1 = v ? 1 : -1,
		HIDE_P2: (v = true) => ob.HIDE_P2 = v ? 1 : -1,
		DISABLE_CONTROLS_P1: (v = true) => ob.DISABLE_CONTROLS_P1 = v ? 1 : -1,
		DISABLE_CONTROLS_P2: (v = true) => ob.DISABLE_CONTROLS_P2 = v ? 1 : -1,
		UNLINK_DUAL_GRAVITY: (v = true) => ob.UNLINK_DUAL_GRAVITY = v ? 1 : -1,
		HIDE_ATTEMPTS: (v = true) => ob.HIDE_ATTEMPTS = v ? 1 : -1,
		AUDIO_ON_DEATH: (v = true) => ob.AUDIO_ON_DEATH = v ? 1 : -1,
		NO_DEATH_SFX: (v = true) => ob.NO_DEATH_SFX = v ? 1 : -1,
		RESPAWN_TIME: (v) => {
			ob.EDIT_RESPAWN_TIME = 1;
			ob.RESPAWN_TIME = v;
		},
		add: () => $.add(ob)
	};
};

let sequence = (sequence, mode = 0, min_int = 0, reset = 0) => {
	let seq_gr = trigger_function(() => {
		$.add({
			OBJ_ID: 3607,
			SEQUENCE: sequence.map(x => x[0].value + '.' + x[1]).join('.'),
			MIN_INT: min_int,
			RESET: reset,
			MODE: mode
		})
	});
	return {
		step: () => seq_gr.call()
	}
};

let remappable = (fn) => {
	let args_arr = Array(fn.length).fill(0).map((_, i) => i);
	let r = trigger_function(() => fn(...args_arr));
	return (...args) => {
		// remap fn_args to args
		let rmps = [];
		args.forEach((x, i) => rmps.push([args_arr[i], args[i]]));
		r.remap(...rmps).call();
	};
}

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
  reverse: () => {
	$.add({
		OBJ_ID: 1917
	});
  },
  rgb: (r, g, b) => [r, g, b],
  rgba: (r, g, b, a) => [r, g, b, a],
};

extract(exps);
