type Asyncified<T> = T extends (...args: any) => any
  ? (...params: Parameters<T>) => Promise<Asyncified<ReturnType<T> extends Promise<infer ValueType> ? ValueType : ReturnType<T>>>
  : T extends object
    ? {
        [K in keyof T]: Asyncified<T[K]>
      }
    : T

export default Asyncified
