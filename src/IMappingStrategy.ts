import { MapperRegistry } from './MapperRegistry'
import { ProblemDocument } from 'http-problem-details'

export interface IMappingStrategy {
  registry: MapperRegistry
  map(error: Error): ProblemDocument
}

export abstract class MappingStrategy implements IMappingStrategy {
  public abstract registry: MapperRegistry;
  protected constructor () {
    if (this.constructor === MappingStrategy) {
      throw new TypeError('Can not construct abstract class.')
    }

    if (this.map === MappingStrategy.prototype.map) {
      throw new TypeError(`Please implement abstract method 'map' in ${this.constructor.name}.`)
    }
  }

  public abstract map (error: Error): ProblemDocument
}
