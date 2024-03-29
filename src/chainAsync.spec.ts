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

  it("should find", async () => {
    expect(
      await chainAsync(asyncify(array)).find((item) => item === 2)
    ).toStrictEqual(2)
  })

  it("to be iterable", async () => {
    let count = 0
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for await (const v of chainAsync(asyncify(array))) {
      count++
    }
    expect(count).toBeGreaterThan(0)
  })

  it("should first", async () => {
    expect(await chainAsync(asyncify(array)).first()).toStrictEqual(1)
  })

  it("should filter", async () => {
    const actual = await chainAsync(asyncify(array))
      .filter((item) => item === 2)
      .collect()
    expect(actual).toStrictEqual([2])
  })

  it("should map", async () => {
    const actual = await chainAsync(asyncify(array))
      .map((item) => item.toString())
      .collect()
    expect(actual).toStrictEqual(["1", "2", "3"])
  })

  it("should head", async () => {
    const actual = await chainAsync(asyncify(array)).head(2).collect()
    expect(actual).toStrictEqual([1, 2])
  })
})
