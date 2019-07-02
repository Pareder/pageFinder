const express = require('express')
const serveStatic = require('serve-static')
const cors = require('cors')

const startFinding = require('./middleware/pageFinder')

const app = express()

app.use(express.json())
app.use(cors())
app.use(serveStatic((__dirname + "/front/build")))

app.post('/getPages', async (req, res) => {
  try {
    const { queries, searchWord } = req.body
    const results = await startFinding(queries, searchWord)
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

const port = process.env.PORT || 5000
app.listen(port)
