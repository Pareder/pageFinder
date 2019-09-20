const express = require('express')
const middleware = require('../middleware')

const getRoutes = modules => {
  const routes = express.Router()

  routes.post('/getPages', async (req, res) => await middleware.getPages(req, res, modules.PageFinder))

  return routes
}

module.exports = getRoutes
