import { ErrorMapper } from './IErrorMapper'
import { ProblemDocument } from 'http-problem-details'
import { StatusCodeErrorMapper } from './StatusCodeErrorMapper'

export class DefaultErrorMapper extends ErrorMapper {
  public constructor () {
    super(Error)
  }
  public mapError (error: Error): ProblemDocument {
    return StatusCodeErrorMapper.mapStatusCode(500)
  }

  public error: string;
}
