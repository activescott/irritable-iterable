import { expectIsChainInstance } from "../tests/support"
import { map, filter, range } from "./index"

describe("index", () => {
  const arr = [1, 2, 3]
  it("default exports should all be chains", () => {
    expectIsChainInstance(map(arr, (itm) => itm))
    expectIsChainInstance(filter(arr, () => true))
    expectIsChainInstance(range(3))
  })
})
