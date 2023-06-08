// Error components must be Client Components
"use client";

import { useEffect } from "react";
import Result from "./(result)/result";

const ERROR_RESULT_TEXTS = [
  "【エラー】",
  "エラーが発生しました。",
  "最初からやり直して下さい。",
  "エラーが続く場合はテラコヤ公式LINEからご連絡下さい。",
];

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <Result texts={ERROR_RESULT_TEXTS} />;
}
