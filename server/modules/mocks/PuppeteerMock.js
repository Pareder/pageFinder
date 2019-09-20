export const puppeteerMock = {
  launch: jest.fn(() => browserMock)
}
export const browserMock = {
  newPage: jest.fn(() => pageMock),
  close: jest.fn()
}
export const pageMock = {
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

export function getPuppeteer(puppeteer, browser, page) {
  return {
    ...(puppeteer || puppeteerMock),
    launch: jest.fn(() => getBrowser(browser, page))
  }
}

function getBrowser(browser, page) {
  return {
    ...(browser || browserMock),
    newPage: jest.fn(() => page || pageMock)
  }
}
