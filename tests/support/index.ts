/// <reference types="jest" />

import { Chain } from "../../src/chain"
import { AsyncChain } from "../../src/chainAsync"

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

export function expectIsAsyncChainInstance(chain: AsyncChain<unknown>): void {
  const chainMethods = ["filter", "map", "size", "first", "collect"]
  chainMethods.forEach((prop) => expect(chain).toHaveProperty(prop))
}

export async function* asyncify<T>(
  iter: Iterable<T>,
  milliseconds = 0
): AsyncGenerator<T, void, unknown> {
  for (const value of iter) {
    delay(milliseconds)
    yield value
  }
}

export async function syncify<T>(iter: AsyncIterable<T>): Promise<T[]> {
  const arr = []
  for await (const v of iter) {
    arr.push(v)
  }
  return arr
}

function delay(ms = 0): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
