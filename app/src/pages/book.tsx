import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

import { useBook } from "@hooks/pages/book";
import {
  ARRIVAL_TIME,
  COURSE_CHOICE,
  GRADE,
  HOW_TO_KNOW_TERAKOYA,
  STUDY_STYLE,
  STUDY_SUBJECT,
  TERAKOYA_EXPERIENCE,
  TERAKOYA_TYPE,
} from "@apis/book";
import { ISO_FORMAT } from "@utils/datetime";

import "@styles/pages/book.scss";

type CommonInputProps = {
  registerRtn?: UseFormRegisterReturn;
};

/**
 * TextBox
 */
const TextBox: React.FC<TextBoxProps> = (props) => {
  const { registerRtn, inputType, isRequired } = props;
  return (
    <input
      className="simple-input"
      {...registerRtn}
      type={inputType}
      required={isRequired}
    />
  );
};
type TextBoxProps = {
  inputType: "text" | "email";
  isRequired: boolean;
} & CommonInputProps;

/**
 * Label
 */
const Label: React.FC<LabelProps> = (props) => {
  const { text, children } = props;
  return (
    <label className="label">
      <span className="label-item">{text}</span>
      {children}
    </label>
  );
};
type LabelProps = {
  text: string | JSX.Element;
  children: React.ReactNode;
};

/**
 * RadioButton, CheckBox
 */
const GroupInput: React.FC<GroupInputProps> = (props) => {
  const { registerRtn, inputType, data, isRequired, onChange } = props;
  return (
    <label className="group-input">
      <span className="group-input-label">{data.text}</span>
      <input
        {...registerRtn}
        type={inputType}
        value={data.value}
        className={"group-input-" + inputType}
        required={isRequired}
        onChange={onChange}
      />
    </label>
  );
};
type GroupInputProps = {
  inputType: "radio" | "checkbox";
  data: GroupInputData;
  isRequired: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
} & CommonInputProps;
type GroupInputData = {
  text: string;
  value: string | TERAKOYA_TYPE | TERAKOYA_EXPERIENCE;
};
const TERAKOYA_TYPE_RADIO_DATA: Array<GroupInputData> = [
  { text: "カフェ塾テラコヤ(池袋)", value: TERAKOYA_TYPE.HIGH_IKE },
  { text: "オンラインテラコヤ(多摩)", value: TERAKOYA_TYPE.ONLINE_TAMA },
  { text: "テラコヤ中等部(池袋)", value: TERAKOYA_TYPE.MID_IKE },
  { text: "テラコヤ中等部(渋谷)", value: TERAKOYA_TYPE.MID_SHIBU },
];
const TERAKOYA_EXPERIENCE_RADIO_DATA: Array<GroupInputData> = [
  { text: "今回が初回", value: TERAKOYA_EXPERIENCE.FIRST_TIME },
  { text: "過去に参加したことがある", value: TERAKOYA_EXPERIENCE.DONE },
];

/**
 * Combobox
 */
const ComboBox: React.FC<ComboBoxProps> = (props) => {
  const { registerRtn, optionList } = props;
  return (
    <select className="select" {...registerRtn} required>
      {optionList.map((option, i) => (
        <option key={i} className="option" value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};
type ComboBoxProps = {
  optionList: Array<Option>;
} & CommonInputProps;
type Option = {
  name: string;
  value:
    | GRADE
    | ARRIVAL_TIME
    | STUDY_STYLE
    | COURSE_CHOICE
    | HOW_TO_KNOW_TERAKOYA
    | STUDY_SUBJECT;
};
const MID_GRADE_LIST: Array<Option> = [
  { name: "中学1年生", value: GRADE.MID_1 },
  { name: "中学2年生", value: GRADE.MID_2 },
  { name: "中学3年生", value: GRADE.MID_3 },
  { name: "その他", value: GRADE.OTHER },
];
const HIGH_GRADE_LIST: Array<Option> = [
  { name: "高校1年生", value: GRADE.HIGH_1 },
  { name: "高校2年生", value: GRADE.HIGH_2 },
  { name: "高校3年生", value: GRADE.HIGH_3 },
  { name: "その他", value: GRADE.OTHER },
];
const ARRIVAL_TIME_OPTION_LIST: Array<Option> = [
  { name: "17:00前", value: ARRIVAL_TIME.BEFORE_1700 },
  { name: "17:00~17:30", value: ARRIVAL_TIME.FROM_1700_TO_1730 },
  { name: "17:30~18:00", value: ARRIVAL_TIME.FROM_1730_TO_1800 },
  { name: "18:00以降", value: ARRIVAL_TIME.AFTER_1800 },
];
const STUDY_STYLE_OPTION_LIST: Array<Option> = [
  { name: "黙々と静かに勉強したい", value: STUDY_STYLE.SILENT },
  {
    name: "分からない点があったらスタッフに質問したい",
    value: STUDY_STYLE.ASK,
  },
  { name: "友達と話しながら楽しく勉強したい", value: STUDY_STYLE.TALKING },
  {
    name: "1人では難しいのでスタッフ付きっ切りで勉強を教えて欲しい",
    value: STUDY_STYLE.WITH,
  },
  {
    name: "勉強も教えて欲しいけどスタッフの話を聞いたり、相談したい。",
    value: STUDY_STYLE.CONSULT,
  },
  { name: "その他", value: STUDY_STYLE.OTHER },
];
const COURSE_CHOICE_OPTION_LIST: Array<Option> = [
  { name: "まだ決めていない", value: COURSE_CHOICE.TBD },
  { name: "文系", value: COURSE_CHOICE.LIBERAL_ARTS },
  { name: "理系", value: COURSE_CHOICE.SCIENCE },
  { name: "その他", value: COURSE_CHOICE.OTHER },
];
const HOW_TO_KNOW_TERAKOYA_OPTION_LIST: Array<Option> = [
  { name: "HP", value: HOW_TO_KNOW_TERAKOYA.HP },
  { name: "Instagram", value: HOW_TO_KNOW_TERAKOYA.INSTAGRAM },
  { name: "Facebook", value: HOW_TO_KNOW_TERAKOYA.FACEBOOK },
  { name: "Twitter", value: HOW_TO_KNOW_TERAKOYA.TWITTER },
  { name: "知人の紹介", value: HOW_TO_KNOW_TERAKOYA.INTRODUCE },
  { name: "ポスター、ビラ", value: HOW_TO_KNOW_TERAKOYA.LEAFLET },
  { name: "その他", value: HOW_TO_KNOW_TERAKOYA.OTHER },
];
// const STUDY_SUBJECT_MID_OPTION_LIST: Array<Option> = [
//   { name: "英語", value: STUDY_SUBJECT.ENG },
//   { name: "国語", value: STUDY_SUBJECT.JPN },
//   { name: "数学", value: STUDY_SUBJECT.MAT },
//   { name: "社会", value: STUDY_SUBJECT.SOC },
//   { name: "理科", value: STUDY_SUBJECT.SCI },
//   { name: "英検", value: STUDY_SUBJECT.EIKEN },
//   { name: "その他", value: STUDY_SUBJECT.OTHER },
// ];
const STUDY_SUBJECT_HIGH_OPTION_LIST: Array<Option> = [
  { name: "英語", value: STUDY_SUBJECT.ENG },
  { name: "国語", value: STUDY_SUBJECT.JPN },
  { name: "数学", value: STUDY_SUBJECT.MAT },
  { name: "社会", value: STUDY_SUBJECT.SOC },
  { name: "理科", value: STUDY_SUBJECT.SCI },
  {
    name: "推薦型入試対策（志望理由書・面接など）",
    value: STUDY_SUBJECT.AO_ENTRANCE,
  },
  { name: "大学説明会", value: STUDY_SUBJECT.ORIENTATION },
  { name: "キャリア説明会", value: STUDY_SUBJECT.CAREER },
  { name: "英検", value: STUDY_SUBJECT.EIKEN },
  { name: "その他", value: STUDY_SUBJECT.OTHER },
];

/**
 * TextArea
 */
export const TextArea: React.FC<CommonInputProps> = (props) => (
  <textarea className="textarea" {...props.registerRtn} rows={2} />
);

export default function Page() {
  const {
    register,
    onSubmit,
    isLoading,
    onChangeDateList,
    selectedTerakoyaExperience,
    onChangeSelectedExperience,
    selectedTerakoyaType,
    onChangeSelectedTerakoyaType,
    isMiddle,
    attendanceDateList,
  } = useBook();

  return (
    <div className="wallpaper">
      <div className="container">
        <div className="content">
          <Link to="/login">
            <span className="to-home">管理者の方はこちら</span>
          </Link>
          <div className="main-caption">
            <span className="main-caption-text">
              カフェ塾テラコヤ参加予約フォーム
            </span>
          </div>
          <div className="form-container">
            <form className="form" onSubmit={onSubmit}>
              <Label text="参加希望">
                <span className="label-description">
                  ※下記の選択に応じて参加希望日で選択できる日程が切り替わります。
                </span>
                {TERAKOYA_TYPE_RADIO_DATA.map((data, i) => (
                  <GroupInput
                    key={i}
                    // valueAsオプションはradioボタンには使えない
                    // https://zenn.dev/yodaka/articles/e490a79bccd5e2
                    // registerRtn={register("terakoya_type", {
                    //   valueAsNumber: true,
                    // })}
                    registerRtn={register("terakoya_type")}
                    inputType="radio"
                    data={data}
                    isRequired={true}
                    onChange={(e) =>
                      onChangeSelectedTerakoyaType(e.target.value)
                    }
                  />
                ))}
              </Label>
              <Label text="名前">
                <TextBox
                  registerRtn={register("name")}
                  inputType="text"
                  isRequired={true}
                />
              </Label>
              <Label text="メールアドレス">
                <TextBox
                  registerRtn={register("email")}
                  inputType="email"
                  isRequired={true}
                />
              </Label>
              <Label text="学年">
                {/* https://zenn.dev/koojy/articles/reacthookform-select-number */}
                <ComboBox
                  registerRtn={register("grade", { valueAsNumber: true })}
                  optionList={isMiddle ? MID_GRADE_LIST : HIGH_GRADE_LIST}
                />
              </Label>
              {selectedTerakoyaType != TERAKOYA_TYPE.NULL ? (
                <Label text="参加希望日">
                  {attendanceDateList.map((dateDayjs, i) => (
                    <GroupInput
                      key={i}
                      registerRtn={register("attendance_date_list")}
                      inputType="checkbox"
                      data={{
                        text: dateDayjs.format("MM/DD (ddd)"),
                        value: dateDayjs.format(ISO_FORMAT),
                      }}
                      isRequired={false}
                      onChange={(e) => onChangeDateList(e.target.value)}
                    />
                  ))}
                </Label>
              ) : null}
              <Label
                text={
                  <>
                    来れそうな時間帯
                    <br className="only-sp-enabled" />
                    （活動時間17時〜20時）
                  </>
                }
              >
                <ComboBox
                  registerRtn={register("arrival_time", {
                    valueAsNumber: true,
                  })}
                  optionList={ARRIVAL_TIME_OPTION_LIST}
                />
              </Label>
              <Label text="テラコヤへのご参加は？">
                {TERAKOYA_EXPERIENCE_RADIO_DATA.map((data, i) => (
                  <GroupInput
                    key={i}
                    registerRtn={register("terakoya_experience")}
                    inputType="radio"
                    data={data}
                    isRequired={true}
                    onChange={(e) => onChangeSelectedExperience(e.target.value)}
                  />
                ))}
              </Label>
              {selectedTerakoyaExperience == TERAKOYA_EXPERIENCE.FIRST_TIME ? (
                <>
                  <Label text="今在籍している学校名">
                    <TextBox
                      registerRtn={register("school_name")}
                      inputType="text"
                      isRequired={true}
                    />
                  </Label>
                  <Label text="志望校">
                    <TextBox
                      registerRtn={register("first_choice_school")}
                      inputType="text"
                      isRequired={false}
                    />
                  </Label>
                  {!isMiddle ? (
                    <Label text="文理選択">
                      <ComboBox
                        registerRtn={register("course_choice", {
                          valueAsNumber: true,
                        })}
                        optionList={COURSE_CHOICE_OPTION_LIST}
                      />
                    </Label>
                  ) : null}
                  <Label text="将来の夢など（自由記述）">
                    <TextArea registerRtn={register("future_free")} />
                  </Label>
                  <Label text="好きなもの(こと)（自由記述）">
                    <TextArea registerRtn={register("like_thing_free")} />
                  </Label>
                  <Label text="テラコヤを知ったキッカケ">
                    <ComboBox
                      registerRtn={register("how_to_know_terakoya", {
                        valueAsNumber: true,
                      })}
                      optionList={HOW_TO_KNOW_TERAKOYA_OPTION_LIST}
                    />
                  </Label>
                </>
              ) : selectedTerakoyaExperience == TERAKOYA_EXPERIENCE.DONE ? (
                <Label text="希望する勉強の仕方">
                  <ComboBox
                    registerRtn={register("study_style", {
                      valueAsNumber: true,
                    })}
                    optionList={STUDY_STYLE_OPTION_LIST}
                  />
                </Label>
              ) : null}
              <Label text="勉強したい科目">
                <ComboBox
                  registerRtn={register("study_subject", {
                    valueAsNumber: true,
                  })}
                  optionList={STUDY_SUBJECT_HIGH_OPTION_LIST}
                  // optionList={
                  //   isMiddle
                  //     ? STUDY_SUBJECT_MID_OPTION_LIST
                  //     : STUDY_SUBJECT_HIGH_OPTION_LIST
                  // }
                />
              </Label>
              <Label text="その科目の内容（自由記述）">
                <TextArea registerRtn={register("study_subject_detail")} />
              </Label>
              <Label text="備考（自由記述）">
                <TextArea registerRtn={register("remarks")} />
              </Label>
              <div className="submit-place">
                {isLoading ? (
                  <>
                    <ReactLoading type="spin" color="#866440" />
                    <span>予約処理中...</span>
                  </>
                ) : (
                  <input className="submit" type="submit" />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
