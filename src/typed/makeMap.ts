export function makeMap(str: string): (key: string) => boolean {
  const map = Object.create(null)
  const keys = str.split(',')
  for (const key of keys) map[key] = 1
  return val => val in map
}
