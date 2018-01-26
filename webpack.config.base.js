const fs = require('fs')
const CachePlugin = require('hard-source-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, 'src/node_modules/@big-sister-ui'),
  entry: (
    _(fs.readdirSync(path.resolve(__dirname, 'src/node_modules/@big-sister-ui')))
    .map(dir => [dir, `./${dir}`])
    .fromPairs()
    .value()
  ),
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist/node_modules/@big-sister-ui'),
    filename: '[name]/index.js',
  },
  performance: {
    hints: false
  },
  plugins: [
    new CachePlugin({
      cacheDirectory: path.resolve(__dirname, '.cache/webpack/[confighash]'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      filename: 'core/common.js',
      name: 'common',
    }),
    new HtmlPlugin({
      filename: 'core/index.html',
      inject: false,
      template: 'core/index.html',
    }),
  ],
  resolve: {
    /*alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },*/
    extensions: ['.js', '.vue', '.json']
  },
}
