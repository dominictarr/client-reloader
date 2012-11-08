# client-reloader

Reload client sessions, when they connect with an old client js. 
recommended use with [reconnect](https://npm.im/reconnect) 
and [shoe](https://npm.im/shoe) or other client-side stream api.

## Example

### Client
``` js
var reconnect = require('reconnect')
var reloader  = require('client-reloader')

reconnect(reloader(function (stream) {
  //your good! use the stream!
})).connect('/shoe')
```
When the client reconnects, the server will send the current version,
if it is different to the server version, the client will reload.

### Server

``` js
var shoe = require('shoe')
var reloader = require('client-reloader')
var ecstatic = require('ecstatic')

shoe(reloader(function (stream) {
  //the client has successfull connected, 
  //with the right version!
}), VERSION).install(
  //serve static files.
  http.createServer(ecstatic(__dirname+'/static'))
  .listen(PORT)
, '/shoe')
```

`VERSION` is _optional_. 
If this is not defined it will default to the timestamp that you started the server.
This will make clients restart whenever you restart the server. 
(probably good behaviour for dev mode)

## License

MIT
