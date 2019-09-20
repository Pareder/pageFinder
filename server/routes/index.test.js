const request = require('supertest')
const express = require('express')
const getRoutes = require('../routes')

const queries = [1, 2, 3]
const searchWord = 'word'
const PageFinderMock = {
  startFinding: jest.fn(queries => queries)
}
const modulesMock = {
  PageFinder: PageFinderMock
}

function getApp(modules = modulesMock) {
  const app = express()
  app.use(express.json())
  app.use('/', getRoutes(modules))

  return app
}

describe('/getPages route', () => {
  describe('POST', () => {
    it('Should respond with error if some arguments are not provided', async () => {
      const app = getApp()

      await request(app)
        .post('/getPages')
        .send({
          queries
        })
        .expect(400, {
          errors: [
            {
              title: 'Not all parameters are provided',
              errorMessage: 'An error occurred: queries and searchWord are required'
            }
          ]
        })
    })

    it('Should respond with correct json', async () => {
      const app = getApp()

      await request(app)
        .post('/getPages')
        .send({
          queries,
          searchWord
        })
        .expect(201, {
          title: 'Finding Successful',
          data: queries
        })
    })

    it('Should respond with error if PageFinder module throws error', async () => {
      const error = 'error'
      const PageFinder = {
        startFinding: jest.fn(() => {
          throw new Error(error)
        })
      }
      const app = getApp({PageFinder})

      await request(app)
        .post('/getPages')
        .send({
          queries,
          searchWord
        })
        .expect(400, {
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
