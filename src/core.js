/**
 * Copyright (c) 2020 ~ present Eurostat.
 */
import Barcode from './internals/Barcode'
import './config/config'
import { isObject, mergeObj } from './internals/util'

let defaults = {}

/**
 * @namespace bg
 * @version #__VERSION__#
 */
const bg = {
  /**
   * Version information
   * @property {String} version version
   * @example
   *    bg.version;  // "1.0.0"
   * @memberof bg
   */
  version: '#__VERSION__#',

  /**
   * Generate chart
   * @param {Options} options chart options
   * @memberof bg
   * @return {Chart}
   * @see {@link Options} for different generation options
   * @see {@link Chart} for different methods API
   * @example
   *  <!-- chart holder -->
   * <div id="barcode"></div>
   * @example
   *   // generate barcode with options
   *  let barcode = bg.generateBarcode({
   *      "bindto": "#barcode"
   *      "data": {
   *          "columns": [
   *              ["data1", 30, 200, 100, 400, 150, 250],
   *              ["data2", 50, 20, 10, 40, 15, 25]
   *           ]
   *      }
   *  });
   */
  generateBarcode (config) {
    const options = mergeObj({}, defaults, config)
    const inst = new Barcode(options)

    this.instance.push(inst)

    return inst
  },

  /**
   * Set or get global default options.
   * - **NOTE:**
   *   - The options values settings are valid within page context only.
   *   - If is called multiple times, will override the last value.
   * @param {Options} options chart options
   * @memberof bg
   * @return {Options}
   * @see {@link Options}
   * @example
   * // Set same option value as for `.generateBarcode()`
   * bg.defaults({
   *   data: {
   *     type: "bar"
   *   }
   * });
   *
   */
  defaults (options) {
    if (isObject(options)) {
      defaults = options
    }

    return defaults
  },

  /**
   * An array containing instance created
   * @property {Array} instance instance array
   * @example
   *  // generate charts
   *  var chart1 = bg.generateBarcode(...);
   *  var chart2 = bg.generateBarcode(...);
   *
   *  bg.instance;  // [ chart1, chart2, ... ]
   * @memberof bg
   */
  instance: []
}

export { bg }
export default bg
