# Unfunt

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
npm install unfunt

# yarn  
yarn add unfunt

# pnpm
pnpm add unfunt
```

## Usage

```ts
// Import specific functions (recommended for tree shaking)
import { debounce, isArray, toNumber } from 'unfunt'

// Or import everything
import * as unfunt from 'unfunt'

// Usage examples
const debouncedHandler = debounce(() => {
  console.log('Called after 300ms delay')
}, 300)

if (isArray(data)) {
  console.log('data is an array')
}

const num = toNumber('42') // 42
```

## API Categories

### [Array Methods](./docs/api/array.md)
- `remain` - Split array and return remaining parts
- `toArray` - Convert value to array

### ⚡ [Function Methods](./docs/api/function.md)  
- `debounce` - Create debounced function
- `throttle` - Create throttled function

### [Number Methods](./docs/api/number.md)
- `toNumber` - Convert value to number
- `toFinite` - Convert value to finite number
- `toInteger` - Convert value to integer
- `toLength` - Convert value to valid array length

### [Object Methods](./docs/api/object.md)
- `omit` / `omitBy` - Create object excluding properties
- `pick` / `pickBy` - Create object with only specified properties
- `mapEntries` - Transform object key-value pairs
- `forEachEntry` - Iterate over object entries

### [String Methods](./docs/api/string.md)
- `trim` - Remove whitespace from string ends

### [Type Check Methods](./docs/api/typed.md)
17 type checking utilities including:
- `isArray`, `isString`, `isNumber`, `isBoolean`
- `isEmpty`, `isNil`, `isFunction`, `isObject`
- `isDate`, `isRegExp`, `isPromise`, `isError`
- And more...

## Quick Examples

### Debounce Function Calls
```ts
import { debounce } from 'unfunt'

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
import { pick, omit, isObject } from 'unfunt'

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
import { toArray, remain, isArray, toNumber } from 'unfunt'

// Convert various types to arrays
toArray('hello')     // ['h', 'e', 'l', 'l', 'o']
toArray(42)          // [42]
toArray([1, 2, 3])   // [1, 2, 3]
toArray(null)        // []

// Split arrays intelligently
remain([1, 2, 3, 4, 5], 2, 1)  // [1, 2, 4, 5]

// Safe type conversion
toNumber('42')       // 42
toNumber('invalid')  // NaN
toNumber([42])       // 42
```

## Documentation

Visit our [documentation site](https://uphg.github.io/unfunt/) for:
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

**unfunt** - *Utility functions that just work* ⚡