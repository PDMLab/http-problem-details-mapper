import { ProblemDocument } from 'http-problem-details'
import { ErrorStatusCodes } from './ErrorStatusCodes'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class StatusCodeErrorMapper {
  public static mapStatusCode (statusCode: number): ProblemDocument {
    if (!ErrorStatusCodes.includes(statusCode)) {
      throw new Error(`${statusCode} is not an error Status Code`)
    }
    return new ProblemDocument({ status: statusCode })
  }
}
