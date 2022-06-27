import * as React from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";

import { getNextTuesdayList } from "@utils/datetime";
import { RequestBody, callTest2 } from "@apis/attendance/index";
import "@styles/attendance/reservation.scss";

const GRADE_LIST = ["中学生", "高校1年生", "高校2年生", "高校3年生", "その他"];
const TERAKOYA_TYPE_LIST = [
  "カフェ塾テラコヤ（池袋）",
  "テラコヤ中等部（池袋）",
  "オンラインテラコヤ（多摩）",
];
const ATTENDANCE_DATE_LIST = getNextTuesdayList();
const ARRIVE_TIME_LIST = ["17:00前", "17:00~17:30", "17:30~18:00", "18:00以降"];
const TERAKOYA_EXPERIENCE_QUESTION_LIST = [
  "今回が初回",
  "過去に参加したことがある",
];
const COURSE_STATUS_LIST = ["文系", "理系", "まだ決めていない"];
const SUBJECT_LIST = [
  "英語",
  "国語",
  "数学",
  "社会",
  "理科",
  "推薦型入試対策（志望理由書・面接など）",
  "大学説明会",
  "キャリア説明会",
];
const STUDY_METHOD_LIST = [
  "黙々と静かに勉強したい",
  "分からない点があったらスタッフに質問したい",
  "友達と話しながら楽しく勉強したい",
  "1人では難しいのでスタッフ付きっ切りで勉強を教えて欲しい",
  "勉強も教えて欲しいけどスタッフの話を聞いたり、相談したい。",
  "その他",
];
const PR_CHANNEL_LIST = [
  "HP",
  "Instagram",
  "Facebook",
  "Twitter",
  "知人の紹介",
  "その他",
];

type Inputs = RequestBody;
type InputPropNameTypes = Partial<keyof Inputs>;
type CommonProps = {
  register: UseFormRegister<Inputs>;
  inputPropName: InputPropNameTypes;
};
type CommonInputProps<T> = {
  inputType: T;
} & CommonProps;

type LabelInputItemProps = {
  label: string;
  children: React.ReactNode;
};
const LabelInputItem: React.FC<LabelInputItemProps> = (props) => {
  const { label, children } = props;
  return (
    <label className="label">
      <span className="label-item">{label}</span>
      {children}
    </label>
  );
};
type SimpleInputTypes = "text" | "email";
type SimpleInputProps = CommonInputProps<SimpleInputTypes>;
const SimpleInput: React.FC<SimpleInputProps> = (props) => {
  const { register, inputPropName, inputType } = props;
  return <input {...register(inputPropName)} type={inputType} />;
};

type SimpleInputItemData = Pick<LabelInputItemProps, "label"> &
  Omit<CommonInputProps<SimpleInputTypes>, "register">;
const simpleInputItemList: Array<SimpleInputItemData> = [
  {
    label: "名前",
    inputPropName: "name",
    inputType: "text",
  },
  {
    label: "メールアドレス (予約確認メールを送らせて頂きます)",
    inputPropName: "email",
    inputType: "email",
  },
  {
    label: "今在籍している学校名",
    inputPropName: "schoolName",
    inputType: "text",
  },
];
const simpleSchoolNameData = simpleInputItemList[2];

type GroupInputTypes = "checkbox" | "radio";
type GroupInputProps = {
  valueLabel: string;
} & CommonInputProps<GroupInputTypes>;
const GroupInput: React.FC<GroupInputProps> = (props) => {
  const { valueLabel, register, inputPropName, inputType } = props;
  return (
    <label className="input-radio-label">
      <span className="input-radio-label-item">{valueLabel}</span>
      <input
        {...register(inputPropName)}
        type={inputType}
        value={valueLabel}
        className={"label-input-" + inputType}
      />
    </label>
  );
};

type GroupInputItemData = Pick<LabelInputItemProps, "label"> &
  Omit<CommonInputProps<GroupInputTypes>, "register"> & {
    valueLabelList: Array<string>;
  };
const groupInputItemDataList: Array<GroupInputItemData> = [
  {
    label: "参加希望",
    valueLabelList: TERAKOYA_TYPE_LIST,
    inputPropName: "terakoyaType",
    inputType: "radio",
  },
  {
    label: "参加希望日",
    valueLabelList: ATTENDANCE_DATE_LIST,
    inputPropName: "attendanceDate",
    inputType: "checkbox",
  },
  {
    label: "テラコヤへのご参加は？",
    valueLabelList: TERAKOYA_EXPERIENCE_QUESTION_LIST,
    inputPropName: "terakoyaExperience",
    inputType: "radio",
  },
];
const groupTerakoyaExperienceData = groupInputItemDataList[2];

type Option = {
  // value: string;
  name: string;
};
type SelectProps = {
  optionDataList: Array<Option>;
} & CommonProps;
const Select: React.FC<SelectProps> = (props) => {
  const { register, inputPropName, optionDataList } = props;
  return (
    <select {...register(inputPropName)}>
      {optionDataList.map((optionData) => (
        // <option value={optionData.value}>{optionData.name}</option>
        <option value={optionData.name}>{optionData.name}</option>
      ))}
    </select>
  );
};

type SelectItemData = Pick<LabelInputItemProps, "label"> & {
  inputPropName: InputPropNameTypes;
  optionDataList: Array<Option>;
};
const selectItemDataList: Array<SelectItemData> = [
  {
    label: "学年",
    inputPropName: "grade",
    optionDataList: GRADE_LIST.map((grade) => {
      return {
        name: grade,
      };
    }),
  },
  {
    label: "何時頃来れそうですか？（活動時間17時〜20時）",
    inputPropName: "arriveTime",
    optionDataList: ARRIVE_TIME_LIST.map((arriveTime) => {
      return {
        name: arriveTime,
      };
    }),
  },
  {
    label: "文理選択",
    inputPropName: "courseChoice",
    optionDataList: COURSE_STATUS_LIST.map((courseStatus) => {
      return {
        name: courseStatus,
      };
    }),
  },
  {
    label: "勉強したい科目",
    inputPropName: "studySubject",
    optionDataList: SUBJECT_LIST.map((subject) => {
      return {
        name: subject,
      };
    }),
  },
  {
    label: "希望する勉強の仕方",
    inputPropName: "studyMethod",
    optionDataList: STUDY_METHOD_LIST.map((studyMethod) => {
      return {
        name: studyMethod,
      };
    }),
  },
  {
    label: "テラコヤを知ったキッカケ",
    inputPropName: "howToKnowTerakoya",
    optionDataList: PR_CHANNEL_LIST.map((channel) => {
      return {
        name: channel,
      };
    }),
  },
];
const selectGradeData = selectItemDataList[0];
const selectArriveTimeData = selectItemDataList[1];
const selectStudyMethodData = selectItemDataList[4];
const selectPrChannelData = selectItemDataList[5];

const TextArea: React.FC<CommonProps> = (props) => {
  const { register, inputPropName } = props;
  return <textarea {...register(inputPropName)} rows={2} />;
};

type TextAreaItemData = Pick<LabelInputItemProps, "label"> &
  Omit<CommonProps, "register">;
const textAreaItemDataList: Array<TextAreaItemData> = [
  {
    label: "その科目の内容をできるだけ詳しく教えてください",
    inputPropName: "studySubjectDetail",
  },
  {
    label: "将来の夢、志望大学（自由記述）",
    inputPropName: "futureFree",
  },
  {
    label: "好きなもの、こと",
    inputPropName: "likeFree",
  },
];
const textAreaStudySubjectDetailData = textAreaItemDataList[0];

export const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      grade: "",
      arriveTime: "",
      courseChoice: "",
      studySubject: "",
      studyMethod: "",
      howToKnowTerakoya: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(JSON.stringify(data));
    callTest2(data);
  };

  return (
    <div className="wallpaper">
      <div className="container">
        <div className="content">
          <div className="main-caption">
            <span className="main-caption-text">テラコヤ参加予約フォーム</span>
          </div>
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              {simpleInputItemList.slice(0, 2).map((simpleInputItem) => (
                // 名前とメールアドレス
                <LabelInputItem label={simpleInputItem.label}>
                  <SimpleInput
                    register={register}
                    inputPropName={simpleInputItem.inputPropName}
                    inputType={simpleInputItem.inputType}
                  />
                </LabelInputItem>
              ))}
              <LabelInputItem label={selectGradeData.label}>
                <Select
                  register={register}
                  inputPropName={selectGradeData.inputPropName}
                  optionDataList={selectGradeData.optionDataList}
                />
              </LabelInputItem>
              {groupInputItemDataList.slice(0, 2).map((groupInputItem) => (
                //　参加希望種別と参加希望日
                <LabelInputItem label={groupInputItem.label}>
                  {groupInputItem.valueLabelList.map((valueLabel) => (
                    <GroupInput
                      register={register}
                      inputPropName={groupInputItem.inputPropName}
                      inputType={groupInputItem.inputType}
                      valueLabel={valueLabel}
                    />
                  ))}
                </LabelInputItem>
              ))}
              <LabelInputItem label={selectArriveTimeData.label}>
                <Select
                  register={register}
                  inputPropName={selectArriveTimeData.inputPropName}
                  optionDataList={selectArriveTimeData.optionDataList}
                />
              </LabelInputItem>
              <LabelInputItem label={groupTerakoyaExperienceData.label}>
                {groupTerakoyaExperienceData.valueLabelList.map(
                  (valueLabel) => (
                    <GroupInput
                      register={register}
                      inputPropName={groupTerakoyaExperienceData.inputPropName}
                      inputType={groupTerakoyaExperienceData.inputType}
                      valueLabel={valueLabel}
                    />
                  )
                )}
              </LabelInputItem>
              <LabelInputItem label={simpleSchoolNameData.label}>
                <SimpleInput
                  register={register}
                  inputPropName={simpleSchoolNameData.inputPropName}
                  inputType={simpleSchoolNameData.inputType}
                />
              </LabelInputItem>
              {selectItemDataList.slice(2, 4).map((selectItemData) => (
                // 分離選択と勉強したい科目
                <LabelInputItem label={selectItemData.label}>
                  <Select
                    register={register}
                    inputPropName={selectItemData.inputPropName}
                    optionDataList={selectItemData.optionDataList}
                  />
                </LabelInputItem>
              ))}
              <LabelInputItem label={textAreaStudySubjectDetailData.label}>
                <TextArea
                  register={register}
                  inputPropName={textAreaStudySubjectDetailData.inputPropName}
                />
              </LabelInputItem>
              <LabelInputItem label={selectStudyMethodData.label}>
                <Select
                  register={register}
                  inputPropName={selectStudyMethodData.inputPropName}
                  optionDataList={selectStudyMethodData.optionDataList}
                />
              </LabelInputItem>
              {textAreaItemDataList.slice(1, 3).map((textAreaItemData) => (
                // 勉強したい科目の詳細と将来の夢や志望大学と好きなもの
                <LabelInputItem label={textAreaItemData.label}>
                  <TextArea
                    register={register}
                    inputPropName={textAreaItemData.inputPropName}
                  />
                </LabelInputItem>
              ))}
              <LabelInputItem label={selectPrChannelData.label}>
                <Select
                  register={register}
                  inputPropName={selectPrChannelData.inputPropName}
                  optionDataList={selectPrChannelData.optionDataList}
                />
              </LabelInputItem>
              <input type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
