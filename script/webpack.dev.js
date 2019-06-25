const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (token, cfg, onlineNums) => {
  return  {
    entry: {
      index: path.resolve(__dirname, '../src/index.js'),
    },
    output: {
      path: __dirname + '../build',
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
      publicPath: '/',
      globalObject: 'this',
      pathinfo: true,
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      historyApiFallback: true,
      stats: {colors: true},
      port: 9999,
    },
    module: {
      rules: [{
        test: /\.js$/,
        loader: "babel-loader"
      }]
    },
    plugins: [
      new CleanWebpackPlugin({
        verbose: true,
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
      }),
    ]
  };
}