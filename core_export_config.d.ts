import type { ExportConfig } from './core';
/**
 * One-size-fits-all function for exporting a level to GD
 * @param {ExportConfig} conf Configuration for exporting level
 * @returns {Promise<null|string>} Levelstring if using "levelstring" type, otherwise null
 */
export declare const exportConfig: (conf: ExportConfig) => Promise<any>;
