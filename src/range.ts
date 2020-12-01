export function* rangeImp(stop: number): Iterable<number> {
  let i = 0
  while (i < stop) yield i++
}
