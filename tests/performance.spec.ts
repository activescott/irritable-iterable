import { filter, filterAsync } from "../src/filter"
import range from "../src/range"
import { asyncify, syncify } from "./support"

describe("performance", () => {
  describe("many-item iterable", () => {
    const ITEM_COUNT = (10 * 10) ^ 1000
    const EXPECTED_RESULT_COUNT = 454

    async function timeIt(
      testName: string,
      fn: () => void | Promise<void>,
      iterations = 1000
    ): Promise<{ average: number; minimum: number; maximum: number }> {
      let minimum = 0,
        maximum = 0,
        sum = 0
      let iteration = iterations
      while (iteration > 0) {
        iteration--
        const start = new Date().valueOf()
        const result = fn()
        if (result && "then" in result) {
          await result
        }
        const duration = new Date().valueOf() - start
        minimum = Math.min(minimum, duration)
        maximum = Math.max(maximum, duration)
        sum += duration
      }
      const results = {
        minimum,
        maximum,
        average: sum / iterations,
      }
      // eslint-disable-next-line no-console
      console.log(
        `${results.average}ms average, ${results.maximum}ms maximum, ${results.minimum}ms minimum: ${testName}`
      )
      return results
    }

    describe("filter & alternatives", () => {
      test("irritable iterator filter", async () => {
        const test = "irritable iterator filter"
        return await timeIt(test, () => {
          const items = range(ITEM_COUNT)
          const result = [...filter(items, (v) => v % 2 === 0)]
          expect(result.length).toStrictEqual(EXPECTED_RESULT_COUNT)
        })
      })

      test("native for of", async () => {
        const test = "native for of"
        const predicate = (v) => v % 2 === 0
        return timeIt(test, () => {
          const items = range(ITEM_COUNT)
          const result = []
          for (const v of items) {
            if (predicate(v)) result.push(v)
          }
          expect(result.length).toStrictEqual(EXPECTED_RESULT_COUNT)
        })
      })

      test("irritable iterator filterAsync", async () => {
        const test = "irritable iterator filterAsync"
        return timeIt(test, async () => {
          const items = range(ITEM_COUNT)
          // asyncify is fine to keep out of the timing since we're really just preparing async data
          const itemsLocal = asyncify(items)
          const initialResult = filterAsync(itemsLocal, (v) => v % 2 === 0)
          // note the extra syncify here to get back to something we can deal with synchronously we take a hit and full iteration
          const result = await syncify(initialResult)
          expect(result.length).toStrictEqual(EXPECTED_RESULT_COUNT)
        })
      })
    })
  })
})
