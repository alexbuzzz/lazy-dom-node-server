const axios = require('axios')

class Depth {
  constructor(symbol, limit) {
    this.symbol = symbol
    this.limit = limit
  }

  async fut() {
    const binanceAPI = 'https://fapi.binance.com/fapi/v1/depth'

    try {
      const response = await axios.get(
        `${binanceAPI}?symbol=${this.symbol}&limit=${this.limit}`
      )
      return response.data
    } catch (error) {
      console.log('error fut depth ' + this.symbol)
    }
  }

  async spot() {
    const binanceAPI = 'https://api.binance.com/api/v3/depth'

    try {
      const response = await axios.get(
        `${binanceAPI}?symbol=${this.symbol}&limit=${this.limit}`
      )
      return response.data
    } catch (error) {
      console.log('error spot depth ' + this.symbol)
    }
  }
}

module.exports = Depth
