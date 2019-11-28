import { ErrorMapper } from './IErrorMapper'
import { ProblemDocument } from 'http-problem-details'
import { StatusCodeErrorMapper } from './StatusCodeErrorMapper'

type CommonError = Error & {
  status?: number
  code?: number
}

export class DefaultErrorMapper extends ErrorMapper {
  public constructor () {
    super(Error)
  }

  public mapError (error: CommonError): ProblemDocument {
    return StatusCodeErrorMapper.mapStatusCode(error.status || error.code || 500)
  }
}
