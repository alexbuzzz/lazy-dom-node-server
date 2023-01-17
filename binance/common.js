const getStep = (price) => {
  const currentPrice = parseFloat(price)
  // Price 1% above current
  const onePersAbove = (100 * currentPrice) / 99

  // Nums after decimal
  const parts = currentPrice.toString().split('.')
  const numOfDecimals = (parts[1] || []).length

  // Make multiplicator number
  let multiplicatorNumber = 1
  let i = 0
  while (i < numOfDecimals) {
    multiplicatorNumber = multiplicatorNumber * 10
    i++
  }

  // Format price
  onePersAboveFormatted = onePersAbove.toFixed(numOfDecimals)

  // Step
  let deltaPriceSteps = Math.round(
    (onePersAboveFormatted - currentPrice) * multiplicatorNumber
  )

  // Min step = 1
  if (deltaPriceSteps < 1) deltaPriceSteps = 1

  return deltaPriceSteps
}

module.exports = { getStep }
