export function size<TItem>(iterable: Iterable<TItem>): number {
  let count = 0
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const v of iterable) {
    count++
  }
  return count
}
