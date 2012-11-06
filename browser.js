
var header = require('header-stream')

var version
/**
TODO
more sophisticated reloading, 
pass in a package and a semver range...
**/
module.exports = function (handler) {
  return function (stream) {
    var args = [].slice.call(arguments)
    header(stream).writeHead()
    stream.on('header', function (meta) {

      if(!version)
        version = meta.version
      if(meta.version !== version) {
        stream.emit('reload', meta.version, version)
        stream.end()

        return window.location.reload(true)
      }

      handler.apply(this, args)
    })
  }

}

var wrap = function (stream, _version) {
  version = _version || version
  stream = header(stream)
  stream.on('header', function (meta) {
    //is it same version as last time?
    if(!version)
      version = meta.version
    if(meta.version !== version) {
      stream.emit('reload', meta.version, version)
      stream.end()

      window.location.reload(true)
    }
  })
  return stream
}
