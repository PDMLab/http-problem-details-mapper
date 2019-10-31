import { ErrorMapper } from './IErrorMapper'
import { ProblemDocument } from 'http-problem-details'
import { StatusCodeErrorMapper } from './StatusCodeErrorMapper'

export class DefaultErrorMapper extends ErrorMapper {
  public constructor () {
    super(Error)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public mapError (_: Error): ProblemDocument {
    return StatusCodeErrorMapper.mapStatusCode(500)
  }
}
