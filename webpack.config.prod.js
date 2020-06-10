const path = require('path')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const terserConfig = require('./config/terserConfig')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const banner = require('./config/banner')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  target: 'web',
  node: {
    fs: 'empty'
  },
  entry: {
    'barcodegenerator.min': [
      './src/scss/barcodegenerator.scss',
      './src/core.js'
    ]
  },
  mode: 'production',
  context: path.resolve(__dirname),
  devtool: '',
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin(terserConfig)]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')],
      verbose: true,
      dry: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new webpack.BannerPlugin({
      banner: banner.production,
      entryOnly: true
    })
  ]
}

module.exports = (common, env) => {
  return merge.smart(common, config)
}
