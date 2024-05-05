## Members

<dl>
<dt><a href="#stored_classes">stored_classes</a> ⇒ <code>object</code></dt>
<dd><p>Creates a spawn trigger and returns it</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#extract">extract(object)</a></dt>
<dd><p>Extracts values from object into global scope</p>
</dd>
<dt><a href="#unknown_g">unknown_g()</a> ⇒ <code>object</code></dt>
<dd><p>Creates and returns an unavailable group ID</p>
</dd>
<dt><a href="#unknown_c">unknown_c()</a> ⇒ <code>object</code></dt>
<dd><p>Creates and returns an unavailable color ID</p>
</dd>
<dt><a href="#unknown_b">unknown_b()</a> ⇒ <code>object</code></dt>
<dd><p>Creates and returns an unavailable block ID</p>
</dd>
<dt><a href="#trigger_function">trigger_function(callback)</a> ⇒ <code>object</code></dt>
<dd><p>Creates a &quot;trigger function&quot; in which triggers can be stored inside of a single group</p>
</dd>
<dt><a href="#camera_offset">camera_offset(x, y, [duration])</a></dt>
<dd><p>Offsets the camera by a position</p>
</dd>
<dt><a href="#camera_static">camera_static(group, [duration], [easing], [exit_instant], [exit_static], [smooth_vel], [smooth_vel_mod], [follow], [x_only], [x_only])</a></dt>
<dd><p>Makes the camera static around a target object (group ID)</p>
</dd>
<dt><a href="#camera_zoom">camera_zoom(zoom_amount, [duration], [easing])</a></dt>
<dd></dd>
<dt><a href="#camera_mode">camera_mode([free_mode], [disable_grid_snap], [edit_cam], [easing], [padding])</a></dt>
<dd><p>Toggles free mode</p>
</dd>
<dt><a href="#camera_rotate">camera_rotate(degrees, [move_time], [easing], [add], [snap360])</a></dt>
<dd><p>Rotates camera</p>
</dd>
<dt><a href="#camera_edge">camera_edge(id, edge)</a></dt>
<dd><p>Makes one of the camera&#39;s edges a specific target object</p>
</dd>
<dt><a href="#teleport">teleport(id, edge)</a></dt>
<dd><p>Makes one of the camera&#39;s edges a specific target object</p>
</dd>
<dt><a href="#move_trigger">move_trigger(id, x, Y)</a> ⇒ <code>object</code></dt>
<dd><p>Adds a move trigger and returns it</p>
</dd>
<dt><a href="#particle_system">particle_system(props, [use_obj_color], [animate_on_trigger], [animate_active_only], [quick_start])</a> ⇒ <code>object</code></dt>
<dd><p>Creates a particle system</p>
</dd>
<dt><a href="#timewarp">timewarp(value)</a></dt>
<dd><p>Warps all time by given amount</p>
</dd>
<dt><a href="#color_trigger">color_trigger(channel, r, g, b, [duration], [opacity], [blending])</a></dt>
<dd><p>Creates color trigger</p>
</dd>
<dt><a href="#range">range(start, end, step)</a> ⇒ <code>array</code></dt>
<dd><p>Generates an array holding a sequence of numbers starting at the &quot;start&quot; parameter, ending at the &quot;end&quot; parameter and incrementing by &quot;step&quot;</p>
</dd>
<dt><a href="#item_edit">item_edit(item1, item2, target, type1, type2, target_type, assign_op, op1, op2, mod, absn1, absn2, rfc1, rfc2)</a> ⇒ <code>object</code></dt>
<dd><p>Implementation of Item Edit trigger</p>
</dd>
<dt><a href="#item_comp">item_comp(item_1, item_2, type1, type2, compare_op, truei, falsei, mod1, mod2, tol, op_1, op_2, absneg_1, absneg_2, rfc1, rfc2)</a> ⇒ <code>object</code></dt>
<dd><p>Implementation of Item Comp trigger</p>
</dd>
<dt><a href="#while_loop">while_loop(condition, func, delay)</a></dt>
<dd><p>Creates a repeating trigger system that repeats while a condition is true</p>
</dd>
<dt><a href="#hide_player">hide_player()</a></dt>
<dd><p>Hides player</p>
</dd>
<dt><a href="#call_with_delay">call_with_delay(delay, group)</a></dt>
<dd><p>Calls a group with a delay</p>
</dd>
<dt><a href="#for_loop">for_loop(range, fn, [delay])</a></dt>
<dd><p>Loops a function a specific amount of times (defined by range)</p>
</dd>
<dt><a href="#remappable">remappable(fn)</a> ⇒ <code>function</code></dt>
<dd><p>Creates trigger function-like systems, but can be called normally with item IDs as arguments (e.g. a remappable can be called like <code>my_remappable(counter1.item)</code>)</p>
</dd>
<dt><a href="#end">end(instant_end, no_effects, no_sfx, spawn_id, target_pos)</a></dt>
<dd><p>Ends level</p>
</dd>
<dt><a href="#player_control">player_control(p1, p2, stop_jump, stop_move, stop_rot, stop_slide)</a></dt>
<dd><p>Implementation of player control trigger</p>
</dd>
</dl>

<a name="stored_classes"></a>

## stored\_classes ⇒ <code>object</code>
Creates a spawn trigger and returns it

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>object</code> | group to be spawned |
| time | <code>object</code> | delay to spawn group |

<a name="extract"></a>

## extract(object)
Extracts values from object into global scope

**Kind**: global function  

| Param | Type |
| --- | --- |
| object | <code>object</code> | 

<a name="unknown_g"></a>

## unknown\_g() ⇒ <code>object</code>
Creates and returns an unavailable group ID

**Kind**: global function  
**Returns**: <code>object</code> - Resulting block ID  
<a name="unknown_c"></a>

## unknown\_c() ⇒ <code>object</code>
Creates and returns an unavailable color ID

**Kind**: global function  
**Returns**: <code>object</code> - Resulting color ID  
<a name="unknown_b"></a>

## unknown\_b() ⇒ <code>object</code>
Creates and returns an unavailable block ID

**Kind**: global function  
**Returns**: <code>object</code> - Resulting block ID  
<a name="trigger_function"></a>

## trigger\_function(callback) ⇒ <code>object</code>
Creates a "trigger function" in which triggers can be stored inside of a single group

**Kind**: global function  
**Returns**: <code>object</code> - Group ID of trigger function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function storing triggers to put inside of group |

<a name="camera_offset"></a>

## camera\_offset(x, y, [duration])
Offsets the camera by a position

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>x</code> |  | X offset of camera |
| y | <code>y</code> |  | X offset of camera |
| [duration] | <code>duration</code> | <code>0</code> | Duration that it takes for camera position to change |

<a name="camera_static"></a>

## camera\_static(group, [duration], [easing], [exit_instant], [exit_static], [smooth_vel], [smooth_vel_mod], [follow], [x_only], [x_only])
Makes the camera static around a target object (group ID)

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| group | <code>object</code> |  | Group storing object to be the center of camera |
| [duration] | <code>number</code> | <code>0</code> | Duration that it takes for camera to be centered around object |
| [easing] | <code>number</code> | <code>NONE</code> | How smoothly the camera moves to the object |
| [exit_instant] | <code>boolean</code> | <code>false</code> | Stops static instantly |
| [exit_static] | <code>boolean</code> | <code>false</code> | Stops static |
| [smooth_vel] | <code>boolean</code> | <code>false</code> | Makes transition to target adapt to current camera velocity (no easing recommended) |
| [smooth_vel_mod] | <code>number</code> | <code>0</code> | Modifier for smooth velocity |
| [follow] | <code>boolean</code> | <code>false</code> | Makes camera change according to object movement |
| [x_only] | <code>boolean</code> | <code>false</code> | Makes the camera only be static on X axis |
| [x_only] | <code>boolean</code> | <code>false</code> | Makes the camera only be static on Y axis |

<a name="camera_zoom"></a>

## camera\_zoom(zoom_amount, [duration], [easing])
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| zoom_amount | <code>number</code> |  | Amount to zoom the camera in by |
| [duration] | <code>number</code> | <code>0</code> | How long it takes for camera to zoom in |
| [easing] | <code>number</code> | <code>NONE</code> | How smoothly the camera zooms in |

<a name="camera_mode"></a>

## camera\_mode([free_mode], [disable_grid_snap], [edit_cam], [easing], [padding])
Toggles free mode

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [free_mode] | <code>boolean</code> | <code>true</code> | Whether to toggle free mode on or off |
| [disable_grid_snap] | <code>boolean</code> | <code>false</code> | Removes default snapping to nearest grid space for the camera center |
| [edit_cam] | <code>boolean</code> | <code>false</code> | Whether to edit camera settings |
| [easing] | <code>number</code> | <code>10</code> | Easing for camera movement (requires edit_cam to be true) |
| [padding] | <code>number</code> | <code>0.50</code> | Padding for camera movement (requires edit_cam to be true) |

<a name="camera_rotate"></a>

## camera\_rotate(degrees, [move_time], [easing], [add], [snap360])
Rotates camera

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| degrees | <code>number</code> |  | How many degrees to rotate camera by |
| [move_time] | <code>number</code> | <code>0</code> | How fast rotation happens |
| [easing] | <code>number</code> | <code>NONE</code> | How smooth rotation happens |
| [add] | <code>boolean</code> | <code>false</code> | Adds input rotation to current camera rotation |
| [snap360] | <code>boolean</code> | <code>false</code> | Converts rotation to closest 360 |

<a name="camera_edge"></a>

## camera\_edge(id, edge)
Makes one of the camera's edges a specific target object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>object</code> | Group ID of target object |
| edge | <code>number</code> | Defines the edge to set (LEFT_EDGE, RIGHT_EDGE, UP_EDGE, DOWN_EDGE) |

<a name="teleport"></a>

## teleport(id, edge)
Makes one of the camera's edges a specific target object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>object</code> | Group ID of target object |
| edge | <code>number</code> | Defines the edge to set (LEFT_EDGE, RIGHT_EDGE, UP_EDGE, DOWN_EDGE) |

<a name="move_trigger"></a>

## move\_trigger(id, x, Y) ⇒ <code>object</code>
Adds a move trigger and returns it

**Kind**: global function  
**Returns**: <code>object</code> - Returned object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>object</code> | Group ID of target object |
| x | <code>number</code> | X amount of how much to move the object by |
| Y | <code>number</code> | Y amount of how much to move the object by |

<a name="particle_system"></a>

## particle\_system(props, [use_obj_color], [animate_on_trigger], [animate_active_only], [quick_start]) ⇒ <code>object</code>
Creates a particle system

**Kind**: global function  
**Returns**: <code>object</code> - Returned particle system  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>object</code> |  | Dictionary holding particle properties (check particle properties) |
| [use_obj_color] | <code>boolean</code> | <code>false</code> | Whether to make the particle system use the object color |
| [animate_on_trigger] | <code>boolean</code> | <code>false</code> | Whether to only start the particle system when the Animate trigger is used on the particle system instead of immediately |
| [animate_active_only] | <code>boolean</code> | <code>false</code> | Only makes animate_on_trigger true if the object is active |
| [quick_start] | <code>boolean</code> | <code>false</code> | Makes normal movement be achieved instantly instead of gradually |

<a name="timewarp"></a>

## timewarp(value)
Warps all time by given amount

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | How much to warp time by |

<a name="color_trigger"></a>

## color\_trigger(channel, r, g, b, [duration], [opacity], [blending])
Creates color trigger

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>object</code> |  | Color channel to set |
| r | <code>number</code> |  | Red value in RGB to set |
| g | <code>number</code> |  | Green value in RGB to set |
| b | <code>number</code> |  | Blue value in RGB to set |
| [duration] | <code>number</code> | <code>0</code> | Duration that it takes for color to change |
| [opacity] | <code>number</code> | <code>1</code> | Opacity of color (1 = visible, 0 = invisible) |
| [blending] | <code>boolean</code> | <code>false</code> | Whether to blend color with others |

<a name="range"></a>

## range(start, end, step) ⇒ <code>array</code>
Generates an array holding a sequence of numbers starting at the "start" parameter, ending at the "end" parameter and incrementing by "step"

**Kind**: global function  
**Returns**: <code>array</code> - Resulting sequence  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| start | <code>number</code> |  | What number to start at |
| end | <code>number</code> |  | What number to end at |
| step | <code>number</code> | <code>1</code> | What number to increment by |

<a name="item_edit"></a>

## item\_edit(item1, item2, target, type1, type2, target_type, assign_op, op1, op2, mod, absn1, absn2, rfc1, rfc2) ⇒ <code>object</code>
Implementation of Item Edit trigger

**Kind**: global function  
**Returns**: <code>object</code> - Resulting object  

| Param | Type | Description |
| --- | --- | --- |
| item1 | <code>number</code> | Item ID 1 |
| item2 | <code>number</code> | Item ID 2 |
| target | <code>number</code> | Target item ID |
| type1 | <code>number</code> | Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT) |
| type2 | <code>number</code> | Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT) |
| target_type | <code>number</code> | Type of target item ID (ITEM, TIMER, POINTS, TIME, ATTEMPT) |
| assign_op | <code>number</code> | Assignment operator (EQ, ADD, SUB, MUL, DIV) |
| op1 | <code>number</code> | Operator 1 (ADD, SUB, MUL, DIV) |
| op2 | <code>number</code> | Operator 2 (ADD, SUB, MUL, DIV) |
| mod | <code>number</code> | How much to modify the entire operation by (influenced by op2) |
| absn1 | <code>number</code> | Whether to get absolute/negative value of first side of operation (ABS, NEG) |
| absn2 | <code>number</code> | Whether to get absolute/negative value of second side of operation (ABS, NEG) |
| rfc1 | <code>number</code> | Whether to round/floor/ceil first side of operation (RND, FLR, CEI) |
| rfc2 | <code>number</code> | Whether to round/floor/ceil second side of operation (RND, FLR, CEI) |

<a name="item_comp"></a>

## item\_comp(item_1, item_2, type1, type2, compare_op, truei, falsei, mod1, mod2, tol, op_1, op_2, absneg_1, absneg_2, rfc1, rfc2) ⇒ <code>object</code>
Implementation of Item Comp trigger

**Kind**: global function  
**Returns**: <code>object</code> - Resulting object  

| Param | Type | Description |
| --- | --- | --- |
| item_1 | <code>number</code> | Item ID 1 |
| item_2 | <code>number</code> | Item ID 2 |
| type1 | <code>number</code> | Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT) |
| type2 | <code>number</code> | Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT) |
| compare_op | <code>number</code> | Operator to compare item ID 1 and 2 by (EQ, GREATER, GREATER_OR_EQ, LESS, LESS_OR_EQ, NOT_EQ) |
| truei | <code>object</code> | Group ID to call if comparison is true |
| falsei | <code>object</code> | Group ID to call if comparison is false |
| mod1 | <code>number</code> | How much to modify item ID 1 by (influenced by op1) |
| mod2 | <code>number</code> | How much to modify item ID 2 by (influenced by op2) |
| tol | <code>number</code> | How much to offset the result by |
| op_1 | <code>number</code> | Operator 1 for mod1 (ADD, SUB, MUL, DIV) |
| op_2 | <code>number</code> | Operator 2 for mod2 (ADD, SUB, MUL, DIV) |
| absneg_1 | <code>number</code> | Whether to get absolute/negative value of first side of operation (ABS, NEG) |
| absneg_2 | <code>number</code> | Whether to get absolute/negative value of second side of operation (ABS, NEG) |
| rfc1 | <code>number</code> | Whether to round/floor/ceil first side of operation (RND, FLR, CEI) |
| rfc2 | <code>number</code> | Whether to round/floor/ceil second side of operation (RND, FLR, CEI) |

<a name="while_loop"></a>

## while\_loop(condition, func, delay)
Creates a repeating trigger system that repeats while a condition is true

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>object</code> | Condition that defines whether the loop should keep on running (less_than/equal_to/greater_than(counter, number)) |
| func | <code>function</code> | Function to run while the condition is true |
| delay | <code>number</code> | Delay between each cycle |

<a name="hide_player"></a>

## hide\_player()
Hides player

**Kind**: global function  
<a name="call_with_delay"></a>

## call\_with\_delay(delay, group)
Calls a group with a delay

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| delay | <code>number</code> | How much to delay by |
| group | <code>object</code> | Group to call |

<a name="for_loop"></a>

## for\_loop(range, fn, [delay])
Loops a function a specific amount of times (defined by range)

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| range | <code>array</code> |  | Range of numbers defining how many times to loop fn by |
| fn | <code>function</code> |  | Function to loop |
| [delay] | <code>number</code> | <code>0.05</code> | How much to delay between cycle |

<a name="remappable"></a>

## remappable(fn) ⇒ <code>function</code>
Creates trigger function-like systems, but can be called normally with item IDs as arguments (e.g. a remappable can be called like `my_remappable(counter1.item)`)

**Kind**: global function  
**Returns**: <code>function</code> - Function to call  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | Function that remappable uses |

<a name="end"></a>

## end(instant_end, no_effects, no_sfx, spawn_id, target_pos)
Ends level

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| instant_end | <code>boolean</code> | <code>false</code> | Whether to end level instantly |
| no_effects | <code>boolean</code> | <code>false</code> | Whether to remove effects |
| no_sfx | <code>boolean</code> | <code>false</code> | Whether to remove SFX |
| spawn_id | <code>object</code> |  | Group to spawn on end |
| target_pos | <code>object</code> |  | Object defining end position |

<a name="player_control"></a>

## player\_control(p1, p2, stop_jump, stop_move, stop_rot, stop_slide)
Implementation of player control trigger

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| p1 | <code>boolean</code> | <code>false</code> | Only controls P1 |
| p2 | <code>boolean</code> | <code>false</code> | Only controls P2 |
| stop_jump | <code>boolean</code> | <code>false</code> | Stops player from jumping |
| stop_move | <code>boolean</code> | <code>false</code> | Stops player from moving |
| stop_rot | <code>boolean</code> | <code>false</code> | Stops player from rotating |
| stop_slide | <code>boolean</code> | <code>false</code> | Stops player from sliding |

