var express = require('express')
var cfenv = require('cfenv')
var app = express()
var appEnv = cfenv.getAppEnv()

app.get('/', function (req, res) {
  var appId = appEnv.app.application_id || "(local)"
  res.send('Hello! This is Jeffs awesome app ' + appId)
})

app.listen(appEnv.port, function () {
  console.log('Listening on port ' + appEnv.port)
})
