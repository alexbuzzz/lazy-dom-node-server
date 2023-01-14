const axios = require('axios')

class Tickers {
  fut() {
    console.log(
      `Retrieving Order Book data for ${this.symbol} with limit ${this.limit}`
    )
  }

  async spot() {
    const binanceAPI = 'https://api.binance.com/api/v3/ticker/price'

    try {
      const response = await axios.get(binanceAPI)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = Tickers
