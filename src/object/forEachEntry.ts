export function forEachEntry<T extends object>(
  obj: T,
  callback: (key: keyof T, value: T[keyof T]) => boolean | void
): void {
  for (const [key, value] of Object.entries(obj)) {
    const shouldContinue = callback(key as keyof T, value as T[keyof T])
    if (shouldContinue === false) break
  }
}
