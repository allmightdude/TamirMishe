/**
 * Extend objects
 * ***********************************/
export const assign = Object.assign as <T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
) => T

/**
 * Merge two object (without adding second object property)
 * ***********************************/
export const merge = function (obj1: Record<string, any>, obj2: Record<string, any>) {
  const obj3 = {} as Record<string, any>
  for (const prop in obj1) {
    if (obj2[prop] !== undefined) obj3[prop] = obj2[prop]
  }

  return obj3
}

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }

  if (obj instanceof Array) {
    return obj.map((item) => deepClone(item)) as T
  }

  if (typeof obj === 'object') {
    const cloned = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key])
      }
    }
    return cloned
  }

  return obj
}

export const isObject = (value: any): value is Record<string, any> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export const keys = <T extends Record<string, any>>(obj: T): (keyof T)[] => {
  return Object.keys(obj)
}

export const values = <T extends Record<string, any>>(obj: T): T[keyof T][] => {
  return Object.values(obj)
}

export const entries = <T extends Record<string, any>>(obj: T): [keyof T, T[keyof T]][] => {
  return Object.entries(obj)
}

export const isEmpty = (obj: any): boolean => {
  if (obj === null || obj === undefined) return true
  if (Array.isArray(obj)) return obj.length === 0
  if (typeof obj === 'object') return Object.keys(obj).length === 0
  return false
}

export const hasValue = (value: any): boolean => {
  return value !== null && value !== undefined && value !== ''
}

export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key]
    }
  }
  return result
}

export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}

export const get = <T = any>(obj: any, path: string, defaultValue?: T): T | undefined => {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result === null || result === undefined || !(key in result)) {
      return defaultValue
    }
    result = result[key]
  }

  return result
}

export const set = <T = any>(obj: any, path: string, value: T): any => {
  const keys = path.split('.')
  const result = deepClone(obj)
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!(key in current) || !isObject(current[key])) {
      current[key] = {}
    }
    current = current[key]
  }

  current[keys[keys.length - 1]] = value
  return result
}

export const hasKeys = <T extends Record<string, any>>(obj: T, keys: (keyof T)[]): boolean => {
  return keys.every((key) => key in obj)
}

export const hasAnyKey = <T extends Record<string, any>>(obj: T, keys: (keyof T)[]): boolean => {
  return keys.some((key) => key in obj)
}

export const filter = <T extends Record<string, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> => {
  const result = {} as Partial<T>
  for (const [key, value] of Object.entries(obj)) {
    if (predicate(value, key as keyof T)) {
      result[key as keyof T] = value
    }
  }
  return result
}

export const mapValues = <T extends Record<string, any>, U>(
  obj: T,
  mapper: (value: T[keyof T], key: keyof T) => U
): Record<keyof T, U> => {
  const result = {} as Record<keyof T, U>
  for (const [key, value] of Object.entries(obj)) {
    result[key as keyof T] = mapper(value, key as keyof T)
  }
  return result
}

export const mapKeys = <T extends Record<string, any>, U extends string>(
  obj: T,
  mapper: (key: keyof T, value: T[keyof T]) => U
): Record<U, T[keyof T]> => {
  const result = {} as Record<U, T[keyof T]>
  for (const [key, value] of Object.entries(obj)) {
    const newKey = mapper(key as keyof T, value)
    result[newKey] = value
  }
  return result
}
