const express = require('express')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const budgetRouter = require('./controllers/budgets')
const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
      logger.info('connected to MongoDB')
  })
  .catch((error) => {
      logger.error('Error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/budgets', budgetRouter)

if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/tests')
  app.use('api/tests', testingRouter)
}

module.exports = app  