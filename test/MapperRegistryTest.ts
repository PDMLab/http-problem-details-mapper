import 'should'
import { DefaultErrorMapper, ErrorMapper, MapperRegistry } from '../src'
import { ProblemDocument } from 'http-problem-details'

class FooError extends Error {}
class BarError extends Error {}
class ChildFooError extends FooError {}

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

    const mapper = registry.getMapper(new FooError())!

    mapper.should.be.instanceOf(FooErrorMapper)
  })

  it('returns a mapper for a matched superclass', (): void => {
    const registry = new MapperRegistry()
      .registerMapper(new FooErrorMapper())

    const mapper = registry.getMapper(new ChildFooError())!

    mapper.should.be.instanceOf(FooErrorMapper)
  })

  it('returns default mapper unmapped class', (): void => {
    const registry = new MapperRegistry()
      .registerMapper(new BarErrorMapper())

    const mapper = registry.getMapper(new ChildFooError())!

    mapper.should.be.instanceOf(DefaultErrorMapper)
  })
})
