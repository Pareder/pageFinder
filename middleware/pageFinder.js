const Puppeteer = require('puppeteer')

const CONFIG = require('../config')

const startFinding = async (queries, searchWord) => {
  const result = []

  const browser = await Puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  for await (query of queries) {
    const pageNumber = 1

    await page.goto(CONFIG.GOOGLE_DOMAIN)
    await page.type(CONFIG.TEXT_INPUT, query)
    await page.$eval(CONFIG.BUTTON_INPUT, x => x.click())
    const pageResult = await pageSearch(searchWord, page)

    result.push({
      query: query,
      ...pageResult
    })
  }

  await browser.close()

  return result
}

const pageSearch = async (searchWord, page, pageNumber = 1) => {
  await page.waitForSelector('.iUh30')
  const found = await findSearchWord(searchWord, page)
  
  if (found) {
    return {
      resultStatus: 1,
      result: `Found on page: ${pageNumber}`
    }
  } else {
    try {
      await page.waitForSelector(CONFIG.NEXT_BUTTON, { timeout: 2000 })
      await page.click(CONFIG.NEXT_BUTTON)
      return pageSearch(searchWord, page, ++pageNumber)
    } catch (err) {
      return {
        resultStatus: 0,
        result: 'Not found'
      }
    }
  }
}

const findSearchWord = async (searchWord, page) => {
  const element = await page.$$('.iUh30')
  for (let i = 0; i < element.length; i++) {
    const text = await page.evaluate(element => element.textContent, element[i])
    if (text.toLowerCase().includes(searchWord.toLowerCase())) {
      return true
    }
  }

  return false
}

module.exports = startFinding