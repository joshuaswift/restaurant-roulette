const path = require("path");
const port = process.env.PORT || 5000;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

//Define paths
const paths = {
  DIST: path.resolve(__dirname, "dist"),
  JS: path.resolve(__dirname, "src/js"),
  SRC: path.resolve(__dirname, "src")
};

//Webpack config
module.exports = {
  entry: path.join(paths.JS, "app.js"),
  output: {
    path: paths.DIST,
    filename: "app.bundle.js"
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, "index.html")
    }),
    new ExtractTextPlugin("style.bundle.css"),
    new BundleAnalyzerPlugin()
  ],
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
