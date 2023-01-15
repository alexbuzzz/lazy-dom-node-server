const axios = require('axios')

class Tickers {
  async fut() {
    const binanceAPI = 'https://fapi.binance.com/fapi/v1/ticker/price'
    try {
      const response = await axios.get(binanceAPI)
      return response.data
    } catch (error) {
      console.log('error fut tickers')
    }
  }

  async spot() {
    const binanceAPI = 'https://api.binance.com/api/v3/ticker/price'

    try {
      const response = await axios.get(binanceAPI)
      return response.data
    } catch (error) {
      console.log('error spot tickers')
    }
  }
}

module.exports = Tickers
