import {
  chain,
  filter,
  map,
  range,
  filterAsync,
  find,
  first,
  size,
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

    const result = filterAsync(generateOneTwoThree(), (num) => num % 2 === 0)
      .map((num) => `${num} is even`)
      .collect()

    const resolved = await result
    assert.equal(resolved[0], "2 is even")
    assert.equal(resolved.length, 1)

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
