const middleware = {
  getPages: async (req, res, pageFinder) => {
    const {queries, searchWord} = req.body

    if (!queries || !searchWord) {
      res.status(400).json({
        errors: [
          {
            title: 'Not all parameters are provided',
            errorMessage: 'An error occurred: queries and searchWord are required'
          }
        ]
      })
    }

    try {
      const results = await pageFinder.startFinding(queries, searchWord)
      res.status(201).json({
        title: 'Finding Successful',
        data: results
      })
    } catch (err) {
      res.status(400).json({
        errors: [
          {
            title: 'Finding Error',
            errorMessage: err.message,
          }
        ]
      })
    }
  }
}

module.exports = middleware
