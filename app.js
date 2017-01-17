var express = require('express')
var app = express()
var port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Hello! 1234')
})

app.listen(port, function () {
  console.log('Listening on port ' + port)
})
