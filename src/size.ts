export default function size<TItem>(iterable: Iterable<TItem>): number {
  let count = 0
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const item of iterable) {
    count++
  }
  return count
}
