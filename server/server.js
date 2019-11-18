const express = require('express')
const dostroy = require('dostroy')
const sleep = require('sleep')

const app = express()

const slow = true

config = {
  rateLimiting: true,
  logging: false,
  errorHandling: true,
}

app.listen(3000)

app.get('/', function (req, res) {
  slow && sleep.msleep(500)
  res.send('Hello from example server! \n')
})

app.get('/error', function (req, res) {
  const param = req.query.param
  if (param < 0) {
    throw new Error('Your number is too low!')
  } else {
    res.send('Your number is: ' + param)
  }
})

app.use(dostroy(config))
