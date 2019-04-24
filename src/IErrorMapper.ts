import { ProblemDocument } from 'http-problem-details'

export interface IErrorMapper {
  error: string
  mapError(error: Error): ProblemDocument
}

export class ErrorMapper implements IErrorMapper {
  public error: string;
  public constructor () {
    if (this.constructor === ErrorMapper) {
      throw new TypeError('Can not construct abstract class.')
    }

    if (this.mapError === ErrorMapper.prototype.mapError) {
      throw new TypeError(`Please implement abstract method 'mapError' in ${this.constructor.name}.`)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,handle-callback-err
  public mapError (error: Error): ProblemDocument {
    throw new TypeError(`Do not call abstract method 'mapError' from child.`)
  }
}
