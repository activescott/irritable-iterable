import {
  chain,
  filter,
  map,
  range,
  filterAsync,
  find,
  first,
  size,
  group,
} from "../src"
import * as assert from "assert"

/* eslint-disable no-console */

// assert to make examples easily readiable and totally testable:

describe("readme examples", () => {
  test("Quick Start", () => {
    // import { filter } from "irritable-iterable"

    const result = filter([1, 2, 3, 4], (num) => num % 2 === 0)
      .map((num) => `${num} is even`)
      .collect()

    assert.deepEqual(result, ["2 is even", "4 is even"])
  })

  test("Quick Start (async)", async () => {
    // import { filterAsync } from "irritable-iterable"

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
  })

  test("chain", () => {
    // import { chain } from "irritable-iterable"

    chain([1, 2, 3]).filter((num) => num == 2) // => 2
    chain([1, 2, 3]).find((item) => item === 2) // => 2
    chain([1, 2, 3]).map((num) => num.toString()) // => [ "1", "2", "3" ]
    chain([1, 2, 3]).size() // => 3
    chain([1, 2, 3]).collect() // => [1, 2, 3]
  })

  test("chain A more typical example ", () => {
    // import { chain } from "irritable-iterable"

    const result = filter([1, 2, 3, 4], (num) => num % 2 === 0)
      .map((num) => `${num} is even`)
      .find((str) => str.startsWith("4"))

    assert.equal(result, "4 is even")
  })

  test("filter", () => {
    // import { filter } from "irritable-iterable"

    const result = filter([1, 2, 3], (num) => num % 2 === 0).collect()

    assert.equal(result[0], 2)
    assert.equal(result.length, 1)
  })

  test("map", () => {
    // import { map } from "irritable-iterable"

    const result = map([1, 2, 3], (num) => "number " + num).collect()

    assert.deepEqual(result, ["number 1", "number 2", "number 3"])
  })

  test("range", () => {
    // import { range } from "irritable-iterable"

    let result = range(3).collect()
    assert.deepEqual(result, [0, 1, 2])

    result = range(0, 20, 5).collect()
    assert.deepEqual(result, [0, 5, 10, 15])
  })

  test("size", () => {
    // import { size } from "irritable-iterable"

    const result = size(["a", "b", "c", "d"])

    assert.equal(result, 4)
  })

  test("find", () => {
    // import { find } from "irritable-iterable"

    const result = find(["a", "b", "c", "d"], (item) => item === "c")

    assert.equal(result, "c")
  })

  test("first", () => {
    // import { first } from "irritable-iterable"

    const result = first(["a", "b", "c", "d"])

    assert.equal(result, "a")
  })

  test("group", () => {
    // import { group } from "irritable-iterable"

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
  })

  test("collect", () => {
    // import { chain } from "irritable-iterable"

    const result = chain(generateABC()).collect()

    assert.deepEqual(result, ["a", "b", "c"])

    // for demonstration purposes:
    function* generateABC() {
      yield "a"
      yield "b"
      yield "c"
    }
  })
})
