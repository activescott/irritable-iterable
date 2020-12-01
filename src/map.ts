export function* mapImp<TItem, TOut=TItem>(
  iterable: Iterable<TItem>,
  mapper: (item: TItem, index: number) => TOut
): Generator<TOut> {
  let index = 0
  for (const item of iterable) {
    const mapped = mapper(item, index++)
    yield mapped
  }
}
