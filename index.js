const binance = require('./binance/binance')
const http = require('http')

binance.start()

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(JSON.stringify(binance.domParameters))
})

server.listen(2203, () => {
  console.log('Server running on port 2203')
})
