import { asyncify } from "../tests/support"
import { group, groupAsync } from "./group"

describe("group", () => {
  type Player = { name: string; score: number }
  const data: Player[] = [
    { name: "Micah", score: 505 },
    { name: "Jonah", score: 145 },
    { name: "Oksana", score: 450 },
    { name: "Oksana", score: 440 },
  ]

  it("should group by specified selector", () => {
    const byName: Map<string, Player[]> = group(data, (d) => d.name)
    const actualKeys = Array.from(byName.keys())
    expect(actualKeys).toEqual(
      expect.arrayContaining(["Micah", "Jonah", "Oksana"])
    )
    expect(actualKeys).toHaveLength(3)
    const oksana = byName.get("Oksana")
    expect(oksana).toHaveLength(2)
  })

  describe("async", () => {
    it("should group by specified selector", async () => {
      const dataGenerator = asyncify(data)
      const byName: Map<string, Player[]> = await groupAsync(
        dataGenerator,
        (d) => d.name
      )
      const actualKeys = Array.from(byName.keys())
      expect(actualKeys).toEqual(
        expect.arrayContaining(["Micah", "Jonah", "Oksana"])
      )
      expect(actualKeys).toHaveLength(3)
      const oksana = byName.get("Oksana")
      expect(oksana).toHaveLength(2)
    })
  })
})
