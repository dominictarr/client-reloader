
var shoe = require('shoe')
var ecstatic = require('ecstatic')
var http = require('http')
var join = require('path').join

var reloader = require('..')
var pingpong = require('ping-pong')

var PORT = 3000

shoe(reloader(function (stream) {
  console.log('connection')
  //add a header, that will tell the client to restart...
//  stream.pipe(pingpong()).pipe(stream)
  stream.pipe(stream)
})).install(
  http.createServer(
    ecstatic(join(__dirname, 'static'))
  ).listen(PORT, function () {
    console.log( 'listening on', PORT)
  })
, '/shoe')

