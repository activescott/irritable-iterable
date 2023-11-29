[![npm version](https://badge.fury.io/js/irritable-iterable.svg)](https://www.npmjs.com/package/irritable-iterable)
[![npm downloads](https://img.shields.io/npm/dt/irritable-iterable.svg?logo=npm)](https://www.npmjs.com/package/irritable-iterable)
[![Build Status](https://github.com/activescott/irritable-iterable/workflows/main/badge.svg)](https://github.com/activescott/irritable-iterable/actions)
[![Coverage Status](https://coveralls.io/repos/github/activescott/irritable-iterable/badge.svg?branch=master)](https://coveralls.io/github/activescott/irritable-iterable?branch=master)
[![Dependency Count](https://badgen.net/bundlephobia/dependency-count/irritable-iterable)](https://bundlephobia.com/result?p=irritable-iterable)
[![Minified Size](https://badgen.net/bundlephobia/min/irritable-iterable)](https://bundlephobia.com/result?p=irritable-iterable)
[![License](https://img.shields.io/github/license/activescott/irritable-iterable.svg)](https://github.com/activescott/irritable-iterable/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/activescott/irritable-iterable.svg?style=social)](https://github.com/activescott/irritable-iterable)

# Irritable Iterable

`async-iterable` is a zero-dependency JavaScript library enhancing JavaScript iterables and generators[^1], and their asynchronous counterparts[^2]. Unlike other collection packages, `async-iterable` excels in memory efficiency across any iterable size, including standard arrays and it supports asynchronous versions of iterables/iterators/generators.

The advantage of this library over most other "collection" functions in most other packages, is that this will generally take a smaller amount of memory, no matter the size of the iterable it is working against.
It will also work fine with the standard Array but there won't be a memory advantage.

For example... If you're iterator through a iterable that is fetching pages of data from another host while you're iterating through it, it won't force the iterator to enumerate every value in order to filter it. It will filter the data as it is requested/iterated by the caller.

<!-- TOC -->

- [Usage / Quick Start](#usage--quick-start)
- [Show your support](#show-your-support)
- [Contributing 🤝](#contributing)
- [Release Process (Deploying to NPM) 🚀](#release-process-deploying-to-npm)
- [License 📝](#license)

## Usage

### Install

`npm install -P irritable-iterable`

### Quick Start

```js
import { filter } from "irritable-iterable"

const result = filter([1, 2, 3, 4], (num) => num % 2 === 0)
  .map((num) => `${num} is even`)
  .collect()

assert.deepEqual(result, ["2 is even", "4 is even"])
```

There are also `*Async` versions of each function (e.g. `filterAsync`, `mapAsync`, `groupAsync`, etc.) supporting [Asynchronous Iterable and Asynchronous Generator functions](https://github.com/tc39/proposal-async-iteration). For example:

```js
import { filterAsync } from "irritable-iterable"

const promisedResult = filterAsync(
  generateOneTwoThree(),
  (num) => num % 2 === 0
)
  .map((num) => `${num} is even`)
  .collect()

const result = await promisedResult
assert.deepEqual(result, ["2 is even"])

// for demonstration purposes:
async function* generateOneTwoThree() {
  yield 1
  yield 2
  yield 3
}
```

### chain

All of the methods returned from the root irritable-iterable package return an object that implements the `Chain` interface defined in [./src/chain.ts](./src/chain.ts). This allows you to use the chaining syntax shown in the examples below.

```js
import { chain } from "irritable-iterable"

chain([1, 2, 3]).filter((num) => num == 2) // => 2
chain([1, 2, 3]).find(["a", "b", "c"], (item) => item === "b") // => "b"
chain([1, 2, 3]).map((num) => num.toString()) // => [ "1", "2", "3" ]
chain([1, 2, 3]).size() // => 3
chain([1, 2, 3]).collect() // => [1, 2, 3]
chain([1, 2, 3]).collect() // => [1, 2, 3]
```

A more typical example might be:

```js
import { chain } from "irritable-iterable"

const result = filter([1, 2, 3, 4], (num) => num % 2 === 0)
  .map((num) => `${num} is even`)
  .find((str) => str.startsWith("4"))

assert.equal(result, "4 is even")
```

### filter

```js
import { filter } from "irritable-iterable"

const result = filter([1, 2, 3], (num) => num % 2 === 0).collect()

assert.deepEqual(result, [2])
```

### map

```js
import { map } from "irritable-iterable"

const result = map([1, 2, 3], (num) => "number " + num).collect()

assert.deepEqual(result, ["number 1", "number 2", "number 3"])
```

### range

Similar Python's [range function](https://docs.python.org/3/library/functions.html#func-range)
The stop value is exclusive; it is not included in the result.

```js
import { range } from "irritable-iterable"

let result = range(3).collect()
assert.deepEqual(result, [0, 1, 2])

result = range(0, 20, 5).collect()
assert.deepEqual(result, [0, 5, 10, 15])
```

### size

```js
import { size } from "irritable-iterable"

const result = size(["a", "b", "c", "d"])

assert.equal(result, 4)
```

### find

```js
import { find } from "irritable-iterable"

const result = find(["a", "b", "c", "d"], (item) => item === "c")

assert.equal(result, "c")
```

### first

```js
import { first } from "irritable-iterable"

const result = first(["a", "b", "c", "d"])

assert.equal(result, "a")
```

### collect

Collect converts the iterable to an array and returns it.

```js
import { chain } from "irritable-iterable"

const result = chain(generateABC()).collect()

assert.deepEqual(result, ["a", "b", "c"])

// for demonstration purposes:
function* generateABC() {
  yield "a"
  yield "b"
  yield "c"
}
```

### group

Groups the items in the iterable into a map with keys specified by key-generation function and each value in the map is an array of the items with that key.

```js
import { group } from "irritable-iterable"

const map = group(
  [
    { first: "john", last: "doe" },
    { first: "john", last: "foe" },
    { first: "jane", last: "doe" },
    { first: "jane", last: "foe" },
  ],
  (person) => person.last
)

// the result of `group` is a JavaScript Map (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
// ...which we convert to an array here:
const result = Array.from(map.entries())

assert.deepEqual(result, [
  [
    "doe",
    [
      { first: "john", last: "doe" },
      { first: "jane", last: "doe" },
    ],
  ],
  [
    "foe",
    [
      { first: "john", last: "foe" },
      { first: "jane", last: "foe" },
    ],
  ],
])
```

### product

Produces a cartesian product of the provided iterables.

```js
import { product } from "irritable-iterable"

const result = product([1, 2], [3, 4])
const resultArray = Array.from(result)
assert.deepEqual(resultArray, [
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 4],
])
```

## Show your support

Please give a ⭐️ if this project helped you!

## Contributing

This is a community project. We invite your participation through issues and pull requests! You can peruse the [contributing guidelines](.github/CONTRIBUTING.md) and see Contributing Notes below.

## Building

The package is written in TypeScript. To build the package run the following from the root of the repo:

```sh
npm run build # It will be built in /dist
```

## Release Process (Deploying to NPM)

We use [semantic-release](https://github.com/semantic-release/semantic-release) to consistently release [semver](https://semver.org/)-compatible versions. This project deploys to multiple [npm distribution tags](https://docs.npmjs.com/cli/dist-tag). Each of the below branches correspond to the following npm distribution tags:

| branch | npm distribution tag |
| ------ | -------------------- |
| master | latest               |
| beta   | beta                 |

To trigger a release use a Conventional Commit following [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) on one of the above branches.

## Todo / Roadmap

operations:

- [x] group (see d3.group, uses map)
- [ ] groups (see d3.groups, uses arrays not map)
- [ ] head
- [ ] tail
- [ ] reduce

- [ ] includes: returns true (?) when any one element satisfies predicate
- [ ] some: alias for includes
- [ ] every: returns true (?) when EVERY one element satisfies predicate
- [ ] none: returns true (?) when NO element satisfies predicate
- [ ] each: call an Action for every item.
- [ ] zip
- [ ] without: yields the items that do not satisfy the predicate (i.e. opposite of filter)
- [ ] with: alias for filter
- [ ] where: alias for filter

- Operations that should **not** be added:
  - Most operations that necessarily require a full iteration or a full count of items (e.g. `unique`, `sort`, `reverse`, `sample`) should just call `collect` and use other methods to perform the operation.
  - Possible Exceptions:
    - ...when they're extremely like `find` so you don't have to keep importing alternatives.
    - ...when the option is reduced to a single value or a smaller set of values in a single iteration of the elements (e.g. `count`, `reduce`).
    - ...when array has methods that mutate the array (`reverse`, `sort`)?

### Roadmap Ideas

#### SQL-Style API

- maybe a sql-style API like:

```js
from(iterator)
  .where(v => ...)
  .select(v => { foo: v.foo, bar: v.bar })  // i.e. alias for "map" function
  .groupBy(v => v.foo) // [ ["foo-value1", [v1, v2, v3]], ... ]
```

#### ChainAsync Rejection Handling Options

```
  /*
   * Like collect but allows replacing any rejected promise with a substitute value rather than rejecting.
   * @param rejectHandler
  collectDefault(rejectHandler: (reason: any) => Promise<Array<TItem>>): Promise<Array<TItem>>
  /*
   * Like collect but allows skipping any rejected promises rather than rejecting.
  collectSkipRejections(rejectHandler: (reason: any) => Promise<Array<TItem>>): Promise<Array<TItem>>
   */
```

## Contributing Notes

Some notes for contributors...

### `for...of` is fast enough

In our tests `for...of` is basically equivelent to manual iteration performancing when using TypeScript on nodejs. When using the ES5 target in TypeScript, the TypeScript compiler unwraps `for..of` to the manual iteration syntax anyway. In ES6 it emits `for..of`

For node v15.0.1 ES6 manual iteration was _slightly_ faster at an **~0.124ms** versus **~0.135ms** for `for...of` (average of 1K iterations).

The `for...of` code used for testing:

```
for (const item of iterable) {
  if (predicate(item)) {
    yield item
  }
}
```

The manual iteration code used for testing:

```
const iterator: Iterator<TItem, any, undefined> = iterable[Symbol.iterator]()
let value: TItem
for (let next = iterator.next(); !next.done; next = iterator.next()) {
  value = next.value
  if (predicate(value)) yield value
}
```
