import size from "./size"
import filter from "./filter"
import first from "./first"
import map from "./map"
import Predicate from "./Predicate"

/**
 * Specifies the methods available on an iterable chain from the iterable methods.
 */
export interface Chain<TItem> extends Iterable<TItem> {
  filter(predicate: Predicate<TItem>): Chain<TItem>
  map<TOut>(mapper: (item: TItem, index: number) => TOut): Chain<TOut>
  size(): number
  collect(): TItem[]
  first(): TItem | undefined
}

export const chain = <TItem>(iter: Iterable<TItem>): Chain<TItem> =>
  new ChainImp(iter)

/* Internal implementation of exported Chain interface */
class ChainImp<TItem> implements Chain<TItem> {
  public constructor(private readonly iterable: Iterable<TItem>) {
    if (!iterable) throw new Error("iterable must be provided")
  }

  public filter(predicate: Predicate<TItem>): Chain<TItem> {
    return new ChainImp(filter(this.iterable, predicate))
  }

  public map<TOut>(mapper: (item: TItem, index: number) => TOut): Chain<TOut> {
    return new ChainImp(map(this.iterable, mapper))
  }

  public size(): number {
    return size(this.iterable)
  }

  public first(): TItem {
    return first(this.iterable)
  }

  public collect(): TItem[] {
    return [...this.iterable]
  }

  public [Symbol.iterator](): Iterator<TItem> {
    return this.iterable[Symbol.iterator]()
  }
}
