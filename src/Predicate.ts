export default interface Predicate<TItem> {
  (item: TItem): boolean
}
