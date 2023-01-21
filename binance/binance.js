const GetDepth = require('./getDepth')
const GetTickers = require('./getTickers')
const getStep = require('./getStep')
const getTickSize = require('./getTickSize')

const getTickers = new GetTickers()

const domParameters = {
  fut: {},
  spot: {},
  isCycleFull: false,
}

// Fut
const futCalc = async (ticker, price, tickSize) => {
  const getDepth = new GetDepth(ticker, 100)
  const res = await getDepth.fut()
  if (typeof res === 'object' && res !== null) {
    const all = res.bids.concat(res.asks)
    const modifiedAll = all.map((arr) => {
      arr.shift()
      return Number(arr[0])
    })
    const top = modifiedAll.sort((a, b) => b - a).slice(0, 20)
    const sum = top.reduce((acc, val) => acc + val, 0)
    const avg = Math.round(sum / top.length)

    domParameters.fut[ticker] = {
      step: getStep.getStep(price, tickSize),
      fillAmount: avg,
    }
  }
}

// Spot
const spotCalc = async (ticker, price, tickSize) => {
  const getDepth = new GetDepth(ticker, 100)
  const res = await getDepth.spot()
  if (typeof res === 'object' && res !== null) {
    const all = res.bids.concat(res.asks)
    const modifiedAll = all.map((arr) => {
      arr.shift()
      return Number(arr[0])
    })
    const top = modifiedAll.sort((a, b) => b - a).slice(0, 20)
    const sum = top.reduce((acc, val) => acc + val, 0)
    const avg = Math.round(sum / top.length)

    domParameters.spot[ticker] = {
      step: getStep.getStep(price, tickSize),
      fillAmount: avg,
    }
  }
}

const start = async () => {
  await getTickSize.start()
  const tickSizeData = getTickSize.data
  const futTickers = await getTickers.fut()
  for (const el of futTickers) {
    console.log(el.symbol)
    if (tickSizeData.fut[el.symbol] != undefined) {
      futCalc(el.symbol, el.price, tickSizeData.fut[el.symbol].tickSize)
    }

    if (
      tickSizeData.spot[el.symbol.replace('1000', '').replace('2', '')] !=
      undefined
    ) {
      spotCalc(
        el.symbol.replace('1000', '').replace('2', ''),
        el.price,
        tickSizeData.spot[el.symbol.replace('1000', '').replace('2', '')]
          .tickSize
      )
    }

    await new Promise((r) => setTimeout(r, 3000))
  }

  domParameters.isCycleFull = true

  start()
}

module.exports = { start, domParameters }
