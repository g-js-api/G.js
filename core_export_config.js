"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportConfig = void 0;
const ws_1 = __importDefault(require("ws"));
const reader_1 = require("./reader");
const core_1 = require("./core");
/**
 * One-size-fits-all function for exporting a level to GD
 * @param {ExportConfig} conf Configuration for exporting level
 * @returns {Promise<null|string>} Levelstring if using "levelstring" type, otherwise null
 */
const exportConfig = (conf) => new Promise(async (resolve, reject) => {
    try {
        if (!conf || typeof conf !== 'object') {
            throw new Error('exportConfig requires a configuration object.');
        }
        const options = conf.options ?? {};
        conf.options = options;
        core_1.state.triggerPositioningAllowed = options.triggerPositioningAllowed ?? true;
        core_1.state.triggerStartY = options.trigger_pos_start ?? 6000;
        if (options.replacePastObjects === undefined) {
            options.replacePastObjects = true;
        }
        if (options.removeGroup !== undefined) {
            core_1.state.cleanupGroupId = typeof options.removeGroup === 'number' ? options.removeGroup : options.removeGroup?.value;
        }
        const remove_past_objects = (lvlstring) => {
            return lvlstring.split(';').filter(x => {
                let keep = true;
                const spl = x.split(',');
                spl.forEach((z, i) => {
                    if (!(i % 2)) {
                        if (z === "57") {
                            let groups = spl[i + 1];
                            if (groups.includes('.')) {
                                groups = groups.split('.');
                                if (groups.includes(core_1.state.cleanupGroupId.toString())) {
                                    keep = false;
                                }
                            }
                            else {
                                if (groups === core_1.state.cleanupGroupId.toString()) {
                                    keep = false;
                                }
                            }
                        }
                    }
                });
                return keep;
            }).join(';');
        };
        const group_arr = (arr, x) => arr.reduce((acc, _, i) => (i % x ? acc[acc.length - 1].push(arr[i]) : acc.push([arr[i]]), acc), []);
        switch (conf.type) {
            case 'levelstring':
                resolve((0, core_1.prepareResultingLevelString)(options));
                return;
            case 'savefile': {
                const sf_level = await new reader_1.LevelReader(options?.level_name, options?.path, options?.reencrypt);
                core_1.level.level_reader = sf_level;
                if (!sf_level.data.levelstring)
                    throw new Error(`Level "${sf_level.data.name}" has not been initialized, add any object to initialize the level then rerun this script`);
                let last = options.replacePastObjects ? remove_past_objects(sf_level.data.levelstring) : sf_level.data.levelstring;
                (0, core_1.find_free)(last);
                resolve(true);
                process.on('beforeExit', error => {
                    if (!error) {
                        last += (0, core_1.prepareResultingLevelString)(options, sf_level.data.name);
                        sf_level.set(last);
                        sf_level.save();
                        process.exit(0);
                    }
                });
                return;
            }
            case 'gmd': {
                const sf_level_gmd = await new reader_1.SingleLevelReader(options?.path);
                core_1.level.level_reader = sf_level_gmd;
                if (!sf_level_gmd.data.levelstring)
                    throw new Error(`Level "${sf_level_gmd.data.name}" has not been initialized, add any object to initialize the level then rerun this script`);
                let last_gmd = options.replacePastObjects ? remove_past_objects(sf_level_gmd.data.levelstring) : sf_level_gmd.data.levelstring;
                (0, core_1.find_free)(last_gmd);
                resolve(true);
                process.on('beforeExit', error => {
                    if (!error) {
                        last_gmd += (0, core_1.prepareResultingLevelString)(options, sf_level_gmd.data.name);
                        sf_level_gmd.set(last_gmd);
                        sf_level_gmd.save(options?.gmdOutput);
                        process.exit(0);
                    }
                });
                return;
            }
            case 'live_editor': {
                const socket = new ws_1.default('ws://127.0.0.1:1313');
                socket.addEventListener('message', (event) => {
                    event = JSON.parse(event.data);
                    if (event.response) {
                        (0, core_1.find_free)(event.response.split(';').slice(1).join(';'));
                        core_1.level.raw_levelstring = event.response;
                        resolve(true);
                    }
                    if (event.status !== 'successful')
                        throw new Error(`Live editor failed, ${event.error}: ${event.message}`);
                });
                socket.addEventListener('open', () => {
                    if (options.replacePastObjects) {
                        socket.send(JSON.stringify({
                            action: 'REMOVE_OBJECTS',
                            group: core_1.state.cleanupGroupId,
                        }));
                    }
                    socket.send(JSON.stringify({
                        action: 'GET_LEVEL_STRING',
                        close: true
                    }));
                    process.on('beforeExit', error => {
                        if (!error) {
                            const socket2 = new ws_1.default('ws://127.0.0.1:1313');
                            socket2.addEventListener('message', (event) => {
                                event = JSON.parse(event.data);
                                if (event.response) {
                                    (0, core_1.find_free)(event.response.split(';').slice(1).join(';'));
                                }
                                if (event.status !== 'successful')
                                    throw new Error(`Live editor failed, ${event.error}: ${event.message}`);
                            });
                            socket2.addEventListener('open', async () => {
                                const pre_lvlstr = await (0, exports.exportConfig)({ type: 'levelstring', options });
                                const lvlString = group_arr(pre_lvlstr.split(';'), 250).map(x => x.join(';'));
                                lvlString.forEach((chunk, i) => {
                                    setTimeout(() => {
                                        socket2.send(JSON.stringify({
                                            action: 'ADD_OBJECTS',
                                            objects: chunk + ';',
                                            close: i === lvlString.length - 1
                                        }));
                                        if (i === lvlString.length - 1)
                                            process.exit(0);
                                    }, i * 75);
                                });
                            });
                        }
                    });
                });
                socket.addEventListener('error', () => {
                    throw new Error('Connecting to WSLiveEditor failed. Make sure you have installed the WSLiveEditor mod inside of Geode and have the editor open.');
                });
                return;
            }
            default:
                throw new Error(`The "${conf.type}" configuration type is not valid!`);
        }
    }
    catch (error) {
        reject(error);
    }
});
exports.exportConfig = exportConfig;
