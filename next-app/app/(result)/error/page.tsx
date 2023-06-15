// Error components must be Client Components
// https://nextjs.org/docs/app/building-your-application/routing/error-handling
"use client";

import Result from "@app/(result)/result";

const ERROR_RESULT_TEXTS = [
  "【エラー】",
  "エラーが発生しました。",
  "最初からやり直して下さい。",
  "エラーが続く場合はテラコヤ公式LINEからご連絡下さい。",
];

export default function Page() {
  return <Result texts={ERROR_RESULT_TEXTS} />;
}
