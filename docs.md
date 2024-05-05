## Members

<dl>
<dt><a href="#ksys_id">ksys_id</a> ⇒ <code><a href="#keyframe_system">keyframe_system</a></code></dt>
<dd><p>Creates a keyframe system</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#extract">extract(dict)</a></dt>
<dd><p>Extracts values from dictionary into global scope</p>
</dd>
<dt><a href="#spawn_trigger">spawn_trigger(group, time)</a> ⇒ <code>object</code></dt>
<dd><p>Creates a spawn trigger and returns it</p>
</dd>
<dt><a href="#unknown_g">unknown_g()</a> ⇒ <code>group</code></dt>
<dd><p>Creates and returns an unavailable group ID</p>
</dd>
<dt><a href="#unknown_c">unknown_c()</a> ⇒ <code>color</code></dt>
<dd><p>Creates and returns an unavailable color ID</p>
</dd>
<dt><a href="#unknown_b">unknown_b()</a> ⇒ <code>block</code></dt>
<dd><p>Creates and returns an unavailable block ID</p>
</dd>
<dt><a href="#trigger_function">trigger_function(callback)</a> ⇒ <code>group</code></dt>
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
<dt><a href="#color_trigger">color_trigger(channel, r, g, b, [duration], [opacity], [blending])</a> ⇒ <code>object</code></dt>
<dd><p>Creates color trigger</p>
</dd>
<dt><a href="#range">range(start, end, step)</a> ⇒ <code>array</code></dt>
<dd><p>Generates an array holding a sequence of numbers starting at the &quot;start&quot; parameter, ending at the &quot;end&quot; parameter and incrementing by &quot;step&quot;</p>
</dd>
<dt><a href="#item_edit">item_edit(item1, item2, target, [type1], [type2], [target_type], [assign_op], [op1], [op2], [mod], [absn1], [absn2], [rfc1], [rfc2])</a> ⇒ <code>object</code></dt>
<dd><p>Implementation of Item Edit trigger</p>
</dd>
<dt><a href="#item_comp">item_comp(item_1, item_2, type1, type2, compare_op, [truei], [falsei], [mod1], [mod2], [tol], [op_1], [op_2], [absneg_1], [absneg_2], [rfc1], [rfc2])</a> ⇒ <code>object</code></dt>
<dd><p>Implementation of Item Comp trigger</p>
</dd>
<dt><a href="#counter">counter([num], [use_id], [persistent], [timer])</a> ⇒ <code><a href="#counter">counter</a></code></dt>
<dd><p>Creates a counter, which has methods for editing items</p>
</dd>
<dt><a href="#compare">compare(c1, op, c2, truei, falsei)</a></dt>
<dd><p>Compares a counter with another</p>
</dd>
<dt><a href="#toggle_on_trigger">toggle_on_trigger(group)</a> ⇒ <code>object</code></dt>
<dd><p>Returns an activated toggle trigger</p>
</dd>
<dt><a href="#toggle_off_trigger">toggle_off_trigger(group)</a> ⇒ <code>object</code></dt>
<dd><p>Returns an inactive toggle trigger</p>
</dd>
<dt><a href="#on">on(event, group)</a></dt>
<dd><p>Calls a group when an event occurs</p>
</dd>
<dt><a href="#touch">touch([dual_side])</a> ⇒ <code><a href="#event">event</a></code></dt>
<dd><p>Listens to when the screen is touched</p>
</dd>
<dt><a href="#touch_end">touch_end([dual_side])</a> ⇒ <code><a href="#event">event</a></code></dt>
<dd><p>Listens to when the screen stops being touched</p>
</dd>
<dt><a href="#collision">collision(block_a, block_b)</a> ⇒ <code><a href="#event">event</a></code></dt>
<dd><p>Listens to when two collision blocks collide</p>
</dd>
<dt><a href="#collision_exit">collision_exit(block_a, block_b)</a> ⇒ <code><a href="#event">event</a></code></dt>
<dd><p>Listens to when two collision blocks stop colliding</p>
</dd>
<dt><a href="#death">death()</a> ⇒ <code><a href="#event">event</a></code></dt>
<dd><p>Listens to when the player dies</p>
</dd>
<dt><a href="#count">count(item, num, multi)</a> ⇒ <code><a href="#event">event</a></code></dt>
<dd><p>Listens to when an item hits a specific number</p>
</dd>
<dt><a href="#x_position">x_position(x)</a> ⇒ <code><a href="#event">event</a></code></dt>
<dd><p>Listens to when the player reaches a specific X position</p>
</dd>
<dt><a href="#event">event(event, extra_id, extra_id2)</a> ⇒ <code><a href="#event">event</a></code></dt>
<dd><p>Implementation of the event trigger that triggers an event</p>
</dd>
<dt><a href="#greater_than">greater_than(counter, other)</a> ⇒ <code>condition</code></dt>
<dd><p>Returns a greater than condition</p>
</dd>
<dt><a href="#equal_to">equal_to(counter, other)</a> ⇒ <code>condition</code></dt>
<dd><p>Returns a equal to condition</p>
</dd>
<dt><a href="#less_than">less_than(counter, other)</a> ⇒ <code>condition</code></dt>
<dd><p>Returns a less than condition</p>
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
<dt><a href="#gradient">gradient(color1, color2, bl, br, tl, tr, [vertex_mode], [blending], [layer])</a></dt>
<dd><p>Creates a gradient trigger and returns it</p>
</dd>
<dt><a href="#random">random(gr1, gr2, chance)</a></dt>
<dd><p>Implementation of random trigger</p>
</dd>
<dt><a href="#advanced_random">advanced_random(...chances)</a></dt>
<dd><p>Implementation of advanced random trigger</p>
</dd>
<dt><a href="#gravity">gravity(gravity, p1, p2, pt)</a></dt>
<dd><p>Implementation of gravity trigger</p>
</dd>
<dt><a href="#options">options()</a> ⇒ <code><a href="#options">options</a></code></dt>
<dd><p>Implementation of options trigger</p>
</dd>
<dt><a href="#sequence">sequence(sequence, [mode], [min_int], [reset])</a> ⇒ <code>function</code></dt>
<dd><p>Implementation of sequence trigger</p>
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

## Typedefs

<dl>
<dt><a href="#counter">counter</a> : <code>object</code></dt>
<dd><p>Represents a counter, which is a wrapper around item IDs</p>
</dd>
<dt><a href="#add">add</a> : <code>function</code></dt>
<dd><p>Adds a specific amount (or another counter) to the current counter</p>
</dd>
<dt><a href="#subtract">subtract</a> : <code>function</code></dt>
<dd><p>Adds a specific amount (or another counter) to the current counter</p>
</dd>
<dt><a href="#multiply">multiply</a> : <code>function</code></dt>
<dd><p>Adds a specific amount (or another counter) to the current counter</p>
</dd>
<dt><a href="#divide">divide</a> : <code>function</code></dt>
<dd><p>Adds a specific amount (or another counter) to the current counter</p>
</dd>
<dt><a href="#set">set</a> : <code>function</code></dt>
<dd><p>Adds a specific amount (or another counter) to the current counter</p>
</dd>
<dt><a href="#reset">reset</a> : <code>function</code></dt>
<dd><p>Resets the current counter to 0</p>
</dd>
<dt><a href="#to_obj">to_obj</a> ⇒ <code>object</code></dt>
<dd><p>Returns item display for current counter as an object</p>
</dd>
<dt><a href="#if_is">if_is</a> : <code>function</code></dt>
<dd><p>Checks if a comparison is true, and if so calls a group (SMALLER_THAN/EQUAL_TO_LARGER_THAN)</p>
</dd>
<dt><a href="#to_const">to_const</a> : <code>function</code></dt>
<dd><p>Converts the current counter to a plain number by taking in a range of possible values and a function</p>
</dd>
<dt><a href="#display">display</a> : <code>function</code></dt>
<dd><p>Displays the current counter at a specific position</p>
</dd>
<dt><a href="#copy_to">copy_to</a> : <code>function</code></dt>
<dd><p>Copies the current counter to another counter</p>
</dd>
<dt><a href="#add_to">add_to</a> : <code>function</code></dt>
<dd><p>Adds the current counter to another and resets the current counter</p>
</dd>
<dt><a href="#subtract_from">subtract_from</a> : <code>function</code></dt>
<dd><p>Subtracts the current counter from another and resets the current counter</p>
</dd>
<dt><a href="#keyframe_system">keyframe_system</a> : <code>object</code></dt>
<dd><p>Represents a keyframe system in GD</p>
</dd>
<dt><a href="#keyframe">keyframe</a> : <code>function</code></dt>
<dd><p>Creates a single keyframe at a specific position</p>
</dd>
<dt><a href="#start">start</a> : <code>function</code></dt>
<dd><p>Starts a keyframe system</p>
</dd>
<dt><a href="#options">options</a> : <code>object</code></dt>
<dd><p>Represents an options trigger</p>
</dd>
</dl>

<a name="ksys_id"></a>

## ksys\_id ⇒ [<code>keyframe\_system</code>](#keyframe_system)
Creates a keyframe system

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>group</code> | Group of objects to animate |

<a name="extract"></a>

## extract(dict)
Extracts values from dictionary into global scope

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| dict | <code>dictionary</code> | Dictionary to extract |

<a name="spawn_trigger"></a>

## spawn\_trigger(group, time) ⇒ <code>object</code>
Creates a spawn trigger and returns it

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| group | <code>group</code> |  | group to be spawned |
| time | <code>number</code> | <code>0</code> | delay to spawn group |

<a name="unknown_g"></a>

## unknown\_g() ⇒ <code>group</code>
Creates and returns an unavailable group ID

**Kind**: global function  
**Returns**: <code>group</code> - Resulting group ID  
<a name="unknown_c"></a>

## unknown\_c() ⇒ <code>color</code>
Creates and returns an unavailable color ID

**Kind**: global function  
**Returns**: <code>color</code> - Resulting color ID  
<a name="unknown_b"></a>

## unknown\_b() ⇒ <code>block</code>
Creates and returns an unavailable block ID

**Kind**: global function  
**Returns**: <code>block</code> - Resulting block ID  
<a name="trigger_function"></a>

## trigger\_function(callback) ⇒ <code>group</code>
Creates a "trigger function" in which triggers can be stored inside of a single group

**Kind**: global function  
**Returns**: <code>group</code> - Group ID of trigger function  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function storing triggers to put inside of group |

<a name="camera_offset"></a>

## camera\_offset(x, y, [duration])
Offsets the camera by a position

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | X offset of camera |
| y | <code>number</code> |  | X offset of camera |
| [duration] | <code>number</code> | <code>0</code> | Duration that it takes for camera position to change |

<a name="camera_static"></a>

## camera\_static(group, [duration], [easing], [exit_instant], [exit_static], [smooth_vel], [smooth_vel_mod], [follow], [x_only], [x_only])
Makes the camera static around a target object (group ID)

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| group | <code>group</code> |  | Group storing object to be the center of camera |
| [duration] | <code>number</code> | <code>0</code> | Duration that it takes for camera to be centered around object |
| [easing] | <code>easing</code> | <code>NONE</code> | How smoothly the camera moves to the object |
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
| [easing] | <code>easing</code> | <code>NONE</code> | How smoothly the camera zooms in |

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
| [easing] | <code>easing</code> | <code>NONE</code> | How smooth rotation happens |
| [add] | <code>boolean</code> | <code>false</code> | Adds input rotation to current camera rotation |
| [snap360] | <code>boolean</code> | <code>false</code> | Converts rotation to closest 360 |

<a name="camera_edge"></a>

## camera\_edge(id, edge)
Makes one of the camera's edges a specific target object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>group</code> | Group ID of target object |
| edge | <code>edge</code> | Defines the edge to set (LEFT_EDGE, RIGHT_EDGE, UP_EDGE, DOWN_EDGE) |

<a name="teleport"></a>

## teleport(id, edge)
Makes one of the camera's edges a specific target object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>group</code> | Group ID of target object |
| edge | <code>edge</code> | Defines the edge to set (LEFT_EDGE, RIGHT_EDGE, UP_EDGE, DOWN_EDGE) |

<a name="move_trigger"></a>

## move\_trigger(id, x, Y) ⇒ <code>object</code>
Adds a move trigger and returns it

**Kind**: global function  
**Returns**: <code>object</code> - Returned object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>group</code> | Group ID of target object |
| x | <code>number</code> | X amount of how much to move the object by |
| Y | <code>number</code> | Y amount of how much to move the object by |

<a name="particle_system"></a>

## particle\_system(props, [use_obj_color], [animate_on_trigger], [animate_active_only], [quick_start]) ⇒ <code>object</code>
Creates a particle system

**Kind**: global function  
**Returns**: <code>object</code> - Returned particle system  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| props | <code>dictionary</code> |  | Dictionary holding particle properties (check particle properties) |
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

## color\_trigger(channel, r, g, b, [duration], [opacity], [blending]) ⇒ <code>object</code>
Creates color trigger

**Kind**: global function  
**Returns**: <code>object</code> - Resulting color trigger  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| channel | <code>color</code> |  | Color channel to set |
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

## item\_edit(item1, item2, target, [type1], [type2], [target_type], [assign_op], [op1], [op2], [mod], [absn1], [absn2], [rfc1], [rfc2]) ⇒ <code>object</code>
Implementation of Item Edit trigger

**Kind**: global function  
**Returns**: <code>object</code> - Resulting object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item1 | <code>item</code> |  | Item ID 1 (can be retrieved from your_counter.item) |
| item2 | <code>item</code> |  | Item ID 2 (can be retrieved from your_counter.item) |
| target | <code>item</code> |  | Target item ID (can be retrieved from your_counter.item) |
| [type1] | <code>item\_type</code> | <code>NONE</code> | Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT) |
| [type2] | <code>item\_type</code> | <code>NONE</code> | Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT) |
| [target_type] | <code>item\_type</code> | <code>NONE</code> | Type of target item ID (ITEM, TIMER, POINTS, TIME, ATTEMPT) |
| [assign_op] | <code>number</code> | <code>EQ</code> | Assignment operator (EQ, ADD, SUB, MUL, DIV) |
| [op1] | <code>number</code> | <code>ADD</code> | Operator 1 (ADD, SUB, MUL, DIV) |
| [op2] | <code>number</code> | <code>MUL</code> | Operator 2 (ADD, SUB, MUL, DIV) |
| [mod] | <code>number</code> | <code>1</code> | How much to modify the entire operation by (influenced by op2) |
| [absn1] | <code>number</code> | <code>NONE</code> | Whether to get absolute/negative value of first side of operation (ABS, NEG) |
| [absn2] | <code>number</code> | <code>NONE</code> | Whether to get absolute/negative value of second side of operation (ABS, NEG) |
| [rfc1] | <code>number</code> | <code>NONE</code> | Whether to round/floor/ceil first side of operation (RND, FLR, CEI) |
| [rfc2] | <code>number</code> | <code>NONE</code> | Whether to round/floor/ceil second side of operation (RND, FLR, CEI) |

<a name="item_comp"></a>

## item\_comp(item_1, item_2, type1, type2, compare_op, [truei], [falsei], [mod1], [mod2], [tol], [op_1], [op_2], [absneg_1], [absneg_2], [rfc1], [rfc2]) ⇒ <code>object</code>
Implementation of Item Comp trigger

**Kind**: global function  
**Returns**: <code>object</code> - Resulting object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item_1 | <code>item</code> |  | Item ID 1 (can be retrieved from your_counter.item) |
| item_2 | <code>item</code> |  | Item ID 2 (can be retrieved from your_counter.item) |
| type1 | <code>item\_type</code> |  | Type of item ID 1 (ITEM, TIMER, POINTS, TIME, ATTEMPT) |
| type2 | <code>item\_type</code> |  | Type of item ID 2 (ITEM, TIMER, POINTS, TIME, ATTEMPT) |
| compare_op | <code>number</code> |  | Operator to compare item ID 1 and 2 by (EQ, GREATER, GREATER_OR_EQ, LESS, LESS_OR_EQ, NOT_EQ) |
| [truei] | <code>group</code> | <code>group(0)</code> | Group ID to call if comparison is true |
| [falsei] | <code>group</code> | <code>group(0)</code> | Group ID to call if comparison is false |
| [mod1] | <code>number</code> | <code>1</code> | How much to modify item ID 1 by (influenced by op1) |
| [mod2] | <code>number</code> | <code>1</code> | How much to modify item ID 2 by (influenced by op2) |
| [tol] | <code>number</code> | <code>0</code> | How much to offset the result by |
| [op_1] | <code>number</code> | <code>MUL</code> | Operator 1 for mod1 (ADD, SUB, MUL, DIV) |
| [op_2] | <code>number</code> | <code>MUL</code> | Operator 2 for mod2 (ADD, SUB, MUL, DIV) |
| [absneg_1] | <code>number</code> | <code>NONE</code> | Whether to get absolute/negative value of first side of operation (ABS, NEG) |
| [absneg_2] | <code>number</code> | <code>NONE</code> | Whether to get absolute/negative value of second side of operation (ABS, NEG) |
| [rfc1] | <code>number</code> | <code>NONE</code> | Whether to round/floor/ceil first side of operation (RND, FLR, CEI) |
| [rfc2] | <code>number</code> | <code>NONE</code> | Whether to round/floor/ceil second side of operation (RND, FLR, CEI) |

<a name="counter"></a>

## counter([num], [use_id], [persistent], [timer]) ⇒ [<code>counter</code>](#counter)
Creates a counter, which has methods for editing items

**Kind**: global function  
**Returns**: [<code>counter</code>](#counter) - Resulting counter  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [num] | <code>number</code> \| <code>boolean</code> | <code>0</code> | Number or boolean to be represented by counter |
| [use_id] | <code>boolean</code> | <code>false</code> | Whether to use an existing item ID as a counter instead of creating a new item |
| [persistent] | <code>boolean</code> | <code>false</code> | Whether to make the counter persistent between attempts |
| [timer] | <code>boolean</code> | <code>false</code> | Whether to make the counter a timer |

<a name="compare"></a>

## compare(c1, op, c2, truei, falsei)
Compares a counter with another

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| c1 | [<code>counter</code>](#counter) | First counter to compare |
| op | <code>compare\_op</code> | Comparison operator to use (EQ, NOT_EQ, GREATER, LESS, GREATER_OR_EQ, LESS_OR_EQ) |
| c2 | [<code>counter</code>](#counter) | Second counter to compare |
| truei | <code>group</code> | Group to call if comparison is true |
| falsei | <code>group</code> | Group to call if comparison is false |

<a name="toggle_on_trigger"></a>

## toggle\_on\_trigger(group) ⇒ <code>object</code>
Returns an activated toggle trigger

**Kind**: global function  
**Returns**: <code>object</code> - Resulting object  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>group</code> | Group of object |

<a name="toggle_off_trigger"></a>

## toggle\_off\_trigger(group) ⇒ <code>object</code>
Returns an inactive toggle trigger

**Kind**: global function  
**Returns**: <code>object</code> - Resulting object  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>group</code> | Group of object |

<a name="on"></a>

## on(event, group)
Calls a group when an event occurs

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | [<code>event</code>](#event) | Event to listen to |
| group | <code>group</code> | Group of object |

<a name="touch"></a>

## touch([dual_side]) ⇒ [<code>event</code>](#event)
Listens to when the screen is touched

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dual_side] | <code>boolean</code> | <code>false</code> | Whether to only listen to dual side |

<a name="touch_end"></a>

## touch\_end([dual_side]) ⇒ [<code>event</code>](#event)
Listens to when the screen stops being touched

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [dual_side] | <code>boolean</code> | <code>false</code> | Whether to only listen to dual side |

<a name="collision"></a>

## collision(block_a, block_b) ⇒ [<code>event</code>](#event)
Listens to when two collision blocks collide

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| block_a | <code>block</code> | First block to listen to |
| block_b | <code>block</code> | Second block to listen to |

<a name="collision_exit"></a>

## collision\_exit(block_a, block_b) ⇒ [<code>event</code>](#event)
Listens to when two collision blocks stop colliding

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| block_a | <code>block</code> | First block to listen to |
| block_b | <code>block</code> | Second block to listen to |

<a name="death"></a>

## death() ⇒ [<code>event</code>](#event)
Listens to when the player dies

**Kind**: global function  
<a name="count"></a>

## count(item, num, multi) ⇒ [<code>event</code>](#event)
Listens to when an item hits a specific number

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>item</code> | Item to listen to |
| num | <code>number</code> | Number that triggers event when the item hits this |
| multi | <code>boolean</code> | Whether to trigger the event multiple time |

<a name="x_position"></a>

## x\_position(x) ⇒ [<code>event</code>](#event)
Listens to when the player reaches a specific X position

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X position where event is called |

<a name="event"></a>

## event(event, extra_id, extra_id2) ⇒ [<code>event</code>](#event)
Implementation of the event trigger that triggers an event

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>array</code> \| <code>event\_id</code> | Event(s) to be listened to (look at event properties for more info) |
| extra_id | <code>group</code> | Implementation of extra ID 1 |
| extra_id2 | <code>group</code> | Implementation of extra ID 2 |

<a name="greater_than"></a>

## greater\_than(counter, other) ⇒ <code>condition</code>
Returns a greater than condition

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| counter | [<code>counter</code>](#counter) | Counter to compare to number |
| other | <code>number</code> | Number to be compared to counter |

<a name="equal_to"></a>

## equal\_to(counter, other) ⇒ <code>condition</code>
Returns a equal to condition

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| counter | [<code>counter</code>](#counter) | Counter to compare to number |
| other | <code>number</code> | Number to be compared to counter |

<a name="less_than"></a>

## less\_than(counter, other) ⇒ <code>condition</code>
Returns a less than condition

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| counter | [<code>counter</code>](#counter) | Counter to compare to number |
| other | <code>number</code> | Number to be compared to counter |

<a name="while_loop"></a>

## while\_loop(condition, func, delay)
Creates a repeating trigger system that repeats while a condition is true

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>condition</code> | Condition that defines whether the loop should keep on running (less_than/equal_to/greater_than(counter, number)) |
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
| group | <code>group</code> | Group to call |

<a name="for_loop"></a>

## for\_loop(range, fn, [delay])
Loops a function a specific amount of times (defined by range)

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| range | <code>array</code> |  | Range of numbers defining how many times to loop fn by |
| fn | <code>function</code> |  | Function to loop |
| [delay] | <code>number</code> | <code>0.05</code> | How much to delay between cycle |

<a name="gradient"></a>

## gradient(color1, color2, bl, br, tl, tr, [vertex_mode], [blending], [layer])
Creates a gradient trigger and returns it

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| color1 | <code>color</code> |  | First color of gradient |
| color2 | <code>color</code> |  | Second color of gradient |
| bl | <code>group</code> |  | Bottom left vertex |
| br | <code>group</code> |  | Bottom right vertex |
| tl | <code>group</code> |  | Top left vertex |
| tr | <code>group</code> |  | Top right vertex |
| [vertex_mode] | <code>boolean</code> | <code>true</code> | Whether to use vertex mode |
| [blending] | <code>boolean</code> | <code>false</code> | Whether to make the gradient blending |
| [layer] | <code>number</code> | <code>0</code> | Layer of gradient (0-15) |

<a name="random"></a>

## random(gr1, gr2, chance)
Implementation of random trigger

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| gr1 | <code>group</code> | Group 1 |
| gr2 | <code>group</code> | Group 2 |
| chance | <code>number</code> | Chance of either group being called |

<a name="advanced_random"></a>

## advanced\_random(...chances)
Implementation of advanced random trigger

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...chances | <code>array</code> | Chances of each group being called (e.g. [[group(1), 10], [group(2), 10]] is a valid input) |

<a name="gravity"></a>

## gravity(gravity, p1, p2, pt)
Implementation of gravity trigger

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| gravity | <code>number</code> | Gravity magnitude |
| p1 | <code>boolean</code> | Only affect player 1 |
| p2 | <code>boolean</code> | Only affect player 2 |
| pt | <code>boolean</code> | Only affect player that touches trigger |

<a name="options"></a>

## options() ⇒ [<code>options</code>](#options)
Implementation of options trigger

**Kind**: global function  
**Returns**: [<code>options</code>](#options) - Options trigger  
<a name="sequence"></a>

## sequence(sequence, [mode], [min_int], [reset]) ⇒ <code>function</code>
Implementation of sequence trigger

**Kind**: global function  
**Returns**: <code>function</code> - Function that steps through the sequence once  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sequence | <code>array</code> |  | Sequence of groups to be called (e.g. [[group(1), 1], [group(2), 1]] is a valid input) |
| [mode] | <code>number</code> | <code>0</code> | Mode of sequence trigger (0 = stop, 1 = loop, 2 = last) |
| [min_int] | <code>number</code> | <code>0</code> | MinInt of sequence trigger |
| [reset] | <code>number</code> | <code>0</code> | Reset of sequence trigger (0 = full, 1 = step) |

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
| spawn_id | <code>group</code> |  | Group to spawn on end |
| target_pos | <code>group</code> |  | Object defining end position |

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

<a name="counter"></a>

## counter : <code>object</code>
Represents a counter, which is a wrapper around item IDs

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| item | <code>item</code> | Item ID of a counter |
| type | <code>item\_type</code> | Type of a counter |
| add | [<code>add</code>](#add) | Adds a specific amount (or another counter) to the current counter |
| subtract | [<code>subtract</code>](#subtract) | Subtracts a specific amount (or another counter) from the current counter |
| multiply | [<code>multiply</code>](#multiply) | Multiplies the current counter by a specific amount (or another counter) |
| divide | [<code>divide</code>](#divide) | Divides the current counter by a specific amount (or another counter) |
| set | [<code>set</code>](#set) | Sets the current counter to a specific amount or another counter |
| reset | [<code>reset</code>](#reset) | Resets the current counter to 0 |
| if_is | [<code>if\_is</code>](#if_is) | Checks if a comparison is true, and if so calls a group (SMALLER_THAN/EQUAL_TO_LARGER_THAN) |
| to_const | [<code>to\_const</code>](#to_const) | Converts the current counter to a plain number by taking in a range of possible values and a function |
| copy_to | [<code>copy\_to</code>](#copy_to) | Copies the current counter to another counter |
| display | [<code>display</code>](#display) | Displays the current counter at a specific position |
| to_obj | [<code>to\_obj</code>](#to_obj) | Returns item display for current counter as an object |
| add_to | [<code>add\_to</code>](#add_to) | Adds the current counter to another and resets the current counter |
| subtract_from | [<code>subtract\_from</code>](#subtract_from) | Subtracts the current counter from another and resets the current counter |

<a name="add"></a>

## add : <code>function</code>
Adds a specific amount (or another counter) to the current counter

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> \| [<code>counter</code>](#counter) | Counter or number to add to the current counter |

<a name="subtract"></a>

## subtract : <code>function</code>
Adds a specific amount (or another counter) to the current counter

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> \| [<code>counter</code>](#counter) | Counter or number to subtract from the current counter |

<a name="multiply"></a>

## multiply : <code>function</code>
Adds a specific amount (or another counter) to the current counter

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> \| [<code>counter</code>](#counter) | Counter or number to multiply the current counter by |

<a name="divide"></a>

## divide : <code>function</code>
Adds a specific amount (or another counter) to the current counter

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> \| [<code>counter</code>](#counter) | Counter or number to divide the current counter by |

<a name="set"></a>

## set : <code>function</code>
Adds a specific amount (or another counter) to the current counter

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| amount | <code>number</code> \| [<code>counter</code>](#counter) | Counter or number to set the current counter to |

<a name="reset"></a>

## reset : <code>function</code>
Resets the current counter to 0

**Kind**: global typedef  
<a name="to_obj"></a>

## to\_obj ⇒ <code>object</code>
Returns item display for current counter as an object

**Kind**: global typedef  
**Returns**: <code>object</code> - Resulting item display  
<a name="if_is"></a>

## if\_is : <code>function</code>
Checks if a comparison is true, and if so calls a group (SMALLER_THAN/EQUAL_TO_LARGER_THAN)

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| comparison | <code>comparison</code> | Condition to check for between the counter and number |
| other | <code>number</code> | Number to compare the current counter to |
| trig_func | <code>group</code> | Trigger function or group to run if the comparison is true |

<a name="to_const"></a>

## to\_const : <code>function</code>
Converts the current counter to a plain number by taking in a range of possible values and a function

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| range | <code>array</code> | Possible range of values that the current counter is equal to |
| func | <code>function</code> | Callback function to run that takes the plain numerical value as input |

<a name="display"></a>

## display : <code>function</code>
Displays the current counter at a specific position

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X position of item display |
| y | <code>number</code> | Y position of item display |

<a name="copy_to"></a>

## copy\_to : <code>function</code>
Copies the current counter to another counter

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| counter | [<code>counter</code>](#counter) | Counter to copy the current counter to |

<a name="add_to"></a>

## add\_to : <code>function</code>
Adds the current counter to another and resets the current counter

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| counter | [<code>counter</code>](#counter) | Counter to add the current counter to |

<a name="subtract_from"></a>

## subtract\_from : <code>function</code>
Subtracts the current counter from another and resets the current counter

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| counter | [<code>counter</code>](#counter) | Counter to be subtracted from |

<a name="keyframe_system"></a>

## keyframe\_system : <code>object</code>
Represents a keyframe system in GD

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| keyframe | [<code>keyframe</code>](#keyframe) | Creates a single keyframe at a specific position |
| start | [<code>start</code>](#start) | Starts a keyframe system |
| anim_id | <code>number</code> | ID of animation |

<a name="keyframe"></a>

## keyframe : <code>function</code>
Creates a single keyframe at a specific position

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | X position of keyframe |
| y | <code>number</code> | Y position of keyframe |
| duration | <code>number</code> | Duration of keyframe |
| curve | <code>boolean</code> | Whether to make the keyframe curved |
| close | <code>boolean</code> | Whether to set the keyframe as the last one + loop back to first keyframe |
| easing | <code>easing</code> | How smoothly the keyframe moves |

<a name="start"></a>

## start : <code>function</code>
Starts a keyframe system

**Kind**: global typedef  
<a name="options"></a>

## options : <code>object</code>
Represents an options trigger

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| STREAK_ADDITIVE | <code>function</code> | Streak additive (arg = boolean, optional) |
| HIDE_GROUND | <code>function</code> | Hide ground (arg = boolean, optional) |
| HIDE_MG | <code>function</code> | Hide middle ground (arg = boolean, optional) |
| HIDE_P1 | <code>function</code> | Hide player 1 (arg = boolean, optional) |
| HIDE_P2 | <code>function</code> | Hide player 2 (arg = boolean, optional) |
| DISABLE_CONTROLS_P1 | <code>function</code> | Disable player 1 controls (arg = boolean, optional) |
| DISABLE_CONTROLS_P2 | <code>function</code> | Disable player 2 controls (arg = boolean, optional) |
| UNLINK_DUAL_GRAVITY | <code>function</code> | Unlink dual gravity (arg = boolean, optional) |
| HIDE_ATTEMPTS | <code>function</code> | Hide attempts (arg = boolean, optional) |
| AUDIO_ON_DEATH | <code>function</code> | Audio on death (arg = boolean, optional) |
| NO_DEATH_SFX | <code>function</code> | No death SFX (arg = boolean, optional) |
| RESPAWN_TIME | <code>function</code> | Respawn time (arg = number, required) |
| add | <code>function</code> | Adds options trigger |

