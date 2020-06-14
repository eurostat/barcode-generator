/**
 * Copyright (c) 2020 ~ present Eurostat.
 * barcode-generator project is licensed under the MIT license
 */
/**
 * Class to set options on generating chart.
 * - It"s instantiated internally, not exposed for public.
 * @class Options
 * @see {@link global.generateBarcode} to use these options on generating the chart
 */
export default class Options {
  constructor () {
    return {
      /**
       * Specify the CSS selector which the chart will be set to.<br>
       * If other chart is set already, it will be replaced with the new one (only one chart can be set in one element).
       * - **NOTE:** In case of element doesn"t exist or not specified, will add a `<div>` element to the body.
       * @name bindto
       * @memberof Options
       * @type {String}
       * @default #barcode
       * @example
       * bindto: "#barcode"
       */
      bindto: '#barcode',

      /**
       * The desired size of the chart element.
       * If value is not specified, the width of the chart will be calculated by the size of the parent element it"s appended to.
       * @name size
       * @memberof Options
       * @type {Object}
       * @property {Number} [size.width] width of the chart element
       * @property {Number} [size.height] height of the chart element
       * @example
       * size: {
       *   width: 640,
       *   height: 480
       * }
       */
      size_width: undefined,
      size_height: undefined,

      /**
       * The padding of the chart element.
       * @name padding
       * @memberof Options
       * @type {Object}
       * @property {Number} [padding.top] padding on the top of chart
       * @property {Number} [padding.right] padding on the right of chart
       * @property {Number} [padding.bottom] padding on the bottom of chart
       * @property {Number} [padding.left] padding on the left of chart
       * @example
       * padding: {
       *   top: 20,
       *   right: 20,
       *   bottom: 20,
       *   left: 20
       * }
       */
      padding_left: undefined,
      padding_right: undefined,
      padding_top: undefined,
      padding_bottom: undefined,

      /**
       * Set duration of transition (in milliseconds) for chart animation.<br><br>
       * - **NOTE:** If `0 `or `null` set, transition will be skipped. So, this makes initial rendering faster especially in case you have a lot of data.
       * @name transition
       * @memberof Options
       * @type {Object}
       * @property {Number} [transition.duration=350] duration in milliseconds
       * @example
       * transition: {
       *    duration: 500
       * }
       */
      transition_duration: 350,
			
			/**
       * Set a callback for click event on each data point.<br><br>
       * This callback will be called when each data point clicked and will receive `d` and element as the arguments.
       * - `d` is the data clicked and element is the element clicked.
       * - `element` is the current interacting svg element.
       * - In this callback, `this` will be the Chart object.
       * @name color
       * @memberof Options
       * @type {Object}
       * @property {Function} [color.default] callback function for the default color 
       * @property {Function} [color.over] callback function for the color to be returned when hovered.
       * @example
       * color: {
       *     default: function(d, element) {
			 * return d.value < 20 ? 'green' : 'brown'
       *     },
			 * over: function(d, element) {
			 * return 'black'
       *     },
       * }
       */			
			color_default: () => { return "black" },
      color_over: () => { return "red" },

      /**
       * bar configuration
       * @name bar
       * @memberof Options
       * @type {Object}
       * @property {String} [bar.styleclass] Defines the css class for data items (bars)
       * @property {String} [bar.styleoverclass] Defines the css class for data items (bars)
       * @property {Number} [bar.height] Defines the height to be used for data items (bars)
       * @example
       * bar: {
       *    height: 20,
       *    styleclass="barcode-bar"
       *    styleoverclass="barcode-barover"
       * }
       */
      bar_styleclass: undefined,
      bar_styleoverclass: undefined,
      bar_height: undefined,

      /**
       * tooltip configuration
       * @name tooltip
       * @memberof Options
       * @type {Object}
       * @property {Boolean} [tooltip.show=true] show tooltip or not
       * @property {Function} [tooltip.format] function to format the tooltip
       * @property {Object} [tooltip.offset] contains all offsets
       * @memberof Options
       * @property {Number} [tooltip.offset.left] left offset
       * @property {Number} [tooltip.offset.top] top offset for the tooltip
       * @example
       * tooltip: {
       *    show: true,
       *    format: function(d) {
       * 					return "<span>" + d.name + ": " + d.value + "</span>"
       *    },
       *    offset:  {
       * 	   left: 5,
       * 	   top: 0
       *    }
       * }
       */
      tooltip_show: true,
      tooltip_format: function (d) {
        return '<span>' + d[data_name] + ': ' + d[data_value] + '</span>'
      },
      tooltip_offset_left: 0,
      tooltip_offset_top: 0,

      /**
       * tick configuration
       * @name tick
       * @memberof Options
       * @type {Object}
       * @property {Function} [tick.format] function to format the tick
       * @property {Number} [tick.count] amount of ticks on the axis
       * @property {Number} [tick.padding] padding of the ticks from the axis
       * @example
       * tick: {
       *    format: function(d) {
       * 					return d.value
       * },
       * count: 5,
       * padding: 3
       * }
       */
      tick_format: function (d) {
        return d[data_value]
      },
      tick_count: undefined,
      tick_padding: undefined,

      /**
       * Set a callback for click event on each data point.<br><br>
       * This callback will be called when each data point clicked and will receive `d` and element as the arguments.
       * - `d` is the data clicked and element is the element clicked.
       * - `element` is the current interacting svg element.
       * - In this callback, `this` will be the Chart object.
       * @name data․onclick
       * @memberof Options
       * @type {Function}
       * @default function() {}
       * @example
       * data: {
       *     onclick: function(d, element) {
       *        // d - ex) {x: 4, value: 150, id: "data1", index: 4, name: "data1"}
       *        // element - <circle>
       *        ...
       *     }
       * }
       */
      data_onclick: () => {},

      /**
       * Set a callback for mouse/touch over event on each data point.<br><br>
       * This callback will be called when mouse cursor or via touch moves onto each data point and will receive `d` and `element` as the argument.
       * - `d` is the data where mouse cursor moves onto.
       * - `element` is the current interacting svg element.
       * - In this callback, `this` will be the Chart object.
       * @name data․onover
       * @memberof Options
       * @type {Function}
       * @default function() {}
       * @example
       * data: {
       *     onover: function(d, element) {
       *        // d - ex) {x: 4, value: 150, id: "data1", index: 4}
       *        // element - <circle>
       *        ...
       *     }
       * }
       */
      data_onover: () => {},

      /**
       * Set a callback for mouse/touch out event on each data point.<br><br>
       * This callback will be called when mouse cursor or via touch moves out each data point and will receive `d` as the argument.
       * - `d` is the data where mouse cursor moves out.
       * - `element` is the current interacting svg element.
       * - In this callback, `this` will be the Chart object.
       * @name data․onout
       * @memberof Options
       * @type {Function}
       * @default function() {}
       * @example
       * data: {
       *     onout: function(d, element) {
       *        // d - ex) {x: 4, value: 150, id: "data1", index: 4}
       *        // element - <circle>
       *        ...
       *     }
       * }
       */
      data_onout: () => {},

      /**
       * Pass a JSON array of objects with data.
       * @name data․json
       * @memberof Options
       * @type {Array}
       * @default []
       * @example
       * data: {
       *     json: [
       *       {name: "www.site1.com", code: "DE1", value: 200},
       *       {name: "www.site2.com", code: "DE2", value: 300},
       *       {name: "www.site3.com", code: "DE3", value: 400},
       *       {name: "www.site4.com", code: "DE4", value: 500},
       *       {name: "www.site5.com", code: "DE5", value: 600}
       *     ]
       * }
       */
      data_json: [],

      /**
       * Pass a key to be used for the name
       * @name data․name
       * @memberof Options
       * @type {String}
       * @default "name"
       * @example
       * data: {
       *     json: [
       *       {name: "www.site1.com", code: "DE1", value: 200},
       *       {name: "www.site2.com", code: "DE2", value: 300},
       *       {name: "www.site3.com", code: "DE3", value: 400},
       *       {name: "www.site4.com", code: "DE4", value: 500},
       *       {name: "www.site5.com", code: "DE5", value: 600}
       *     ],
       *		 name: "label"
       * }
       */
      data_name: 'name',

      /**
       * Pass a key to be used for the value
       * @name data․value
       * @memberof Options
       * @type {String}
       * @default "value"
       * @example
       * data: {
       *     json: [
       *       {name: "www.site1.com", code: "DE1", value: 200},
       *       {name: "www.site2.com", code: "DE2", value: 300},
       *       {name: "www.site3.com", code: "DE3", value: 400},
       *       {name: "www.site4.com", code: "DE4", value: 500},
       *       {name: "www.site5.com", code: "DE5", value: 600}
       *     ],
       *		 name: "label",
       *		 value: "amount"
       * }
       */
      data_value: 'value',

      /**
       * Pass a key to be used for the id
       * @name data․id
       * @memberof Options
       * @type {String}
       * @default "id"
       * @example
       * data: {
       *     json: [
       *       {name: "www.site1.com", code: "DE1", value: 200},
       *       {name: "www.site2.com", code: "DE2", value: 300},
       *       {name: "www.site3.com", code: "DE3", value: 400},
       *       {name: "www.site4.com", code: "DE4", value: 500},
       *       {name: "www.site5.com", code: "DE5", value: 600}
       *     ],
       *    name: "label",
       *    value: "amount",
       *    id: "code",
       * }
       */
      data_id: 'id'
    }
  }
}
