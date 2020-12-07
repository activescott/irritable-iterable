import { chainAsync } from "./chainAsync"
import { asyncify, expectIsAsyncChainInstance } from "../tests/support"
import range from "./range"

describe("asyncChain", () => {
  const array = [1, 2, 3]

  async function* mockGenerator() {
    yield 1
    throw new Error("should only enumerate an Iterable once")
  }

  it("should not allow nulls", () => {
    expect(() => chainAsync(null)).toThrowError()
  })

  it("should only enumerate an Iterable once", () => {
    chainAsync(mockGenerator())
      .filter(() => true)
      .first()
  })

  it("should return  wrapped values", () => {
    const wrapped = chainAsync(asyncify([]))
    const filter = wrapped.filter(() => true)
    const map = wrapped.map((i) => i)
    expectIsAsyncChainInstance(wrapped)
    expectIsAsyncChainInstance(filter)
    expectIsAsyncChainInstance(map)
  })

  it("should collect", async () => {
    const actual = await chainAsync(asyncify(range(2))).collect()
    expect(actual).toStrictEqual([0, 1])
  })

  it("should size", async () => {
    expect(await chainAsync(asyncify(array)).size()).toStrictEqual(array.length)
  })

  it("to be iterable", async () => {
    let count = 0
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const v of chainAsync(asyncify(array))) {
      count++
    }
    expect(count).toBeGreaterThan(0)
  })
})
