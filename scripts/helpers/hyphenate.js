
/**
* Creates a cached version of a string function.
* @private
* @param fn The string function to cache
* @returns The cached function
*/
function cacheStringFunction(fn) {
	const cache = Object.create(null);
	return ((str) => {
		return cache[str] || (cache[str] = fn(str));
	});
}

const hyphenateRE = /\B([A-Z])/g;
/**
* Converts a camelCase string to hyphenated (kebab-case).
* Uses caching for better performance with repeated calls.
* @private
* @param str The camelCase string to convert
* @returns The hyphenated string  
*
* @example
* hyphenate('fooBar')
* // => 'foo-bar'
*
* hyphenate('fooBarBaz')
* // => 'foo-bar-baz'
*/
export const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
