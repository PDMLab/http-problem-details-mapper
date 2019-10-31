import { ErrorMapper } from './IErrorMapper'
import { ProblemDocument } from 'http-problem-details'
import { StatusCodeErrorMapper } from './StatusCodeErrorMapper'

export class DefaultErrorMapper extends ErrorMapper {
  public constructor () {
    super(Error)
  }
  public mapError (): ProblemDocument {
    return StatusCodeErrorMapper.mapStatusCode(500)
  }
}
