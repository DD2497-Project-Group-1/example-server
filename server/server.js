const express = require('express')
const app = express()
const dostroy = require('dostroy')

app.use(dostroy.countRequests)

app.listen(3000)

app.get('/', function (req, res) {
  console.log('Number of requests: ' + dostroy.getRequests())
  res.send('Hello from example server!')
})