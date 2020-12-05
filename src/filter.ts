import Predicate from "./Predicate"

export default function* filter<TItem>(
  iterable: Iterable<TItem>,
  predicate: Predicate<TItem>
): Generator<TItem> {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item
    }
  }
}
