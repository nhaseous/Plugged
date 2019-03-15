/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

let path = require("path"),
  webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "/frontend/src"),
  entry: "./App.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "/frontend/npmpublic/js")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: []
};
