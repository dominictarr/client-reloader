
var header = require('header-stream')

//server side...
var version = Date.now()
module.exports = function (stream, _version) {
  version = _version || version
  stream = header(stream)
  stream.setHeader('version', version)
  //maybe expand this to have more options, like setting a range...
  return stream
}
