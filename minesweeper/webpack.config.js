const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },

  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'bundle.js',
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
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },

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

    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: './index.html', 
    }),
  ],

}