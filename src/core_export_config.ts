import WebSocket from 'ws';
import {
    LevelReader, SingleLevelReader
} from './reader';
import {
    state, find_free, prepareResultingLevelString, level
} from './core';
import type { ExportConfig } from './core';

/**
 * One-size-fits-all function for exporting a level to GD
 * @param {ExportConfig} conf Configuration for exporting level
 * @returns {Promise<null|string>} Levelstring if using "levelstring" type, otherwise null
 */
export const exportConfig = (conf: ExportConfig) => new Promise<any>(async (resolve, reject) => {
    try {
        if (!conf || typeof conf !== 'object') {
            throw new Error('exportConfig requires a configuration object.');
        }

        const options = conf.options ?? {};
        conf.options = options;
        state.triggerPositioningAllowed = options.triggerPositioningAllowed ?? true;
        state.triggerStartY = options.trigger_pos_start ?? 6000;

        if (options.replacePastObjects === undefined) {
            options.replacePastObjects = true;
        }

        if (options.removeGroup !== undefined) {
            state.cleanupGroupId = typeof options.removeGroup === 'number' ? options.removeGroup : (options.removeGroup as any)?.value;
        }

        const remove_past_objects = (lvlstring: string) => {
            return lvlstring.split(';').filter(x => {
                let keep = true;
                const spl = x.split(',');
                spl.forEach((z, i) => {
                    if (!(i % 2)) {
                        if (z === "57") {
                            let groups: string | string[] = spl[i + 1];
                            if (groups.includes('.')) {
                                (groups as any) = groups.split('.');
                                if ((groups as any).includes(state.cleanupGroupId.toString())) {
                                    keep = false;
                                }
                            } else {
                                if (groups === state.cleanupGroupId.toString()) {
                                    keep = false;
                                }
                            }
                        }
                    }
                })
                return keep;
            }).join(';');
        };

        const group_arr = (arr: any[], x: number) => arr.reduce((acc, _, i) => (i % x ? acc[acc.length - 1].push(arr[i]) : acc.push([arr[i]]), acc), []);

        switch (conf.type) {
            case 'levelstring':
                resolve(prepareResultingLevelString(options));
                return;

            case 'savefile': {
                const sf_level = await new LevelReader(options?.level_name, options?.path, options?.reencrypt);
                level.level_reader = sf_level;
                if (!sf_level.data.levelstring) throw new Error(`Level "${sf_level.data.name}" has not been initialized, add any object to initialize the level then rerun this script`);

                let last = options.replacePastObjects ? remove_past_objects(sf_level.data.levelstring) : sf_level.data.levelstring;
                find_free(last);
                resolve(true);

                process.on('beforeExit', error => {
                    if (!error) {
                        last += prepareResultingLevelString(options, sf_level.data.name);
                        sf_level.set(last);
                        sf_level.save();
                        process.exit(0);
                    }
                });
                return;
            }

            case 'gmd': {
                const sf_level_gmd = await new SingleLevelReader(options?.path);
                level.level_reader = sf_level_gmd;
                if (!sf_level_gmd.data.levelstring) throw new Error(`Level "${sf_level_gmd.data.name}" has not been initialized, add any object to initialize the level then rerun this script`);

                let last_gmd = options.replacePastObjects ? remove_past_objects(sf_level_gmd.data.levelstring) : sf_level_gmd.data.levelstring;
                find_free(last_gmd);
                resolve(true);

                process.on('beforeExit', error => {
                    if (!error) {
                        last_gmd += prepareResultingLevelString(options, sf_level_gmd.data.name);
                        sf_level_gmd.set(last_gmd);
                        sf_level_gmd.save(options?.gmdOutput);
                        process.exit(0);
                    }
                });
                return;
            }

            case 'live_editor': {
                const socket = new WebSocket('ws://127.0.0.1:1313');
                socket.addEventListener('message', (event) => {
                    (event as any) = JSON.parse((event as any).data);
                    if ((event as any).response) {
                        find_free((event as any).response.split(';').slice(1).join(';'));
                        level.raw_levelstring = (event as any).response;
                        resolve(true);
                    }
                    if ((event as any).status !== 'successful') throw new Error(`Live editor failed, ${(event as any).error}: ${(event as any).message}`);
                });

                socket.addEventListener('open', () => {
                    if (options.replacePastObjects) {
                        socket.send(JSON.stringify({
                            action: 'REMOVE_OBJECTS',
                            group: state.cleanupGroupId,
                        }));
                    }

                    socket.send(JSON.stringify({
                        action: 'GET_LEVEL_STRING',
                        close: true
                    }));

                    process.on('beforeExit', error => {
                        if (!error) {
                            const socket2 = new WebSocket('ws://127.0.0.1:1313');
                            socket2.addEventListener('message', (event) => {
                                (event as any) = JSON.parse((event as any).data);
                                if ((event as any).response) {
                                    find_free((event as any).response.split(';').slice(1).join(';'));
                                }
                                if ((event as any).status !== 'successful') throw new Error(`Live editor failed, ${(event as any).error}: ${(event as any).message}`);
                            });

                            socket2.addEventListener('open', async () => {
                                const pre_lvlstr = await exportConfig({ type: 'levelstring', options });
                                const lvlString = group_arr(pre_lvlstr.split(';'), 250).map(x => x.join(';'));

                                lvlString.forEach((chunk, i) => {
                                    setTimeout(() => {
                                        socket2.send(JSON.stringify({
                                            action: 'ADD_OBJECTS',
                                            objects: chunk + ';',
                                            close: i === lvlString.length - 1
                                        }));
                                        if (i === lvlString.length - 1) process.exit(0);
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
    } catch (error) {
        reject(error);
    }
});
