import { IErrorMapper } from './IErrorMapper'
import { DefaultErrorMapper } from './DefaultErrorMapper'

class MapperRegistryOptions {
  public useDefaultErrorMapper: boolean;
}

export class MapperRegistry {
  private mappers: IErrorMapper[] = [];

  public constructor (options?: MapperRegistryOptions) {
    let useDefaultErrorMapper = true
    if (options && options.useDefaultErrorMapper === false) {
      useDefaultErrorMapper = false
    }
    if (useDefaultErrorMapper) {
      this.mappers.push(new DefaultErrorMapper())
    }
  }

  public registerMapper (mapper: IErrorMapper): MapperRegistry {
    if (!this.mappers.some((m): boolean => m.error === mapper.error)) {
      this.mappers.push(mapper)
    }
    return this
  }

  public getMapper (error: Error): IErrorMapper {
    return this.mappers.find((mapper): boolean => mapper.error === error.name)
  }
}
