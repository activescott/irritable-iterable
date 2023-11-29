export function first<TItem>(iterable: Iterable<TItem>): TItem | undefined {
  for (const item of iterable) {
    return item
  }
}

export async function firstAsync<TItem>(
  iterable: AsyncIterable<TItem>
): Promise<TItem | undefined> {
  for await (const item of iterable) {
    return item
  }
}
