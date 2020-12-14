[![npm version](https://badge.fury.io/js/irritable-iterable.svg)](https://www.npmjs.com/package/irritable-iterable)
[![npm downloads](https://img.shields.io/npm/dt/irritable-iterable.svg?logo=npm)](https://www.npmjs.com/package/irritable-iterable)
[![Build Status](https://github.com/activescott/irritable-iterable/workflows/main/badge.svg)](https://github.com/activescott/irritable-iterable/actions)
[![Coverage Status](https://coveralls.io/repos/github/activescott/irritable-iterable/badge.svg?branch=master)](https://coveralls.io/github/activescott/irritable-iterable?branch=master)
[![Dependency Count](https://badgen.net/bundlephobia/dependency-count/irritable-iterable)](https://bundlephobia.com/result?p=irritable-iterable)
[![Minified Size](https://badgen.net/bundlephobia/min/irritable-iterable)](https://bundlephobia.com/result?p=irritable-iterable)
[![License](https://img.shields.io/github/license/activescott/irritable-iterable.svg)](https://github.com/activescott/irritable-iterable/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/activescott/irritable-iterable.svg?style=social)](https://github.com/activescott/irritable-iterable)

# Irritable Iterable

Collection functions for JavaScript [iterators, generators and iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators).

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

filter([1, 2, 3], (num) => num % 2 === 0)
  .map((num) => `${num} is even`)
  .collect()

// [ "2 is even" ]
```

There are also versions supporting Async Iterable and Async Generators. For example:

```js
import { filterAsync } from "irritable-iterable"

filterAsync(myAsyncGenerator(), (num) => num % 2 === 0)
  .map((num) => `${num} is even`)
  .collect()

// [ "2 is even" ]

// just to demonstrate
async function* myAsyncGenerator() {
  yield 1
  yield 2
  yield 3
}
```

### chain

All of the methods returned from the root irritable-iterable package return an object that implements the `Chain` interface defined in [./src/chain.ts](./src/chain.ts). This allows you to use the chaining syntax shown in the examples below.

```js
import { chain } from "irritable-iterable"

chain([1, 2, 3]).filter(...)
chain([1, 2, 3]).map(...)
chain([1, 2, 3]).size() // => 3
chain([1, 2, 3]).collect() // => [1, 2, 3]

```

### filter

```js
import { filter } from "irritable-iterable"

filter([1, 2, 3], (num) => num % 2 === 0).collect()

// [ 2 ]
```

### map

```js
import { map } from "irritable-iterable"

map([1, 2, 3], (num) => "number " + num).collect()

// [ 'number 1', 'number 2', 'number 3' ]
```

### range

Similar Python's [range function](https://docs.python.org/3/library/functions.html#func-range)
The stop value is exclusive; it is not included in the result.

```js
import { range } from "irritable-iterable"

range(3).collect()

// [ 0, 1, 2 ]

range(0, 20, 5).collect()

// [0, 5, 10, 15]
```

### size

```js
const result = size(["a", "b", "c", "d"])

// 0
```

### first

```js
const result = first(["a", "b", "c", "d"])

// "a"
```

### collect

Collect converts the iterable to an array and returns it.

```js
function* myGenerator() {
  yield "a"
  yield "b"
  yield "c"
}

console.log("myGenerator:", myGenerator())
// myGenerator: Object [Generator] {}

console.log("myGenerator chain:", chain(myGenerator()))
// myGenerator chain: ChainImp { iterable: Object [Generator] {} }

console.log("myGenerator collect:", chain(myGenerator()).collect())
// myGenerator collect: [ 'a', 'b', 'c' ]
```

## Show your support

Please give a ⭐️ if this project helped you!

## Contributing

This is a community project. We invite your participation through issues and pull requests! You can peruse the [contributing guidelines](.github/CONTRIBUTING.md).

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

misc:

- async versions of all operations (see AsyncIterable)

operations:

- head
- tail
- reduce
- group (see d3.groups, uses arrays not maps)
- includes: returns true (?) when any one element satisfies predicate
- some: alias for includes
- every: returns true (?) when EVERY one element satisfies predicate
- none: returns true (?) when NO element satisfies predicate
- each: call an Action for every item.
- zip
- without: yields the items that do not satisfy the predicate (i.e. opposite of filter)
- with: alias for filter
- where: alias for filter

- Operations that should **not** be added:
  - Most operations that necessarily require a full iteration or a full count of items (e.g. `unique`, `sort`, `reverse`, `sample`) should just call `collect` and use other methods to perform the operation.
  - Possible Exceptions:
    - ...when the option is reduced to a single value or a smaller set of values in a single iteration of the elements (e.g. `count`, `reduce`).
    - ...when array has methods that mutate the array (`reverse`, `sort`)?

tasks:

- perf baselines and test thresholds
