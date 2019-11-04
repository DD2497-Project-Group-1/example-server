const express = require('express')
const app = express()
const dostroy = require('dostroy')

app.use(dostroy.countRequests)

app.listen(3000)

app.get('/', function (req, res) {
  res.send('Number of requests so far: ' + dostroy.getRequests())
})