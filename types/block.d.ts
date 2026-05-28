/**
 * @module block
 */
/**
 * @typedef {object} block
 * @property {function} if_colliding Returns whether the block is colliding with another one
 */
/**
 * Representation of blocks
 * @public
 * @category Types
 */
export declare class $block {
    /**
     * Creates a block from a number
     * @param {number} number Block ID
     * @param {boolean} [specific=true] Whether to disallow G.js from using that specific block again
     */
    constructor(a: any, specific?: boolean);
    /**
     * Returns a collision block object
     * @param {number} x X coordinate of the collision block
     * @param {number} y Y coordinate of the collision block
     * @returns {object} Returned collision block
     */
    collision_block(x: any, y: any): any;
    /**
     *
     * @param {block} b2 Other block to check for collision
     * @param {group} true_id Group to call if colliding with b2
     * @param {group} false_id Group to call if not colliding with b2
     */
    if_colliding(b2: any, true_id?: any, false_id?: any): void;
}
export default $block;
