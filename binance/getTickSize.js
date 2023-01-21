const axios = require('axios')

const data = {
  fut: {},
  spot: {},
}

const fut = async () => {
  const binanceAPI = 'https://fapi.binance.com/fapi/v1/exchangeInfo'
  try {
    const response = await axios.get(binanceAPI)
    return response.data.symbols
  } catch (error) {
    console.log('error fut tickSize')
  }
}

const spot = async () => {
  const binanceAPI = 'https://api.binance.com/api/v3/exchangeInfo'
  try {
    const response = await axios.get(binanceAPI)
    return response.data.symbols
  } catch (error) {
    console.log('error spot tickSize')
  }
}

const start = async () => {
  const futData = await fut()
  const spotData = await spot()

  futData.forEach((element) => {
    data.fut[element.symbol] = { tickSize: element.filters[0].tickSize }
  })

  spotData.forEach((element) => {
    if (element.symbol.includes('USDT') || element.symbol.includes('BUSD')) {
      data.spot[element.symbol] = { tickSize: element.filters[0].tickSize }
    }
  })
}

module.exports = { start, data }
