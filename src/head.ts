// thank you type-fest: https://github.com/sindresorhus/type-fest/blob/main/source/numeric.d.ts
export type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never

export function* head<TItem, TCount extends number>(
  iterable: Iterable<TItem>,
  count: Integer<TCount>
): Generator<TItem> {
  let i = 0
  for (const item of iterable) {
    if (i++ < count) {
      yield item
    } else {
      break
    }
  }
}

export async function* headAsync<TItem, TCount extends number>(
  iterable: AsyncIterable<TItem>,
  count: Integer<TCount>
): AsyncGenerator<TItem> {
  let i = 0
  for await (const item of iterable) {
    if (i++ < count) {
      yield item
    } else {
      break
    }
  }
}
