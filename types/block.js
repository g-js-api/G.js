/**
 * @typedef {object} block
 * @property {function} if_colliding Returns whether the block is colliding with another one
 */
/**
 * Representation of blocks
 * @class
 * @constructor
 * @public
 */
class $block {
    /**
     * Creates a block from a number
     * @param {number} number Block ID
     * @param {boolean} [specific=true] Whether to disallow G.js from using that specific block again
     */
    constructor(a, specific = true) {
      this.value = a;
      this.type = 'block';
      if (specific) all_known.blocks.push(a);
    }
    /**
     * 
     * @param {block} b2 Other block to check for collision
     * @param {group} true_id Group to call if colliding with b2
     * @param {group} false_id Group to call if not colliding with b2
     */
    if_colliding(b2, true_id = group(0), false_id = group(0)) {
      let j = {
        OBJ_ID: 3609,
        BLOCK_A: this,
        BLOCK_B: b2
      };
      if (true_id) j.TRUE_ID = true_id;
      if (false_id) j.FALSE_ID = false_id;
      $.add(j);
    }
  }