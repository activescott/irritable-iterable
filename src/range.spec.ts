import range from "./range"

describe("range", () => {
  it("should work with stop", () => {
    const actual = [...range(10)]
    expect(actual).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it("should support start, stop", () => {
    const actual = [...range(1, 11)]
    expect(actual).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it("should support start, stop, step", () => {
    let actual = [...range(0, 30, 5)]
    expect(actual).toStrictEqual([0, 5, 10, 15, 20, 25])

    actual = [...range(0, 10, 3)]
    expect(actual).toStrictEqual([0, 3, 6, 9])
  })

  it("should support negative steps", () => {
    const actual = [...range(0, -10, -1)]
    expect(actual).toStrictEqual([0, -1, -2, -3, -4, -5, -6, -7, -8, -9])
  })

  it("should support zero stop", () => {
    const actual = [...range(0)]
    expect(actual).toStrictEqual([])
  })

  it("should support stop below step", () => {
    const actual = [...range(1, 0)]
    expect(actual).toStrictEqual([])
  })

  it("should support zero step", () => {
    const actual = [...range(0, 10, 0)]
    expect(actual).toStrictEqual([])
  })

  it("should support undefined start", () => {
    // this really shouldn't happen, but the type declares it could so we handle it.
    const actual = [...range(undefined, 1)]
    expect(actual).toStrictEqual([0])
  })
})
