import { asyncify, syncify } from "../tests/support"
import { head, headAsync } from "./head"

describe("head", () => {
  const array = [1, 2, 3]

  it("should return one item", () => {
    const actual = head(array, 1)
    expect([...actual]).toStrictEqual([1])
  })

  it("should return multiple items", () => {
    const actual = head(array, 2)
    expect([...actual]).toStrictEqual([1, 2])
  })

  it("should return empty if empty", () => {
    const actual = head([], 1)
    expect([...actual]).toHaveLength(0)
  })

  it("should return whole array when count is too long", () => {
    const actual = head(array, 10000)
    expect([...actual]).toHaveLength(3)
  })

  describe("async", () => {
    it("should return head item", async () => {
      const input = asyncify(array)

      const actual = headAsync(input, 1)
      await expect(syncify(actual)).resolves.toStrictEqual([1])
    })

    it("should return multiple items", async () => {
      const input = asyncify(array)

      const actual = headAsync(input, 2)
      await expect(syncify(actual)).resolves.toStrictEqual([1, 2])
    })

    it("should return empty if empty", async () => {
      const input = asyncify([])

      const actual = headAsync(input, 2)
      await expect(syncify(actual)).resolves.toHaveLength(0)
    })

    it("should return whole array when count is too long", async () => {
      const input = asyncify(array)

      const actual = headAsync(input, 1000)
      await expect(syncify(actual)).resolves.toStrictEqual([1, 2, 3])
    })
  })
})
