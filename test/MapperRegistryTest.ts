import 'should'
import { ErrorMapper, MapperRegistry } from '../src'
import { ProblemDocument } from 'http-problem-details'

class FooError extends Error {}
class BarError extends Error {}

class FooErrorMapper extends ErrorMapper {
  public constructor () {
    super(FooError)
  }

  public mapError (): ProblemDocument {
    return new ProblemDocument({})
  }
}
class BarErrorMapper extends ErrorMapper {
  public constructor () {
    super(BarError)
  }

  public mapError (): ProblemDocument {
    return new ProblemDocument({})
  }
}

describe('MapperRegistry', (): void => {
  it('returns mapper where error type name matches', (): void => {
    const registry = new MapperRegistry()
      .registerMapper(new FooErrorMapper())
      .registerMapper(new BarErrorMapper())

    const mapper = registry.getMapper(new FooError())

    mapper.should.be.instanceOf(FooErrorMapper)
  })
})
