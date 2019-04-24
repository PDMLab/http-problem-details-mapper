import { MapperRegistry } from './MapperRegistry'
import { ProblemDocument } from 'http-problem-details'

export interface IMappingStrategy {
  registry: MapperRegistry
  map(error: Error): ProblemDocument
}

export class MappingStrategy implements IMappingStrategy {
  public registry: MapperRegistry;
  public constructor () {
    if (this.constructor === MappingStrategy) {
      throw new TypeError('Can not construct abstract class.')
    }

    if (this.map === MappingStrategy.prototype.map) {
      throw new TypeError(`Please implement abstract method 'map' in ${this.constructor.name}.`)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,handle-callback-err
  public map (error: Error): ProblemDocument {
    throw new TypeError(`Do not call abstract method 'map' from child.`)
  };
}
