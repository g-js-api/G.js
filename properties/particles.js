// "var" stands for variation, aka += in GD
/**
 * @module particle
 */
/**
 * @typedef {Object} particle_props
 * @property {number} MAX_PARTICLES - Maximum number of particles.
 * @property {number} DURATION - Duration of the particle effect.
 * @property {number} LIFETIME - Lifetime of particles.
 * @property {number} LIFETIME_VAR - Variance in particle lifetime.
 * @property {number} EMISSION - Rate of particle emission.
 * @property {number} ANGLE - Emission angle.
 * @property {number} ANGLE_VAR - Variance in emission angle.
 * @property {number} SPEED - Speed of particles.
 * @property {number} SPEED_VAR - Variance in particle speed.
 * @property {number} POSVAR_X - Variance in particle position along the X axis.
 * @property {number} POSVAR_Y - Variance in particle position along the Y axis.
 * @property {number} GRAVITY_X - Gravity effect on particles along the X axis.
 * @property {number} GRAVITY_Y - Gravity effect on particles along the Y axis.
 * @property {number} ACCEL_RAD - Radial acceleration.
 * @property {number} ACCEL_RAD_VAR - Variance in radial acceleration.
 * @property {number} ACCEL_TAN - Tangential acceleration.
 * @property {number} ACCEL_TAN_VAR - Variance in tangential acceleration.
 * @property {number} START_SIZE - Initial size of particles.
 * @property {number} START_SIZE_VAR - Variance in initial size.
 * @property {number} START_SPIN - Initial spin of particles.
 * @property {number} START_SPIN_VAR - Variance in initial spin.
 * @property {number} START_R - Initial red color value.
 * @property {number} START_R_VAR - Variance in initial red color.
 * @property {number} START_G - Initial green color value.
 * @property {number} START_G_VAR - Variance in initial green color.
 * @property {number} START_B - Initial blue color value.
 * @property {number} START_B_VAR - Variance in initial blue color.
 * @property {number} START_A - Initial alpha (opacity) value.
 * @property {number} START_A_VAR - Variance in initial alpha value.
 * @property {number} END_SIZE - Final size of particles.
 * @property {number} END_SIZE_VAR - Variance in final size.
 * @property {number} END_SPIN - Final spin of particles.
 * @property {number} END_SPIN_VAR - Variance in final spin.
 * @property {number} END_R - Final red color value.
 * @property {number} END_R_VAR - Variance in final red color.
 * @property {number} END_G - Final green color value.
 * @property {number} END_G_VAR - Variance in final green color.
 * @property {number} END_B - Final blue color value.
 * @property {number} END_B_VAR - Variance in final blue color.
 * @property {number} END_A - Final alpha (opacity) value.
 * @property {number} END_A_VAR - Variance in final alpha value.
 * @property {number} FADE_IN - Fade-in duration.
 * @property {number} FADE_IN_VAR - Variance in fade-in duration.
 * @property {number} FADE_OUT - Fade-out duration.
 * @property {number} FADE_OUT_VAR - Variance in fade-out duration.
 * @property {number} START_RAD - Initial radial position.
 * @property {number} START_RAD_VAR - Variance in initial radial position.
 * @property {number} END_RAD - Final radial position.
 * @property {number} END_RAD_VAR - Variance in final radial position.
 * @property {number} ROT_SEC - Rotation per second.
 * @property {number} ROT_SEC_VAR - Variance in rotation per second.
 * @property {number} GRAVITY_RADIUS - Radius for gravity effect.
 * @property {number} FREE_RELATIVE_GROUPED - Indicates if particles are free, relative, or grouped.
 * @property {number} ADDITIVE - Indicates if additive blending is used.
 * @property {number} START_SPIN_END - Indicates if the initial spin is used at the end.
 * @property {number} START_ROT_IS_DIR - Indicates if the initial rotation is the direction.
 * @property {number} DYNAMIC_ROTATION - Indicates if dynamic rotation is applied.
 * @property {number} TEXTURE - Texture used for particles.
 * @property {number} UNIFORM_OBJ_COLOR - Uniform object color flag.
 * @property {number} FRICTION_P - Friction parallel to direction of movement.
 * @property {number} FRICTION_P_VAR - Variance in parallel friction.
 * @property {number} RESPAWN - Respawn rate of particles.
 * @property {number} RESPAWN_VAR - Variance in respawn rate.
 * @property {number} ORDER_SENSITIVE - Indicates if the order of particles is sensitive.
 * @property {number} START_SIZE_END - Indicates if the start size is used at the end.
 * @property {number} START_RAD_END - Indicates if the initial radial position is used at the end.
 * @property {number} START_RGB_VAR_SYNC - Sync variance in initial RGB values.
 * @property {number} END_RGB_VAR_SYNC - Sync variance in final RGB values.
 * @property {number} FRICTION_S - Friction perpendicular to direction of movement.
 * @property {number} FRICTION_S_VAR - Variance in perpendicular friction.
 * @property {number} FRICTION_R - Rotational friction.
 * @property {number} FRICTION_R_VAR - Variance in rotational friction.
 */
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
console.log(d_parts)
module.exports = d_parts;
