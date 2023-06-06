// _app.tsx is a special file that is used to initialize pages.
// https://zenn.dev/anozon/articles/ts-nextjs-pages

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
