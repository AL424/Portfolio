const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'index.js',
  },
  mode: 'development',
  devServer: {
    open: true,
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      { 
        test: /\.ts$/i, 
        use: 'ts-loader' 
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: './index.html', 
    }),
    new EslingPlugin({ extensions: 'ts' }),
  ],
}