/**
 * @module keyframes
 */
import { trigger } from '../core';

/**
 * Implementation of keyframe system
 * @returns {any} Resulting keyframe system
 * @category Functions
 * @group Keyframes
 */
const keyframe_system = () => {
    return {
        keyframe: (x, y, rotation, scale_x, scale_y, duration = 0, easing = 0) => {
            return trigger({
                OBJ_ID: 3032,
                X: x,
                Y: y,
                ROTATION: rotation,
                SCALE_X: scale_x,
                SCALE_Y: scale_y,
                DURATION: duration,
                EASING: easing,
            });
        },
        animate: (target, keyframes, duration = 0, easing = 0) => {
            return trigger({
                OBJ_ID: 3033,
                TARGET: target,
                KEYFRAMES: keyframes.map(x => x.obj_props.OBJ_ID).join('.'),
                DURATION: duration,
                EASING: easing,
            });
        }
    };
};

export default keyframe_system;
