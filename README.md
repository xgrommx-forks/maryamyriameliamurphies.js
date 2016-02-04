> All told, a monad in _X_ is just a monoid in the category of endofunctors of _X_, with product × replaced by composition of endofunctors and unit set by the identity endofunctor.
> — Saunders Mac Lane, [_Categories for the Working Mathematician_](http://bit.ly/1MbDPv3)

> In general, an arrow type will be a parameterised type with _two_ parameters, supporting operations analogous to _return_ and >>=. Just as we think of a monadic type _m a_ as representing a 'computation delivering an _a_', so we think of an arrow type _a b c_ (that is, the application of the parameterised type _a_ to the two parameters _b_ and _c_) as representing a 'computation with input of type _b_ delivering a _c_'.
> — John Hughes, [_Generalising monads to arrows_](http://www.sciencedirect.com/science/article/pii/S0167642399000234)

> In mathematics, a functor is a type of mapping between categories which is applied in category theory. Functors can be thought of as homomorphisms between categories. In the category of small categories, functors can be thought of more generally as morphisms.
> — Wikipedia, [_Functor_](https://en.wikipedia.org/wiki/Functor)

> murphy come, murphy go, murphy plant, murphy grow, a maryamyriameliamurphies, in the lazily eye of his lapis
> — James Joyce, [_Finnegans Wake_](http://www.trentu.ca/faculty/jjoyce/fw-293.htm)

# maryamyriameliamurphies.js

maryamyriameliamurphies.js is a library of [Haskell](https://www.haskell.org) data types, type classes, and morphisms translated into [JavaScript ES2015](http://www.ecma-international.org/ecma-262/6.0/) syntax. Because if you don't program with morphisms in mind, you are more likely to be menaced by [Murphy's Law](https://en.wikipedia.org/wiki/Murphy%27s_law). Just don't go thinking the average explanation of functional programming terminology makes any more sense to the average reader than the average page of _Finnegans Wake_. All you need to know—in fact, all I understand—is that a pure function (or a morphism in general) simply describes how one thing turns into another. So a functional program, like Joyce's final work, is an extended abstraction of changes. Many of these functions are similarly experiments in poetic coding, but so much the better if any of them turn out to be useful.

I developed this code using [Babel](http://babeljs.io/) and the [babel-eslint](https://github.com/babel/babel-eslint) parser for [ESLint](http://eslint.org) and tested the linted and transpiled ES5 output in Safari and Chrome. Since it uses the ES2015 [Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) object, you will need to install the [babel-polyfill](http://babeljs.io/docs/usage/polyfill/) package with [npm](https://www.npmjs.com) or copy the code from `polyfill.js` to get it to work in [node](https://nodejs.org/en/) or the browser, respectively.

There are two Haskell concepts that I use in the code that do not perfectly fit into the JavaScript way of doing things: the type class and the data type. In Haskell, a type class is similar to a protocol or trait in other programming languages. It describes an interface that objects conforming to it must implement.

A type class is a way of making fully parameterized types more useful by placing certain constraints on them. For example, the `Eq` type class in this library provides functionality for comparing whether the objects that implement it are equal. Such objects must provide their own `eq()` function that performs this test and returns a `boolean` value. Note that Haskell type classes are in no way comparable to "classes" in OOP.

A data type, on the other hand, is much closer to an OO class definition, as it does describe a custom type. My `Tuple` type is an example of a data type, as it represents a container for other, more basic values. As is often the case with objects in classical languages, instances of Haskell data types are created with special constructor functions that initialize them based on the arguments to those functions. A data type does not inherit from other data types, however. Instead, it describes how constructor functions convert values passed in as arguments to those functions to the values that comprise that particular type.

As mentioned above, data types can be constrained (or not) by type classes, so as to provide additional functionality—`Eq` is an example of this, as is `Ord`, a type class that allows objects to be compared. `Tuple` implements both of these type classes, as one may quite rightly want to compare tuples or test them for equality.

Since JavaScript is not a strongly typed language by nature, it seemed unnecessary to me to recreate the entirety of Haskell's static type system. Anyone interested in such a thing should probably be using something like [PureScript](http://www.purescript.org) or [GHCJS](https://github.com/ghcjs/ghcjs). Instead, I use the ES2015 `class` syntax for both type classes and data types. The difference is that my "type classes" do not define constructor functions—and therefore cannot be called as functions at all in their own right—whereas my "data types" do. This one feature of ES2015 has made it possible to at least hack a distinction that is built into Haskell.

ES2015 also features tail call optimization, which ensures that all the nifty Haskell-esque recursions this library uses won't blow up your call stack.

## Eq
*Type class*
The `Eq` type class defines equality and inequality. Instances of `Eq` must implement an `eq(b)` function that returns true if the instance `a` is equal to `b`.

* `is(a, b)` Returns true if a === b.
* `isNot(a, b)` Returns true if a !== b.

## Ord
*Type class*


## Tuple
*Data type*

