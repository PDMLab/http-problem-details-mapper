import { MapperRegistry, DefaultMappingStrategy } from '../src'
import 'should'

describe('DefaultMappingStrategy', (): void => {
  describe('When mapping a generic error', (): void => {
    it('should return status code 500 problem', (done): void => {
      const strategy = new DefaultMappingStrategy(new MapperRegistry())
      const problem = strategy.map(new Error())!
      problem.should.have.property('type', 'about:blank')
      problem.status.should.equal(500)
      return done()
    })
  })
})
