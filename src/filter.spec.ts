import filter from "./filter"

describe("filter", function () {
  const array = [1, 2, 3]

  it("should return elements `predicate` returns truthy for", function () {
    const actual = filter(array, (n) => n % 2 === 0)
    expect([...actual]).toStrictEqual([2])
  })
})
