const path = require('path')
const merge = require('webpack-merge')

function generateConfig () {
  const config = {
    target: 'web',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9090
    },
    mode: 'development',
    context: path.resolve(__dirname),
    devtool: 'inline-source-map'
  }

  return config
}

module.exports = (common) => {
  return merge.smart(common, generateConfig())
}
