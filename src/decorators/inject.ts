/* eslint-disable @typescript-eslint/no-explicit-any */
export function Inject(...dependencies: any[]) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    const originalMethod = descriptor.value
    try {
      const targetInstance = [...dependencies].reduce((prev, current) => {
        try {
          const currentInstance = new current(new prev())
          return currentInstance
        } catch (error) {
          console.log(error)
          return current
        }
      })

      descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, [...args, targetInstance])
        return result
      }

      return descriptor
    } catch (error) {
      console.log(error)
    }
  }
}
