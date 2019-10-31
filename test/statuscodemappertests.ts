import { StatusCodeErrorMapper } from '../src'
import 'should'

describe('error status code mapper', (): void => {
  describe('When mapping 400 status code', (): void => {
    const document = StatusCodeErrorMapper.mapStatusCode(400)!

    it('should create Bad Request Problem with status code 400', (done): void => {
      document.status.should.equal(400)
      return done()
    })

    it('should create Bad Request Problem with about:blank type', (done): void => {
      document.should.have.property('type', 'about:blank')
      return done()
    })

    it('should create Bad Request Problem with Bad Request title', (done): void => {
      document.title.should.equal('Bad Request')
      return done()
    })
  })

  describe('When mapping success status code', (): void => {
    it(`should throw 'NotErrorStatusCodeError'`, (done): void => {
      try {
        StatusCodeErrorMapper.mapStatusCode(200)
      } catch (e) {
        e.message.should.equal('200 is not an error Status Code')
        return done()
      }
    })
  })
})
