import 'should'
import { DefaultErrorMapper, ErrorMapper } from '../src'
import { ProblemDocument } from 'http-problem-details'

describe('Error Mappers', (): void => {
  describe('When mapping an Error', (): void => {
    it('should create Internal Server Error Problem Document', (done): void => {
      const mapper = new DefaultErrorMapper()
      const problem = mapper.mapError(new Error(`There's a problem...`))

      problem.status.should.equal(500)
      problem.title.should.equal('Internal Server Error')
      problem.should.have.property('type', 'about:blank')
      return done()
    })
  })

  it('should set error property from type name', (): void => {
    class TestError extends Error {}
    class TestMapper extends ErrorMapper {
      public mapError (): ProblemDocument {
        return new ProblemDocument({})
      }
    }

    const mapper = new TestMapper(TestError)

    mapper.error.should.equal('TestError')
  })
})
