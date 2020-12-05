import size from "./size"
import { falseys, generator } from "../tests/support"

describe("size", () => {
  const array = [1, 2, 3]
  it("should return count for generator", () => {
    expect(size(generator(array))).toBe(3)
  })

  it("should return count for array", () => {
    expect(size(array)).toBe(3)
  })

  it("should work for falsey values", () => {
    expect(size(falseys)).toStrictEqual(falseys.length)
  })
})
