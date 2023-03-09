const dom = require('./dom')
const http = require('http')

dom.start()

// Dom server
const domServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(JSON.stringify(dom.domParameters))
})

domServer.listen(2203, () => {
  console.log('Dom server running on port 2203')
})
