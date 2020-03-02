const { port } = require('./config/environment')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('./lib/logger')

mongoose.set('useFindAndModify', false)

app.use(bodyParser.json())

app.use(logger)

app.get('/*', (req, res) => res.status(404).json({ message: 'Not found' }))

app.listen(port, () => console.log(`node server running on :${port}`))

module.exports = app