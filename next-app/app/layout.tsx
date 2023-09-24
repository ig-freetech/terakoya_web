// app/layout.tsx (Root Layout) must be defined instead of _app.tsx and _document.tsx in Next.js v13.
// https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

// Next.js uses the App component to initialize pages. You can override it and control the page initialization.
// Component prop is the active page, so whenever you navigate between routes, Component will change to the new page.
// https://nextjs.org/docs/pages/building-your-application/routing/custom-app
// _app.tsx is initially loaded when the app is loaded on the client side.
// https://zenn.dev/anozon/articles/ts-nextjs-pages#_apptsx%E3%81%AF%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%B5%E3%82%A4%E3%83%89%E3%81%A7%E3%83%AD%E3%83%BC%E3%83%89%E3%81%95%E3%82%8C%E3%81%9F%E6%99%82%E3%81%AB%E5%88%9D%E6%9C%9F%E3%81%AB%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%95%E3%82%8C%E3%82%8B
// https://zenn.dev/anozon/articles/ts-nextjs-pages

// Define dynamic functions to be implemented across all pages on the client side in _app.tsx.
// _app.tsx is used to define common layout for all pages such as header, footer and so on.
// And also you can use _app.tsx to introduce state management library such as Redux, MobX and so on.
// https://nextjs.org/docs/pages/building-your-application/routing/custom-app

// _document.tsx is rendered only on the server side.
// Difine static document structure such as html template including head tag, global css and so on in _document.tsx.
// _document.tsx doesn't affect the performance of the app because it's only rendered on the server side.
// https://nextjs.org/docs/pages/building-your-application/routing/custom-document

import { Toaster } from "react-hot-toast";

import ClientWrapper from "@app/client-wrapper";

// global.scss is imported here so that it can be used across all pages.
// css or scss files can be imported only in _app.tsx not in _document.tsx.
// import "@styles/scss/global.scss";

// Define meta data to be included in the head tag of the html template.
// https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#modifying-head
export const metadata = {
  title: "カフェ塾テラコヤ",
  description:
    // "NPO法人テラコヤが運営するテラコヤユーザーのためのWebサイトです。ここではテラコヤユーザー同士での『学び』にフォーカスした交流が楽しめます。その他、カフェ塾テラコヤの参加予約なども行うことができます。",
    "NPO法人テラコヤが運営するテラコヤユーザーのためのWebサイトです。ここではカフェ塾テラコヤの参加予約を行うことができます。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        {/**
         * All you need to do is to add favicon.ico to app directory as /app/favicon.ico in order to automatically add a favicon link tag to the <head> of the page in Next.js.
         * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons#favicon
         * favicon is a small icon that browsers display next to a page's title on a browser tab, or in the address bar next to its URL.
         * https://www.tagindex.com/html/page/link_icon.html
         * <link rel="icon" href="/favicon.ico" sizes="any" />
         */}
      </head>
      {/**
       * children is the active page or loading component.
       * https://zenn.dev/anneau/articles/5b0856bbf72c0c#layout.tsx
       */}
      <body>
        {/**
         * Put <Toaster /> in layout.tsx to display toast notifications across all pages.
         * https://react-hot-toast.com/
         * */}
        <Toaster />
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
