import { IErrorMapper } from './IErrorMapper'
import { ProblemDocument } from 'http-problem-details'
import { StatusCodeErrorMapper } from './StatusCodeErrorMapper'

export class DefaultErrorMapper implements IErrorMapper {
  public constructor () {
    this.error = Error.name
  }
  public mapError (error: Error): ProblemDocument {
    return StatusCodeErrorMapper.mapStatusCode(500)
  }

  public error: string;
}
