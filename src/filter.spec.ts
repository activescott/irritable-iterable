import { asyncify, syncify } from "../tests/support"
import { filter, filterAsync } from "./filter"

describe("filter", () => {
  const array = [1, 2, 3]

  it("should return elements `predicate` returns truthy for", () => {
    const actual = filter(array, (n) => n % 2 === 0)
    expect([...actual]).toStrictEqual([2])
  })

  describe("async", () => {
    it("should return elements `predicate` returns truthy for", async () => {
      const input = asyncify([1, 2, 3], 1000)

      const actual = filterAsync(input, (n) => n % 2 === 0)
      expect(syncify(actual)).resolves.toStrictEqual([2])
    })
  })
})
