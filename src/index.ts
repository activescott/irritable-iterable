import { IterableExtended, IterableExtendedImp } from "./IterableExtended"
import { Predicate } from "./Predicate"
import { rangeImp } from "./range"

/* These are the exported versions of operators that return an IterableExtended with iterable extensions */
export function filter<TItem>(
  iterable: Iterable<TItem>,
  predicate: Predicate<TItem>
): IterableExtended<TItem> {
  return new IterableExtendedImp(iterable).filter(predicate)
}

export function map<TItem, TOut=TItem>(
  iterable: Iterable<TItem>,
  mapper: (item: TItem, index: number) => TOut
): IterableExtended<TOut> {
  return new IterableExtendedImp(iterable).map(mapper)
}

export function count<TItem>(iterable: Iterable<TItem>): number {
  return new IterableExtendedImp(iterable).count()
}

export function first<TItem>(iterable: Iterable<TItem>): TItem | undefined {
  return new IterableExtendedImp(iterable).first()
}

export function range(stop: number): IterableExtended<number> {
  return new IterableExtendedImp(rangeImp(stop))
}
