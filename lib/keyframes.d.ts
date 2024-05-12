/**
 * Represents a keyframe system in GD
 */
declare interface keyframe_system {
    /**
     * Creates a single keyframe at a specific position
     */
    keyframe: keyframe;
    /**
     * Starts a keyframe system
     */
    start: start;
    /**
     * ID of animation
     */
    anim_id: number;
}

/**
 * Creates a single keyframe at a specific position
 * @param x X position of keyframe
 * @param y Y position of keyframe
 * @param duration Duration of keyframe
 * @param curve Whether to make the keyframe curved
 * @param close Whether to set the keyframe as the last one + loop back to first keyframe
 * @param easing How smoothly the keyframe moves
 */
declare type keyframe = (x: number, y: number, duration: number, curve: boolean, close: boolean, easing: easing)=>void;

/**
 * Starts a keyframe system
 */
declare type start = ()=>void;

