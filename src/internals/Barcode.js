/**
 * Copyright (c) 2020 ~ present Eurostat

 * Main barcode class.
 * - Note: Instantiated via `generateBarcode()`.
 * @class Barcode
 * @example
 * var barcode = generateBarcode({options})
 * @memberof Barcode
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

import {
  axisLeft as d3AxisLeft,
  axisRight as d3AxisRight,
  axisBottom as d3AxisBottom
} from 'd3-axis'

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

  hoverEffect (dataId, hover, d3DataElement) {
    const $$ = this

    if (d3DataElement === undefined) {
      d3DataElement = $$.config.data_json.find(
        element => element[$$.config.data_id] === dataId
      )
    }

    const tooltip = d3Select('#bar-tooltip')
    if (hover) {
      const barPosition = d3Select('#bar_' + dataId).node().getBoundingClientRect()
      const eventPositionX = barPosition.left - d3Select($$.config.bindto).node().getBoundingClientRect().left + $$.config.tooltip_offset_left
      const eventPositionY = barPosition.top + $$.config.tooltip_offset_left

      let tooltipX = eventPositionX

      tooltipX = eventPositionX + 20

      d3Select('#bar_' + dataId)
        .classed($$.config.bar_styleoverclass, true)
        .classed($$.config.bar_styleclass, false)
        .transition()
        .duration($$.config.transition_duration)
        .attr('y1', 0)
        .style('stroke', function (d) {
          return $$.config.color_over(d)
        })

      tooltip.transition($$.config.transition_duration).style('opacity', 1)
      tooltip.html($$.config.tooltip_format(d3DataElement))

      tooltip.style('left', tooltipX + 'px').style('top', '0px')
    } else {
      d3Select('#bar_' + dataId)
        .classed($$.config.bar_styleclass, true)
        .classed($$.config.bar_styleoverclass, false)
        .transition()
        .duration($$.config.transition_duration)
        .attr('y1', 50)
        .style('stroke', function (d) {
          return $$.config.color_default(d)
        })

      tooltip.transition($$.config.transition_duration).style('opacity', 0)
    }
  }

  render () {
    const $$ = this
    const data = $$.config.data_json

    const dataName = $$.config.data_name
    const dataValue = $$.config.data_value
    const dataID = $$.config.data_id

    const tickCount = $$.config.tick_count || 6
    const tickPadding = $$.config.tick_padding || 4

    const leftPadding = $$.config.padding_left || 0
    const rightPadding = $$.config.padding_right || 0

    // Margin conventions
    const margin = { top: 0, right: 0, bottom: 30, left: 0 }
    const constWidth = d3Select($$.config.bindto).node().clientWidth
    let width = constWidth - margin.left - margin.right
    let height = 125 - margin.top - margin.bottom

    if ($$.config.size_width !== undefined) {
      width = $$.config.size_width
    }
    if ($$.config.size_height !== undefined) {
      height = $$.config.size_height
    }

    const barHeight = $$.config.bar_height || height - 50
    width += $$.config.padding_left
    width += $$.config.padding_right

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
      .attr('id', 'bar-tooltip')
      .style('opacity', 0)

    // Creates the xScale
    const xScale = d3ScaleLinear().range([
      0 + leftPadding,
      width - rightPadding
    ])

    // Creates the yScale
    const yScale = d3ScaleLinear().range([height, 0])

    // Defines the y axis styles
    const xAxis = d3AxisBottom()
      .scale(xScale)
      .tickPadding(tickPadding)
      .ticks(tickCount)
      .tickFormat($$.config.tick_format)

    // Organizes the data
    const maxX = d3Max(data, function (d) {
      return d[dataValue]
    })

    // Defines the xScale max
    xScale.domain(
      d3Extent(data, function (d) {
        return d[dataValue]
      })
    )

    xScale.nice()

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
      .selectAll('line')
      .data(data)
      .enter()
      .append('line')
      .attr('id', function (d) {
        return 'bar_' + d[dataID]
      })
      .attr('x1', function (d, i) {
        return xScale(d[dataValue])
      })
      .attr('x2', function (d) {
        return xScale(d[dataValue])
      })
      .attr('y1', 50)
      .attr('y2', barHeight)
      .style('stroke', function (d) {
        return $$.config.color_normal(d)
      })
      .classed($$.config.bar_styleclass, true)
      .on('mouseover', function (d) {
        $$.hoverEffect(d[dataID], true, d)
        callFn($$.config.data_onover, $$, d, this)
      })
      .on('mouseout', function (d) {
        $$.hoverEffect(d[dataID], false, d)
        callFn($$.config.data_onout, $$, d, this)
      })

    // RESPONSIVENESS
    d3Select(window).on('resize', resized)

    function resized () {
      // new margin
      const newMargin = { top: 0, right: 0, bottom: 30, left: 0 }

      const newconstWidth = d3Select($$.config.bindto).node().clientWidth
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
          return xScale(d[dataValue])
        })
        .attr('x2', function (d) {
          return xScale(d[dataValue])
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

  triggerHover (dataElementId) {
    this.hoverEffect(dataElementId, true)
    // here, we want to trigger the hover over an element from the outside programmatically.
  }

  triggerOut (dataElementId) {
    this.hoverEffect(dataElementId, false)
    // here, we want to trigger the hover over an element from the outside programmatically.
  }
}
