// export type RecursiveArray<T> = Array<T | RecursiveArray<T>>
export type RecursiveArray<T> = Array<T | RecursiveArray<T>>
export type ListOfRecursiveArraysOrValues<T> = ArrayLike<T | RecursiveArray<T>>

export type FlatCallback<T> = (item: T | RecursiveArray<T>, index: number, array: RecursiveArray<T>) => T | RecursiveArray<T>

export type Flat<T> = T extends string ? T : (T extends ArrayLike<any> ? never : T)
export type Many<T> = T | T[]

export interface Dictionary<T> {
  [index: string]: T
}

export interface ICallbackCancel<T extends unknown[], RT> {
  // 描述函数的参数列表和返回类型
  (...args: T): RT
  cancel: () => void
}
