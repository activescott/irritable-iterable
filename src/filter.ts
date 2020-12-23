import Predicate from "./Predicate"

export function* filter<TItem>(
  iterable: Iterable<TItem>,
  predicate: Predicate<TItem>
): Generator<TItem> {
  /* NOTE:
   * node v15.0.1 ES6: ~0.135ms average @ 1K iterations
   */
  for (const item of iterable) {
    if (predicate(item)) {
      yield item
    }
  }
  /* NOTE: manual iteration handling is basically equivalent perf to `for...of` in TS on nodejs 
   * In ES5 target TypeScript unwraps for..of to the same thing anyway. In ES6 it emits for..of
   * node v15.0.1 ES6: ~0.124ms average @ 1K iterations
  const iterator: Iterator<TItem, any, undefined> = iterable[Symbol.iterator]()
  let value: TItem
  for (let next = iterator.next(); !next.done; next = iterator.next()) {
    value = next.value
    if (predicate(value)) yield value
  }
  */
}

export async function* filterAsync<TItem>(
  iterable: AsyncIterable<TItem>,
  predicate: Predicate<TItem>
): AsyncGenerator<TItem> {
  for await (const item of iterable) {
    if (predicate(item)) {
      yield item
    }
  }
}
