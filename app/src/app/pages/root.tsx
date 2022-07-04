import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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
      <div className="title">参加予約したいものを下記から選択してください</div>
      <div className="choice-list">
        {TOP_CHOICES.map((choice) => (
          <Link to={choice.link}>
            <div className="choice-btn-container">
              <button className="choice-btn">{choice.terakoyaTypes}</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export const Root: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Top />} />
      {/* <Route
        path="/"
        element={<Form terakoyaType="カフェ塾テラコヤ(池袋)" />}
      /> */}
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
      <Route
        path="/result"
        element={
          <div className="result">
            <div>予約が完了しました。</div>
            <Link to="/">ホームへ</Link>
          </div>
        }
      />
      <Route
        path="/error"
        element={
          <div className="error">
            <span>
              エラーが発生しました。最初からやり直して下さい。エラーが続く場合はテラコヤ公式LINEからご連絡下さい。
            </span>
            <Link to="/">ホームへ</Link>
          </div>
        }
      />
    </Routes>
  </BrowserRouter>
);
