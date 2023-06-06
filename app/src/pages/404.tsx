import Link from "next/link";

const NOT_FOUND_TEXTS = [
  "【404 Not Found】",
  "アクセスしたページが見つかりませんでした。",
];

// pages/404.tsx is a custom 404 page.
// https://nextjs-ja-translation-docs.vercel.app/docs/advanced-features/custom-error-page

const Page = () => {
  return (
    <div className="result">
      <div className="content">
        {NOT_FOUND_TEXTS.map((text) => (
          <p>{text}</p>
        ))}
        <Link className="link" href="/">
          ホームへ
        </Link>
      </div>
    </div>
  );
};
export default Page;
