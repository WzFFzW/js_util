const path = require('path');

const pkg = require('../package.json');

const rootPath = path.resolve(__dirname, '../')

const config = {
  mode: 'production',
  entry: path.resolve(rootPath, 'src', 'index.js'),
  output: {
    filename: `${pkg.name}.min.js`,
    path: path.resolve(rootPath, 'min'),
    library: `${pkg.name}`,
    libraryTarget: "umd",
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader"
    }]
  }
}

module.exports = config