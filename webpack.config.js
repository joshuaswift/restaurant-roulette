const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

//Define paths
const paths = {
  DIST: path.resolve(__dirname, "dist"),
  JS: path.resolve(__dirname, "src/js"),
  SRC: path.resolve(__dirname, "src")
};

//Webpack config
module.exports = {
  node: {
    fs: "empty"
  },
  entry: path.join(paths.JS, "app.js"),
  output: {
    path: paths.DIST,
    filename: "app.bundle.js"
  },
  devtool: "inline-source-map",
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, "index.html")
    }),
    new ExtractTextPlugin("style.bundle.css"),
    new CleanWebpackPlugin(["dist"])
  ],
  devServer: {
    port: 3000,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      //CSS loader for CSS files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: "css-loader"
        })
      },
      //File loader for image assets
      {
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  //Enable importing JS files without specifying file extension
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
