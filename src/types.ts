export type RecursiveArray<T> = Array<T | RecursiveArray<T>>
export type FlatCallback<T, U> = (item: T | RecursiveArray<T>, index: number, array: RecursiveArray<T>) => U
