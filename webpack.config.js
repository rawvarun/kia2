const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    app: './src/js/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/content')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist/content'),
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/assets/images', to: 'assets/images' },
      { from: './*.html', to: '.' }
    ])
  ],
  module: {
    rules: [{
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the eslint loader
        exclude: [/node_modules/, './src/js/vendor'], // exclude any and all files in the node_modules folder
        use: [{
          loader: "eslint-loader",
          options: {
            formatter: require("eslint/lib/formatters/stylish"),
            camelcase: true,
            emitErrors: false,
            failOnHint: false
          }
        }]
      },
      {
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the jshint loader
        exclude: [/node_modules/, './src/js/vendor'], // exclude any and all files in the node_modules folder
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        loader: 'file-loader?name=[hash].[ext]&outputPath=assets/images/&publicPath=assets/images/'
      },
      { test: /\.hbs$/, loader: 'handlebars-loader' }
    ]
  }
};