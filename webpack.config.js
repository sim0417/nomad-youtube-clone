const path = require('path');
const outputPath = path.resolve(__dirname, 'assets', 'js');

const babelRule = {
  test: /\.js$/,
  mode: 'development',
  use: {
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', { targets: 'defaults' }]],
    },
  },
};

module.exports = {
  entry: './src/frontend/js/index.js',
  output: {
    filename: 'index.js',
    path: outputPath,
  },
  module: {
    rules: [babelRule],
  },
};
