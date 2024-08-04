export function isPrimitive(value: unknown): value is string | number | bigint | boolean | symbol | null | undefined {
  const type = typeof value
  return value === null || (type !== 'object' && type !== 'function')
}

// function getA(): object | string {
//   return Math.random() > 0.5 ? {} : '1'
// }

// function fun() {
//   const a = getA()
//   if (isPrimitive(a)) {
//     console.log(a)
//   } else {
//     console.log(a)
//   }
// }
