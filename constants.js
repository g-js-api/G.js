"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIDDLEGROUND_2 = exports.MIDDLEGROUND = exports.LIGHTER = exports.WHITE = exports.BLACK = exports.GROUND2 = exports.OBJECT = exports._3DLINE = exports.LINE = exports.GROUND = exports.BG = exports.NONE = exports.BACK_IN = exports.EXPONENTIAL_IN_OUT = exports.SINE_OUT = exports.ELASTIC_IN = exports.SINE_IN = exports.BOUNCE_IN_OUT = exports.SINE_IN_OUT = exports.EXPONENTIAL_OUT = exports.EXPONENTIAL_IN = exports.BOUNCE_OUT = exports.ELASTIC_IN_OUT = exports.EASE_IN_OUT = exports.EASE_IN = exports.EASE_OUT = exports.BACK_OUT = exports.BOUNCE_IN = exports.BACK_IN_OUT = exports.ELASTIC_OUT = exports.CEI = exports.FLR = exports.RND = exports.NEG = exports.ABS = exports.NOT_EQ = exports.LESS_OR_EQ = exports.LESS = exports.GREATER_OR_EQ = exports.GREATER = exports.DIV = exports.MUL = exports.SUB = exports.ADD = exports.EQ = exports.ATTEMPT = exports.TIME = exports.POINTS = exports.TIMER = exports.ITEM = void 0;
exports.obj_ids = exports.DOWN_EDGE = exports.UP_EDGE = exports.RIGHT_EDGE = exports.LEFT_EDGE = exports.MODE_LAST = exports.MODE_LOOP = exports.MODE_STOP = exports.SMALLER_THAN = exports.LARGER_THAN = exports.EQUAL_TO = void 0;
const core_1 = require("./core");
/**
 * @module constants
 */
// types
/** @category Constants */
exports.ITEM = 1;
/** @category Constants */
exports.TIMER = 2;
/** @category Constants */
exports.POINTS = 3;
/** @category Constants */
exports.TIME = 4;
/** @category Constants */
exports.ATTEMPT = 5;
// ops
/** @category Constants */
exports.EQ = 0;
/** @category Constants */
exports.ADD = 1;
/** @category Constants */
exports.SUB = 2;
/** @category Constants */
exports.MUL = 3;
/** @category Constants */
exports.DIV = 4;
// compare_ops
/** @category Constants */
exports.GREATER = 1;
/** @category Constants */
exports.GREATER_OR_EQ = 2;
/** @category Constants */
exports.LESS = 3;
/** @category Constants */
exports.LESS_OR_EQ = 4;
/** @category Constants */
exports.NOT_EQ = 5;
// absneg
/** @category Constants */
exports.ABS = 1;
/** @category Constants */
exports.NEG = 2;
// rfc
/** @category Constants */
exports.RND = 1;
/** @category Constants */
exports.FLR = 2;
/** @category Constants */
exports.CEI = 3;
// easings
/** @category Constants */
exports.ELASTIC_OUT = 6;
/** @category Constants */
exports.BACK_IN_OUT = 16;
/** @category Constants */
exports.BOUNCE_IN = 8;
/** @category Constants */
exports.BACK_OUT = 18;
/** @category Constants */
exports.EASE_OUT = 3;
/** @category Constants */
exports.EASE_IN = 2;
/** @category Constants */
exports.EASE_IN_OUT = 1;
/** @category Constants */
exports.ELASTIC_IN_OUT = 4;
/** @category Constants */
exports.BOUNCE_OUT = 9;
/** @category Constants */
exports.EXPONENTIAL_IN = 11;
/** @category Constants */
exports.EXPONENTIAL_OUT = 12;
/** @category Constants */
exports.SINE_IN_OUT = 13;
/** @category Constants */
exports.BOUNCE_IN_OUT = 7;
/** @category Constants */
exports.SINE_IN = 14;
/** @category Constants */
exports.ELASTIC_IN = 5;
/** @category Constants */
exports.SINE_OUT = 15;
/** @category Constants */
exports.EXPONENTIAL_IN_OUT = 10;
/** @category Constants */
exports.BACK_IN = 17;
/** @category Constants */
exports.NONE = 0;
// colors
/** @category Constants */
exports.BG = (0, core_1.color_fn)(1000);
/** @category Constants */
exports.GROUND = (0, core_1.color_fn)(1001);
/** @category Constants */
exports.LINE = (0, core_1.color_fn)(1002);
/** @category Constants */
exports._3DLINE = (0, core_1.color_fn)(1003);
/** @category Constants */
exports.OBJECT = (0, core_1.color_fn)(1004);
/** @category Constants */
exports.GROUND2 = (0, core_1.color_fn)(1009);
/** @category Constants */
exports.BLACK = (0, core_1.color_fn)(1010);
/** @category Constants */
exports.WHITE = (0, core_1.color_fn)(1011);
/** @category Constants */
exports.LIGHTER = (0, core_1.color_fn)(1012);
/** @category Constants */
exports.MIDDLEGROUND = (0, core_1.color_fn)(1013);
/** @category Constants */
exports.MIDDLEGROUND_2 = (0, core_1.color_fn)(1014);
// other constants
/** @category Constants */
exports.EQUAL_TO = 0;
/** @category Constants */
exports.LARGER_THAN = 1;
/** @category Constants */
exports.SMALLER_THAN = 2;
/** @category Constants */
exports.MODE_STOP = 0;
/** @category Constants */
exports.MODE_LOOP = 1;
/** @category Constants */
exports.MODE_LAST = 2;
/** @category Constants */
exports.LEFT_EDGE = 1;
/** @category Constants */
exports.RIGHT_EDGE = 2;
/** @category Constants */
exports.UP_EDGE = 3;
/** @category Constants */
exports.DOWN_EDGE = 4;
/** @category Constants */
exports.obj_ids = {
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
        START_POSITION: 31,
        TRAIL_ENABLE: 32,
        TRAIL_DISABLE: 33,
        COLOR: 899,
        MOVE: 901,
        PULSE: 1006,
        ALPHA: 1007,
        TOGGLE: 1049,
        SPAWN: 1268,
        ROTATE: 1346,
        FOLLOW: 1347,
        SHAKE: 1520,
        ANIMATE: 1585,
        TOUCH: 1595,
        COUNT: 1611,
        PLAYER_HIDE: 1612,
        PLAYER_SHOW: 1613,
        STOP: 1616,
        INSTANT_COUNT: 1811,
        ON_DEATH: 1812,
        FOLLOW_PLAYER_Y: 1814,
        COLLISION: 1815,
        COLLISION_BLOCK: 1816,
        PICKUP: 1817,
        BG_EFFECT_ENABLE: 1818,
        BG_EFFECT_DISABLE: 1819,
        RANDOM: 1912,
        ZOOM_CAMERA: 1913,
        STATIC_CAMERA: 1914,
        OFFSET_CAMERA: 1916,
        REVERSE: 1917,
        END_WALL: 1931,
        PLAYER_CONTROL: 1932,
        SONG: 1934,
        TIMEWARP: 1935,
        ROTATE_CAMERA: 2015,
        CAMERA_GUIDE: 2016,
        CAMERA_EDGE: 2062,
        CHECKPOINT: 2063,
        GRAVITY: 2066,
        SCALE: 2067,
        ADV_RANDOM: 2068,
        FORCE_BLOCK: 2069,
        OPTIONS: 2899,
        ARROW: 2900,
        GAMEPLAY_OFFSET: 2901,
        GRADIENT: 2903,
        CAMERA_MODE: 2925,
        EDIT_MG: 2999,
        ADV_FOLLOW: 3016,
        TELEPORT: 3022,
        CHANGE_BG: 3029,
        CHANGE_GR: 3030,
        CHANGE_MG: 3031,
        KEYFRAME: 3032,
        ANIMATE_KEYFRAME: 3033,
        END: 3600,
        SFX: 3602,
        EDIT_SFX: 3603,
        EVENT: 3604,
        EDIT_SONG: 3605,
        BG_SPEED: 3606,
        SEQUENCE: 3607,
        SPAWN_PARTICLE: 3608,
        INSTANT_COLLISION: 3609,
        MG_SPEED: 3612,
        UI: 3613,
        TIME: 3614,
        TIME_EVENT: 3615,
        TIME_CONTROL: 3617,
        RESET: 3618,
        ITEM_EDIT: 3619,
        ITEM_COMPARE: 3620,
        STATE_BLOCK: 3640,
        ITEM_PERSIST: 3641,
        BPM: 3642,
        TOGGLE_BLOCK: 3643,
        FORCE_CIRCLE: 3645,
        OBJECT_CONTROL: 3655,
        EDIT_ADV_FOLLOW: 3660,
        RETARGET_ADV_FOLLOW: 3661,
        LINK_VISIBLE: 3662
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
        SWING: 1933
    },
};
