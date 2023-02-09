const axios = require('axios')

const getKline = async (symbol, limit, interval) => {
  const binanceAPI = 'https://fapi.binance.com/fapi/v1/klines'

  try {
    const response = await axios.get(
      `${binanceAPI}?symbol=${symbol}&limit=${limit}&interval=${interval}`
    )
    return response.data
  } catch (error) {
    console.log('error day klines ' + this.symbol)
  }
}

module.exports = { getKline }
