import { ProblemDocument } from 'http-problem-details'

type ErrorConstructor = new (...args: any[]) => Error
export interface IErrorMapper {
  readonly error: string
  mapError(error: Error): ProblemDocument
}

export class ErrorMapper implements IErrorMapper {
  public readonly error: string;
  public constructor (ErrorType?: ErrorConstructor) {
    if (this.constructor === ErrorMapper) {
      throw new TypeError('Can not construct abstract class.')
    }

    if (this.mapError === ErrorMapper.prototype.mapError) {
      throw new TypeError(`Please implement abstract method 'mapError' in ${this.constructor.name}.`)
    }

    if (ErrorType) {
      this.error = ErrorType.name
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,handle-callback-err
  public mapError (error: Error): ProblemDocument {
    throw new TypeError(`Do not call abstract method 'mapError' from child.`)
  }
}
