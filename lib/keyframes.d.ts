/**
 * Implementation of keyframe system
 * @returns {any} Resulting keyframe system
 * @category Functions
 * @group Keyframes
 */
declare const keyframe_system: () => {
    keyframe: (x: any, y: any, rotation: any, scale_x: any, scale_y: any, duration?: number, easing?: number) => import("../core").GJsObject;
    animate: (target: any, keyframes: any, duration?: number, easing?: number) => import("../core").GJsObject;
};
export default keyframe_system;
