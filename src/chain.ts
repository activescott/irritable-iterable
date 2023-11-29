import { size } from "./size"
import { filter } from "./filter"
import { first } from "./first"
import { map } from "./map"
import Predicate from "./Predicate"
import { find } from "./find"
import { product } from "./product"

/**
 * Specifies the methods available on an iterable chain.
 */
export interface Chain<TItem> extends Iterable<TItem> {
  filter(predicate: Predicate<TItem>): Chain<TItem>
  map<TOut>(mapper: (item: TItem, index: number) => TOut): Chain<TOut>
  // below here methods are actions that force an iteration
  size(): number
  collect(): TItem[]
  find(predicate: Predicate<TItem>): TItem | undefined
  first(): TItem | undefined
  product(...iterables: Iterable<TItem>[]): Chain<TItem[]>
}

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

  public find(predicate: Predicate<TItem>): TItem | undefined {
    return find(this.iterable, predicate)
  }

  public first(): TItem {
    return first(this.iterable)
  }

  public product(...iterables: Iterable<TItem>[]): Chain<TItem[]> {
    const input = [this.iterable, ...iterables]
    const result = product<TItem>(...input)
    return new ChainImp(result)
  }

  public collect(): TItem[] {
    return [...this.iterable]
  }

  public [Symbol.iterator](): Iterator<TItem> {
    return this.iterable[Symbol.iterator]()
  }
}

export const chain = <TItem>(iter: Iterable<TItem>): Chain<TItem> =>
  new ChainImp(iter)
