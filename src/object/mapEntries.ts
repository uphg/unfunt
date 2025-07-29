export function mapEntries<T extends object, K, V>(
  obj: T,
  mapper: (key: keyof T, value: T[keyof T]) => [K, V]
): Record<string, V> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) =>
      mapper(key as keyof T, value as T[keyof T])
    )
  ) as Record<string, V>
}
