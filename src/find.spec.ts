import { asyncify } from "../tests/support"
import { find, findAsync } from "./find"

describe("find", () => {
  const array = [1, 2, 3]

  it("should return item that `predicate` returns truthy for", () => {
    const actual = find(array, (n) => n % 2 === 0)
    expect(actual).toStrictEqual(2)
  })

  it("should return undefined if predicate never truthy", () => {
    const actual = find(array, (n) => n === -1)
    expect(actual).toBeUndefined()
  })

  describe("async", () => {
    it("should return item `predicate` returns truthy for", async () => {
      const input = asyncify([1, 2, 3], 5)

      const actual = findAsync(input, (n) => n % 2 === 0)
      expect(actual).resolves.toStrictEqual(2)
    })

    it("should return undefined if predicate never truthy", () => {
      const input = asyncify([1, 2, 3], 5)

      const actual = findAsync(input, (n) => n === -1)
      expect(actual).resolves.toBeUndefined()
    })
  })
})
