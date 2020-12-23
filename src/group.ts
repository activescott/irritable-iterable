/**
 * Groups the items in the iterable into a map with keys specified by `keyer` and each value in the  map is an array of the items with that key.
 */
export function group<TItem, TKey>(
  iterable: Iterable<TItem>,
  keyer: (item: TItem, index: number) => TKey
): Map<TKey, TItem[]> {
  const map = new Map<TKey, TItem[]>()
  let index = 0
  for (const item of iterable) {
    const key = keyer(item, index++)
    const values = map.get(key) || new Array<TItem>()
    values.push(item)
    map.set(key, values)
  }
  return map
}

/**
 * Groups the items in the iterable into a map with keys specified by `keyer` and each value in the  map is an array of the items with that key.
 */
export async function groupAsync<TItem, TKey>(
  iterable: AsyncIterable<TItem>,
  keyer: (item: TItem, index: number) => TKey
): Promise<Map<TKey, TItem[]>> {
  const map = new Map<TKey, TItem[]>()
  let index = 0
  for await (const item of iterable) {
    const key = keyer(item, index++)
    const values = map.get(key) || new Array<TItem>()
    values.push(item)
    map.set(key, values)
  }
  return map
}
