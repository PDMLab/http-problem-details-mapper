[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![](https://img.shields.io/codecov/c/github/pdmlab/http-problem-details-mapper)](https://codecov.io/gh/PDMLab/http-problem-details-mapper) [![Join the chat at https://gitter.im/pdmlab/http-problem-details-mapper](https://badges.gitter.im/pdmlab/http-problem-details-mapper.svg)](https://gitter.im/pdmlab/http-problem-details-mapper?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) 

# HTTP Problem Details Mapper

Based on `http-problem-details` ([repository](https://github.com/PDMLab/http-problem-details) | [npm](https://www.npmjs.com/package/http-problem-details)), this library allows you to map your Node.js errors to HTTP Problem details by convention.

## Installation

```
npm install http-problem-details-mapper
```

or

```
yarn add http-problem-details-mapper
```

Make sure to have the peer dependency `http-problem-details` installed as well.

## Usage

### Architecture

`http-problem-details-mapper` is part of a set of libraries you can use to create HTTP Problem Details documents (by means of `http-problem-details` (RFC 7807) and map Errors (or literally everything) into an HTTP Problem Document.
`http-problem-details-mapper` can be used to build a mapping middleware or plugin for your HTTP library of choice.
There's already a mapping middleware available for `express`: `express-http-problem-details`.

`http-problem-details-mapper` provides several classes you need to use:

- `MapperRegistry` which holds an arbitrary number of `ErrorMapper` instances you implement
- `MappingStrategy` which has a `MapperRegistry` containing the `ErrorMapper` instances
- The `ErrorMapper` itself maps an object (typically one of your `Error` types) to a `ProblemDocument`

### Example

The typical workflow with `http-problem-details-mapper` is this:

First, you implement an Error

```js
class NotFoundError extends Error {
  constructor (options) {
    const { type, id } = options
    super()
    Error.captureStackTrace(this, this.constructor)

    this.message = `${type} with id ${id} could not be found.`
  }
}
```

Next, you implement an `ErrorMapper` (in TypeScript you can use an `IErrorMapper` interface to implement a mapper from scratch):

```js
import { ErrorMapper } from 'http-problem-details-mapper'
import { ProblemDocument } from 'http-problem-details'

class NotFoundErrorMapper extends ErrorMapper {
  constructor () {
    super(NotFoundError)
  }

  mapError (error) {
    return new ProblemDocument({
      status: 404,
      title: error.message,
      type: 'http://tempuri.org/NotFoundError'
    })
  }
}
```

Then, create the `IMappingStrategy` implementation:

```js
class MyMappingStrategy {
  constructor (registry) {
    this.registry = registry
  }

  map (error) {
    const err = error
    const errorMapper = this.registry.getMapper(error)
    if (errorMapper) {
      return errorMapper.mapError(err)
    }
    
    // alternatively, return a generic problem document
    throw new Error('Could not map error')
  }
}
```

Finally, create an instance of `MyMappingStrategy` and map an registered error type.

```js
import { MapperRegistry } from 'http-problem-details-mapper'

const strategy = new MyMappingStrategy(
    new MapperRegistry()
      .registerMapper(new NotFoundErrorMapper()))

const error = new NotFoundError({ type: 'customer', id: '123' })
const problem = strategy.map()

console.log(problem)
```

The result will be like this:

```json
{
    "status": 404,
    "title": "customer with id 123 could not be found.",
    "type": "http://tempuri.org/NotFoundError"
}
```

`MapperRegistry` also by default has a mapper named `DefaultErrorMapper` which maps generic `Error` instances to HTTP status code 500 problem documents. `MapperRegistry` also has an option `useDefaultErrorMapper` of type `boolean` which allows you to disable the `DefaultErrorMapper` so you can register your own `IErrorMapper` for `Error`.

There's another mapper named `StatusCodeErrorMapper` which simply acts as a factory for `ProblemDocuments` where you only want to provide an HTTP error status code:

```js
import { StatusCodeErrorMapper } from 'http-problem-details-mapper'

const problem = StatusCodeErrorMapper.mapStatusCode(400)
```

Similar to the `DefaultErrorMapper` there's also a `DefaultMappingStrategy` which you can use if you have no specific requirements regarding the mapping behavior.

It can be used like this:

```js
import { MapperRegistry, DefaultMappingStrategy } from 'http-problem-details-mapper'

const strategy = new DefaultMappingStrategy(
    new MapperRegistry()
      .registerMapper(new NotFoundErrorMapper()))

const error = new NotFoundError({ type: 'customer', id: '123' })
const problem = strategy.map()

console.log(problem)
```

## Running the tests

```
npm test
```

or

```
yarn test
```

## Want to help?

This project is just getting off the ground and could use some help with cleaning things up and refactoring.

If you want to contribute - we'd love it! Just open an issue to work against so you get full credit for your fork. You can open the issue first so we can discuss and you can work your fork as we go along.

If you see a bug, please be so kind as to show how it's failing, and we'll do our best to get it fixed quickly.

Before sending a PR, please [create an issue](https://github.com/PDMLab/http-problem-details/issues/new) to introduce your idea and have a reference for your PR.

We're using [conventional commits](https://www.conventionalcommits.org), so please use it for your commits as well.

Also please add tests and make sure to run `npm run lint-ts` or `yarn lint-ts`.

## License

MIT License

Copyright (c) 2019 PDMLab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


