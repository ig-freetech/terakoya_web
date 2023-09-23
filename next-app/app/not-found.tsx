// pages/not-found.tsx is a custom 404 page in Next.js v13.
// https://nextjs.org/docs/app/api-reference/file-conventions/not-found

// pages/404.tsx is a custom 404 page.
// https://nextjs-ja-translation-docs.vercel.app/docs/advanced-features/custom-error-page

"use client";

import Result from "./(result)/result";

const NOT_FOUND_TEXTS = ["アクセスしたページが見つかりませんでした。"];

export default function Page() {
  return <Result texts={NOT_FOUND_TEXTS} caption={"【404 Not Found】"} />;
}
