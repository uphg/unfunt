import { toKey, copyArray, stringToPath } from '../internal'
import { isNumericKey, isSymbol } from '../typed'

/**
 * Converts a string path to a path array
 * @param path The string path
 * @returns The path array
 */
export function toPath(path: string): (string | number | symbol)[] {
  if (Array.isArray(path)) {
    return path.map(toKey) as (string | number)[]
  }

  if (isNumericKey(path)) {
    return [toKey(path)]
  }

  return isSymbol(path) ? [path] : copyArray(stringToPath(String(path)))
}
