import {
  asyncify,
  expectIsAsyncChainInstance,
  expectIsChainInstance,
} from "../tests/support"
import {
  map,
  filter,
  range,
  chain,
  chainAsync,
  mapAsync,
  filterAsync,
  head,
  headAsync,
} from "./index"

describe("index", () => {
  const arr = [1, 2, 3]
  describe("package default sync exports", () => {
    it("should all be chains", () => {
      expectIsChainInstance(chain(arr))
      expectIsChainInstance(map(arr, (itm) => itm))
      expectIsChainInstance(filter(arr, () => true))
      expectIsChainInstance(range(3))
      expectIsChainInstance(head(arr, 1))
    })
  })
  describe("package default async exports", () => {
    const getAsyncIterator = () => asyncify(arr)

    it("should all be chains", () => {
      expectIsAsyncChainInstance(chainAsync(getAsyncIterator()))
      expectIsAsyncChainInstance(mapAsync(getAsyncIterator(), (itm) => itm))
      expectIsAsyncChainInstance(filterAsync(getAsyncIterator(), () => true))
      expectIsAsyncChainInstance(headAsync(getAsyncIterator(), 1))
    })
  })
})
