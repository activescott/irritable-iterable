import Predicate from "./Predicate"

export function* filter<TItem>(
  iterable: Iterable<TItem>,
  predicate: Predicate<TItem>
): Generator<TItem> {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item
    }
  }
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
