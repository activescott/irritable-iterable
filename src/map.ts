export function* map<TItem, TOut = TItem>(
  iterable: Iterable<TItem>,
  mapper: (item: TItem, index: number) => TOut
): Generator<TOut> {
  let index = 0
  for (const item of iterable) {
    const mapped = mapper(item, index++)
    yield mapped
  }
}

export async function* mapAsync<TItem, TOut = TItem>(
  iterable: AsyncIterable<TItem>,
  mapper: (item: TItem, index: number) => TOut
): AsyncGenerator<TOut> {
  let index = 0
  for await (const item of iterable) {
    const mapped = mapper(item, index++)
    yield mapped
  }
}
