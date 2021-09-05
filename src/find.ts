import Predicate from "./Predicate"

/**
 * Returns the first element from the collection that the predicate returns truthy for or undefined.
 * @param iterable The collection/iterable.
 * @param predicate The predicate is invoked with only the item.
 * @returns The matched element or `undefined`.
 */
export function find<TItem>(
  iterable: Iterable<TItem>,
  predicate: Predicate<TItem>
): TItem | undefined {
  for (const item of iterable) {
    if (predicate(item)) {
      return item
    }
  }
}

/**
 * Returns the first element from the collection that the predicate returns truthy for or undefined.
 * @param iterable The collection/iterable.
 * @param predicate The predicate is invoked with only the item.
 * @returns The matched element or `undefined`.
 */
export async function findAsync<TItem>(
  iterable: AsyncIterable<TItem>,
  predicate: Predicate<TItem>
): Promise<TItem | undefined> {
  for await (const item of iterable) {
    if (predicate(item)) {
      return item
    }
  }
}
