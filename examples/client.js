

var reconnect = require('reconnect')
var reloader  = require('../browser')

function log(data) {
  console.log(data)
  var e = document.createElement('pre')
  e.innerText = data
  document.body.appendChild(e)
}

var r = 
reconnect(function (stream) {
  reloader(stream)
  .on('reload', function () {
    log('RELOAD')
  })
  setInterval(function () {
    stream.write('ping:'+Date.now())
  }, 1000)

  stream.on('data', log)
}).connect('/shoe')

document.body.appendChild(r.widget())
