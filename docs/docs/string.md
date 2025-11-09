# String Methods

These are utility methods for handling strings.

## `capitalize(str)`

Converts first character of string to upper case and the rest to lower case.

### Usage

```ts
import { capitalize } from 'unfunt'

capitalize('FRED')
// => 'Fred'

capitalize('fRED')
// => 'Fred'

capitalize('hello world')
// => 'Hello world'
```

### Arguments

1. `str` *(string)*: The string to convert

### Returns

*(string)*: Returns the converted string

### Notes

- Uses caching for better performance with repeated calls
- Handles empty strings safely
- Only affects the first character's case

## `lowerFirst(str)`

Converts the first character of string to lower case.

### Usage

```ts
import { lowerFirst } from 'unfunt'

lowerFirst('Fred')
// => 'fred'

lowerFirst('FRED')
// => 'fRED'

lowerFirst('Hello')
// => 'hello'
```

### Arguments

1. `str` *(string)*: The string to convert

### Returns

*(string)*: Returns the converted string

### Notes

- Uses caching for better performance with repeated calls
- Handles empty strings safely
- Only affects the first character's case

## `upperFirst(str)`

Converts the first character of string to upper case.

### Usage

```ts
import { upperFirst } from 'unfunt'

upperFirst('fred')
// => 'Fred'

upperFirst('FRED')
// => 'FRED'

upperFirst('hello')
// => 'Hello'
```

### Arguments

1. `str` *(string)*: The string to convert

### Returns

*(string)*: Returns the converted string

### Notes

- Uses caching for better performance with repeated calls
- Handles empty strings safely
- Only affects the first character's case

## `camelize(str)`

Converts a hyphenated string to camelCase.

### Usage

```ts
import { camelize } from 'unfunt'

camelize('foo-bar')
// => 'fooBar'

camelize('foo-bar-baz')
// => 'fooBarBaz'

camelize('my-component-name')
// => 'myComponentName'
```

### Arguments

1. `str` *(string)*: The hyphenated string to convert

### Returns

*(string)*: Returns the camelCase string

### Notes

- Uses caching for better performance with repeated calls
- Converts hyphen-separated words to camelCase
- Useful for converting CSS class names to JavaScript property names

## `hyphenate(str)`

Converts a camelCase string to hyphenated (kebab-case).

### Usage

```ts
import { hyphenate } from 'unfunt'

hyphenate('fooBar')
// => 'foo-bar'

hyphenate('fooBarBaz')
// => 'foo-bar-baz'

hyphenate('myComponentName')
// => 'my-component-name'
```

### Arguments

1. `str` *(string)*: The camelCase string to convert

### Returns

*(string)*: Returns the hyphenated string

### Notes

- Uses caching for better performance with repeated calls
- Converts camelCase to kebab-case
- Useful for converting JavaScript property names to CSS class names