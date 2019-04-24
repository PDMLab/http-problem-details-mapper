import 'should'
import { DefaultErrorMapper } from '../src'

describe('Error Mappers', (): void => {
  describe('When mapping an Error', (): void => {
    it('should create Internal Server Error Problem Document', (done): void => {
      const mapper = new DefaultErrorMapper()
      const problem = mapper.mapError(new Error(`There's a problem...`))

      problem.status.should.equal(500)
      problem.title.should.equal('Internal Server Error')
      problem.type.should.equal('about:blank')
      return done()
    })
  })
})
