const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const htmlMinifyOptions = {
  removeAttributeQuotes: true,
  collapseWhitespace: true,
  removeComments: true,
};

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "docs"),
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/views/index.ejs",
        minify: htmlMinifyOptions,
      }),
      new HtmlWebpackPlugin({
        filename: "about.html",
        template: "./src/views/pages/about.ejs",
        minify: htmlMinifyOptions,
      }),
      new HtmlWebpackPlugin({
        filename: "contact.html",
        template: "./src/views/pages/contact.ejs",
        minify: htmlMinifyOptions,
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 3 }],
            ],
          },
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, "./src/views/partials/header.ejs"),
      location: "header",
      template_filename: "*",
    }),
    new HtmlWebpackPartialsPlugin({
      path: path.join(__dirname, "./src/views/partials/footer.ejs"),
      location: "footer",
      template_filename: "*",
    }),
    new CompressionPlugin({
      algorithm: "gzip",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: "/node_modules",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      },

      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
          },
          {
            loader: "svgo-loader",
            options: {
              configFile: "./scripts/svgo.config.js",
            },
          },
        ],
      },
    ],
  },
});
