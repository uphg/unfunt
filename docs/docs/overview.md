# API Reference

Welcome to the Unfunt API reference documentation. Unfunt is a collection of utility functions designed for TypeScript/JavaScript.

## Quick Navigation

### [Array Methods](./array.md)
Utility methods for array processing
- `remain` - Split array by given parameters and return the remaining parts
- `toArray` - Convert value to array

### [Function Methods](./function.md)  
Utility methods for function processing
- `debounce` - Create debounced function
- `throttle` - Create throttled function

### [Number Methods](./number.md)
Utility methods for number processing
- `toNumber` - Convert value to number
- `toFinite` - Convert value to finite number
- `toInteger` - Convert value to integer
- `toLength` - Convert value to integer suitable for array-like object length

### [Object Methods](./object.md)
Utility methods for object processing
- `omit` / `omitBy` - Create object excluding specified properties
- `pick` / `pickBy` - Create object with only specified properties
- `mapEntries` - Transform object key-value pairs through mapping function
- `forEachEntry` - Iterate over object key-value pairs

### [String Methods](./string.md)
Utility methods for string processing
- `trim` - Remove whitespace from both ends of string

### [Type Check Methods](./typed.md)
Utility methods for type checking
- Contains 17 type checking functions like `isArray`, `isString`, `isNumber`, etc.

## Usage

```ts
// Import specific functions
import { debounce, isArray, toNumber } from 'xfunc'

// Or import all methods
import * as xfunc from 'xfunc'
```

## Overview

Unfunt provides a comprehensive set of utility functions that are:

- **Type-safe**: Built with TypeScript for excellent IntelliSense
- **Tree-shakable**: Import only what you need
- **Zero dependencies**: Lightweight and self-contained
- **Well-tested**: Comprehensive test coverage
- **Production-ready**: Used in real-world applications

All functions follow consistent naming conventions and provide reliable error handling.