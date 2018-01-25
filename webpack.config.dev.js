const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  devServer: {
    hot: true,
    inline: true,
    noInfo: true,
    overlay: { warnings: true, errors: true },
    port: 3001,
    proxy: {
      '/api': {
        pathRewrite: { '^/api': '' },
        secure: false,
        target: 'http://localhost:3000',
      },
    },
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
})
