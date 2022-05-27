export function product<TItem>(
  ...iterables: Iterable<TItem>[]
): Generator<Array<TItem>> {
  function* helper(
    row: TItem[],
    iterableIndex: number
  ): Generator<Array<TItem>> {
    const iterable = iterables[iterableIndex]
    for (const item of iterable) {
      // if there's more iterables:
      if (iterableIndex < iterables.length - 1) {
        yield* helper(row.concat(item), iterableIndex + 1)
      } else {
        yield row.concat(item)
      }
    }
  }
  return helper([], 0)
}
