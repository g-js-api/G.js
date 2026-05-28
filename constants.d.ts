/**
 * @module constants
 */
/** @category Constants */
export declare const ITEM = 1;
/** @category Constants */
export declare const TIMER = 2;
/** @category Constants */
export declare const POINTS = 3;
/** @category Constants */
export declare const TIME = 4;
/** @category Constants */
export declare const ATTEMPT = 5;
/** @category Constants */
export declare const EQ = 0;
/** @category Constants */
export declare const ADD = 1;
/** @category Constants */
export declare const SUB = 2;
/** @category Constants */
export declare const MUL = 3;
/** @category Constants */
export declare const DIV = 4;
/** @category Constants */
export declare const GREATER = 1;
/** @category Constants */
export declare const GREATER_OR_EQ = 2;
/** @category Constants */
export declare const LESS = 3;
/** @category Constants */
export declare const LESS_OR_EQ = 4;
/** @category Constants */
export declare const NOT_EQ = 5;
/** @category Constants */
export declare const ABS = 1;
/** @category Constants */
export declare const NEG = 2;
/** @category Constants */
export declare const RND = 1;
/** @category Constants */
export declare const FLR = 2;
/** @category Constants */
export declare const CEI = 3;
/** @category Constants */
export declare const ELASTIC_OUT = 6;
/** @category Constants */
export declare const BACK_IN_OUT = 16;
/** @category Constants */
export declare const BOUNCE_IN = 8;
/** @category Constants */
export declare const BACK_OUT = 18;
/** @category Constants */
export declare const EASE_OUT = 3;
/** @category Constants */
export declare const EASE_IN = 2;
/** @category Constants */
export declare const EASE_IN_OUT = 1;
/** @category Constants */
export declare const ELASTIC_IN_OUT = 4;
/** @category Constants */
export declare const BOUNCE_OUT = 9;
/** @category Constants */
export declare const EXPONENTIAL_IN = 11;
/** @category Constants */
export declare const EXPONENTIAL_OUT = 12;
/** @category Constants */
export declare const SINE_IN_OUT = 13;
/** @category Constants */
export declare const BOUNCE_IN_OUT = 7;
/** @category Constants */
export declare const SINE_IN = 14;
/** @category Constants */
export declare const ELASTIC_IN = 5;
/** @category Constants */
export declare const SINE_OUT = 15;
/** @category Constants */
export declare const EXPONENTIAL_IN_OUT = 10;
/** @category Constants */
export declare const BACK_IN = 17;
/** @category Constants */
export declare const NONE = 0;
/** @category Constants */
export declare const BG: import("./core").$color;
/** @category Constants */
export declare const GROUND: import("./core").$color;
/** @category Constants */
export declare const LINE: import("./core").$color;
/** @category Constants */
export declare const _3DLINE: import("./core").$color;
/** @category Constants */
export declare const OBJECT: import("./core").$color;
/** @category Constants */
export declare const GROUND2: import("./core").$color;
/** @category Constants */
export declare const BLACK: import("./core").$color;
/** @category Constants */
export declare const WHITE: import("./core").$color;
/** @category Constants */
export declare const LIGHTER: import("./core").$color;
/** @category Constants */
export declare const MIDDLEGROUND: import("./core").$color;
/** @category Constants */
export declare const MIDDLEGROUND_2: import("./core").$color;
/** @category Constants */
export declare const EQUAL_TO = 0;
/** @category Constants */
export declare const LARGER_THAN = 1;
/** @category Constants */
export declare const SMALLER_THAN = 2;
/** @category Constants */
export declare const MODE_STOP = 0;
/** @category Constants */
export declare const MODE_LOOP = 1;
/** @category Constants */
export declare const MODE_LAST = 2;
/** @category Constants */
export declare const LEFT_EDGE = 1;
/** @category Constants */
export declare const RIGHT_EDGE = 2;
/** @category Constants */
export declare const UP_EDGE = 3;
/** @category Constants */
export declare const DOWN_EDGE = 4;
/** @category Constants */
export declare const obj_ids: {
    special: {
        USER_COIN: number;
        H_BLOCK: number;
        J_BLOCK: number;
        TEXT: number;
        S_BLOCK: number;
        ITEM_DISPLAY: number;
        D_BLOCK: number;
        COLLISION_BLOCK: number;
    };
    triggers: {
        START_POSITION: number;
        TRAIL_ENABLE: number;
        TRAIL_DISABLE: number;
        COLOR: number;
        MOVE: number;
        PULSE: number;
        ALPHA: number;
        TOGGLE: number;
        SPAWN: number;
        ROTATE: number;
        FOLLOW: number;
        SHAKE: number;
        ANIMATE: number;
        TOUCH: number;
        COUNT: number;
        PLAYER_HIDE: number;
        PLAYER_SHOW: number;
        STOP: number;
        INSTANT_COUNT: number;
        ON_DEATH: number;
        FOLLOW_PLAYER_Y: number;
        COLLISION: number;
        COLLISION_BLOCK: number;
        PICKUP: number;
        BG_EFFECT_ENABLE: number;
        BG_EFFECT_DISABLE: number;
        RANDOM: number;
        ZOOM_CAMERA: number;
        STATIC_CAMERA: number;
        OFFSET_CAMERA: number;
        REVERSE: number;
        END_WALL: number;
        PLAYER_CONTROL: number;
        SONG: number;
        TIMEWARP: number;
        ROTATE_CAMERA: number;
        CAMERA_GUIDE: number;
        CAMERA_EDGE: number;
        CHECKPOINT: number;
        GRAVITY: number;
        SCALE: number;
        ADV_RANDOM: number;
        FORCE_BLOCK: number;
        OPTIONS: number;
        ARROW: number;
        GAMEPLAY_OFFSET: number;
        GRADIENT: number;
        CAMERA_MODE: number;
        EDIT_MG: number;
        ADV_FOLLOW: number;
        TELEPORT: number;
        CHANGE_BG: number;
        CHANGE_GR: number;
        CHANGE_MG: number;
        KEYFRAME: number;
        ANIMATE_KEYFRAME: number;
        END: number;
        SFX: number;
        EDIT_SFX: number;
        EVENT: number;
        EDIT_SONG: number;
        BG_SPEED: number;
        SEQUENCE: number;
        SPAWN_PARTICLE: number;
        INSTANT_COLLISION: number;
        MG_SPEED: number;
        UI: number;
        TIME: number;
        TIME_EVENT: number;
        TIME_CONTROL: number;
        RESET: number;
        ITEM_EDIT: number;
        ITEM_COMPARE: number;
        STATE_BLOCK: number;
        ITEM_PERSIST: number;
        BPM: number;
        TOGGLE_BLOCK: number;
        FORCE_CIRCLE: number;
        OBJECT_CONTROL: number;
        EDIT_ADV_FOLLOW: number;
        RETARGET_ADV_FOLLOW: number;
        LINK_VISIBLE: number;
    };
    portals: {
        SPEED_GREEN: number;
        TELEPORT: number;
        CUBE: number;
        MIRROR_OFF: number;
        WAVE: number;
        SPIDER: number;
        SPEED_RED: number;
        GRAVITY_DOWN: number;
        SPEED_BLUE: number;
        UFO: number;
        ROBOT: number;
        MIRROR_ON: number;
        GRAVITY_UP: number;
        DUAL_ON: number;
        SIZE_MINI: number;
        BALL: number;
        SIZE_NORMAL: number;
        SHIP: number;
        SPEED_PINK: number;
        SPEED_YELLOW: number;
        DUAL_OFF: number;
        SWING: number;
    };
};
