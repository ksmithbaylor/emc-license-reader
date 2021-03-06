var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    './src/index.jsx' // Your appʼs entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel?stage=0'],
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }

    ]
  },
  devServer: {
    contentBase: "./public",
    noInfo: true, //  --no-info option
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
