export const getChanceOfBeingBlankForAxis = (
  rateOfDecay: number,
  progressRatio: number
) => {
  if (rateOfDecay < 0) {
    rateOfDecay = Math.abs(rateOfDecay)
    progressRatio = 1 - progressRatio
  }

  return rateOfDecay * progressRatio
}

const mix = (n1: number, n2: number) => (n1 + n2) / 2

/**
 * We want our dots to form a gradient based on the angle provided.
 * A 0-degree angle should fade gradually out from left to right.
 * A 90-degree angle should fade out from top to bottom.
 * 45-degrees means it fades out diagonally, from top-left to bottom-right.
 *
 * We can get a specific dot's position by looking at its row/column index
 * against the total number of rows/columns. Then we can figure out where it
 * sits on the spectrum by using trigonometry; every angle decays across each
 * axis at a different rate, so we get the rate for both X and Y axes.
 * Then we mix those two values, for an overall likelihood of blank-ness.
 */
export const getLikelihoodOfBeingBlank = (
  angle: number,
  colIndex: number,
  rowIndex: number,
  numCols: number,
  numRows: number
) => {
  const angleInRads = (angle * Math.PI) / 180

  const rateOfDecayX = Math.cos(angleInRads)
  const rateOfDecayY = Math.sin(angleInRads)

  const percentageThroughX = colIndex / numCols
  const percentageThroughY = rowIndex / numRows

  const chanceOfBeingBlankX = getChanceOfBeingBlankForAxis(
    rateOfDecayX,
    percentageThroughX
  )
  const chanceOfBeingBlankY = getChanceOfBeingBlankForAxis(
    rateOfDecayY,
    percentageThroughY
  )

  return mix(chanceOfBeingBlankX, chanceOfBeingBlankY)
}
