/**
 * @module keyframes
 */
let ksys_id = 1;
/**
 * Represents a keyframe system in GD
 * @typedef {object} keyframe_system
 * @property {keyframe} keyframe Creates a single keyframe at a specific position
 * @property {start} start Starts a keyframe system
 * @property {number} anim_id ID of animation
 */
/**
 * Creates a single keyframe at a specific position
 * @callback keyframe
 * @param {number} x X position of keyframe
 * @param {number} y Y position of keyframe
 * @param {number} duration Duration of keyframe
 * @param {boolean} curve Whether to make the keyframe curved
 * @param {boolean} close Whether to set the keyframe as the last one + loop back to first keyframe
 * @param {easing} easing How smoothly the keyframe moves
 */
/**
 * Starts a keyframe system
 * @callback start
 */
/**
 * Creates a keyframe system
 * @param {group} group Group of objects to animate
 * @returns {keyframe_system}
 */
let keyframe_system = (gr, same = false) => {
    let ksys_gr = same ? gr : unknown_g();
    let oi = 0;
    let tksys_id = ksys_id;
    let o = {
        keyframe: (x, y, duration = 0.50, curve = false, close = false, easing = NONE) => {
            let o = {
                OBJ_ID: 3032,
                X: x,
                Y: y,
                DURATION: duration,
                CURVE: curve,
                CLOSE_LOOP: close,
                GROUPS: ksys_gr,
                ANIM_ID: tksys_id,
                EASING: easing,
                524: 1,
                ACTIVE_TRIGGER: 1,
                155: 2
            };
            if (oi > 0) o.ORDER_INDEX = oi;
            $.add(o);
            oi++;
        },
        start: () => {
            $.add({
                OBJ_ID: 3033,
                ANIMATION_GID: ksys_gr,
                TARGET: gr,
                TIME_MOD: 1,
                POSITION_X_MOD: 1,
                POSITION_Y_MOD: 1,
                ROTATION_MOD: 1,
                SCALE_X_MOD: 1,
                SCALE_Y_MOD: 1
            });
        },
        anim_id: ksys_id
    };
    ksys_id++;
    return o
};
module.exports = keyframe_system;