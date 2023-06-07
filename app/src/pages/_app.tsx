// Deifine html template including head tag, global css and so on in _app.tsx.
// https://zenn.dev/anozon/articles/ts-nextjs-pages
// Next.js uses the App component to initialize pages. You can override it and control the page initialization.
// Component prop is the active page, so whenever you navigate between routes, Component will change to the new page.
// https://nextjs.org/docs/pages/building-your-application/routing/custom-app

import { AppProps } from "next/app";
import Head from "next/head";
import "@styles/global.scss";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <title>カフェ塾テラコヤ</title>
      {/* <link rel="shortcut icon" href="/favicon.png" key="shortcutIcon" /> */}
      {/* <link rel="manifest" href="/manifest.json" /> */}
    </Head>
    <Component {...pageProps} />
  </>
);

export default App;
