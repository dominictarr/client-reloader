
var header = require('header-stream')

//server side...
var version = Date.now()

module.exports = function (handler, meta) {
  if (!meta || 'object' !== typeof meta)
    meta = {version: meta}
  meta.version = meta.version || version

  return function (stream) {
    stream = header(stream)
    stream.writeHead(meta)
    //maybe expand this to have more options, like setting a range...
    var args = [].slice.call(arguments)
    stream.on('header', function (_meta) {
      //if the other end has the wrong version,
      //don't bother passing this to the app.
      //TODO: also check that the other end is the right app.
      //sometimes browser caching can cause this to happen
      //actually, this caused my demos to totally fuck up at cascadia.js
      //here is the video http://www.youtube.com/watch?v=ivqI5IZlPRc
      //what happened was, I had several different demo apps but I ran them all on the same port.
      //if I restarted the app, when they where connected, their app would be restarted
      //by this module. 
      //however, if they reopened my app, but I've started a new app, then the old code
      //would still be in the cache... which broke stuff.
      if(_meta.version !== meta.version && _meta.version) {
        return stream.end()
      }
      handler.apply(this, args)
    })
  }
}
