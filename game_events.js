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