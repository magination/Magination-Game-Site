'use strict';

const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  context: __dirname + "/src",
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: "babel-loader",
          options: { presets: ["es2015"] }
        }],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ],
  },
  entry: {
    app: "./js/RenderApp.js",
  },
  output: {
    path: __dirname + "/build",
    filename: "app.bundle.js",
    publicPath: "/public",
  },
  devServer: {
    contentBase: __dirname + "/src",
  },
};