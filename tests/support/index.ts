/// <reference types="jest" />

import { Chain } from "../../src/chain"

/**
 * The set of falsey values
 */
export const falseys = [null, undefined, false, 0, NaN, ""]

/**
 * Returns a generator for the given array
 */
export function* generator<T>(arr: Array<T>): Generator<T> {
  for (const v of arr) {
    yield v
  }
}

/**
 * expects specified object to be a Chain instance
 */
export function expectIsChainInstance(chain: Chain<unknown>): void {
  const chainMethods = ["filter", "map", "size", "first", "collect"]
  chainMethods.forEach((prop) => expect(chain).toHaveProperty(prop))
}
