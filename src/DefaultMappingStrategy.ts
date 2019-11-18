import { ProblemDocument } from 'http-problem-details'
import { IMappingStrategy } from './IMappingStrategy'
import { MapperRegistry } from './MapperRegistry'

export class DefaultMappingStrategy implements IMappingStrategy {
  public readonly registry: MapperRegistry

  public constructor (registry: MapperRegistry) {
    this.registry = registry
  }

  public map (error: any): ProblemDocument | null {
    const err = error
    const errorMapper = this.registry.getMapper(error)
    if (errorMapper) {
      return errorMapper.mapError(err)
    }

    return null
  }
}
