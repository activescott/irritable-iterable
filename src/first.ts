export default function first<TItem>(
  iterable: Iterable<TItem>
): TItem | undefined {
  for (const item of iterable) {
    return item
  }
}
