/**
 * Copyright (c) 2020 ~ present Eurostat

 * Main barcode class.
 * - Note: Instantiated via `bg.generate()`.
 * @class Barcode
 * @example
 * var barcode = bg.generate({options})
 * @memberof Chart
 * @example
 * var barcode = bg.generate({ ... });
 *
 */

import {
  timeParse as d3TimeParse,
  timeFormat as d3TimeFormat
} from 'd3-time-format'
import {
  select as d3Select,
  selectAll as d3SelectAll,
  event as d3Event,
  mouse as d3Mouse
} from 'd3-selection'
import { transition as d3Transition } from 'd3-transition'
import {
  max as d3Max,
  min as d3Min,
  extent as d3Extent,
  descending as d3Descending
} from 'd3-array'
import { timeout as d3Timeout } from 'd3-timer'
import {
  forceSimulation as d3ForceSimulation,
  forceX as d3ForceX,
  forceY as d3ForceY,
  forceCollide as d3ForceCollide,
  forceManyBody as d3ForceManyBody
} from 'd3-force'

import { line as d3Line } from 'd3-shape'
import {
  scalePoint as d3ScalePoint,
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime
} from 'd3-scale'

import { axisLeft as d3AxisLeft, axisRight as d3AxisRight, axisBottom as d3AxisBottom } from 'd3-axis'

import {
  formatDefaultLocale as d3FormatDefaultLocale,
  format as d3Format
} from 'd3-format'
import { isFunction, isObject, callFn } from './util'

export default class Barcode {
  constructor (config) {
    this.config = this.getOptions()
    this.loadConfig(config)
    this.init()

    this.render()
  }

  render () {
    const $$ = this
    const data = $$.config.data_json

    // Margin conventions
    const margin = { top: 0, right: 0, bottom: 30, left: 0 }
    const constWidth = d3Select($$.config.bindto).node().clientWidth
    const width = constWidth - margin.left - margin.right
    const height = 125 - margin.top - margin.bottom

    // Appends the svg to the chart-container div
    const svg = d3Select($$.config.bindto)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    const tooltip = d3Select($$.config.bindto)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)

    // Creates the xScale
    const xScale = d3ScaleLinear().range([0, width])

    // Creates the yScale
    const yScale = d3ScaleLinear().range([height, 0])

    // Defines the y axis styles
    const xAxis = d3AxisBottom()
      .scale(xScale)
      .tickPadding(8)
      .ticks(8)
      .tickFormat($$.config.tick_format)

    // Organizes the data
    const maxX = d3Max(data, function (d) {
      return d.value
    })

    // Defines the xScale max
    xScale.domain(
      d3Extent(data, function (d) {
        return d.value
      })
    )

    // Defines the yScale max
    yScale.domain([0, 100])

    // Appends the x axis
    const xAxisGroup = svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)

    // Binds data to strips
    const drawstrips = svg
      .selectAll('line.percent')
      .data(data)
      .enter()
      .append('line')
      .attr('x1', function (d, i) {
        return xScale(d.value)
      })
      .attr('x2', function (d) {
        return xScale(d.value)
      })
      .attr('y1', 50)
      .attr('y2', 100)
      .classed($$.config.bar_styleclass, true)
      .on('mouseover', function (d) {
        var right = d3Event.pageX > window.innerWidth / 2

        d3Select(this)
          .transition()
          .duration(100)
          .attr('y1', 0)
          .classed($$.config.bar_styleoverclass, true)

        tooltip.transition(300).style('opacity', 1)
        tooltip.html($$.config.tooltip_format(d))

        var offset = right ? tooltip.node().offsetWidth + 5 : -5

        tooltip
          .style('left', d3Event.pageX - offset + 'px')
          .style('top', height - 80 + 'px')

        callFn($$.config.data_onover, d, this.element)
      })
      .on('mouseout', function (d) {
        d3Select(this)
          .transition()
          .duration(100)
          .attr('y1', 50)
          .classed($$.config.bar_class)

        tooltip.transition(300).style('opacity', 0)
        callFn($$.config.data_onout, d, this.element)
      })

    // RESPONSIVENESS
    d3Select(window).on('resize', resized)

    function resized () {
      // new margin
      const newMargin = { top: 0, right: 0, bottom: 30, left: 0 }

      const newconstWidth = d3Select('.g-chart').node().clientWidth
      const newWidth = newconstWidth - newMargin.left - newMargin.right

      // Change the width of the svg
      d3Select('svg').attr('width', newWidth + newMargin.left + newMargin.right)

      // Change the xScale
      xScale.range([0, newWidth])

      // Updates xAxis
      d3SelectAll('.x.axis').call(xAxis)

      // Updates ticks
      xAxis.scale(xScale)

      drawstrips
        .attr('x1', function (d, i) {
          return xScale(d.trump_percent)
        })
        .attr('x2', function (d) {
          return xScale(d.trump_percent)
        })

      // Updates xAxis
      d3SelectAll('.x.axis').call(xAxis)
    }
  }

  init () {
    const $$ = this
    const config = $$.config

    const bindto = {
      element: config.bindto,
      classname: 'bg'
    }

    if (isObject(config.bindto)) {
      bindto.element = config.bindto.element || '#chart'
      bindto.classname = config.bindto.classname || bindto.classname
    }

    // select bind element
    $$.selectChart = isFunction(bindto.element.node)
      ? config.bindto.element
      : d3Select(bindto.element || [])

    if ($$.selectChart.empty()) {
      $$.selectChart = d3Select(
        document.body.appendChild(document.createElement('div'))
      )
    }

    $$.selectChart.html('').classed(bindto.classname, true)
  }

}
