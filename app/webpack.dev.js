const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const PUBLIC_DIR = path.resolve(__dirname, "public");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: PUBLIC_DIR,
    },
    port: 8000,
    open: true,
  },
});
