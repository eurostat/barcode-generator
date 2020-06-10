/**
 * Copyright (c) 2020 ~ present Eurostat.
 */
import Barcode from './internals/Barcode'
import './config/config'
import { isObject, mergeObj } from './internals/util'

let defaults = {}
let instance = []

let version = '#__VERSION__#'

export function generateBarcode (config) {
  const options = mergeObj({}, defaults, config)
  const inst = new Barcode(options)

  instance.push(inst)

  return inst
}

export { version, instance }
