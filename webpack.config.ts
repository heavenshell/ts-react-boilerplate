import os from 'os'

import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const cpus = os.cpus().length
const tsLoaderWorkers = cpus > 3 ? cpus - 2 : 1

const config: Configuration = {
  devtool: 'source-map',
  entry: {
    app: `${__dirname}/src/App.tsx`,
  },
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /^\/*/, to: '/index.html' }],
    },
    host: '0.0.0.0',
    port: 3000,
    hot: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'cache-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true, // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
              transpileOnly: true,
            },
          },
          {
            // run compilation threaded
            loader: 'thread-loader',
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: tsLoaderWorkers,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            // import the antd theme, webpack build show .bezierEasingMixin error ?
            // https://github.com/ant-design/ant-design/issues/7927
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  performance: { hints: false },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    // new TsConfigWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: true,
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
}

export default config
