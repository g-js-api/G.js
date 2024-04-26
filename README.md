# G.js
G.js - Create Geometry Dash levels (with a SPWN-like syntax) in JavaScript

# Support
For support on how to use G.js, join the Discord server:
https://discord.gg/GwVd7K2cQY

# Installation
Use G.js in your project by running this in your project (with Node.js installed):
```
npm install @g-js-api/g.js
```

# Example
Here is a functional example of G.js:
```js
require('@g-js-api/g.js');

// Creating counters
let my_counter = counter();
my_counter.display(15, 15);

// Events
on(
  touch(),
  trigger_function(() => {
    my_counter.add(1);
  })
);

// Waiting
wait(1);
my_counter.add(15);

// While loops
let g = unknown_g();
$.add({
	OBJ_ID: 1,
	X: 15,
	Y: 15,
	GROUPS: g
})

let i = counter();
i.display(45, 45);

while_loop(less_than(i, 10), () => {
    i.add(1);
    g.move(15, 0, 0.5);
});

$.print($.getLevelString({ info: true })); // Print as level string
// you can also use $.exportToSavefile() to save level (newest level by default), use "$.exportToSavefile({ level_name: "my level" })" to specify a level to save to
// and $.liveEditor() to write to level live using WSLiveEditor
```

# Features that make this different from SPWN:
- Inherits speed and ecosystem from JS (JS might sometimes be considered slower than others, but it is much faster than SPWN + ecosystem is much bigger than SPWN)
- Has early 2.2 features (9999 group limit, item triggers, ID remapping, 2.2 obj props, gradient trigger, level options, keyframes, random + adv random, sequence trigger, song trigger, particle system, etc.)

# Notes
This is not finished yet - do not expect it to work exactly as SPWN yet!
No docs have been written yet because I do not have the time or energy to write documentation, so the Usage section is the closest thing to docs for now.

# Usage
G.js has mostly the same usage as SPWN, with exceptions:
- File must end in `$.exportToSavefile()` in order to export to save, or must use `$.getLevelString()` in order to export levelstring into variable
- Since JS cannot do something like `!{}` for trigger functions, use `trigger_function(() => { /* ... */ })` for trigger functions
- GD objects are just done with normal JS objects, obj props are mostly the same
- Use while loops with the `less_than(a, b)`, `equal_to(a, b)` or `greater_than(a, b)` functions followed by a normal function, not trigger function
- For comparing a counter with a plain number, use `counter.if_is(SMALLER_THAN | EQUAL_TO | LARGER_THAN, trigger_function)`
- Counter operations are `counter.add(num | counter)`, `counter.subtract(num | counter)`, `counter.multiply(num | counter)` and `counter.divide(num | counter)`
- `extract x` statements in SPWN are `extract(x)` in G.js
- `gamescene` library from SPWN can be used in G.js by doing `gamescene()` instead of `import gamescene`
- Ranges in G.js are done with `range(a, b)`
- Getting unknown IDs for groups/blocks/colors can be done using `unknown_g()/unknown_b()/unknown_c()`
- Group, block, and color IDs are represented using `group(id)`, `block(id)` and `color(id)`
- Instead of calling groups by using `1g!` in SPWN, you can do `group(1).call()`
- `counter.to_const(a..b)` in SPWN is done inside of G.js by using `counter.to_const(range(a, b), (number) => { /* ... */ })`
- Counter comparison can be done using `compare(counter_1, EQUAL_TO/GREATER/GREATER_OR_EQ/GREATER_OR_EQ/LESS_OR_EQ/NOT_EQ, counter_2, true_id, false_id)`
- ID remapping can be done through `my_trig_func.remap([group(3), group(2)], [group(7), group(4)]);`
- Item edit trigger: `$.add(item_edit(item_1, item_2, target_item, type_1 (NONE/ITEM/TIMER/POINTS/TIME/ATTEMPT), type_2 (NONE/ITEM/TIMER/POINTS/TIME/ATTEMPT), target_type (NONE/ITEM/TIMER/POINTS/TIME/ATTEMPT), assign_op (EQ/ADD/SUB/MUL/DIV), op1 (EQ/ADD/SUB/MUL/DIV), op2 (EQ/ADD/SUB/MUL/DIV), mod, absn1 (ABS/NEG), absn2 (NONE/ABS/NEG), rfc1 (NONE/RND/FLR/CEI))`
- Remappables are a sort of trigger function that can take in IDs as inputs through ID remapping:
```js
let bl = group(10);
let fn = remappable(my_gr => {
	group(my_gr).move(10, 0);
});
wait(0.5)
fn(bl);
```
- Particle systems have its own property system, check [particles.js](./particles.js) for info.

# To-do list for 2.2 (84% done):
- [x] item comp
- [x] item edit
- [x] item pers
- [x] camera static
- [x] camera offset
- [x] teleport
- [x] timer
- [x] song
- [x] gradient trigger
- [x] keyframe system
- [x] reverse trigger
- [x] level options
- [x] gravity
- [x] sequence
- [x] all camera triggers
- [x] particle systems
- [ ] sfx trigger
- [ ] shader triggers
