const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const entry = './src/frontend/js/index.js';
const mode = 'development';
const watch = true;
const outputPath = path.resolve(__dirname, 'assets');

const cssPlugin = new miniCssExtractPlugin({
  filename: 'css/styles.css',
});

const babelRule = {
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', { targets: 'defaults' }]],
    },
  },
};

const scssRule = {
  test: /\.scss$/,
  use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
};

module.exports = {
  entry,
  mode,
  watch,
  output: {
    filename: 'js/index.js',
    path: outputPath,
    clean: true,
  },
  plugins: [cssPlugin],
  module: {
    rules: [babelRule, scssRule],
  },
};
