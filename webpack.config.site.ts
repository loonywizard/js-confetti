/* eslint-env node */

import { Configuration } from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const isProd = process.env.NODE_ENV === 'production'

const config: Configuration = {
  mode: isProd ? 'production' : 'development',
  entry: './site/index.tsx',
  output: {
    filename: '[name][contenthash].js',
    path: path.resolve(__dirname, 'site_dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        // use: ['babel-loader', '@babel/plugin-transform-react-jsx'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './assets/index.html' }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'static' }],
    })
  ],
}

if (!isProd) {
  config.devServer = {
    contentBase: path.join(__dirname, 'site_dist'),
    compress: true,
    port: 9000
  }
}

module.exports = config
