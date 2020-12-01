import { countImp } from "./count"
import { filterImp } from "./filter"
import { firstImp } from "./first"
import { mapImp } from "./map"
import { Predicate } from "./Predicate"

/**
 * Specifies the methods available on an iterable chain from the iterable methods.
 */
export interface IterableExtended<TItem> extends Iterable<TItem> {
  filter(predicate: Predicate<TItem>): IterableExtended<TItem>

  map<TOut>(mapper: (item: TItem, index: number) => TOut): IterableExtended<TOut>

  count(): number

  first(): TItem | undefined

  toArray(): TItem[]
}

/* Internal implementation of exported IterableExtended interface */
export class IterableExtendedImp<TItem> implements IterableExtended<TItem> {
  public constructor(private readonly iterable: Iterable<TItem>) {
    if (!iterable) throw new Error("iterable must be provided")
  }

  public filter(predicate: Predicate<TItem>): IterableExtended<TItem> {
    return new IterableExtendedImp(filterImp(this.iterable, predicate))
  }

  public map<TOut>(mapper: (item: TItem, index: number) => TOut): IterableExtended<TOut> {
    return new IterableExtendedImp(mapImp(this.iterable, mapper))
  }

  public count(): number {
    return countImp(this.iterable)
  }

  public first(): TItem {
    return firstImp(this.iterable)
  }

  public toArray(): TItem[] {
    return [...this.iterable]
  }

  public [Symbol.iterator](): Iterator<TItem> {
    return this.iterable[Symbol.iterator]()
  }
}
