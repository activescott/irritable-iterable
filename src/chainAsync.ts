import { filterAsync } from "./filter"
import { findAsync } from "./find"
import { headAsync, Integer } from "./head"
import { mapAsync } from "./map"
import Predicate from "./Predicate"

export interface AsyncChain<TItem> extends AsyncIterable<TItem> {
  filter(predicate: Predicate<TItem>): AsyncChain<TItem>
  head<TCount extends number>(count: Integer<TCount>): AsyncChain<TItem>
  map<TOut>(mapper: (item: TItem, index: number) => TOut): AsyncChain<TOut>
  // below here methods are actions that force an iteration
  /**
   * Counts every item returned by the iterator.
   * If any item is rejected, then this call is rejected.
   */
  size(): Promise<number>
  /**
   * Iterates each item in the iterator (settling it's promise) and returns them as an array.
   * If any item in the iterator rejects, then this method also rejects.
   */
  collect(): Promise<Array<TItem>>
  /**
   * Returns the first element from the collection that the predicate returns truthy for or undefined.
   * @param predicate The predicate is invoked with only the item.
   * @returns The matched element or `undefined`.
   */
  find(predicate: Predicate<TItem>): Promise<TItem | undefined>
  /**
   * Resolves the first item from the iterable and returns it.
   * If no elements are in the iterable then `undefined` is returned.
   */
  first(): Promise<TItem | undefined>
}

export class AsyncChainImp<TItem> implements AsyncChain<TItem> {
  public constructor(private readonly iterable: AsyncIterable<TItem>) {
    if (!iterable) throw new Error("async iterable must be provided")
  }

  public filter(predicate: Predicate<TItem>): AsyncChain<TItem> {
    return new AsyncChainImp(filterAsync(this.iterable, predicate))
  }

  public map<TOut>(
    mapper: (item: TItem, index: number) => TOut
  ): AsyncChain<TOut> {
    return new AsyncChainImp(mapAsync(this.iterable, mapper))
  }

  public head<TCount extends number>(
    count: Integer<TCount>
  ): AsyncChain<TItem> {
    return new AsyncChainImp(headAsync(this.iterable, count))
  }

  public async size(): Promise<number> {
    let size = 0
    // eslint-disable-next-line no-empty-pattern
    for await (const {} of this.iterable) {
      size++
    }
    return size
  }

  public async collect(): Promise<Array<TItem>> {
    const collection = []
    for await (const v of this.iterable) {
      collection.push(v)
    }
    return collection
  }

  public async find(predicate: Predicate<TItem>): Promise<TItem | undefined> {
    return findAsync(this.iterable, predicate)
  }

  public async first(): Promise<TItem> {
    for await (const v of this.iterable) {
      return v
    }
  }

  public [Symbol.asyncIterator](): AsyncIterator<TItem> {
    return this.iterable[Symbol.asyncIterator]()
  }
}

export const chainAsync = <TItem>(
  iter: AsyncIterable<TItem>
): AsyncChain<TItem> => new AsyncChainImp(iter)
