const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** @type {(env: any, arg: {mode: string}) => import('webpack').Configuration} **/
module.exports = () => {

  /** @type {import('webpack').Configuration} **/
  const config = {
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "bundle.js"
    },
    entry: ['./src/main.jsx'],
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html"
      })
    ],
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
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: "url-loader",
          options: { limit: false },
        },
      ]
    }
  }

  return config
}