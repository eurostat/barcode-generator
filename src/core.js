/**
 * Copyright (c) 2020 ~ present Eurostat.
 */
import Barcode from './internals/Barcode'
import './config/config'
import { isObject, mergeObj } from './internals/util'

let defaults = {}
let instance = []

/**
 * Version information
 * @property {String} version version
 * @example
 *    barcode.version;  // "1.0.0"
 */
let version = '#__VERSION__#'

/**
 * Generate barcode graph
 * @param {Options} options chart options
 * @return {Barcode}
 * @see {@link Options} for different generation options
 * @example
 *  <!-- chart holder in html -->
 * <div id="barcode"></div>
 * @example
 * import * as barcode from eurostat-barcode-generator
 * @example
 *   // generate chart with options
 *  let myBarcode = barcode.generateBarcode({
 *      "bindto": "#barcode",
 *      "data": {
 *          "json": [
 *              {id: 'DE', name:'Germany', value: 15},
 *              {id: 'BE', name:'Belgium', value: 35},
 *              {id: 'FR', name:'France', value: 67},
 *           ]
 *      }
 *  });
 *
 *  // call some API
 *  // trigger as if the hover was done in the barcode programmatically ==> to interact with other options
 *  myBarcode.triggerHover("DE");
 */
export function generateBarcode (config) {
  const options = mergeObj({}, defaults, config)
  const inst = new Barcode(options)

  instance.push(inst)

  return inst
}

export { version, instance }
