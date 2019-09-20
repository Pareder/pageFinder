const PageFinder = require('./PageFinder')

const puppeteerMock = {
  launch: jest.fn(() => browserMock)
}
const browserMock = {
  newPage: jest.fn(() => pageMock),
  close: jest.fn()
}
const pageMock = {
  goto: jest.fn(),
  type: jest.fn(),
  $eval: jest.fn(),
  waitForSelector: jest.fn(),
  click: jest.fn(() => {
    throw new Error()
  }),
  $$: jest.fn(() => ([])),
  evaluate: jest.fn()
}
const queries = [1, 2, 3]
const searchWord = 'word'

function getPageFinder(puppeteer = puppeteerMock, browser, page) {
  return new PageFinder(getPuppeteer(browser, page))
}

function getPuppeteer(browser = browserMock, page) {
  return {
    launch: jest.fn(() => getBrowser(page))
  }
}

function getBrowser(page = pageMock) {
  return {
    ...browserMock,
    newPage: jest.fn(() => page)
  }
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
