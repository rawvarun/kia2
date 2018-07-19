const path = require('path');

module.exports = {
  entry: {
    app: './src/js/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [{
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the jshint loader
        exclude: [/node_modules/, './src/js/vendor'], // exclude any and all files in the node_modules folder
        use: [{
          loader: "eslint-loader",
          options: {
            camelcase: true,
            emitErrors: false,
            failOnHint: false
          }
        }]
      },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },
};