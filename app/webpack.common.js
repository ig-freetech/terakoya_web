const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// const BomPlugin = require("webpack-utf8-bom"); // Build時以外 [webpack-dev-middleware] Error: ENOENT: no such file or directory, open main.XXX.hot-update.js の原因となるためコメントアウト
const Dotenv = require("dotenv-webpack");

const SRC_DIR = path.resolve(__dirname, "src");

/**@type import('webpack').Configuration */
module.exports = {
  entry: path.join(SRC_DIR, "_app.tsx"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", "..."],
    alias: {
      "@apis": path.resolve(SRC_DIR, "apis"),
      "@hooks": path.resolve(SRC_DIR, "hooks"),
      "@pages": path.resolve(SRC_DIR, "pages"),
      "@styles": path.resolve(SRC_DIR, "styles"),
      "@utils": path.resolve(SRC_DIR, "utils"),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "terakoya-client-static",
      template: path.join(__dirname, "html", "template.html"),
    }),
    // new BomPlugin(true),
    new Dotenv(),
  ],
};
