/**
 * Filter functions for formatting data
 * ***********************************/
// @ts-ignore
import moment from 'moment-jalaali'
import { assign } from './object'
import { toFixed } from './number'

/**
 * Round number
 * ***********************************/
export const round = (
  num: number,
  options?: { power?: number; up?: boolean; down?: boolean }
): number => {
  if (!num && num !== 0) {
    return num
  }

  if (num % 1 === 0) {
    return num
  }

  const { power, up, down } = assign({ power: 2, up: false, down: false }, options || {})

  let method = 'round'

  if (up) method = 'ceil'
  if (down) method = 'floor'

  const powerValue = Math.pow(10, power)
  return (Math as any)[method](num * powerValue) / powerValue
}

/**
 * Separate number by 3-digit format
 * ***********************************/
export const price = (val: number | string, currency?: string): string => {
  const isMinus = +val < 0
  let value = Math.abs(+val)

  if (!val && value !== 0) {
    return String(val)
  }

  if (val) {
    const arrayValue = value.toString().split('.')
    value = Number(
      arrayValue[0].replace(/(.)(?=(.{3})+$)/g, '$1,') + (arrayValue[1] ? `.${arrayValue[1]}` : '')
    )
  }

  return `${isMinus ? '-' + value : value}${currency ? ` ${currency}` : ''}`
}

/**
 * Remove price formatting (commas and spaces)
 * ***********************************/
export const unPrice = (val: string | number): number => {
  return val ? parseFloat(('' + val).replace(/(,| )/g, '')) : 0
}

/**
 * Separate credit-card number by 4-digit
 * ***********************************/
export const creditCard = (val: string): string => {
  if (val) {
    return (val + '').match(new RegExp('.{1,4}', 'g'))?.join('-') || val
  }
  return ''
}

/**
 * Concat base-url to file path
 * ***********************************/
export const fullPath = (val: string, isRelative: boolean = false): string => {
  if (val) {
    return (isRelative ? '' : process.env.API_URL || '') + `/api/v1/attachment/content/${val}`
  }
  return ''
}

/**
 * Truncate text to specified length
 * ***********************************/
export const shortText = (val: string, length: number = 35): string => {
  return val ? (val.length > length ? val.substring(0, length) + '...' : val) : '-'
}

/**
 * Determine file size
 * ***********************************/
export const fileSize = (val: number): string => {
  const size = val
  const kilobyte = 1024
  const megabyte = kilobyte * kilobyte

  if (size > megabyte) {
    return round(size / megabyte) + ' مگابایت'
  } else if (size > kilobyte) {
    return round(size / kilobyte) + ' کیلوبایت'
  } else if (size >= 0) {
    return size + ' بایت'
  }

  return 'N/A'
}

/**
 * Format Gregorian date to Jalali
 * ***********************************/
export const date = (val: string | Date, isFull?: boolean, invalidText?: string): string => {
  if (val) {
    const date = moment(val)
    return date.isValid()
      ? date.format(`jYYYY/jMM/jDD${isFull ? ' - HH:mm' : ''}`)
      : invalidText || String(val)
  }
  return String(val)
}

/**
 * Format Gregorian date
 * ***********************************/
export const enDate = (val: string | Date, isFull?: boolean, invalidText?: string): string => {
  if (val) {
    const date = moment(val)
    return date.isValid()
      ? date.format(`YYYY/MM/DD${isFull ? ' - HH:mm' : ''}`)
      : invalidText || String(val)
  }
  return String(val)
}

/**
 * Format Gregorian date to Time
 * ***********************************/
export const time = (val: string | Date): string => {
  if (!val) return ''

  const date = moment(val)
  return date.isValid() ? date.format('HH:mm') : String(val)
}

/**
 * Format Number to decimal base-on its factor
 * ***********************************/
export const decimal = (value: number, factor: number = 0, digits: number = 8): string => {
  if (!value) return String(value)
  return toFixed(parseFloat(String(value * Math.pow(10, +factor))), +digits - +factor)
}

/**
 * Format Number to decimal base-on its factor (reverse)
 * ***********************************/
export const undecimal = (value: number, factor: number = 0, digits: number = 8): string => {
  if (!value) return String(value)
  return toFixed(parseFloat(String(value / Math.pow(10, +factor))), +digits)
}

/**
 * Limit Number Between Two Value
 * ***********************************/
export const clamp = (value: number, min: number = 0, max: number = 1): number => {
  return Math.max(min, Math.min(max, value))
}
