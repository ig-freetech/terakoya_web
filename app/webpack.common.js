const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// const BomPlugin = require("webpack-utf8-bom"); // Build時以外 [webpack-dev-middleware] Error: ENOENT: no such file or directory, open main.XXX.hot-update.js の原因となるためコメントアウト

const APP_DIR = path.resolve(__dirname, "src", "app");

/**@type import('webpack').Configuration */
module.exports = {
  entry: path.join(APP_DIR, "index.tsx"),
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
      "@pages": path.resolve(APP_DIR, "pages"),
      "@styles": path.resolve(APP_DIR, "styles"),
      "@apis": path.resolve(APP_DIR, "apis"),
      "@utils": path.resolve(APP_DIR, "utils"),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "terakoya-client-static",
      template: path.join(__dirname, "html", "template.html"),
    }),
    // new BomPlugin(true),
  ],
};
