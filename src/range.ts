export default function* range(
  start: number = 0,
  stop: number = undefined,
  step = 1
): Iterable<number> {
  if (stop === undefined) {
    stop = start
    start = 0
  }

  if (step == 0) return []

  const doContinue =
    step > 0 ? (current) => current < stop : (current) => current > stop

  while (doContinue(start)) {
    yield start
    start += step
  }
}
