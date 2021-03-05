const express = require('express')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
      logger.info('connected to MongoDB')
  })
  .catch((error) => {
      logger.error('Error connecting to MongoDB:', error.message)
  })

module.exports = app  