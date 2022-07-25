import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Form } from "@pages/attendance/reservation";
import { TerakoyaTypes } from "@utils/const";
import "@styles/pages/root.scss";

const BASE_RESERVATION_PATH = "/reservation";
const CAFE_TERAKOYA_PATH = BASE_RESERVATION_PATH + "/highschool";
const CHU_TERAKOYA_PATH = BASE_RESERVATION_PATH + "/juniorhighschool";
const ONLINE_TERAKOYA_PATH = BASE_RESERVATION_PATH + "/online";

type TopChoiceData = {
  link: string;
  terakoyaTypes: TerakoyaTypes;
};
const TOP_CHOICES: Array<TopChoiceData> = [
  {
    link: CAFE_TERAKOYA_PATH,
    terakoyaTypes: "カフェ塾テラコヤ(池袋)",
  },
  {
    link: CHU_TERAKOYA_PATH,
    terakoyaTypes: "テラコヤ中等部(池袋/渋谷)",
  },
  {
    link: ONLINE_TERAKOYA_PATH,
    terakoyaTypes: "オンラインテラコヤ(多摩)",
  },
];

const Top: React.FC = () => (
  <div className="top">
    <div className="content">
      <div className="title">
        <p>【カフェ塾テラコヤ】</p>
        <p>参加予約したいものを下記から選択してください</p>
      </div>
      <div className="choice-list">
        {TOP_CHOICES.map((choice) => (
          <div className="choice-btn-container">
            <Link className="choice-link" to={choice.link}>
              <button className="choice-btn">{choice.terakoyaTypes}</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);

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
const RESULT_SUCCESS_TEXTS = [
  "【予約完了】",
  "予約処理が完了しました。",
  "ご登録頂いたメールアドレス宛てに予約完了メールも送信しましたのでご確認下さい。",
  "メールが届かない場合は",
  "npoterakoya2021@gmail.com",
  "からのメールを受け取れるよう受信設定を行なって下さい。",
];
const RESULT_ERROR_TEXTS = [
  "【エラー】",
  "エラーが発生しました。",
  "最初からやり直して下さい。",
  "エラーが続く場合はテラコヤ公式LINEからご連絡下さい。",
];
const NOT_FOUND_TEXTS = [
  "【404 Not Found】",
  "アクセスしたページが見つかりませんでした。",
];

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Top />} />
      <Route
        path={CAFE_TERAKOYA_PATH}
        element={<Form terakoyaType="カフェ塾テラコヤ(池袋)" />}
      />
      <Route
        path={CHU_TERAKOYA_PATH}
        element={<Form terakoyaType="テラコヤ中等部(池袋/渋谷)" />}
      />
      <Route
        path={ONLINE_TERAKOYA_PATH}
        element={<Form terakoyaType="オンラインテラコヤ(多摩)" />}
      />
      <Route path="/result" element={<Result texts={RESULT_SUCCESS_TEXTS} />} />
      <Route path="/error" element={<Result texts={RESULT_ERROR_TEXTS} />} />
      <Route path="/*" element={<Result texts={NOT_FOUND_TEXTS} />} />
    </Routes>
  </Router>
);
