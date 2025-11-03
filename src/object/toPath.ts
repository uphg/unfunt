import { toKey, copyArray, stringToPath } from '../internal'
import { isSymbol } from '../typed'

/**
 * Converts a string path to a path array
 * @param path The string path
 * @returns The path array
 */
export function toPath(path: string): (string | number)[] {
  if (Array.isArray(path)) {
    return path.map(toKey) as (string | number)[]
  }

  return isSymbol(path) ? [path] : copyArray(stringToPath(String(path)))
}
