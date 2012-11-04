
var header = require('header-stream')

var version
/**
TODO
more sophisticated reloading, 
pass in a package and a semver range...
**/
module.exports = function (stream, _version) {
  version = _version || version
  stream = header(stream)
  stream.on('header', function (meta) {
    //is it same version as last time?
    if(!version)
      version = meta.version
    if(meta.version !== version) {
      stream.emit('reload', meta.version, version)
      if('function' == typeof stream) stream.destroy()

      window.location = window.location //MAGIC
    }
  })
  return stream
}
