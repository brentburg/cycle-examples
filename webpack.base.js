var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (title) => ({
  entry: './main.js',
  output: {
    path: './build',
    filename: 'main.[hash].js',
    chunkFilename: 'chunk.[hash].[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: title,
      template: '../index.html'
    })
  ],
  resolve: {
    extensions: ['', '.js', '.json']
  }
})
