const PageFinder = require('./PageFinder')
const {pageMock, getPuppeteer} = require('./mocks/PuppeteerMock')

const queries = [1, 2, 3]
const searchWord = 'word'

function getPageFinder(puppeteer, browser, page) {
  return new PageFinder(getPuppeteer(puppeteer, browser, page))
}

describe('pageFinder', () => {
  describe('create method', () => {
    it('Should return an instance of pageFinder', () => {
      expect(PageFinder.create()).toBeInstanceOf(PageFinder)
    })
  })

  describe('startFinding method', () => {
    it('Should return correct result if page does not have result', async () => {
      expect(await getPageFinder().startFinding(queries, searchWord)).toEqual(queries.map(query => ({
        query,
        result: 'Not found',
        resultStatus: 0
      })))
    })

    it('Should return correct result if page has result', async () => {
      const page = {
        ...pageMock,
        $$: jest.fn(() => ([1])),
        evaluate: jest.fn(() => searchWord)
      }
      const pageFinder = getPageFinder(null, null, page)

      expect(await pageFinder.startFinding(queries, searchWord)).toEqual(queries.map(query => ({
        query,
        result: 'Found on page: 1',
        resultStatus: 1
      })))
    })
  })
})
