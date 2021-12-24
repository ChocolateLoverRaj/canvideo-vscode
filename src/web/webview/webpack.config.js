/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *-------------------------------------------------------------------------------------------- */

// @ts-check
'use strict'

// @ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require('path')
const webpack = require('webpack')

/** @type WebpackConfig */
module.exports = {
  mode: 'none',
  target: 'web',
  entry: path.join(__dirname, './webview.tsx'),
  resolve: {
    mainFields: ['browser', 'module', 'main'], // look for `browser` entry point in imported node modules
    extensions: ['.ts', '.js', '.tsx']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
          plugins: ['react-require']
        }
      }
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser' // provide a shim for the global `process` variable
    })
  ],
  performance: {
    hints: false
  },
  devtool: 'nosources-source-map', // create a source map that points to the original source file
  infrastructureLogging: {
    level: 'log' // enables logging required for problem matchers
  }
}
