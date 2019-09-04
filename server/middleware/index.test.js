const middleware = require('../middleware')

const queries = [1, 2, 3]
const searchWord = 'word'
const reqMock = {
  body: {
    queries,
    searchWord
  }
}
const resMock = {
  status: jest.fn(function() {
    return this
  }),
  json: jest.fn()
}
const pageFinderMock = {
  startFinding: jest.fn()
}

describe('middleware', () => {
  describe('getPages method', () => {
    it('Should throw error if not all parameters are provided', async () => {
      await middleware.getPages({body: {}}, resMock, pageFinderMock)

      expect(resMock.json).toBeCalledWith({
        errors: [
          {
            title: 'Not all parameters are provided',
            errorMessage: 'An error occurred: queries and searchWord are required'
          }
        ]
      })
    })

    it('Should call pageFinder.startFinding with correct parameters', async () => {
      await middleware.getPages(reqMock, resMock, pageFinderMock)

      expect(pageFinderMock.startFinding).toBeCalledWith(queries, searchWord)
    })

    it('Should send correct result', async () => {
      const pageFinder = {
        startFinding: jest.fn(() => ([1, 2, 3]))
      }
      await middleware.getPages(reqMock, resMock, pageFinder)

      expect(resMock.json).toBeCalledWith({
        title: 'Finding Successful',
        data: [1, 2, 3]
      })
    })

    it('Should throw error if pageFinder module fails', async () => {
      const error = 'error'
      const pageFinder = {
        startFinding: jest.fn(() => {
          throw new Error(error)
        })
      }
      await middleware.getPages(reqMock, resMock, pageFinder)

      expect(resMock.json).toBeCalledWith({
        errors: [
          {
            title: 'Finding Error',
            errorMessage: error,
          }
        ]
      })
    })
  })
})
