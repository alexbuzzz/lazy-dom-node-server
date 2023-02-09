const getStep = (price, tickSize) => {
  const currentPrice = parseFloat(price)

  // Price 1% above current
  const onePersAbove = (100 * currentPrice) / 99

  // Multiplicator
  const multiplicator = Math.round(1 / tickSize)

  // Nums after decimal
  const numOfDecimals = multiplicator.toString().length - 1

  // Format price
  onePersAboveFormatted = onePersAbove.toFixed(numOfDecimals)

  // Step
  let deltaPriceSteps = Math.round(
    (onePersAboveFormatted - currentPrice) * multiplicator
  )

  // Min step = 1
  if (deltaPriceSteps < 1) deltaPriceSteps = 1

  return deltaPriceSteps
}

module.exports = { getStep }
