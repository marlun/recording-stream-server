var io = require('socket.io').listen(3000)
var ss = require('socket.io-stream')
var fs = require('fs')
var path = require('path');

io.of('/recording').on('connection', function (socket) {
  ss(socket).on('new', function (stream, data) {
    var filename = path.basename(data.name)
    console.log('Saving recording to ' + filename)
    stream.pipe(fs.createWriteStream(filename))
  })
})
