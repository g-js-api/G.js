/**
 * @module events
 */
/**
 * @typedef {object} events
 * @property {number} NONE
 * @property {number} TINY_LANDING
 * @property {number} FEATHER_LANDING
 * @property {number} SOFT_LANDING
 * @property {number} NORMAL_LANDING
 * @property {number} HARD_LANDING
 * @property {number} HIT_HEAD
 * @property {number} ORB_TOUCHED
 * @property {number} ORB_ACTIVATED
 * @property {number} PAD_ACTIVATED
 * @property {number} GRAVITY_INVERTED
 * @property {number} GRAVITY_RESTORED
 * @property {number} NORMAL_JUMP
 * @property {number} ROBOT_BOOST_START
 * @property {number} ROBOT_BOOST_STOP
 * @property {number} UFO_JUMP
 * @property {number} SHIP_BOOST_START
 * @property {number} SHIP_BOOST_END
 * @property {number} SPIDER_TELEPORT
 * @property {number} BALL_SWITCH
 * @property {number} SWING_SWITCH
 * @property {number} WAVE_PUSH
 * @property {number} WAVE_RELEASE
 * @property {number} DASH_START
 * @property {number} DASH_STOP
 * @property {number} TELEPORTED
 * @property {number} PORTAL_NORMAL
 * @property {number} PORTAL_SHIP
 * @property {number} PORTAL_BALL
 * @property {number} PORTAL_UFO
 * @property {number} PORTAL_WAVE
 * @property {number} PORTAL_ROBOT
 * @property {number} PORTAL_SPIDER
 * @property {number} PORTAL_SWING
 * @property {number} YELLOW_ORB
 * @property {number} PINK_ORB
 * @property {number} RED_ORB
 * @property {number} GRAVITY_ORB
 * @property {number} GREEN_ORB
 * @property {number} DROP_ORB
 * @property {number} CUSTOM_ORB
 * @property {number} DASH_ORB
 * @property {number} GRAVITY_DASH_ORB
 * @property {number} SPIDER_ORB
 * @property {number} TELEPORT_ORB
 * @property {number} YELLOW_PAD
 * @property {number} PINK_PAD
 * @property {number} RED_PAD
 * @property {number} GRAVITY_PAD
 * @property {number} SPIDER_PAD
 * @property {number} PORTAL_GRAVITY_FLIP
 * @property {number} PORTAL_GRAVITY_NORMAL
 * @property {number} PORTAL_GRAVITY_INVERT
 * @property {number} PORTAL_FLIP
 * @property {number} PORTAL_UNFLIP
 * @property {number} PORTAL_NORMAL_SCALE
 * @property {number} PORTAL_MINI_SCALE
 * @property {number} PORTAL_DUAL_ON
 * @property {number} PORTAL_DUAL_OFF
 * @property {number} PORTAL_TELEPORT
 * @property {number} CHECKPOINT
 * @property {number} DESTROY_BLOCK
 * @property {number} USER_COIN
 * @property {number} PICKUP_ITEM
 * @property {number} CHECKPOINT_RESPAWN
 * @property {number} FALL_LOW
 * @property {number} FALL_MED
 * @property {number} FALL_HIGH
 * @property {number} FALL_VHIGH
 * @property {number} JUMP_PUSH
 * @property {number} JUMP_RELEASE
 * @property {number} LEFT_PUSH
 * @property {number} LEFT_RELEASE
 * @property {number} RIGHT_PUSH
 * @property {number} RIGHT_RELEASE
 * @property {number} PLAYER_REVERSED
 * @property {number} FALL_SPEED_LOW
 * @property {number} FALL_SPEED_MED
 * @property {number} FALL_SPEED_HIGH
 */
let events = [
	"NONE",
	"TINY_LANDING",
	"FEATHER_LANDING",
	"SOFT_LANDING",
	"NORMAL_LANDING",
	"HARD_LANDING",
	"HIT_HEAD",
	"ORB_TOUCHED",
	"ORB_ACTIVATED",
	"PAD_ACTIVATED",
	"GRAVITY_INVERTED",
	"GRAVITY_RESTORED",
	"NORMAL_JUMP",
	"ROBOT_BOOST_START",
	"ROBOT_BOOST_STOP",
	"UFO_JUMP",
	"SHIP_BOOST_START",
	"SHIP_BOOST_END",
	"SPIDER_TELEPORT",
	"BALL_SWITCH",
	"SWING_SWITCH",
	"WAVE_PUSH",
	"WAVE_RELEASE",
	"DASH_START",
	"DASH_STOP",
	"TELEPORTED",
	"PORTAL_NORMAL",
	"PORTAL_SHIP",
	"PORTAL_BALL",
	"PORTAL_UFO",
	"PORTAL_WAVE",
	"PORTAL_ROBOT",
	"PORTAL_SPIDER",
	"PORTAL_SWING",
	"YELLOW_ORB",
	"PINK_ORB",
	"RED_ORB",
	"GRAVITY_ORB",
	"GREEN_ORB",
	"DROP_ORB",
	"CUSTOM_ORB",
	"DASH_ORB",
	"GRAVITY_DASH_ORB",
	"SPIDER_ORB",
	"TELEPORT_ORB",
	"YELLOW_PAD",
	"PINK_PAD",
	"RED_PAD",
	"GRAVITY_PAD",
	"SPIDER_PAD",
	"PORTAL_GRAVITY_FLIP",
	"PORTAL_GRAVITY_NORMAL",
	"PORTAL_GRAVITY_INVERT",
	"PORTAL_FLIP",
	"PORTAL_UNFLIP",
	"PORTAL_NORMAL_SCALE",
	"PORTAL_MINI_SCALE",
	"PORTAL_DUAL_ON",
	"PORTAL_DUAL_OFF",
	"PORTAL_TELEPORT",
	"CHECKPOINT",
	"DESTROY_BLOCK",
	"USER_COIN",
	"PICKUP_ITEM",
	"CHECKPOINT_RESPAWN",
	"FALL_LOW",
	"FALL_MED",
	"FALL_HIGH",
	"FALL_VHIGH",
	"JUMP_PUSH",
	"JUMP_RELEASE",
	"LEFT_PUSH",
	"LEFT_RELEASE",
	"RIGHT_PUSH",
	"RIGHT_RELEASE",
	"PLAYER_REVERSED",
	"FALL_SPEED_LOW",
	"FALL_SPEED_MED",
	"FALL_SPEED_HIGH"
];
let d_evs = {};
events.forEach((x, i) => d_evs[x] = i);
module.exports = d_evs;