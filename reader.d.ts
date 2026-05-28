export declare let encode_level: (level_string: any) => string;
export declare let decode_level: (data: any) => string;
export declare class LevelReader {
    data: any;
    set: (lvlstr: string) => void;
    save: () => Promise<void>;
    constructor(level_name: any, filename?: any, reencrypt?: boolean);
}
export declare class SingleLevelReader {
    data: any;
    set: (lvlstr: string) => void;
    add: (lvlstr: string) => void;
    save: (f?: string) => void;
    root: any;
    constructor(filename: any);
}
