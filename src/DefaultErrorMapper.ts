import { ErrorMapper } from './IErrorMapper'
import { ProblemDocument } from 'http-problem-details'
import { StatusCodeErrorMapper } from './StatusCodeErrorMapper'

type CommonError = Error & {
  status?: number | unknown
  code?: number | unknown
}

export class DefaultErrorMapper extends ErrorMapper {
  public constructor () {
    super(Error)
  }

  public mapError (error: CommonError): ProblemDocument {
    let status =
      DefaultErrorMapper.__tryGetStatus(error.status) ||
      DefaultErrorMapper.__tryGetStatus(error.code) ||
      500

    return StatusCodeErrorMapper.mapStatusCode(status)
  }

  private static __tryGetStatus (status: number | unknown): number | undefined {
    if (typeof status === 'number') {
      return status
    }

    if (typeof status === 'string') {
      return Number.parseInt(status)
    }
  }
}
