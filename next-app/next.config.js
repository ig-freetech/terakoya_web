// Run require("dotenv").config() in next.config.js to use environment variables defined in .env
// https://qiita.com/matamatanot/items/1c8f1c1e21664591c220
require("dotenv").config();

// https://fwywd.com/tech/next-bundle-analyzer
// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // Define Environment Variables
  // https://nextjs-ja-translation-docs.vercel.app/docs/api-reference/next.config.js/environment-variables
  env: {
    AWS_DEV_GATEWAY_ID: process.env.AWS_DEV_GATEWAY_ID,
    AWS_PROD_GATEWAY_ID: process.env.AWS_PROD_GATEWAY_ID,
    AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
  },
});
