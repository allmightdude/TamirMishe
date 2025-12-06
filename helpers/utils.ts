/**
 * Utility functions
 * ***********************************/

// import enums from '../assets/generic'

/**
 * Encode string to base64
 * ***********************************/
export const encode = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)))
}

/**
 * Decode base64 string
 * ***********************************/
export const decode = (str: string): string => {
  return decodeURIComponent(escape(atob(str)))
}

/**
 * Get today's date in Jalali format
 * ***********************************/
export const today = (): string => {
  // @ts-ignore
  const moment = require('moment-jalaali')
  return moment().format('jYYYY/jMM/jDD')
}

/**
 * Get today's date in Gregorian format
 * ***********************************/
export const todayEn = (): string => {
  // @ts-ignore
  const moment = require('moment-jalaali')
  return moment().format('YYYY/MM/DD')
}

/**
 * Enum provider
 * ***********************************/
// export const enumProvider = (
//   type: string,
//   options?: {
//     value?: any
//     prop?: string
//     includes?: any[]
//     excludes?: any[]
//   }
// ) => {
//   const defaultOptions = { prop: 'id' }
//   const mergedOptions = { ...defaultOptions, ...options }
//   const { value, prop, includes, excludes } = mergedOptions

//   if (value === undefined) {
//     if (includes?.length) {
//       return enums[type as keyof typeof enums].filter((i: any) => includes.includes(i[prop]))
//     }

//     if (excludes?.length) {
//       return enums[type as keyof typeof enums].filter((i: any) => !excludes.includes(i[prop]))
//     }

//     return enums[type as keyof typeof enums]
//   }

//   const item = enums[type as keyof typeof enums].find((i: any) => i[prop] === value)

//   return typeof item !== 'undefined' ? item : {}
// }

/**
 * Download file virtually
 * ***********************************/
export const saveFile = (
  data: any,
  options: {
    filename: string
    mime?: string
    bom?: any
    isBlob?: boolean
    base64Data?: boolean
  }
) => {
  const { filename, mime = 'application/octet-stream', bom, isBlob = true, base64Data } = options

  let blobData
  let blob
  let blobURL: string | undefined

  if (isBlob) {
    blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
    blob = new Blob(blobData, { type: mime })

    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    // @ts-ignore - msSaveBlob is IE-specific
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // @ts-ignore - msSaveBlob is IE-specific
      window.navigator.msSaveBlob(blob, filename)
      return
    }

    blobURL =
      window.URL && window.URL.createObjectURL
        ? window.URL.createObjectURL(blob)
        : window.webkitURL.createObjectURL(blob)
  }

  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = isBlob ? blobURL : base64Data ? `data:${mime};base64,${data}` : data
  tempLink.setAttribute('download', filename)

  // Safari thinks _blank anchor are pop ups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  if (!isBlob || typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }

  document.body.appendChild(tempLink)
  tempLink.click()

  // Fixes "webkit blob resource error 1"
  setTimeout(function () {
    document.body.removeChild(tempLink)
    if (blobURL) window.URL.revokeObjectURL(blobURL)
  }, 200)
}

/**
 * Format file Sizes
 * ***********************************/
export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B'

  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'

  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}
