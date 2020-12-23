import { chain, filter, filterAsync, first, size } from "../src"

/* eslint-disable no-console */

describe("readme examples", () => {
  test("sync", () => {
    const result = filter([1, 2, 3], (num) => num % 2 === 0)
      .map((num) => `${num} is even`)
      .collect()

    console.log(result)
  })

  test("async", async () => {
    const result = filterAsync(myAsyncGenerator(), (num) => num % 2 === 0)
      .map((num) => `${num} is even`)
      .collect()

    console.log(await result)
  })

  test("size", () => {
    const result = size(["a", "b", "c", "d"])

    console.log(result)
  })

  test("first", () => {
    const result = first(["a", "b", "c", "d"])

    console.log(result)

    // "a"
  })

  test("collect", () => {
    function* myGenerator() {
      yield "a"
      yield "b"
      yield "c"
    }

    console.log("myGenerator:", myGenerator())

    console.log("myGenerator chain:", chain(myGenerator()))

    console.log("myGenerator collect:", chain(myGenerator()).collect())
  })
})

async function* myAsyncGenerator() {
  yield 1
  yield 2
  yield 3
}
