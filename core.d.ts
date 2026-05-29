import $group from './types/group';
import $color from './types/color';
import $block from './types/block';
export { $group, $color, $block };
export type Dictionary = Record<string | number, any>;
export type KnownIdKind = 'groups' | 'colors' | 'blocks';
export type TriggerCallback = (contextGroup?: any) => any;
/**
 * @category Interfaces
 */
export interface KnownIds {
    groups: number[];
    colors: number[];
    blocks: number[];
}
/**
 * @category Interfaces
 */
export interface GJsObject {
    type: 'object';
    obj_props: Dictionary;
    with(prop: string | number, value: any): GJsObject;
    add(): void;
}
/**
 * @category Interfaces
 */
export interface ExportOptions {
    info?: boolean;
    group_count_warning?: boolean;
    level_name?: string;
    path?: string;
    reencrypt?: boolean;
    optimize?: boolean;
    replacePastObjects?: boolean;
    removeGroup?: number | {
        value: number;
    };
    triggerPositioningAllowed?: boolean;
    trigger_pos_start?: number;
    gmdOutput?: string;
}
/**
 * @category Interfaces
 */
export interface ExportConfig {
    type: 'levelstring' | 'savefile' | 'live_editor' | 'gmd';
    options?: ExportOptions;
}
/**
 * @category Interfaces
 */
export interface GJsEvent {
    event: (cb: any) => void;
}
/**
 * @category Interfaces
 */
export interface Counter {
    item: any;
    type: number;
    bits: number | undefined;
    add: (amount: number | Counter) => Counter;
    set: (amount: number | Counter) => Counter;
    subtract: (amount: number | Counter) => Counter;
    multiply: (amount: number | Counter) => Counter;
    divide: (amount: number | Counter) => Counter;
    display: (x: number, y: number) => void;
    to_obj: () => GJsObject;
    if_is: (comparison: number, other: number, trig_func: any) => void;
    to_const: (range: any[], cb: (val: any) => void) => void;
    add_to: (item: Counter) => Counter;
    copy_to: (item: Counter) => Counter;
    clone: () => Counter;
    subtract_from: (b: Counter) => Counter;
    reset: () => Counter;
    abs: () => Counter;
    neg: () => Counter;
    mod: (b: number | Counter) => Counter;
    start?: () => void;
    stop?: () => void;
    set_start?: (x: number) => void;
    set_end?: (x: number) => void;
}
/**
 * @category Interfaces
 */
export interface FloatCounter extends Counter {
    round: () => FloatCounter;
    floor: () => FloatCounter;
}
/**
 * @category Interfaces
 */
export interface Gamescene {
    button_a: () => GJsEvent;
    button_b: () => GJsEvent;
    button_a_end: () => GJsEvent;
    button_b_end: () => GJsEvent;
    hidden_group: any;
}
/**
 * @category Interfaces
 */
export interface Song {
    start: () => void;
    edit: (new_volume?: number, new_speed?: number, duration?: number, stop?: boolean, stop_loop?: boolean, gid_1?: any, gid_2?: any, vol_near?: number, vol_med?: number, vol_far?: number, min_dist?: number, dist_2?: number, dist_3?: number, p1?: boolean, p2?: boolean, cam?: boolean, vol_dir?: number) => void;
    stop: () => void;
}
/**
 * @category Interfaces
 */
export interface OptionsTrigger {
    STREAK_ADDITIVE: (v?: boolean) => void;
    HIDE_GROUND: (v?: boolean) => void;
    HIDE_MG: (v?: boolean) => void;
    HIDE_P1: (v?: boolean) => void;
    HIDE_P2: (v?: boolean) => void;
    DISABLE_CONTROLS_P1: (v?: boolean) => void;
    DISABLE_CONTROLS_P2: (v?: boolean) => void;
    UNLINK_DUAL_GRAVITY: (v?: boolean) => void;
    HIDE_ATTEMPTS: (v?: boolean) => void;
    AUDIO_ON_DEATH: (v?: boolean) => void;
    NO_DEATH_SFX: (v?: boolean) => void;
    RESPAWN_TIME: (v: number) => void;
    add: () => void;
}
/**
 * @category Interfaces
 */
export interface TriggerFunctionGroup {
    value: number;
    type: string;
    call: (delay?: number) => void;
    remap: (...args: any[]) => TriggerFunctionGroup;
    stop: () => void;
}
export declare const expectedPropTypes: Record<string, string | string[]>;
/**
 * extracts values from a dictionary into the global scope.
 * @param {Dictionary} dict dictionary to extract
 * @category Functions
 */
export declare const extract: (dict: Dictionary) => void;
export declare const state: {
    allKnown: KnownIds;
    triggerPositioningAllowed: boolean;
    triggerStartY: number;
    triggerIndex: number;
    cleanupGroupId: number;
    generatedLevelString: string;
    importedLevelString: string;
    levelPrepared: boolean;
    callback_objects_fn: (x: any) => any;
};
export declare const allKnown: KnownIds;
export declare const getNextFreeId: (_current: number, prop: KnownIdKind, push?: boolean) => any;
/**
 * creates and returns an unavailable group id.
 * @returns {any} resulting group id
 * @category Functions
 */
export declare const unknown_g: () => $group;
/**
 * creates and returns an unavailable color id.
 * @returns {any} resulting color id
 * @category Functions
 */
export declare const unknown_c: () => $color;
/**
 * creates and returns an unavailable block id.
 * @returns {any} resulting block id
 * @category Functions
 */
export declare const unknown_b: () => $block;
/**
 * Class allowing you to interfere with contexts, which are wrappers that assign groups to different objects
 */
export declare class Context {
    name: string;
    group: any;
    objects: Dictionary[];
    children: string[];
    linked_to?: string;
    /**
     * Creates a new context
     * @param {string} name Name of context
     * @param {boolean} [setToDefault=false] Whether to automatically switch to the context
     * @param {any} [group=unknown_g()] The group to give to the context
     */
    constructor(name: string, setToDefault?: boolean, group?: $group);
    static last_contexts: Record<string, string>;
    static last_context_children: Record<string, string>;
    /**
     * The name of the current context
     */
    static current: string;
    /**
     * A list of all contexts added
     */
    static list: Record<string, Context>;
    /**
     * Switches the context
     * @param {string|any} name Name or group of context to switch to
     */
    static set(name: string | {
        value: number;
    }): void;
    /**
     * Converts an object into a context
     * @param {Context} context Object to convert into a context
     */
    static add(context: Context): void;
    /**
     * Adds an object into the current context
     * @param {any} objectToAdd Object to add into current context
     */
    static addObject(objectToAdd: any): void;
    /**
     * Links an existing context into the current one, allowing you to find the parent context of another context
     * @param {string} context Context to link into current
     * @param {string} [ctxLink] Optional context that should be the parent of input context
     */
    static link(context: string, ctxLink?: string | undefined): void;
    /**
     * Checks if a context has a parent
     * @param {Context} ctx Context to check for parent
     * @returns {boolean} Whether context has a parent
     */
    static isLinked(ctx: Context): boolean;
    /**
     * Finds a context based off of its assigned group
     * @param {any} groupToSearch
     * @returns {Context} Found context
     */
    static findByGroup(groupToSearch: number | any): Context;
    /**
     * Finds a context based off of its name
     * @returns {Context} Found context
     */
    static findByName(name: string): Context;
}
/**
 * converts a number to a group.
 * @param {number} x - the number to convert to a group.
 * @returns {any}
 * @category Functions
 */
export declare const group_fn: (x: any) => $group;
/**
 * converts a number to a color.
 * @param {number} x - the number to convert to a color.
 * @returns {any}
 * @category Functions
 */
export declare const color_fn: (x: any) => $color;
/**
 * converts a number to a block.
 * @param {number} x - the number to convert to a block.
 * @returns {any}
 * @category Functions
 */
export declare const block_fn: (x: any) => $block;
export declare const registerExplicitTypes: (definitions: any) => void;
/**
 * takes a dictionary with object props and converts it into an object.
 * @param {Dictionary} prop dictionary to convert to object
 * @returns {GJsObject}
 * @category Functions
 */
export declare const object: (dict: Dictionary) => GJsObject;
/**
 * takes a dictionary with object props and converts it into a trigger.
 * @param {Dictionary} dict dictionary to convert to trigger
 * @returns {GJsObject}
 * @category Functions
 */
export declare const trigger: (dict: Dictionary) => GJsObject;
/**
 * Creates a "trigger function" in which triggers can be stored inside of a single group
 * @param {Function} cb Function storing triggers to put inside of group
 * @returns {any} Group ID of trigger function
 * @category Functions
 */
export declare const trigger_function: (cb: (group: any) => void) => any;
/**
 * Waits for X seconds
 * @param {Number} time Amount of seconds to wait
 * @category Functions
 */
export declare const wait: (time: number) => void;
export declare const objectPropNamesById: Dictionary;
/**
 * See [Object Properties](/G.js/documents/Object_Properties.html).
 */
export declare const obj_props: Dictionary;
export declare const dot_separated_keys: string[];
export declare const a_separated_keys: string[];
/**
 * Converts levelstring to a GD object
 * @param string Input levelstring
 * @returns {Dictionary} converted object (unprocessed; type conversions are not done automatically)
 * @category Functions
 */
export declare const levelstring_to_obj: (string: string) => Dictionary[];
/**
 * @category Interfaces
 */
export interface Level {
    objects: any[];
    raw_levelstring: string;
    level_reader?: any;
    get_objects(prop: string | number, pattern: (val: any) => boolean): any[];
}
/**
 * Helper for reading existing level info
 * @see {@link Level}
 */
export declare const level: Level;
export declare const legacyObjectPropMappings: {
    696969: string;
    420420: string;
    6942069: string;
    6969: string;
    42069420: string;
    32984398: string;
    584932: string;
    78534: string;
    45389: string;
    93289: string;
    8754: string;
    8459: string;
    7187327378823: string;
    3478234: string;
    45893: string;
    237894: string;
    347832: string;
    34982398: string;
    4376890: string;
    4895490381243: string;
    45890903: string;
    487999230: string;
    40943900394: string;
    93423877: string;
    8765437289: string;
    645789320: string;
    8765434: string;
    21678934: string;
};
export declare const find_free: (str: string) => void;
/**
 * Converts an object to levelstring
 * @param {GJsObject} object Object to convert to levelstring
 * @returns {String} Output levelstring
 */
export declare const obj_to_levelstring: (l: Dictionary) => string;
export declare const obj_to_levelstring_notype: (l: Dictionary) => string;
export declare const toArray: (value: any) => any[];
export declare const addGroupsToObject: (objectProps: Dictionary, groups: any, forceArray?: boolean) => void;
export declare const removeUndefinedProps: (objectProps: Dictionary) => void;
export declare const isRootContextName: (name: string) => name is "global" | "GLOBAL_FULL";
export declare const add_fn: (...objects: any[]) => void;
export declare const GROUP_LIMIT = 9999;
export declare const indexOfFrom: (array: any[], value: any, startIndex: number) => number;
export declare const optimize: () => void;
/**
 * Parses and manipulates levelstrings, returning helper methods for editing/adding.
 * @param {string} string Input levelstring
 * @category Functions
 */
export declare const levelstring: (string: string) => {
    objects: any[];
    add: () => void;
};
export declare const prep_lvl: (optimize_op?: boolean, replace?: boolean) => void;
export declare const limit = 9999;
export declare const shouldEnforceGroupLimit: (options?: ExportOptions) => boolean;
export declare const assertGroupLimit: (options?: ExportOptions) => void;
export declare const printExportStats: (options?: ExportOptions, levelName?: string | undefined) => void;
export declare const prepareResultingLevelString: (options?: ExportOptions, levelName?: string | undefined) => string;
export declare function exportConfig(conf: ExportConfig): Promise<any>;
export declare const callback_objects: (cb: Function) => void;
export declare const extend_trigger_func: (t: any, cb: (group: any) => void) => void;
export declare const trigger_fn_context: () => any;
export declare const $: {
    add: (...objects: any[]) => void;
    exportConfig: typeof exportConfig;
    print: (...args: any[]) => void;
    callback_objects: (cb: Function) => void;
    extend_trigger_func: (t: any, cb: (group: any) => void) => void;
    trigger_fn_context: () => any;
};
/**
 * Executes a function while preserving the current context (doesn't change contexts).
 * @param {Function} fn Function to execute
 * @category Functions
 */
export declare const ignore_context_change: (fn: Function) => void;
/**
 * Helper for creating a range
 * @param start Start for range
 * @param end End for range
 * @param step How many steps
 * @returns {Array} Output array
 * @category Functions
 */
export declare function range(start: number, end: number, step?: number): number[];
/**
 * Generates HSV string
 * @param hue Hue
 * @param sat Saturation
 * @param bright Brightness
 * @param sat_checked Whether saturation box is checked in-game
 * @param bright_checked Whether brightness box is checked in-game
 * @returns {String} Output HSV string
 * @category Functions
 */
export declare const hsv: (hue: number, sat: number, bright: number, sat_checked?: boolean, bright_checked?: boolean) => string;
/**
 * Converts a speed multiplier into an in-game speed value
 * @param {number} x Input speed multiplier
 * @returns {number}
 * @category Functions
 */
export declare const speed: (x: number) => number;
/**
 * Reverses level direction
 * @category Functions
 */
export declare const reverse: () => void;
/**
 * Creates an RGB triplet
 * @param {number} r Red value
 * @param {number} g Green value
 * @param {number} b Blue value
 * @returns {number[]}
 * @category Functions
 */
export declare const rgb: (r: number, g: number, b: number) => number[];
/**
 * Creates an RGBA quadruplet
 * @param {number} r Red value
 * @param {number} g Green value
 * @param {number} b Blue value
 * @param {number} a Alpha value
 * @returns {number[]}
 * @category Functions
 */
export declare const rgba: (r: number, g: number, b: number, a: number) => number[];
