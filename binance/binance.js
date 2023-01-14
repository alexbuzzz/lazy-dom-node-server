const GetDepth = require('./getDepth')
const GetTickers = require('./getTickers')

const getTickers = new GetTickers()

const domParameters = { 121: '545' }

const start = async () => {
  const spotAllTickers = await getTickers.spot()
  const spotTickers = await spotAllTickers.filter(
    (obj) => obj.symbol.includes('USDT') || obj.symbol.includes('BUSD')
  )
  // const getDepth = new GetDepth('ADAUSDT', 100)
  // const spot = await getDepth.spot()

  // console.log(spotTickers)

  return spotTickers
}

module.exports = { start, domParameters }
