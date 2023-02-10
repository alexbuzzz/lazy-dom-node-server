const dom = require('./dom/binance')
const levels = require('./levels/binance')
const http = require('http')

dom.start()
levels.start()

// Dom server
const domServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(JSON.stringify(dom.domParameters))
})

domServer.listen(2203, () => {
  console.log('Dom server running on port 2203')
})

// Levels server
const levelsServer = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
  })
  res.end(JSON.stringify(levels.allLevels))
})

levelsServer.listen(2204, () => {
  console.log('Levels server running on port 2204')
})
