/**
 * @module obj_props
 */
/**
 * @typedef {object} obj_props
 * @property {number} OBJ_ID
 * @property {number} X
 * @property {number} Y
 * @property {number} HORIZONTAL_FLIP
 * @property {number} VERTICAL_FLIP
 * @property {number} ROTATION
 * @property {number} TRIGGER_RED
 * @property {number} TRIGGER_GREEN
 * @property {number} TRIGGER_BLUE
 * @property {number} DURATION
 * @property {number} TOUCH_TRIGGERED
 * @property {number} PORTAL_CHECKED
 * @property {number} PLAYER_COLOR_1
 * @property {number} PLAYER_COLOR_2
 * @property {number} BLENDING
 * @property {number} EDITOR_LAYER_1
 * @property {number} COLOR
 * @property {number} COLOR_2
 * @property {number} TARGET_COLOR
 * @property {number} Z_LAYER
 * @property {number} Z_ORDER
 * @property {number} MOVE_X
 * @property {number} MOVE_Y
 * @property {number} EASING
 * @property {number} TEXT
 * @property {number} SCALING
 * @property {number} GROUP_PARENT
 * @property {number} OPACITY
 * @property {number} ACTIVE_TRIGGER
 * @property {number} HVS_ENABLED
 * @property {number} COLOR_2_HVS_ENABLED
 * @property {number} HVS
 * @property {number} COLOR_2_HVS
 * @property {number} FADE_IN
 * @property {number} HOLD
 * @property {number} FADE_OUT
 * @property {number} PULSE_HSV
 * @property {number} COPIED_COLOR_HVS
 * @property {number} COPIED_COLOR_ID
 * @property {number} TARGET
 * @property {number} TARGET_TYPE
 * @property {number} YELLOW_TELEPORTATION_PORTAL_DISTANCE
 * @property {number} ACTIVATE_GROUP
 * @property {number} GROUPS
 * @property {number} LOCK_TO_PLAYER_X
 * @property {number} LOCK_TO_PLAYER_Y
 * @property {number} COPY_OPACITY
 * @property {number} EDITOR_LAYER_2
 * @property {number} SPAWN_TRIGGERED
 * @property {number} SPAWN_DURATION
 * @property {number} DONT_FADE
 * @property {number} MAIN_ONLY
 * @property {number} DETAIL_ONLY
 * @property {number} DONT_ENTER
 * @property {number} ROTATE_DEGREES
 * @property {number} TIMES_360
 * @property {number} LOCK_OBJECT_ROTATION
 * @property {number} TARGET_POS
 * @property {number} X_MOD
 * @property {number} Y_MOD
 * @property {number} STRENGTH
 * @property {number} ANIMATION_GID
 * @property {number} COUNT
 * @property {number} SUBTRACT_COUNT
 * @property {number} PICKUP_MODE
 * @property {number} ITEM
 * @property {number} HOLD_MODE
 * @property {number} TOGGLE_MODE
 * @property {number} INTERVAL
 * @property {number} EASING_RATE
 * @property {number} EXCLUSIVE
 * @property {number} MULTI_TRIGGER
 * @property {number} COMPARISON
 * @property {number} DUAL_MODE
 * @property {number} SPEED
 * @property {number} DELAY
 * @property {number} Y_OFFSET
 * @property {number} ACTIVATE_ON_EXIT
 * @property {number} DYNAMIC_BLOCK
 * @property {number} BLOCK_B
 * @property {number} GLOW_DISABLED
 * @property {number} ROTATION_SPEED
 * @property {number} DISABLE_ROTATION
 * @property {number} USE_TARGET
 * @property {number} TARGET_POS_AXES
 * @property {number} EDITOR_DISABLE
 * @property {number} HIGH_DETAIL
 * @property {number} COUNT_MULTI_ACTIVATE
 * @property {number} MAX_SPEED
 * @property {number} RANDOMIZE_START
 * @property {number} ANIMATION_SPEED
 * @property {number} LINKED_GROUP
 * @property {number} EXIT_STATIC
 * @property {number} FREE_MODE
 * @property {number} EDIT_FREE_CAM_SETTINGS
 * @property {number} FREE_CAM_EASING
 * @property {number} FREE_CAM_PADDING
 * @property {number} ORD
 * @property {number} REVERSED
 * @property {number} SONG_START
 * @property {number} TIMEWARP_TIME_MOD
 * @property {number} ANIMATE_ON_TRIGGER
 * @property {number} SCALE_X
 * @property {number} SCALE_Y
 * @property {number} PERSPECTIVE_X
 * @property {number} PERSPECTIVE_Y
 * @property {number} ONLY_MOVE
 * @property {number} PLAYER_1
 * @property {number} OVERRIDE_COUNT
 * @property {number} FOLLOW_CAMERA_X
 * @property {number} FOLLOW_CAMERA_Y
 * @property {number} FOLLOW_CAMERA_X_MOD
 * @property {number} FOLLOW_CAMERA_Y_MOD
 * @property {number} PARTICLE_DATA
 * @property {number} USE_OBJ_COLOR
 * @property {number} UNIFORM_OBJ_COLOR
 * @property {number} GRAVITY
 * @property {number} SCALE_X_BY
 * @property {number} SCALE_Y_BY
 * @property {number} ADV_RAND_STRING
 * @property {number} DIV_BY_X
 * @property {number} DIV_BY_Y
 * @property {number} STREAK_ADDITIVE
 * @property {number} UNLINK_DUAL_GRAVITY
 * @property {number} HIDE_GROUND
 * @property {number} HIDE_P1
 * @property {number} HIDE_P2
 * @property {number} CAMERA_EDGE
 * @property {number} DISABLE_CONTROLS_P1
 * @property {number} KEEP_VELOCITY
 * @property {number} CHANGE_CHANNEL
 * @property {number} GR_BLENDING
 * @property {number} HIDE_MG
 * @property {number} PLAYER_ONLY
 * @property {number} DISABLE_CONTROLS_P2
 * @property {number} PLAYER_2
 * @property {number} _PT
 * @property {number} GR_LAYER
 * @property {number} GR_BL
 * @property {number} GR_BR
 * @property {number} GR_TL
 * @property {number} GR_TR
 * @property {number} GR_VERTEX_MODE
 * @property {number} GR_DISABLE
 * @property {number} GR_ID
 * @property {number} QUICK_START
 * @property {number} FOLLOW_GROUP
 * @property {number} FOLLOW_EASING
 * @property {number} ANIMATE_ACTIVE_ONLY
 * @property {number} FOLLOW_P1
 * @property {number} FOLLOW_P2
 * @property {number} P_GROUPS
 * @property {number} DISABLE_GRID_SNAP
 * @property {number} ZOOM
 * @property {number} ANIM_ID
 * @property {number} ORDER_INDEX
 * @property {number} CLOSE_LOOP
 * @property {number} CURVE
 * @property {number} SECONDS_ONLY
 * @property {number} SONG_ID
 * @property {number} SNAP_360
 * @property {number} PREP
 * @property {number} LOAD_PREP
 * @property {number} SONG_SPEED
 * @property {number} SONG_PITCH
 * @property {number} SONG_VOLUME
 * @property {number} SONG_REVERB
 * @property {number} SONG_FADE_IN
 * @property {number} SONG_END
 * @property {number} SONG_FADE_OUT
 * @property {number} FFT
 * @property {number} SONG_LOOP
 * @property {number} STOP_LOOP
 * @property {number} IS_UNIQUE
 * @property {number} UNIQUE_ID
 * @property {number} SONG_STOP
 * @property {number} CHANGE_VOLUME
 * @property {number} CHANGE_SPEED
 * @property {number} OVERRIDE
 * @property {number} VOL_NEAR
 * @property {number} VOL_MED
 * @property {number} VOL_FAR
 * @property {number} MIN_DIST
 * @property {number} DIST_2
 * @property {number} DIST_3
 * @property {number} CAM
 * @property {number} EVENTS
 * @property {number} SONG_CHANNEL
 * @property {number} SFX_PRELOAD
 * @property {number} MIN_INTERVAL
 * @property {number} SEQUENCE
 * @property {number} MODE
 * @property {number} MIN_INT
 * @property {number} RESET
 * @property {number} RESET_FULL_STEP
 * @property {number} REMAPS
 * @property {number} EXTRA_ID
 * @property {number} MODIFIER
 * @property {number} RELATIVE_ROT
 * @property {number} SMOOTH_VELOCITY
 * @property {number} SMOOTH_VELOCITY_MODIFIER
 * @property {number} SFX_GROUP
 * @property {number} PREVIEW_OPACITY
 * @property {number} VOLUME_DIRECTION
 * @property {number} NO_EFFECTS
 * @property {number} NO_SFX
 * @property {number} EXIT_INSTANT
 * @property {number} TIME_COUNTER
 * @property {number} START_TIME
 * @property {number} DONT_OVERRIDE
 * @property {number} IGNORE_TIMEWARP
 * @property {number} TIMER_TIME_MOD
 * @property {number} START_PAUSED
 * @property {number} START_STOP
 * @property {number} STOP_TIME
 * @property {number} STOP_CHECKED
 * @property {number} TYPE_1
 * @property {number} TYPE_2
 * @property {number} MOD
 * @property {number} ASSIGN_OP
 * @property {number} OP_1
 * @property {number} OP_2
 * @property {number} MOD_2
 * @property {number} TOL
 * @property {number} RFC_1
 * @property {number} RFC_2
 * @property {number} INSTANT_END
 * @property {number} IGNORE_VOLUME_TEST
 * @property {number} SOUND_DURATION
 * @property {number} PERSISTENT
 * @property {number} REVERB_TYPE
 * @property {number} REVERB_ENABLE
 * @property {number} TIME_MOD
 * @property {number} POSITION_X_MOD
 * @property {number} ROTATION_MOD
 * @property {number} SCALE_X_MOD
 * @property {number} LINE_OPACITY
 * @property {number} EXTRA_ID_2
 * @property {number} HIDE_ATTEMPTS
 * @property {number} STOP_JUMP
 * @property {number} STOP_MOVE
 * @property {number} STOP_ROT
 * @property {number} STOP_SLIDE
 * @property {number} POSITION_Y_MOD
 * @property {number} SCALE_Y_MOD
 * @property {number} EDIT_RESPAWN_TIME
 * @property {number} RESPAWN_TIME
 * @property {number} AUDIO_ON_DEATH
 * @property {number} NO_DEATH_SFX
 * @property {number} RELATIVE_SCALE
 * @property {number} ABSNEG_1
 * @property {number} ABSNEG_2
 * @property {number} ITEM_TARGET
 * @property {number} GROUP_ID_2
 * @property {number} GROUP_ID_1
 * @property {number} COMP_OP_2
 * @property {number} SFX_ID
 * @property {number} COMP_OP_1
 * @property {number} COMP_OP
 * @property {number} CHANCE
 * @property {number} ADD
 * @property {number} ITEM_ID_1
 * @property {number} FALSE_ID
 * @property {number} BLOCK_A
 * @property {number} CENTER
 * @property {number} ITEM_ID_2
 * @property {number} TRUE_ID
 * @property {number} MULT_DIV
 */
module.exports = {
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
    347832: 'ADD',
    71: 'TARGET_POS',
    3478234: "CENTER",
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
    110: "EXIT_STATIC",
    111: "FREE_MODE",
    112: "EDIT_FREE_CAM_SETTINGS",
    113: "FREE_CAM_EASING",
    114: "FREE_CAM_PADDING",
    115: "ORD",
    118: "REVERSED",
    119: "SONG_START",
    120: "TIMEWARP_TIME_MOD",
    123: "ANIMATE_ON_TRIGGER",
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
    145: "PARTICLE_DATA",
    146: "USE_OBJ_COLOR",
    147: "UNIFORM_OBJ_COLOR",
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
    211: "QUICK_START",
    212: "FOLLOW_GROUP",
    213: "FOLLOW_EASING",
    214: "ANIMATE_ACTIVE_ONLY",
    215: "FOLLOW_P1",
    216: "FOLLOW_P2",
    274: "P_GROUPS",
    370: "DISABLE_GRID_SNAP",
    371: "ZOOM",
    373: "ANIM_ID",
    374: "ORDER_INDEX",
    376: "CLOSE_LOOP",
    378: "CURVE",
    389: "SECONDS_ONLY",
    392: "SONG_ID",
    393: "SMALL_STEP",
    394: "SNAP_360",
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
    430: "EVENTS",
    432: "SONG_CHANNEL",
    433: "SFX_PRELOAD",
    434: "MIN_INTERVAL",
    435: "SEQUENCE",
    436: "MODE",
    437: "MIN_INT",
    438: "RESET",
    439: "RESET_FULL_STEP",
    447: "EXTRA_ID",
    449: "MODIFIER",
    452: "RELATIVE_ROT",
    453: "SMOOTH_VELOCITY",
    454: "SMOOTH_VELOCITY_MODIFIER",
    455: "SFX_GROUP",
    458: "VOLUME_DIRECTION",
    460: "NO_EFFECTS",
    461: "NO_SFX",
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
    487: "INSTANT_END",
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
    525: "EXTRA_ID_2",
    532: "HIDE_ATTEMPTS",
    540: "STOP_JUMP",
    541: "STOP_MOVE",
    542: "STOP_ROT",
    543: "STOP_SLIDE",
    544: "SILENT",
    545: "POSITION_Y_MOD",
    546: "SCALE_Y_MOD",
    573: "EDIT_RESPAWN_TIME",
    574: "RESPAWN_TIME",
    575: "AUDIO_ON_DEATH",
    576: "NO_DEATH_SFX",
    577: "RELATIVE_SCALE",
    578: "ABSNEG_1",
    579: "ABSNEG_2",
};