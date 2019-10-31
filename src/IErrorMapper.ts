import { ProblemDocument } from 'http-problem-details'

type ErrorConstructor = new (...args: any[]) => Error
export interface IErrorMapper {
  readonly error: string
  mapError(error: Error): ProblemDocument | null
}

export abstract class ErrorMapper implements IErrorMapper {
  public readonly error: string;
  public constructor (ErrorType: ErrorConstructor) {
    if (this.constructor === ErrorMapper) {
      throw new TypeError('Can not construct abstract class.')
    }

    if (this.mapError === ErrorMapper.prototype.mapError) {
      throw new TypeError(`Please implement abstract method 'mapError' in ${this.constructor.name}.`)
    }

    this.error = ErrorType.name
  }

  public abstract mapError (error: Error): ProblemDocument | null
}
