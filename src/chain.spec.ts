import { expectIsChainInstance } from "../tests/support"
import { chain } from "./chain"
import range from "./range"

describe("chain", () => {
  const array = [1, 2, 3]

  function* mockGenerator() {
    yield 1
    throw new Error("should only enumerate an Iterable once")
  }

  it("should not allow nulls", () => {
    expect(() => chain(null)).toThrowError()
  })

  it("should only enumerate an Iterable once", () => {
    chain(mockGenerator())
      .filter(() => true)
      .first()
  })

  it("should return  wrapped values", () => {
    const wrapped = chain([])
    const filter = wrapped.filter(() => true)
    const map = wrapped.map((i) => i)
    expectIsChainInstance(wrapped)
    expectIsChainInstance(filter)
    expectIsChainInstance(map)
  })

  describe("collect", () => {
    const actual = chain(range(2)).collect()
    expect(actual).toStrictEqual([0, 1])
  })

  describe("size", () => {
    expect(chain(array).size()).toStrictEqual(array.length)
  })

  it("to be iterable", () => {
    let count = 0
    // eslint-disable-next-line no-empty-pattern
    for (const {} of chain(array)) {
      count++
    }
    expect(count).toBeGreaterThan(0)
  })
})
