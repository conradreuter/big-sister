const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
})
