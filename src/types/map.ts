export type StrongTypedMap<T, K extends keyof T, V> = { [k in K]: V };
