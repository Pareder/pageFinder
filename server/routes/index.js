const express = require('express')
const middleware = require('../middleware')
const PageFinder = require('../modules/PageFinder')

const routes = express.Router()

routes.post('/getPages', async (req, res) => await middleware.getPages(req, res, PageFinder.create()))

module.exports = routes
