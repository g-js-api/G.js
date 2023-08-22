# G.js
G.js - Create Geometry Dash levels (with a SPWN-like syntax) in JavaScript

# Notes
This is not finished yet - do not expect it to work exactly as SPWN yet!

# Example
```js
require('g.js');

// Creating counters
let counter = counter();
counter.display(15, 15);

// Events
on(touch(), trigger_function(() => {
  counter.add(1);
}))

// Waiting
wait(1);
counter.add(15);
```
