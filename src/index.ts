import { Chain, chain } from "./chain"
import Predicate from "./Predicate"
import rangeImp from "./range"
export { default as first } from "./first"
export { default as size } from "./size"

/* These are the exported versions of operators that return an Chain with iterable extensions */
export function filter<TItem>(
  iterable: Iterable<TItem>,
  predicate: Predicate<TItem>
): Chain<TItem> {
  return chain(iterable).filter(predicate)
}

export function map<TItem, TOut = TItem>(
  iterable: Iterable<TItem>,
  mapper: (item: TItem, index: number) => TOut
): Chain<TOut> {
  return chain(iterable).map(mapper)
}

export const range = (stop: number): Chain<number> => chain(rangeImp(stop))
