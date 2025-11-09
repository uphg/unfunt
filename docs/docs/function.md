# Function Methods

These are utility methods for handling functions.

## `debounce(func, wait, [options])`

Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked.

### Usage

```ts
import { debounce } from 'unfunt'

const debouncedHandler = debounce(() => {
  console.log('Called after 300ms delay')
}, 300)

// Use in event handlers
searchInput.addEventListener('input', debouncedHandler)
```

### Arguments

1. `func` *(Function)*: The function to debounce
2. `wait` *(number)*: The number of milliseconds to delay
3. `[options]` *(Object)*: The options object
   - `[options.leading=false]` *(boolean)*: Specify invoking on the leading edge
   - `[options.trailing=true]` *(boolean)*: Specify invoking on the trailing edge

### Returns

*(Function)*: Returns the new debounced function

## `throttle(func, wait, [options])`

Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds.

### Usage

```ts
import { throttle } from 'unfunt'

const throttledHandler = throttle(() => {
  console.log('Scroll event handled')
}, 100)

window.addEventListener('scroll', throttledHandler)
```

### Arguments

1. `func` *(Function)*: The function to throttle
2. `wait` *(number)*: The number of milliseconds to throttle invocations to
3. `[options]` *(Object)*: The options object
   - `[options.leading=true]` *(boolean)*: Specify invoking on the leading edge
   - `[options.trailing=true]` *(boolean)*: Specify invoking on the trailing edge

### Returns

*(Function)*: Returns the new throttled function

### Notes

- Debounce is useful for search inputs and form validation
- Throttle is useful for scroll handlers and resize events
- Both functions preserve the original function's context and arguments

## `memoize(func, [options])`

Creates a memoized function that caches the result of function calls.

### Usage

```ts
import { memoize } from 'unfunt'

const fibonacci = memoize((n: number): number => {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
})

fibonacci(10)
// => 55 (computed and cached)

fibonacci(10)
// => 55 (returned from cache)

// With custom resolver
const getObject = memoize((id: number) => {
  return fetch(`/api/users/${id}`).then(res => res.json())
}, {
  resolver: (id) => `user_${id}`,
  maxSize: 100
})
```

### Arguments

1. `func` *(Function)*: The function to memoize
2. `[options]` *(Object)*: The options object
   - `[options.maxSize]` *(number)*: Maximum cache size, defaults to unlimited
   - `[options.resolver]` *(Function)*: Function to generate cache key

### Returns

*(Function)*: Returns the new memoized function

### Notes

- Uses QueueMap for efficient cache management with size limits
- Preserves the original function's context and arguments
- Default cache key is JSON.stringify of arguments
- Useful for expensive computations and recursive functions