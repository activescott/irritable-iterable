export function firstImp<TItem>(iterable: Iterable<TItem>): TItem | undefined {
  for (const item of iterable) {
    return item
  }
}
