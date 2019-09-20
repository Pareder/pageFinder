const express = require('express')
const serveStatic = require('serve-static')
const cors = require('cors')
const getRoutes = require('./server/routes')
const modules = require('./server/modules')

const app = express()

app.use(express.json())
app.use(cors())
app.use(serveStatic((__dirname + '/front/build')))
app.use('/', getRoutes(modules))

const port = process.env.PORT || 5000
app.listen(port)
