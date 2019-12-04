const express = require('express')
const dostroy = require('dostroy')
const app = express()

const SIMULATE_SLOW_SERVER = true

const config = {
  slowloris: false,
  rudy: true,
  rateLimiting: true,
  dynamicRateLimiting: true,
  errorHandling: true,
  userActiveTimeout: 10000,
  requestLimit: 10,
  requestInterval: 10000,
  logging: true,
  headerTimeout: 1000,
  rtimeout: 1000
}

const server = app.listen(3000)
if (SIMULATE_SLOW_SERVER) server.maxConnections = 125
const dostroyConfig = dostroy.init(server, config)
app.use(dostroy.protect(dostroyConfig))


app.get('/', function (req, res) {
  res.sendFile(__dirname +'/index.html')
})

app.get('/error', function (req, res) {
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
