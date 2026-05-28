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
declare const obj_props: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    237894: string;
    11: string;
    13: string;
    15: string;
    16: string;
    17: string;
    20: string;
    21: string;
    22: string;
    23: string;
    24: string;
    25: string;
    28: string;
    29: string;
    30: string;
    31: string;
    32: string;
    34: string;
    35: string;
    36: string;
    41: string;
    42: string;
    43: string;
    44: string;
    45: string;
    46: string;
    47: string;
    48: string;
    49: string;
    50: string;
    51: string;
    6969: string;
    32984398: string;
    8754: string;
    4895490381243: string;
    7623894327563: string;
    52: string;
    54: string;
    56: string;
    57: string;
    58: string;
    59: string;
    60: string;
    61: string;
    62: string;
    63: string;
    64: string;
    65: string;
    66: string;
    67: string;
    68: string;
    69: string;
    70: string;
    347832: string;
    71: string;
    7187327378823: string;
    3478234: string;
    8459: string;
    584932: string;
    980786435: string;
    72: string;
    73: string;
    75: string;
    76: string;
    77: string;
    78: string;
    79: string;
    80: string;
    696969: string;
    420420: string;
    81: string;
    82: string;
    84: string;
    85: string;
    86: string;
    87: string;
    88: string;
    42069420: string;
    89: string;
    90: string;
    91: string;
    92: string;
    93: string;
    94: string;
    95: string;
    6942069: string;
    96: string;
    97: string;
    98: string;
    100: string;
    101: string;
    102: string;
    103: string;
    104: string;
    105: string;
    106: string;
    107: string;
    108: string;
    110: string;
    111: string;
    112: string;
    113: string;
    114: string;
    115: string;
    118: string;
    120: string;
    123: string;
    128: string;
    129: string;
    131: string;
    132: string;
    133: string;
    135: string;
    138: string;
    139: string;
    141: string;
    142: string;
    143: string;
    144: string;
    145: string;
    146: string;
    147: string;
    148: string;
    150: string;
    151: string;
    152: string;
    153: string;
    154: string;
    159: string;
    160: string;
    161: string;
    162: string;
    163: string;
    164: string;
    165: string;
    169: string;
    171: string;
    174: string;
    175: string;
    176: string;
    177: string;
    179: string;
    3748930247: string;
    487999230: string;
    5436789221: string;
    180: string;
    645789320: string;
    37642389: string;
    54639849023: string;
    181: string;
    93423877: string;
    182: string;
    8765437289: string;
    183: string;
    184: string;
    188: string;
    34982398: string;
    8765434: string;
    901283746: string;
    189: string;
    8976547689: string;
    190: string;
    21678934: string;
    191: string;
    40943900394: string;
    6547892301: string;
    71937646738: string;
    192: string;
    194: string;
    37849320: string;
    1437689210: string;
    195: string;
    196: string;
    197: string;
    198: string;
    199: string;
    200: string;
    201: string;
    43678329: string;
    202: string;
    203: string;
    204: string;
    205: string;
    206: string;
    207: string;
    208: string;
    209: string;
    211: string;
    212: string;
    213: string;
    214: string;
    215: string;
    216: string;
    218: string;
    222: string;
    243: string;
    249: string;
    263: string;
    264: string;
    274: string;
    276: string;
    287: string;
    290: string;
    45890903: string;
    291: string;
    370: string;
    371: string;
    373: string;
    374: string;
    376: string;
    378: string;
    389: string;
    392: string;
    393: string;
    394: string;
    395: string;
    45893: string;
    399: string;
    400: string;
    404: string;
    405: string;
    406: string;
    407: string;
    408: string;
    409: string;
    410: string;
    411: string;
    412: string;
    413: string;
    414: string;
    415: string;
    416: string;
    417: string;
    418: string;
    419: string;
    420: string;
    421: string;
    422: string;
    423: string;
    424: string;
    425: string;
    426: string;
    428: string;
    430: string;
    432: string;
    433: string;
    434: string;
    435: string;
    436: string;
    437: string;
    438: string;
    439: string;
    447: string;
    449: string;
    452: string;
    453: string;
    454: string;
    455: string;
    458: string;
    460: string;
    461: string;
    465: string;
    466: string;
    467: string;
    468: string;
    469: string;
    470: string;
    471: string;
    472: string;
    473: string;
    474: string;
    476: string;
    477: string;
    478: string;
    479: string;
    480: string;
    78534: string;
    481: string;
    45389: string;
    482: string;
    93289: string;
    483: string;
    484: string;
    485: string;
    486: string;
    487: string;
    489: string;
    490: string;
    491: string;
    442: string;
    456: string;
    502: string;
    503: string;
    512: string;
    4376890: string;
    515: string;
    897653674: string;
    520: string;
    521: string;
    522: string;
    523: string;
    524: string;
    525: string;
    532: string;
    540: string;
    541: string;
    542: string;
    543: string;
    544: string;
    545: string;
    546: string;
    573: string;
    574: string;
    575: string;
    576: string;
    577: string;
    578: string;
    579: string;
    580: string;
};
export default obj_props;
