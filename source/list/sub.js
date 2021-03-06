/**
 * maryamyriameliamurphies.js
 * A library of Haskell-style morphisms ported to ES2015 JavaScript.
 *
 * list/sub.js
 *
 * @file Sublist functions.
 * @license ISC
 */

/** @module list/sub */

import {
  partial,
  $,
  not
} from '../base';

import {isEq} from '../eq';

import {
  Nothing,
  just
} from '../maybe';

import {
  tuple,
  fst,
  snd
} from '../tuple';

import {
  emptyList,
  cons,
  head,
  tail,
  isList,
  isEmpty
} from '../list';

import {error} from '../error';

/**
 * Return the prefix of a `List` of a given length.
 * <br>`Haskell> take :: Int -> [a] -> [a]`
 * @param {number} n - The length of the prefix to take
 * @param {List} as - The `List` to take from
 * @returns {List} A new `List`, the desired prefix of the original list
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * take(2, lst);            // => [1:2:[]]
 */
export const take = (n, as) => {
  const take_ = (n, as) => {
    if (isList(as) === false) { return error.listError(as, take); }
    if (n <= 0) { return emptyList; }
    if (isEmpty(as)) { return emptyList; }
    const x = head(as);
    const xs = tail(as);
    return cons(x)(take(n - 1)(xs));
  }
  return partial(take_, n, as);
}

/**
 * Return the suffix of a `List` after discarding a specified number of values.
 * <br>`Haskell> drop :: Int -> [a] -> [a]`
 * @param {number} n - The number of values to drop
 * @param {List} as - The `List` to drop values from
 * @returns {List} A new `List`, the desired suffix of the original list
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * drop(2, lst);            // => [3:[]]
 */
export const drop = (n, as) => {
  const drop_ = (n, as) => {
    if (isList(as) === false) { return error.listError(as, drop); }
    if (n <= 0) { return as; }
    if (isEmpty(as)) { return emptyList; }
    const xs = tail(as);
    return drop(n - 1)(xs);
  }
  return partial(drop_, n, as);
}

/**
 * Return a `Tuple` in which the first element is the prefix of a `List` of a given length and the
 * second element is the remainder of the list.
 * <br>`Haskell> splitAt :: Int -> [a] -> ([a], [a])`
 * @param {number} n - The length of the prefix
 * @param {List} xs - The `List` to split
 * @returns {Tuple} The split `List`
 * @kind function
 * @example
 * const lst = list(1,2,3);
 * splitAt(2, lst);         // => ([1:2:[]],[3:[]])
 */
export const splitAt = (n, xs) => {
  const splitAt_ = (n, xs) =>
    isList(xs) ? tuple(take(n, xs), drop(n, xs)) : error.listError(xs, splitAt);
  return partial(splitAt_, n, xs);
}

/**
 * Return the longest prefix (possibly empty) of a `List` of values that satisfy a predicate
 * function.
 * <br>`Haskell> takeWhile :: (a -> Bool) -> [a] -> [a]`
 * @param {Function} p - The predicate function (should return `boolean`)
 * @param {List} as - The `List` to take from
 * @returns {List} The `List` of values that satisfy the predicate function
 * @kind function
 * @example
 * const lst = list(1,2,3,4,1,2,3,4);
 * const f = x => x < 3;
 * takeWhile(f, lst);                 // => [1:2:[]]
 */
export const takeWhile = (p, as) => {
  const takeWhile_ = (p, as) => {
    if (isList(as) === false) { return error.listError(as, takeWhile); }
    if (isEmpty(as)) { return emptyList; }
    const x = head(as);
    const xs = tail(as);
    const test = p(x);
    if (test === true) { return cons(x)(takeWhile(p, xs)); }
    if (test === false) { return emptyList; }
    return error.listError(as, takeWhile);
  }
  return partial(takeWhile_, p, as);
}

/**
 * Drop values from a `List` while a given predicate function returns `true` for each value.
 * <br>`Haskell> dropWhile :: (a -> Bool) -> [a] -> [a]`
 * @param {Function} p - The predicate function (should return `boolean`)
 * @param {List} as - The `List` to drop values from
 * @returns {List} The `List` of values that do not satisfy the predicate function
 * @kind function
 * @example
 * const lst = list(1,2,3,4,5,1,2,3);
 * const f = x => x < 3;
 * dropWhile(f, lst);                 // => [3:4:5:1:2:3:[]]
 */
export const dropWhile = (p, as) => {
  const dropWhile_ = (p, as) => {
    if (isList(as) === false) { return error.listError(as, dropWhile); }
    if (isEmpty(as)) { return emptyList; }
    const x = head(as);
    const xs = tail(as);
    const test = p(x);
    if (test === true) { return dropWhile(p, xs); }
    if (test === false) { return as; }
    return error.listError(as, dropWhile);
  }
  return partial(dropWhile_, p, as);
}

/**
 * Return a `Tuple` in which the first element is the longest prefix (possibly empty) of a `List` of
 * values that satisfy a predicate function and the second element is the rest of the list.
 * <br>`Haskell> span :: (a -> Bool) -> [a] -> ([a], [a])`
 * @param {Function} p - The predicate function (should return `boolean`)
 * @param {List} xs - A `List`
 * @returns {Tuple} The `Tuple` of results
 * @kind function
 * @example
 * const lst = list(1,2,3,4,1,2,3,4);
 * const f = x => x < 3;
 * span(f, lst);                      // => ([1:2:[]],[3:4:1:2:3:4:[]])
 */
export const span = (p, xs) => {
  const span_ = (p, xs) =>
    isList(xs) ? tuple(takeWhile(p, xs), dropWhile(p, xs)) : error.listError(xs, span);
  return partial(span_, p, xs);
}

/**
 * Return a `Tuple` in which the first element is the longest prefix (possibly empty) of a `List` of
 * values that do not satisfy a predicate function and the second element is the rest of the list.
 * <br>`Haskell> break :: (a -> Bool) -> [a] -> ([a], [a])`
 * @param {Function} p - The predicate function (should return `boolean`)
 * @param {List} xs - A `List`
 * @returns {Tuple} - The `Tuple` of results
 * @kind function
 * @example
 * const lst = list(1,2,3,4,1,2,3,4);
 * const f = x => x > 3;
 * spanNot(f, lst);                   // => ([1:2:3:[]],[4:1:2:3:4:[]])
 */
export const spanNot = (p, xs) => {
  const spanNot_ = (p, xs) => span($(not)(p), xs);
  return partial(spanNot_, p, xs);
}

/**
 * Drops the given prefix from a `List`. Returns `Nothing` if the list does not start with the given
 * prefix, or `Just` the `List` after the prefix, if it does.
 * <br>`Haskell> stripPrefix :: Eq a => [a] -> [a] -> Maybe [a]`
 * @param {List} as - The prefix `List` to strip
 * @param {List} bs - The `List` from which to strip the prefix
 * @returns {Maybe} - The result `List` contained in a `Just`, or `Nothing`
 * @kind function
 * @example
 * const prefix = fromStringToList(`foo`);
 * stripPrefix(prefix, fromStringToList(`foobar`));    // => Just [bar]
 * stripPrefix(prefix, fromStringToList(`foo`));       // => Just [[]]
 * stripPrefix(prefix, fromStringToList(`barfoo`));    // => Nothing
 * stripPrefix(prefix, fromStringToList(`barfoobaz`)); // => Nothing
 */
export const stripPrefix = (as, bs) => {
  const stripPrefix_ = (as, bs) => {
    if (isList(as) === false) { return error.listError(as, stripPrefix); }
    if (isList(bs) === false) { return error.listError(bs, stripPrefix); }
    if (isEmpty(as)) { return just(bs); }
    const x = head(as);
    const xs = tail(as);
    const y = head(bs);
    const ys = tail(bs);
    if (x === y) { return stripPrefix(xs, ys); }
    return Nothing;
  }
  return partial(stripPrefix_, as, bs);
}

/**
 * Take a `List` and return a `List` of lists such that the concatenation of the result is equal to
 * the argument. Each sublist in the result contains only equal values. Use `groupBy` to supply your
 * own equality function.
 * <br>`Haskell> group :: Eq a => [a] -> [[a]]`
 * @param {List} xs - A `List`
 * @returns {List} - A `List` of result lists
 * @kind function
 * @example
 * const str = fromStringToList(`Mississippi`);
 * group(str); // => [[M]:[i]:[ss]:[i]:[ss]:[i]:[pp]:[i]:[]]
 */
export const group = xs => groupBy(isEq, xs);

/**
 * Take a `List` and return a `List` of lists such that the concatenation of the result is equal to
 * the argument. Each sublist in the result is grouped according to the the given equality function.
 * <br>`Haskell> groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
 * @param {Function} eq - A function to test the equality of elements (must return `boolean`)
 * @param {List} as - A `List`
 * @returns {List} A `List` of result lists
 * @kind function
 */
export const groupBy = (eq, as) => {
  const groupBy_ = (eq, as) => {
    if (isList(as) === false) { return error.listError(as, groupBy); }
    if (isEmpty(as)) { return emptyList; }
    const x = head(as);
    const xs = tail(as);
    const t = span(eq(x), xs);
    const ys = fst(t);
    const zs = snd(t);
    return cons(cons(x)(ys))(groupBy(eq, zs));
  }
  return partial(groupBy_, eq, as);
}
