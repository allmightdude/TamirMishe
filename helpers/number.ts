/**
 * Number utilities
 * ***********************************/

/**
 * Format number to fixed decimal places
 * ***********************************/
export const toFixed = (num: number, digits: number = 2): string => {
  return num.toFixed(digits)
}

/**
 * Round number to specified decimal places
 * ***********************************/
export const round = (num: number, decimals: number = 2): number => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

/**
 * Clamp number between min and max values
 * ***********************************/
export const clamp = (value: number, min: number = 0, max: number = 1): number => {
  return Math.max(min, Math.min(max, value))
}
