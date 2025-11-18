# xfunc

```
██╗   ██╗███╗   ██╗███████╗██╗   ██╗███╗   ██╗████████╗
██║   ██║████╗  ██║██╔════╝██║   ██║████╗  ██║╚══██╔══╝
██║   ██║██╔██╗ ██║█████╗  ██║   ██║██╔██╗ ██║   ██║   
██║   ██║██║╚██╗██║██╔══╝  ██║   ██║██║╚██╗██║   ██║   
╚██████╔╝██║ ╚████║██║     ╚██████╔╝██║ ╚████║   ██║   
 ╚═════╝ ╚═╝  ╚═══╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝   ╚═╝
```

A modern collection of utility functions for TypeScript/JavaScript projects.

## Features

- 🚀 **TypeScript First** - Built with TypeScript, providing excellent type safety
- 📦 **Tree Shaking** - Only import what you need 
- 🔧 **Zero Dependencies** - Lightweight and self-contained
- ⚡ **Well Tested** - Comprehensive test coverage with Vitest
- 📚 **Full Documentation** - Complete API reference with examples
- 🎯 **Modern Tooling** - ESM, CJS, and UMD builds

## Installation

```bash
# npm
npm install xfunc

# yarn
yarn add xfunc

# pnpm
pnpm add xfunc
```

## Usage

```ts
// Import specific functions (recommended for tree shaking)
import { debounce, isArray } from 'xfunc'

// Or import everything
import * as xfunc from 'xfunc'

// Usage examples
const debouncedHandler = debounce(() => {
  console.log('Called after 300ms delay')
}, 300)

if (isArray(data)) {
  console.log('data is an array')
}
```

## API Categories

### [Array Methods](./docs/docs/array.md)
- `toArray` - Convert value to array
- `unionBy` - Merge arrays and remove duplicates by iteratee
- `range` - Generate numeric range arrays
- `sortBy` - Sort array by iteratee functions
- `orderBy` - Sort array by multiple criteria with order
- `uniq` - Create deduplicated array
- `uniqWith` - Create deduplicated array with custom comparator
- `castArray` - Convert value to array (wrap if needed)
- `remove` - Remove first occurrence of item from array

### ⚡ [Function Methods](./docs/docs/function.md)  
- `debounce` - Create debounced function
- `throttle` - Create throttled function
- `memoize` - Create memoized function with cache

### [Number Methods](./docs/docs/number.md)
- `toNumber` - Convert value to number
- `randomInt` - Generate random integer in range

### [Object Methods](./docs/docs/object.md)
- `omit` / `omitBy` - Create object excluding properties
- `pick` / `pickBy` - Create object with only specified properties
- `mapEntries` - Transform object key-value pairs
- `forEachEntry` - Iterate over object entries
- `forOwn` - Iterate over own object properties
- `hasOwn` - Check for own property
- `clone` - Create shallow clone
- `cloneDeep` - Create deep clone

### [String Methods](./docs/docs/string.md)
- `capitalize` - Capitalize first character, lowercase rest
- `lowerFirst` - Convert first character to lowercase
- `upperFirst` - Convert first character to uppercase
- `camelize` - Convert hyphenated string to camelCase
- `hyphenate` - Convert camelCase string to hyphenated

### [Type Check Methods](./docs/docs/typed.md)
22 type checking utilities including:
- `isArray`, `isString`, `isNumber`, `isBoolean`
- `isEmpty`, `isNil`, `isFunction`, `isObject`
- `isDate`, `isRegExp`, `isPromise`, `isError`
- `isMap`, `isSet`, `isBigInt`, `isSymbol`
- And more...

### [Structure Methods](./docs/docs/structure.md)
- `QueueMap` - Map-based queue with insertion order

## Quick Examples

### Debounce Function Calls
```ts
import { debounce } from 'xfunc'

const searchHandler = debounce((query: string) => {
  // API call will only happen 300ms after user stops typing
  searchAPI(query)
}, 300)

input.addEventListener('input', (e) => {
  searchHandler(e.target.value)
})
```

### Type-Safe Object Manipulation
```ts
import { pick, omit, isObject } from 'xfunc'

const user = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' }

// Pick only safe properties for API response
const safeUser = pick(user, ['id', 'name', 'email'])
// { id: 1, name: 'John', email: 'john@example.com' }

// Omit sensitive data
const publicUser = omit(user, ['password'])
// { id: 1, name: 'John', email: 'john@example.com' }

// Type-safe checking
if (isObject(data) && !isEmpty(data)) {
  // Process the object safely
}
```

### Array and Type Utilities
```ts
import { toArray, range, uniq, isNumber } from 'xfunc'

// Convert various types to arrays
toArray('hello')     // ['h', 'e', 'l', 'l', 'o']
toArray(42)          // [42]
toArray([1, 2, 3])   // [1, 2, 3]
toArray(null)        // []

// Generate numeric ranges
range(5)           // [0, 1, 2, 3, 4]
range(1, 5)        // [1, 2, 3, 4]
range(0, 20, 5)    // [0, 5, 10, 15]

// Remove duplicates
uniq([1, 2, 2, 3, 3, 3])        // [1, 2, 3]

// Safe type checking
isNumber('42')     // false
isNumber(42)       // true
```

## Documentation

Visit our [documentation site](https://uphg.github.io/xfunc/) for:
- 📖 Complete API reference
- 💡 Usage examples
- 🎯 Best practices
- 📝 Type definitions

## Development

```bash
# Install dependencies
pnpm install

# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Build the library
pnpm build

# Lint and fix code
pnpm lint

# Start documentation site
pnpm docs:dev

# Build documentation
pnpm docs:build
```

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit a pull request.

---

**xfunc** - *Utility functions that just work* ⚡