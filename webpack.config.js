const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const rules = [
  {
    test: /\.(s?)css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
  },
  {
    test: /\.(png|jpg|gif|svg)$/,
    exclude: [/node_modules/, /fonts/],
    use: {
      loader: 'file-loader',
      options: {
        context: '.',
        outputPath: 'img',
        publicPath: '../img',
        name: '[name].[ext]'
      }
    }
  },
  {
    test: /(\.js)$/,
    exclude: {
      test: /node_modules/,
      not: [/(d3-.*)$/]
    },
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        cacheDirectory: true,
        sourceMaps: false
      }
    }
  }
]

function generateCommonConfig (env) {
  const commonConfig = {
    mode: 'production',
    context: path.resolve(__dirname),
    entry: {
      barcodegenerator: ['./src/scss/barcodegenerator.scss', './src/core.js']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'eurostatBarcodeGenerator',
      umdNamedDefine: true,
      globalObject: 'this'
    },
    devtool: '',
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')],
        verbose: true,
        dry: false
      })
    ],
    module: {
      rules: rules
    }
  }

  return commonConfig
}

module.exports = function (env) {
  return require(`./webpack.config.${env}.js`)(generateCommonConfig(env))
}
