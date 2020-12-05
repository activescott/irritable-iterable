# Irritable Iterable

Collection functions for JavaScript [iterators, generators and iterables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators).

## todo

misc:

- rename toArray to collect
- async versions of all operations (see AsyncIterable)

operations:

- reduce
- take
- forEach
- some: returns true (?) when any one element satisfies predicate
- every: : returns true (?) when EVERY one element satisfies predicate
- none: returns true (?) when NO element satisfies predicate
- find
- range
- uniq
- zip
- without

NOTE: some operations that necessarily require a full iteration or a hydration of all items at once (incurring significant memory usage) may be should be on a different interface or something to make the cost /more/ explicit

- collect => []

* sample
* slice
* groupBy (lodash uses keyBy, also see d3)
* orderBy

tasks:

- docs!
- tests
- perf baselines and test thresholds
- coverage
