import { Chain, chain } from "./chain"
import { AsyncChain, chainAsync } from "./chainAsync"
import Predicate from "./Predicate"
import rangeImp from "./range"
export { chain } from "./chain"
export { chainAsync } from "./chainAsync"
export { find } from "./find"
export { first } from "./first"
export { group, groupAsync } from "./group"
export { size } from "./size"

/* These are the exported versions of operators that return an Chain with iterable extensions */
export function filter<TItem>(
  iterable: Iterable<TItem>,
  predicate: Predicate<TItem>
): Chain<TItem> {
  return chain(iterable).filter(predicate)
}

export function filterAsync<TItem>(
  iterable: AsyncIterable<TItem>,
  predicate: Predicate<TItem>
): AsyncChain<TItem> {
  return chainAsync(iterable).filter(predicate)
}

export function map<TItem, TOut = TItem>(
  iterable: Iterable<TItem>,
  mapper: (item: TItem, index: number) => TOut
): Chain<TOut> {
  return chain(iterable).map(mapper)
}

export function mapAsync<TItem, TOut = TItem>(
  iterable: AsyncIterable<TItem>,
  mapper: (item: TItem, index: number) => TOut
): AsyncChain<TOut> {
  return chainAsync(iterable).map(mapper)
}

export const range = (
  start: number = 0,
  stop: number = undefined,
  step = 1
): Chain<number> => chain(rangeImp(start, stop, step))
