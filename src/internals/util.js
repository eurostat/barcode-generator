const isValue = v => v || v === 0
const isFunction = v => typeof v === 'function'
const isString = v => typeof v === 'string'
const isNumber = v => typeof v === 'number'
const isUndefined = v => typeof v === 'undefined'
const isDefined = v => typeof v !== 'undefined'
const isBoolean = v => typeof v === 'boolean'
const isObjectType = v => typeof v === 'object'

/**
 * Check if is object
 * @param {Object} obj
 * @returns {Boolean}
 * @private
 */
const isObject = obj =>
  obj && !obj.nodeType && isObjectType(obj) && !isArray(obj)

/**
 * Check if is array
 * @param {Array} arr
 * @returns {Boolean}
 * @private
 */
const isArray = arr => arr && arr.constructor === Array

const getOption = (options, key, defaultValue) =>
  isDefined(options[key]) ? options[key] : defaultValue

/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} args Arguments
 * @return {Boolean} true: fn is function, false: fn is not function
 * @private
 */
const callFn = (fn, ...args) => {
  const isFn = isFunction(fn)

  isFn && fn.call(...args)
  return isFn
}

const extend = (target = {}, source) => {
  for (const p in source) {
    target[p] = source[p]
  }

  return target
}

/**
 * Merge object returning new object
 * @param {Object} target
 * @param {Object} objectN
 * @returns {Object} merged target object
 * @private
 */
const mergeObj = (target, ...objectN) => {
  if (!objectN.length || (objectN.length === 1 && !objectN[0])) {
    return target
  }

  const source = objectN.shift()

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const value = source[key]

      if (isObject(value)) {
        !target[key] && (target[key] = {})
        target[key] = mergeObj(target[key], value)
      } else {
        target[key] = isArray(value) ? value.concat() : value
      }
    })
  }

  return mergeObj(target, ...objectN)
}

export {
  isValue,
  isFunction,
  isString,
  isNumber,
  isArray,
  isBoolean,
  isUndefined,
  isDefined,
  getOption,
  isObject,
  isObjectType,
  callFn,
  mergeObj,
  extend
}
