const axios = require('axios')

class Depth {
  constructor(symbol, limit) {
    this.symbol = symbol
    this.limit = limit
  }

  fut() {
    console.log(
      `Retrieving Order Book data for ${this.symbol} with limit ${this.limit}`
    )
  }

  async spot() {
    const binanceAPI = 'https://api.binance.com/api/v3/depth'

    try {
      const response = await axios.get(
        `${binanceAPI}?symbol=${this.symbol}&limit=${this.limit}`
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Depth
