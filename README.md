# crosspile

A cross-compiler from JavaScript to any language (currently, Python and PHP).

**WORK IN PROGRESS (early stages, not usable/hackable yet)**

## Goal

To replace the current regexp-based [`transpile.js`](https://github.com/kroitor/ccxt/blob/master/transpile.js) script (that drives the multi-language support in the [CCXT Library](https://github.com/kroitor/ccxt/)) with a more robust AST-based solution.

## Current State

Trying to figure out how to do AST transformation properly, while maintaining a human-readable formatting and comments attached to proper places (which is not an easy thing to do...)

## Hacking The Project

Please keep in mind that at the moment we do not accept contributions, as the project structure is not established yet and everything changes rapidly, as we're experimenting with things.
