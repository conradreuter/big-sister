const glob = require('glob')
const HtmlPlugin = require('html-webpack-plugin')
const _ = require('lodash')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, 'src/node_modules/@big-sister'),
  entry: (
    _(glob.sync('*/ui/', { cwd: path.resolve(__dirname, 'src/node_modules/@big-sister') }))
    .map(dir => [path.dirname(dir), `./${dir}`])
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
    path: path.resolve(__dirname, './dist/node_modules/@big-sister'),
    filename: '[name]/ui/index.js',
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      filename: 'core/ui/common.js',
      name: 'common',
    }),
    new HtmlPlugin({
      filename: 'core/ui/index.html',
      inject: false,
      template: 'core/ui/index.html',
    }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json']
  },
}
