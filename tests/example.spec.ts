import { filter, filterAsync } from "../src"

describe("examples readme", () => {
  test("sync example", () => {
    const result = filter([1, 2, 3], (num) => num % 2 === 0)
      .map((num) => `${num} is even`)
      .collect()
    // eslint-disable-next-line no-console
    console.log(result)
  })

  test("async example", async () => {
    const result = filterAsync(myAsyncGenerator(), (num) => num % 2 === 0)
      .map((num) => `${num} is even`)
      .collect()
    // eslint-disable-next-line no-console
    console.log(await result)
  })
})

async function* myAsyncGenerator() {
  yield 1
  yield 2
  yield 3
}
