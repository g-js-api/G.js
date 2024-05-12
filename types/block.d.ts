declare interface block {
    /**
     * Returns whether the block is colliding with another one
     */
    if_colliding: Function;
}

declare class $block {
    /**
     * Representation of blocks
     */
    constructor(number: number, specific?: boolean);

    /**
     * 
     * @param b2 Other block to check for collision
     * @param true_id Group to call if colliding with b2
     * @param false_id Group to call if not colliding with b2
     */
    if_colliding(b2: block, true_id: group, false_id: group): void;

}

