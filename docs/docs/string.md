# String Methods

These are utility methods for handling strings.

## `trim(string, [chars=whitespace])`

Removes leading and trailing whitespace or specified characters from `string`.

### Usage

```ts
import { trim } from 'unfunt'

trim('  hello world  ')
// => 'hello world'

trim('-_-hello-_-', '_-')
// => 'hello'

trim('  hello world  ', ' ')
// => 'hello world'
```

### Arguments

1. `string` *(string)*: The string to trim
2. `[chars=whitespace]` *(string)*: The characters to trim

### Returns

*(string)*: Returns the trimmed string

### Notes

- By default, removes all whitespace characters
- Can specify custom characters to trim
- Handles both leading and trailing characters
- Returns empty string for null/undefined input