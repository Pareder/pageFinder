const Puppeteer = require('puppeteer')
const CONFIG = require('../config')

class PageFinder {
  constructor(puppeteer) {
    this._puppeteer = puppeteer
  }

  static create() {
    return new PageFinder(Puppeteer)
  }

  async startFinding(queries, searchWord) {
    const promises = queries.map(async query => {
      const browser = await this._puppeteer.launch({headless: false})
      const page = await browser.newPage()
      await page.goto(CONFIG.GOOGLE_DOMAIN)
      await page.type(CONFIG.TEXT_INPUT, query)
      await page.$eval(CONFIG.BUTTON_INPUT, x => x.click())
      const pageResult = await this._pageSearch(searchWord, page)
      await browser.close()

      return {
        query,
        ...pageResult
      }
    })

    return await Promise.all(promises)
  }

  async _pageSearch(searchWord, page, pageNumber = 1) {
    await page.waitForSelector(CONFIG.SITE_URL)
    const found = await this._findSearchWord(searchWord, page)

    if (found) {
      return {
        resultStatus: 1,
        result: `Found on page: ${pageNumber}`
      }
    } else {
      try {
        await page.waitForSelector(CONFIG.NEXT_BUTTON, {timeout: 2000})
        await page.click(CONFIG.NEXT_BUTTON)

        return this._pageSearch(searchWord, page, ++pageNumber)
      } catch (err) {
        return {
          resultStatus: 0,
          result: 'Not found'
        }
      }
    }
  }

  async _findSearchWord(searchWord, page) {
    const element = await page.$$(CONFIG.SITE_URL)

    for (let i = 0; i < element.length; i++) {
      const text = await page.evaluate(element => element.textContent, element[i])

      if (text.toLowerCase().includes(String(searchWord).toLowerCase())) {
        return true
      }
    }

    return false
  }
}

module.exports = PageFinder
