import { IErrorMapper } from './IErrorMapper'
import { DefaultErrorMapper } from './DefaultErrorMapper'

interface MapperRegistryOptions {
  useDefaultErrorMapper: boolean
}

export class MapperRegistry {
  private mappers: Map<string,IErrorMapper> = new Map();

  public constructor (options?: MapperRegistryOptions) {
    let useDefaultErrorMapper = true
    if (options && options.useDefaultErrorMapper === false) {
      useDefaultErrorMapper = false
    }
    if (useDefaultErrorMapper) {
      this.registerMapper(new DefaultErrorMapper())
    }
  }

  public registerMapper (mapper: IErrorMapper, replace = false): MapperRegistry {
    if (replace || !this.mappers.has(mapper.error)) {
      this.mappers.set(mapper.error, mapper)
    }
    return this
  }

  public getMapper (error: Error): IErrorMapper | null {
    let constructor = error.constructor
    let proto = Object.getPrototypeOf(error)
    let mapper

    while (constructor.name !== 'Object') {
      mapper = this.mappers.get(constructor.name)
      if (mapper) {
        break
      } else {
        proto = Object.getPrototypeOf(proto)
        constructor = proto.constructor
      }
    }

    return mapper || null
  }
}
