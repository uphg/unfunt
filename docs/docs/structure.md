# Structure Methods

These are utility data structures for advanced use cases.

## `QueueMap`

A Map-based queue implementation that maintains insertion order while providing queue operations.

### Usage

```ts
import { QueueMap } from 'unfunt'

// Create a new QueueMap
const queue = new QueueMap<string, number>()

// Set values (maintains insertion order)
queue.set('first', 1)
queue.set('second', 2)
queue.set('third', 3)

// Get the first inserted value
queue.getFirst()
// => 1

// Remove and return the first value
queue.removeFirst()
// => 1

// Check if queue is empty
queue.isEmpty()
// => false

// Use as a regular Map
queue.get('second')
// => 2

queue.has('third')
// => true

// Get size
queue.size
// => 2
```

### Constructor

#### `new QueueMap([iterable])`

Creates a new QueueMap instance.

**Arguments:**
1. `[iterable]` *(Iterable)*: An iterable object to initialize the QueueMap

### Methods

#### `set(key, value)`

Sets a value for a key in the QueueMap. Maintains insertion order.

**Arguments:**
1. `key` *(any)*: The key to set
2. `value` *(any)*: The value to set

**Returns:** *(QueueMap)*: Returns the QueueMap instance for chaining

#### `get(key)`

Gets the value for a key in the QueueMap.

**Arguments:**
1. `key` *(any)*: The key to get

**Returns:** *(any)*: Returns the value associated with the key, or undefined

#### `getFirst()`

Gets the value of the first inserted key without removing it.

**Returns:** *(any)*: Returns the first value, or undefined if empty

#### `removeFirst()`

Removes and returns the value of the first inserted key.

**Returns:** *(any)*: Returns the removed first value, or undefined if empty

#### `isEmpty()`

Checks if the QueueMap is empty.

**Returns:** *(boolean)*: Returns true if empty, false otherwise

#### `delete(key)`

Deletes a key-value pair from the QueueMap.

**Arguments:**
1. `key` *(any)*: The key to delete

**Returns:** *(boolean)*: Returns true if the element existed and has been removed, false otherwise

#### `has(key)`

Checks if a key exists in the QueueMap.

**Arguments:**
1. `key` *(any)*: The key to check

**Returns:** *(boolean)*: Returns true if the key exists, false otherwise

#### `clear()`

Removes all key-value pairs from the QueueMap.

**Returns:** *(undefined)*

### Properties

#### `size`

Gets the number of key-value pairs in the QueueMap.

**Type:** *(number)*

### Notes

- Extends the native Map class, so all Map methods are available
- Maintains insertion order for queue operations
- Useful for implementing LRU (Least Recently Used) caches
- Used internally by the `memoize` function for cache management
- Provides O(1) time complexity for basic operations

### Examples

#### LRU Cache Implementation

```ts
import { QueueMap } from 'unfunt'

class LRUCache<K, V> {
  private cache: QueueMap<K, V>
  private maxSize: number

  constructor(maxSize: number) {
    this.cache = new QueueMap<K, V>()
    this.maxSize = maxSize
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key)
    if (value !== undefined) {
      // Remove and re-insert to mark as recently used
      this.cache.delete(key)
      this.cache.set(key, value)
    }
    return value
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.maxSize) {
      this.cache.removeFirst()
    }
    this.cache.set(key, value)
  }
}

// Usage
const cache = new LRUCache<string, number>(3)
cache.set('a', 1)
cache.set('b', 2)
cache.set('c', 3)

// This will remove 'a' (least recently used)
cache.set('d', 4)

console.log(cache.get('a')) // undefined
console.log(cache.get('b')) // 2
```