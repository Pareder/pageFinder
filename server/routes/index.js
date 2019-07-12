const express = require('express')
const PageFinder = require('../middleware/pageFinder')

const routes = express.Router()

routes.post('/getPages', async (req, res) => {
  try {
    const { queries, searchWord } = req.body
    const results = await PageFinder.create().startFinding(queries, searchWord)
    res
      .status(201)
      .json({
        title: 'Finding Successful',
        data: results
      })
  } catch (err) {
    res.status(400).json({
      errors: [
        {
          title: 'Finding Error',
          errorMessage: err.message,
        },
      ],
    })
  }
})

module.exports = routes
