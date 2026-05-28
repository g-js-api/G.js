# ![G.js logo](https://avatars.githubusercontent.com/u/182828239?s=200&v=4)
Create Geometry Dash levels with a SPWN-like syntax in JavaScript.

[![Go to GitHub repo](https://img.shields.io/static/v1?label=g-js-api&message=G.js&color=blue&logo=github)](https://github.com/g-js-api/G.js)
[![stars - G.js](https://img.shields.io/github/stars/g-js-api/G.js?style=social)](https://github.com/g-js-api/G.js)
[![forks - G.js](https://img.shields.io/github/forks/g-js-api/G.js?style=social)](https://github.com/g-js-api/G.js)
[![Go to project documentation](https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge)](https://g-js-api.github.io/G.js)

## Install

```sh
npm install @g-js-api/g.js
```

Supported platforms:

- Windows
- macOS
- Linux
- Android

## Quick Example
```js
import '@g-js-api/g.js'

// configures G.js, so it knows how to export to Geometry Dash
// this NEEDS to be ran before anything else GD-related!
await $.exportConfig({
  type: 'savefile', // you can change this to 'live_editor' if you want to use it using the WSLiveEditor mod, or 'levelstring' if you only want to export the levelstring (make sure to store the result in a variable!)
  options: { info: true } // displays level info when the program finishes running, check https://g-js-api.github.io/G.js/module-index.html#~save_config for a list of options
});

// for a simple example, let's create some moving text
// first, store a group in a variable (this is akin to doing 'Next Free' in GD)
let my_text = unknown_g();

// now, add some text at X 45 Y 45 with the group ID we defined 
// GD uses small-step units internally (3x big step), meaning the block is 15 steps from the origin in-game
'Hello, World!'
	.to_obj()
	.with(obj_props.X, 45)
	.with(obj_props.Y, 45)
	.with(obj_props.GROUPS, my_text)
	.add();

// let's make a loop that moves this text left and right forever
// a 'trigger function' is essentially a group of GD triggers that you can call
let moveloop = trigger_function(() => {
  let my_context = $.trigger_fn_context(); // stores the ORIGINAL group of the trigger function (it will change later due to the move triggers! this is called a "context")
  my_text.move(30, 0, 0.5); // moves the text forwards 30 big step units with a 0.5 move time
  my_text.move(-30, 0, 0.5); // afterwards, it moves the text BACK 30 big step units to its original place

  // flashes the background white WITHOUT changing the context of triggers 
  // (meaning it doesn't wait for the flash to stop)
  ignore_context_change(() => log.runtime.flash());

  // after the two moves, the "context" changes (meaning spawn delays were applied in-between, therefore newer triggers have different group IDs than in the past)
  // so to loop it, you can just call the group of the original context after all operations are finished
  my_context.call(); 
})

// now finally, we can spawn this loop!
moveloop.call();
```

## Core Usage
- G.js currently exposes a global-first API (but by popular request, you can now use `@g-js-api/g.js/safe` to avoid overriding global variables and only import what you need).
- Put `await $.exportConfig(...)` near the top of the script, after importing G.js and before adding level content.
- Use `trigger_function(() => { ... })` for trigger functions.
- Use `object({ ... })` or string `.to_obj()` values for objects, then call `.add()`.
- Use `unknown_g()`, `unknown_b()`, and `unknown_c()` for next-free group, block, and color ids.
- Use `group(id)`, `block(id)`, and `color(id)` for specific ids.
- Use `group(1).call()` instead of SPWN-style `1g!`.
- Use `range(a, b)` for ranges.
- Use `gamescene()` instead of `import gamescene`.
- Use `extract(x)` for SPWN-style extract statements.

## Export Modes
```js
await $.exportConfig({
  type: 'levelstring',
  options: { info: true }
});
```

Valid export types are:
- `levelstring`
- `savefile`
- `live_editor`
- `gmd`

Common options include `info`, `level_name`, `path`, `replacePastObjects`, `removeGroup`, `optimize`, `triggerPositioningAllowed`, and `trigger_pos_start`.

## Counters And Conditions

- while loops use `less_than(a, b)`, `equal_to(a, b)`, or `greater_than(a, b)`.
- counter operations include `counter.add`, `counter.subtract`, `counter.multiply`, and `counter.divide`.
- use `counter.if_is(SMALLER_THAN | EQUAL_TO | LARGER_THAN, trigger_function)` for direct comparisons.
- use `compare(counter_1, EQUAL_TO, counter_2, true_id, false_id)` for item compare triggers.
- use `counter.to_const(range(a, b), (number) => { ... })` for SPWN-style constant ranges.

## Remappables

Remappables are trigger-function-like systems that can take ids through remapping.

```js
const target = group(10);

const fn = remappable((input) => {
  group(input).move(10, 0);
});

wait(0.5);
fn(target);
```

## Particle Systems

Particle systems use their own property map. See [properties/particles.js](./properties/particles.js) and the generated particle guide for field names.

```js
particle_system({
  MAX_PARTICLES: 30,
  DURATION: -1,
  LIFETIME: 1,
  LIFETIME_VAR: 0.3,
  EMISSION: -1,
  ANGLE: 90,
  ANGLE_VAR: 90,
  SPEED: 29,
  POSVAR_X: 11,
  START_SIZE: 2,
  START_SIZE_VAR: 1,
  END_SIZE: 1,
  END_SIZE_VAR: 1,
  START_R: 1,
  START_G: 1,
  START_B: 1,
  START_A: 1,
  END_R: 1,
  END_G: 1,
  END_B: 1,
  END_A: 1,
  ADDITIVE: true
})
  .with(X, 200)
  .with(Y, 100)
  .add();
```

## Project Status

G.js is still evolving and is undergoing a major rewrite. Major 2.2 coverage is mostly present, including item triggers, camera triggers, ID remapping, keyframes, random triggers, sequence triggers, song triggers, level options, and particle systems.

Remaining notable work:

- sfx trigger
- shader trigger completion

## Support

For usage help, join the Discord server: [https://discord.gg/GwVd7K2cQY](https://discord.gg/GwVd7K2cQY)