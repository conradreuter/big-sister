const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
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
  devtool: '#eval-source-map',
  entry: './src-ui/index.js',
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
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist-ui'),
    filename: 'bundle.js',
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src-ui/index.html') }),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json']
  },
}
