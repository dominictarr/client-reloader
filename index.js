
var header = require('header-stream')

//server side...
var version = Date.now()


module.exports = function (handler, _version) {
  return function (stream) {

    version = _version || version
    stream = header(stream)
    stream.writeHead({version: version})
    //maybe expand this to have more options, like setting a range...
    handler.apply(this, arguments)
  }
}
