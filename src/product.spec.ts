import { product } from "./product"

describe("product", () => {
  it.each([
    { a: [1], b: [2], expected: [[1, 2]] },
    {
      a: [1, 2],
      b: [3, 4],
      expected: [
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
      ],
    },
    { a: [1, 2], b: [], expected: [] },
  ])("%j, %j => %j", ({ a, b, expected }) => {
    expectCollected(product(a, b)).toStrictEqual(expected)
  })

  it("should handle three", () => {
    const a = [1, 2]
    const b = [3, 4]
    const c = [5, 6]
    const expected = [
      [1, 3, 5],
      [1, 3, 6],
      [1, 4, 5],
      [1, 4, 6],
      [2, 3, 5],
      [2, 3, 6],
      [2, 4, 5],
      [2, 4, 6],
    ]
    expectCollected(product(a, b, c)).toStrictEqual(expected)
  })
})

const expectCollected = (actual) => expect([...actual])
