const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/node_modules/@big-sister-ui/core',
  ],
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
    path: path.resolve(__dirname, './dist/node_modules/@big-sister-ui/core'),
    filename: 'bundle.[hash].js',
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, 'src/node_modules/@big-sister-ui/core/index.html'),
    }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json']
  },
}
