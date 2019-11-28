import 'should'
import { DefaultErrorMapper } from '../src'

describe('DefaultErrorMapper', (): void => {
  it('maps standard Error to 500 status code', (): void => {
    // given
    const mapper = new DefaultErrorMapper()

    // when
    const problem = mapper.mapError(new Error())

    // then
    problem.status.should.equal(500)
  })

  it('maps numeric status property to response status', (): void => {
    // given
    const mapper = new DefaultErrorMapper()
    const errorWithStatus = new (class extends Error {
      public status = 400
    })()

    // when
    const problem = mapper.mapError(errorWithStatus)

    // then
    problem.status.should.equal(400)
  })

  it('maps numeric code property to response status', (): void => {
    // given
    const mapper = new DefaultErrorMapper()
    const errorWithStatus = new (class extends Error {
      public code = 403
    })()

    // when
    const problem = mapper.mapError(errorWithStatus)

    // then
    problem.status.should.equal(403)
  })

  it('tries to parse string status property to status code', (): void => {
    // given
    const mapper = new DefaultErrorMapper()
    const errorWithStatus = new (class extends Error {
      public status = '403'
    })()

    // when
    const problem = mapper.mapError(errorWithStatus)

    // then
    problem.status.should.equal(403)
  })

  it('tries to parse string code property to status code', (): void => {
    // given
    const mapper = new DefaultErrorMapper()
    const errorWithStatus = new (class extends Error {
      public code = '403'
    })()

    // when
    const problem = mapper.mapError(errorWithStatus)

    // then
    problem.status.should.equal(403)
  })

  it('maps to status 500 when code property is not a number', (): void => {
    // given
    const mapper = new DefaultErrorMapper()
    const fetchError = new (class extends Error {
      public code = 'ECONNREFUSED'
    })()

    // when
    const problem = mapper.mapError(fetchError)

    // then
    problem.status.should.equal(500)
  })

  it('maps to status 500 when code property is not a number', (): void => {
    // given
    const mapper = new DefaultErrorMapper()
    const fetchError = new (class extends Error {
      public status = 'ECONNREFUSED'
    })()

    // when
    const problem = mapper.mapError(fetchError)

    // then
    problem.status.should.equal(500)
  })
})
