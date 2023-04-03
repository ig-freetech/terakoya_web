const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    port: 8000,
    open: true,
    // https://sushirice.pro/js-store/router_404_error/
    historyApiFallback: {
      rewrites: [{ from: /^\/*/, to: "/index.html" }],
    },
  },
});
