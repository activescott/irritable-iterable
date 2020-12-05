export default function* range(stop: number): Iterable<number> {
  let i = 0
  while (i < stop) yield i++
}
