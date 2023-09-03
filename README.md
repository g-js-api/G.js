# G.js
G.js - Create Geometry Dash levels (with a SPWN-like syntax) in JavaScript

# Notes
This is not finished yet - do not expect it to work exactly as SPWN yet!

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

$.print($.getLevelString()); // Print as level string
// $.exportToSavefile() (does not exist yet, will come soon)
```
