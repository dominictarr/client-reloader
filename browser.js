
var header = require('header-stream')

var version = 0
/**
TODO
more sophisticated reloading, 
pass in a package and a semver range...
**/
module.exports = function (handler, init) {
  init = init || {}
  init.version = version || 0
    
  return function (stream) {
    var args = [].slice.call(arguments)

    header(stream)
      .setHeader(init)
      .writeHead()

    stream.on('header', function (meta) {
      if(!init.version)
        init.version = meta.version
      else if(meta.version !== init.version && init.version) {
        stream.emit('reload', meta.version, init.version)
        stream.end()

        return window.location.reload(true)
      }

      handler.apply(this, args)
    })
  }

}

