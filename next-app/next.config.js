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
    STAGE: process.env.STAGE,
  },
  eslint: {
    // Explicitly define the directories to be linted
    // https://nextjs.org/docs/pages/building-your-application/configuring/eslint#linting-custom-directories-and-files
    dirs: ["apis", "app", "components", "pages", "styles", "utils"],
  },
  // ! Error occurs when using the following settings because app/**/page.tsx is Server Component.
  // It's not required to install @emotion/babel-plugin in order to use "css" prop by configuring compiler settings in Next.js v12.2 or later.
  // https://zenn.dev/tatsuyasusukida/articles/easy-to-use-emotion-from-nextjs-12-2
  // But .babelrc is required.
  // Next.js uses Babel for transpiling code by default, so you can use Babel plugins and presets in your Next.js app.
  // JSX pragma (ex: /** @jsx jsx */) is not required at the top of all files that uses css prop by configuring Babel like the following.
  // https://emotion.sh/docs/css-prop
  // compiler: {
  //   emotion: true,
  // },
  // Define common headers settings for all API routes in pages/api/*
  // https://nextjs.org/docs/pages/api-reference/next-config-js/headers
  // async headers() {
  //   return [
  //     {
  //       // source is a glob pattern used for matching the incoming request path.
  //       // "/api/:path*" means that /api/* and /api/**/* are matched.
  //       // https://nextjs-ja-translation-docs.vercel.app/docs/api-reference/next.config.js/headers#%E3%83%AF%E3%82%A4%E3%83%AB%E3%83%89%E3%82%AB%E3%83%BC%E3%83%89%E3%82%92%E7%94%A8%E3%81%84%E3%81%9F%E3%83%91%E3%82%B9%E3%81%AE%E3%83%9E%E3%83%83%E3%83%81%E3%83%B3%E3%82%B0
  //       source: "/api/:path*",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*",
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "*",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value: "*",
  //         },
  //       ],
  //     },
  //   ];
  // },
});
