const express = require('express')
const dostroy = require('dostroy')
const sleep = require('sleep')

const app = express()

const slow = true

app.use(dostroy.countRequests)

app.listen(3000)

app.get('/', function (req, res) {
  console.log('Number of requests: ' + dostroy.getRequests())
  slow && sleep.msleep(500)
  res.send('Hello from example server! \n')
})