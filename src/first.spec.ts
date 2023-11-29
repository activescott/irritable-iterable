import { asyncify } from "../tests/support"
import { first, firstAsync } from "./first"

describe("first", () => {
  const array = [1, 2, 3]

  it("should return first item", () => {
    const actual = first(array)
    expect(actual).toStrictEqual(1)
  })

  it("should return undefined if empty", () => {
    const actual = first([])
    expect(actual).toBeUndefined()
  })

  describe("async", () => {
    it("should return first item", async () => {
      const input = asyncify(array)

      const actual = firstAsync(input)
      await expect(actual).resolves.toStrictEqual(1)
    })

    it("should return undefined if empty", async () => {
      const input = asyncify([])

      const actual = firstAsync(input)
      await expect(actual).resolves.toBeUndefined()
    })
  })
})
