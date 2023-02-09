const tickers = require('./getTickers')
const kline = require('./getKline')

const allLevels = {
  oneDay: {},
  fourHours: {},
  oneHour: {},
  isCycleFull: false,
}

const calcLevels = async (symbol, interval) => {
  const klines = await kline.getKline(symbol, 500, interval)

  let pivotsHigh = []
  let pivotsLow = []

  // High
  function isGreaterThanAll(klines, i, start, end) {
    for (let j = start; j <= end; j++) {
      if (klines[j] == undefined) {
        return false
      }
      if (klines[i][2] < klines[j][2]) {
        return false
      }
    }
    return true
  }

  function removeLessThan(array, num) {
    return array.filter((element) => element >= num)
  }

  // Low
  function isLessThanAll(klines, i, start, end) {
    for (let j = start; j <= end; j++) {
      if (klines[j] == undefined) {
        return false
      }
      if (klines[i][3] > klines[j][3]) {
        return false
      }
    }
    return true
  }

  function removeGreaterThan(array, num) {
    return array.filter((element) => element <= num)
  }

  // Loop through all candles
  for (let i = 10; i < klines.length; i++) {
    if (parseFloat(klines[i][5]) != 0) {
      // High
      if (
        isGreaterThanAll(klines, i, i - 10, i - 1) &&
        isGreaterThanAll(klines, i, i + 1, i + 5)
      ) {
        pivotsHigh.push(klines[i][2])
      }

      pivotsHigh = removeLessThan(pivotsHigh, klines[i][4])

      // Low
      if (
        isLessThanAll(klines, i, i - 10, i - 1) &&
        isLessThanAll(klines, i, i + 1, i + 5)
      ) {
        pivotsLow.push(klines[i][3])
      }

      pivotsLow = removeGreaterThan(pivotsLow, klines[i][4])
    }
  }

  if (interval === '1h') {
    allLevels.oneHour[symbol] = {
      high: pivotsHigh,
      low: pivotsLow,
    }
  }

  if (interval === '4h') {
    allLevels.fourHours[symbol] = {
      high: pivotsHigh,
      low: pivotsLow,
    }
  }

  if (interval === '1d') {
    allLevels.oneDay[symbol] = {
      high: pivotsHigh,
      low: pivotsLow,
    }
  }
}

const start = async () => {
  const futTickers = await tickers.getTickers()
  for (const el of futTickers) {
    calcLevels(el.symbol, '1h')
    await new Promise((r) => setTimeout(r, 3000))
    calcLevels(el.symbol, '4h')
    await new Promise((r) => setTimeout(r, 3000))
    calcLevels(el.symbol, '1d')
    await new Promise((r) => setTimeout(r, 3000))
  }

  allLevels.isCycleFull = true

  console.log('Cycle complete!')
  start()
}

module.exports = { start, allLevels }
