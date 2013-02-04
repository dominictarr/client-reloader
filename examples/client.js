

var reconnect = require('reconnect')
var reloader  = require('../browser')

var logger = LOGGER = document.createElement('pre')
document.body.appendChild(logger)

function log(data) {
  var e = document.createTextNode(data + '\n')
  logger.appendChild(e)
  if(logger.childNodes.length > 20)
    logger.removeChild(logger.firstChild)
}

var r = 
reconnect(reloader(function (stream) {

  setInterval(function () {
    stream.write('ping:'+Date.now())
  }, 1000)

  stream.on('data', log)
})).connect('/shoe')

document.body.appendChild(r.widget())
