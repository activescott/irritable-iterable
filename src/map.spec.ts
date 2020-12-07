import { asyncify, syncify } from "../tests/support"
import { map, mapAsync } from "./map"

describe("map", () => {
  const array = [1, 2]

  it("should map values in collection to a new array", () => {
    const actual = map(array, String)
    const expected = ["1", "2"]
    expect([...actual]).toStrictEqual(expected)
  })

  describe("async", () => {
    it("should map values in collection to a new array", async () => {
      const actual = mapAsync(asyncify(array), String)
      const expected = ["1", "2"]
      expect([...(await syncify(actual))]).toStrictEqual(expected)
    })
  })
})
