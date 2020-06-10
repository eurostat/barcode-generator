/**
 * Copyright (c) 2020 ~ present Eurostat.
 * barcode-generator project is licensed under the MIT license
 */
/**
 * Class to set options on generating chart.
 * - It's instantiated internally, not exposed for public.
 * @class Options
 * @see {@link bg.generateBarcode} to use these options on generating the chart
 */
export default class Options {
	constructor() {
		return {
			/**
			 * Specify the CSS selector or the element which the chart will be set to. D3 selection object can be specified also.<br>
			 * If other chart is set already, it will be replaced with the new one (only one chart can be set in one element).
			 * - **NOTE:** In case of element doesn't exist or not specified, will add a `<div>` element to the body.
			 * @name bindto
			 * @memberof Options
			 * @property {String|HTMLElement|d3.selection} bindto=#chart Specify the element where chart will be drawn.
			 * @property {String|HTMLElement|d3.selection} bindto.element=#chart Specify the element where chart will be drawn.
			 * @property {String} [bindto.classname=bg] Specify the class name of bind element.<br>
			 *     **NOTE:** When class name isn't `bg`, then you also need to update the default CSS to be rendered correctly.
			 * @default #chart
			 * @example
			 * bindto: "#myContainer"
			 *
			 * // or HTMLElement
			 * bindto: document.getElementById("myContainer")
			 *
			 * // or D3 selection object
			 * bindto: d3.select("#myContainer")
			 *
			 * // or to change default classname
			 * bindto: {
			 *    element: "#chart",
			 *    classname: "barcode"  // ex) <div id='chart' class='barcode'>
			 * }
			 */
			bindto: "#chart",

			/**
			 * Set svg element's class name
			 * @name svg
			 * @memberof Options
			 * @type {Object}
			 * @property {String} [svg.classname] class name for svg element
			 * @example
			 * svg: {
             *   classname: "test_class"
			 * }
			 */
			svg_classname: undefined,

			/**
			 * The desired size of the chart element.
			 * If value is not specified, the width of the chart will be calculated by the size of the parent element it's appended to.
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
			size_padding_right: undefined,
			size_padding_left: undefined,
			size_height: undefined,

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
			 * Set color converter function.<br><br>
			 * This option should a function and the specified function receives color (e.g. '#ff0000') and d that has data parameters like id, value, index, etc. And it must return a string that represents color (e.g. '#00ff00').
			 * @name data․color
			 * @memberof Options
			 * @type {Function}
			 * @default undefined
			 * @example
			 * data: {
			 *   color: function(color, d) { ... }
			 * }
			 */
			data_color: undefined,

			/**
			 * Set color for each data.
			 * @name data․colors
			 * @memberof Options
			 * @type {Object}
			 * @default {}
			 * @example
			 * data: {
			 *   colors: {
			 *     data1: "#ff0000",
			 *     data2: function(d) {
			 *        return "#000";
			 *     }
			 *     ...
			 *   }
			 * }
			 */
			data_colors: {},

			/**
			 * Hide each data when the chart appears.<br><br>
			 * If true specified, all of data will be hidden. If multiple ids specified as an array, those will be hidden.
			 * @name data․hide
			 * @memberof Options
			 * @type {Boolean|Array}
			 * @default false
			 * @example
			 * data: {
			 *   // all of data will be hidden
			 *   hide: true
			 *
			 *   // specified data will be hidden
			 *   hide: ["data1", ...]
			 * }
			 */
			data_hide: false,

			/**
			 * Filter values to be shown
			 * The data value is the same as the returned by `.data()`.
			 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
			 * @name data․filter
			 * @memberof Options
			 * @type {Function}
			 * @default undefined
			 * @example
			 * data: {
			 *   // filter for id value
			 *   filter: function(v) {
			 *      // v: [{id: "data1", id_org: "data1", values: [
			 *      //      {x: 0, value: 130, id: "data2", index: 0}, ...]
			 *      //    }, ...]
			 *      return v.id !== "data1";
			 *   }
			 */
			data_filter: undefined,

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

			data_json: undefined,
			data_name: 'name',
			data_value: 'value',
			color_normal: undefined,
			color_over: undefined,

			bar_styleclass: undefined,
			bar_styleoverclass: undefined,
			bar_height: undefined,

			tooltip_show: true,
			tooltip_format: function(d) {
				return '<span>' + d[data_name] + ': ' + d[data_value]
			},
			tick_format: function(d) {
				return d[data_value]
			},
			tick_count: undefined,
			tick_padding: undefined
		};
	}
}