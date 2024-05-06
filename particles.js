// "var" stands for variation, aka += in GD
let parts = [
    'MAX_PARTICLES',
    'DURATION',
    'LIFETIME',
    'LIFETIME_VAR',
    'EMISSION',
    'ANGLE',
    'ANGLE_VAR',
    'SPEED',
    'SPEED_VAR',
    'POSVAR_X',
    'POSVAR_Y',
    'GRAVITY_X',
    'GRAVITY_Y',
    'ACCEL_RAD',
    'ACCEL_RAD_VAR',
    'ACCEL_TAN',
    'ACCEL_TAN_VAR',
    'START_SIZE',
    'START_SIZE_VAR',
    'START_SPIN',
    'START_SPIN_VAR',
    'START_R',
    'START_R_VAR',
    'START_G',
    'START_G_VAR',
    'START_B',
    'START_B_VAR',
    'START_A',
    'START_A_VAR',
    'END_SIZE',
    'END_SIZE_VAR',
    'END_SPIN',
    'END_SPIN_VAR',
    'END_R',
    'END_R_VAR',
    'END_G',
    'END_G_VAR',
    'END_B',
    'END_B_VAR',
    'END_A',
    'END_A_VAR',
    'FADE_IN',
    'FADE_IN_VAR',
    'FADE_OUT',
    'FADE_OUT_VAR',
    'START_RAD',
    'START_RAD_VAR',
    'END_RAD',
    'END_RAD_VAR',
    'ROT_SEC',
    'ROT_SEC_VAR',
    'GRAVITY_RADIUS',
    'FREE_RELATIVE_GROUPED',
    'ADDITIVE',
    'START_SPIN_END',
    'START_ROT_IS_DIR',
    'DYNAMIC_ROTATION',
    'TEXTURE',
    'UNIFORM_OBJ_COLOR',
    'FRICTION_P',
    'FRICTION_P_VAR',
    'RESPAWN',
    'RESPAWN_VAR',
    'ORDER_SENSITIVE',
    'START_SIZE_END',
    'START_RAD_END',
    'START_RGB_VAR_SYNC',
    'END_RGB_VAR_SYNC',
    'FRICTION_S',
    'FRICTION_S_VAR',
    'FRICTION_R',
    'FRICTON_R_VAR'
];
let d_parts = {};
parts.forEach((x, i) => d_parts[x] = i);
// Convert object to Markdown table
function objectToMarkdownTable(obj, key, val) {
    let markdown = `| ${key} | ${val} |\n`;
    markdown += '| --- | ----- |\n';

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            markdown += `| ${key} | ${obj[key]} |\n`;
        }
    }

    return markdown;
}
const markdownTable = objectToMarkdownTable(d_parts, 'Particle Property Name', 'Particle Property ID');
require('fs').writeFileSync('particle_docs.md', markdownTable);
module.exports = d_parts;
