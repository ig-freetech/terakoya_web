import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Page } from "@pages/book";
import "@styles/pages/index.scss";

type ResultProps = {
  texts: Array<string>;
};
const Result: React.FC<ResultProps> = (props) => {
  const { texts } = props;
  return (
    <div className="result">
      <div className="content">
        {texts.map((text) => (
          <p>{text}</p>
        ))}
        <Link className="link" to="/">
          ホームへ
        </Link>
      </div>
    </div>
  );
};
const SUCCESS_RESULT_TEXTS = [
  "【予約完了】",
  "予約処理が完了しました。",
  "ご登録頂いたメールアドレス宛てに予約完了メールも送信しましたのでご確認下さい。",
  "メールが届かない場合は",
  "npoterakoya2021@gmail.com",
  "からのメールを受け取れるよう受信設定を行なって下さい。",
];
const ERROR_RESULT_TEXTS = [
  "【エラー】",
  "エラーが発生しました。",
  "最初からやり直して下さい。",
  "エラーが続く場合はテラコヤ公式LINEからご連絡下さい。",
];
const NOT_FOUND_TEXTS = [
  "【404 Not Found】",
  "アクセスしたページが見つかりませんでした。",
];

export const Home: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/result" element={<Result texts={SUCCESS_RESULT_TEXTS} />} />
      <Route path="/error" element={<Result texts={ERROR_RESULT_TEXTS} />} />
      <Route path="/*" element={<Result texts={NOT_FOUND_TEXTS} />} />
    </Routes>
  </Router>
);
