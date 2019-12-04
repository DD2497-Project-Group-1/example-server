const express = require('express')
const dostroy = require('dostroy')
const app = express()

const SIMULATE_SLOW_SERVER = true

const config = {
  slowloris: false,
  rateLimiting: false,
  rudy: true
}
const server = app.listen(3000)
if (SIMULATE_SLOW_SERVER) server.maxConnections = 125
app.use(dostroy(server, config))

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
