const express = require('express')
const dostroy = require('dostroy')
const sleep = require('sleep')
const app = express()

const SIMULATE_SLOW_SERVER = true

const config = {
  slowloris: false,
  rudy: false,
  rateLimiting: false,
  dynamicRateLimiting: false,
  errorHandling: false,
  userActiveTimeout: 10000,
  requestLimit: 10,
  requestInterval: 10000,
  logging: false,
  headerTimeout: 1000,
  rtimeout: 1000
}

const server = app.listen(3000)

if (SIMULATE_SLOW_SERVER) server.maxConnections = 50

const dostroyConfig = dostroy.init(server, config)

app.use(dostroy.protect(dostroyConfig))

app.get('/', (req, res) => {
  sleep.msleep(1000)
  res.sendFile(__dirname +'/index.html')
})

app.get('/error', (req, res) => {
  const param = req.query.param
  if (param < 0) {
    throw new Error('Your number is too low!')
  } else {
    res.send('Your number is: ' + param)
  }
})

app.post('/postForm', (req, res) => {
  res.sendFile(__dirname +'/posted.html')
})

app.use(dostroy.errorHandler)