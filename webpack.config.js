const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpack = require('webpack')

/** @type {(env: any, arg: {mode: string}) => import('webpack').Configuration} **/
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  /** @type {import('webpack').Configuration} **/
  const config = {    
    entry: ['./src/main.jsx'],

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]'
                },
                importLoaders: 2,
              },
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: { sourceMap: !isProduction }
            },           
          ],
          include: /\.module\.(sa|sc|c)ss$/
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: !isProduction },
            },       
            'postcss-loader', 
            {
              loader: 'sass-loader',
              options: { sourceMap: !isProduction }
            },
          ],
          exclude: /\.module\.(sa|sc|c)ss$/,
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: false,
                name: isProduction ? 'static/media/[name].[contenthash:6].[ext]' : '[path][name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: false,
                name: isProduction ? 'static/fonts/[name].[ext]' : '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },

    devServer: {
      hot: true,
      port: 3000,
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, 'public', 'index.html'),
        serveIndex: true,
        watch: true
      }
    },
    devtool: isProduction ? false : 'source-map',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "static/js/main.[contenthash:6].js",
      publicPath: '/'
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? 'static/css/[name].[contenthash:6].css' : '[name].css'
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        filename: 'index.html',
        favicon: path.resolve(__dirname, 'public', 'favicon.svg'),
      })
    ],
  }

  if (isProduction) {
    config.plugins = [
      ...config.plugins,
      new webpack.ProgressPlugin(),
    ]

    config.optimization = {
      minimizer: [
        `...`,
        new CssMinimizerPlugin()
      ],
    }
  }

  return config
}