var fs = require('fs')
var http = require('http')
var shortid = require('shortid')

http.createServer(function (req, res) {
  console.log(req.method + ' RETRIEVED')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'POST') {
    var filename = shortid() + '.ogg'
    console.log('Saving recording to ' + filename)
    var fileStream = fs.createWriteStream(filename)
    req.pipe(fileStream)
    req.on('end', function () {
      res.end()
    })
  } else {
    res.writeHead(200, 'OK')
    res.end()
  }
}).listen(3000)
