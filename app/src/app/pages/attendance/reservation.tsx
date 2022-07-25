import * as React from "react";
import axios, { AxiosError } from "axios";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import ReactLoading from "react-loading";

import { getNextThreeDayList, TUESDAY, SATURDAY } from "@utils/datetime";
import { TerakoyaTypes } from "@utils/const";
import "@styles/pages/attendance/reservation.scss";

export type RequestBody = {
  name: string;
  email: string;
  grade: string;
  terakoyaType: string;
  attendanceDate: Array<string>;
  arriveTime: string;
  terakoyaExperience: string;
  schoolName: string;
  courseChoice: string;
  futureFree: string;
  likeFree: string;
  studySubject: string;
  studySubjectDetail: string;
  studyMethod: string;
  howToKnowTerakoya: string;
  remarks: string;
};
const BASE_URL = "https://r54d83j7hk.execute-api.us-east-1.amazonaws.com";

const GRADE_LIST = ["中学生", "高校1年生", "高校2年生", "高校3年生", "その他"];
const GRADE_JHS_LIST = ["中学1年生", "中学2年生", "中学3年生", "その他"];
const TERAKOYA_JHS_ATTEND_TYPE = [
  "テラコヤ中等部(池袋)",
  "テラコヤ中等部(渋谷)",
]; // JHS = Junior High School
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
  description?: string | JSX.Element;
  children: React.ReactNode;
};
const LabelInputItem: React.FC<LabelInputItemProps> = (props) => {
  const { label, description, children } = props;
  return (
    <label className="label">
      <span className="label-item">{label}</span>
      <span className="label-description">{description}</span>
      {children}
    </label>
  );
};
type SimpleInputTypes = "text" | "email";
type SimpleInputProps = CommonInputProps<SimpleInputTypes>;
const SimpleInput: React.FC<SimpleInputProps> = (props) => {
  const { register, inputPropName, inputType } = props;
  return (
    <input
      className="simple-input"
      {...register(inputPropName)}
      type={inputType}
      required
    />
  );
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
  isRequired: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & CommonInputProps<GroupInputTypes>;
const GroupInput: React.FC<GroupInputProps> = (props) => {
  const {
    valueLabel,
    register,
    inputPropName,
    inputType,
    isRequired,
    onChange,
  } = props;
  return (
    <label className="group-input">
      <span className="group-input-label">{valueLabel}</span>
      <input
        {...register(inputPropName)}
        type={inputType}
        value={valueLabel}
        className={"group-input-" + inputType}
        required={isRequired}
        onChange={onChange}
      />
    </label>
  );
};

type GroupInputItemData = Pick<LabelInputItemProps, "label"> &
  Omit<CommonInputProps<GroupInputTypes>, "register"> & {
    description?: string;
  };
const groupInputItemDataList: Array<GroupInputItemData> = [
  {
    label: "参加希望",
    description:
      "※下記の選択に応じて参加希望日で選択できる日程が切り替わります。",
    inputPropName: "terakoyaType",
    inputType: "radio",
  },
  {
    label: "参加希望日",
    inputPropName: "attendanceDate",
    inputType: "checkbox",
  },
  {
    label: "テラコヤへのご参加は？",
    inputPropName: "terakoyaExperience",
    inputType: "radio",
  },
];
const groupTerakoyaTypeData = groupInputItemDataList[0];
const groupAttenadnceDateData = groupInputItemDataList[1];
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
    <select className="select" {...register(inputPropName)} required>
      {optionDataList.map((optionData) => (
        // <option value={optionData.value}>{optionData.name}</option>
        <option className="option" value={optionData.name}>
          {optionData.name}
        </option>
      ))}
    </select>
  );
};

type SelectItemData = Pick<LabelInputItemProps, "label"> & {
  inputPropName: InputPropNameTypes;
};
const selectItemDataList: Array<SelectItemData> = [
  {
    label: "学年",
    inputPropName: "grade",
  },
  {
    label: "何時頃来れそうですか？（活動時間17時〜20時）",
    inputPropName: "arriveTime",
  },
  {
    label: "文理選択",
    inputPropName: "courseChoice",
  },
  {
    label: "勉強したい科目",
    inputPropName: "studySubject",
  },
  {
    label: "希望する勉強の仕方",
    inputPropName: "studyMethod",
  },
  {
    label: "テラコヤを知ったキッカケ",
    inputPropName: "howToKnowTerakoya",
  },
];
const selectGradeData = selectItemDataList[0];
const selectArriveTimeData = selectItemDataList[1];
const selectCourseChoiceData = selectItemDataList[2];
const selectStudySubjectData = selectItemDataList[3];
const selectStudyMethodData = selectItemDataList[4];
const selectPrChannelData = selectItemDataList[5];

const TextArea: React.FC<CommonProps> = (props) => {
  const { register, inputPropName } = props;
  return (
    <textarea className="textarea" {...register(inputPropName)} rows={2} />
  );
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
  {
    label: "備考",
    inputPropName: "remarks",
  },
];
const textAreaStudySubjectDetailData = textAreaItemDataList[0];
const textAreaRemarksData = textAreaItemDataList[3];

type FormProps = {
  terakoyaType: TerakoyaTypes;
};
export const Form: React.FC<FormProps> = (props) => {
  const { terakoyaType } = props;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      grade: "",
      arriveTime: "",
      courseChoice: "",
      studySubject: "",
      studyMethod: "",
      howToKnowTerakoya: "",
      terakoyaType: terakoyaType,
      schoolName: "",
      futureFree: "",
      likeFree: "",
      attendanceDate: [],
    },
  });
  const onApiAccess = (data: Inputs) => {
    axios
      .post(BASE_URL + "/test2", data)
      .then((res) => {
        navigate("/result");
      })
      .catch((error) => {
        console.log("error is " + error.message);
        const axiosError: AxiosError = error;
        if (axiosError.response?.status === 500) {
          console.log("re-api access because of " + axiosError.message);
          setTimeout(() => onApiAccess(data), 3000); // コールドスタート&メールサーバ接続時間対策
        } else {
          alert("エラーが発生しました。");
          navigate("/error");
        }
      });
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(JSON.stringify(data));
    if (data.attendanceDate.length === 0) {
      alert("参加希望日を1つ以上選択して下さい");
      return;
    }
    setIsLoading(true);
    onApiAccess(data);
  };

  const [terakoyaExperience, setTerakoyaExperience] = React.useState("");
  const [jhsTerakoyaType, setJhsTerakoyaType] = React.useState("");

  type GroupInputPropNameTypes = Extract<
    InputPropNameTypes,
    "attendanceDate" | "terakoyaExperience" | "terakoyaType"
  >;
  const onChangeGroupValue = (
    inputPropNameTypes: GroupInputPropNameTypes,
    value: string
  ) => {
    const inputValues = getValues();
    const inputPropValue = inputValues[inputPropNameTypes];
    if (inputPropNameTypes === "attendanceDate") {
      const attendanceDateList = inputPropValue as string[];
      let newAttendanceDateList: Array<string> = [];
      if (attendanceDateList.includes(value)) {
        newAttendanceDateList = attendanceDateList.filter(
          (date) => date !== value
        );
      } else {
        newAttendanceDateList = [...attendanceDateList, value];
      }
      setValue("attendanceDate", newAttendanceDateList);
    } else if (inputPropNameTypes === "terakoyaExperience") {
      setTerakoyaExperience(value);
      setValue("terakoyaExperience", value);
    } else if (inputPropNameTypes === "terakoyaType") {
      setJhsTerakoyaType(value);
      setValue("terakoyaType", value);
    }
    console.log("getValues is " + JSON.stringify(getValues()));
  };

  return (
    <div className="wallpaper">
      <div className="container">
        <div className="content">
          <Link to="/">
            <span className="to-home">ホームへ戻る</span>
          </Link>
          <div className="main-caption">
            <span className="main-caption-text">
              テラコヤ参加予約フォーム {terakoyaType}
            </span>
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
                  optionDataList={(terakoyaType === "テラコヤ中等部(池袋/渋谷)"
                    ? GRADE_JHS_LIST
                    : GRADE_LIST
                  ).map((grade) => {
                    return {
                      name: grade,
                    };
                  })}
                />
              </LabelInputItem>
              {terakoyaType === "テラコヤ中等部(池袋/渋谷)" ? (
                <LabelInputItem
                  label={groupTerakoyaTypeData.label}
                  description={groupTerakoyaTypeData.description}
                >
                  {TERAKOYA_JHS_ATTEND_TYPE.map((valueLabel) => (
                    <GroupInput
                      register={register}
                      inputPropName={groupTerakoyaTypeData.inputPropName}
                      inputType={groupTerakoyaTypeData.inputType}
                      valueLabel={valueLabel}
                      isRequired={true}
                      onChange={(e) =>
                        onChangeGroupValue("terakoyaType", e.target.value)
                      }
                    />
                  ))}
                </LabelInputItem>
              ) : null}
              {/**参加希望日 */}
              <LabelInputItem label={groupAttenadnceDateData.label}>
                {(terakoyaType === "テラコヤ中等部(池袋/渋谷)" &&
                jhsTerakoyaType === "テラコヤ中等部(渋谷)"
                  ? getNextThreeDayList(SATURDAY)
                  : getNextThreeDayList(TUESDAY)
                ).map((valueLabel) => (
                  <GroupInput
                    register={register}
                    inputPropName={groupAttenadnceDateData.inputPropName}
                    inputType={groupAttenadnceDateData.inputType}
                    valueLabel={valueLabel}
                    isRequired={false}
                    onChange={(e) =>
                      onChangeGroupValue("attendanceDate", e.target.value)
                    }
                  />
                ))}
              </LabelInputItem>
              <LabelInputItem label={selectArriveTimeData.label}>
                <Select
                  register={register}
                  inputPropName={selectArriveTimeData.inputPropName}
                  optionDataList={ARRIVE_TIME_LIST.map((arriveTime) => {
                    return {
                      name: arriveTime,
                    };
                  })}
                />
              </LabelInputItem>
              <LabelInputItem label={groupTerakoyaExperienceData.label}>
                {TERAKOYA_EXPERIENCE_QUESTION_LIST.map((valueLabel) => (
                  <GroupInput
                    register={register}
                    inputPropName={groupTerakoyaExperienceData.inputPropName}
                    inputType={groupTerakoyaExperienceData.inputType}
                    valueLabel={valueLabel}
                    isRequired={true}
                    onChange={(e) =>
                      onChangeGroupValue("terakoyaExperience", e.target.value)
                    }
                  />
                ))}
              </LabelInputItem>
              {terakoyaExperience === TERAKOYA_EXPERIENCE_QUESTION_LIST[0] ? (
                <>
                  <LabelInputItem label={simpleSchoolNameData.label}>
                    <SimpleInput
                      register={register}
                      inputPropName={simpleSchoolNameData.inputPropName}
                      inputType={simpleSchoolNameData.inputType}
                    />
                  </LabelInputItem>
                  <LabelInputItem label={selectCourseChoiceData.label}>
                    <Select
                      register={register}
                      inputPropName={selectCourseChoiceData.inputPropName}
                      optionDataList={COURSE_STATUS_LIST.map((courseStatus) => {
                        return {
                          name: courseStatus,
                        };
                      })}
                    />
                  </LabelInputItem>
                  {textAreaItemDataList.slice(1, 3).map((textAreaItemData) => (
                    // 将来の夢や志望大学と好きなもの
                    <LabelInputItem label={textAreaItemData.label}>
                      <TextArea
                        register={register}
                        inputPropName={textAreaItemData.inputPropName}
                      />
                    </LabelInputItem>
                  ))}
                </>
              ) : terakoyaExperience ===
                TERAKOYA_EXPERIENCE_QUESTION_LIST[1] ? (
                <LabelInputItem label={selectStudyMethodData.label}>
                  <Select
                    register={register}
                    inputPropName={selectStudyMethodData.inputPropName}
                    optionDataList={STUDY_METHOD_LIST.map((studyMethod) => {
                      return {
                        name: studyMethod,
                      };
                    })}
                  />
                </LabelInputItem>
              ) : null}
              <LabelInputItem label={selectStudySubjectData.label}>
                <Select
                  register={register}
                  inputPropName={selectStudySubjectData.inputPropName}
                  optionDataList={SUBJECT_LIST.map((subject) => {
                    return {
                      name: subject,
                    };
                  })}
                />
              </LabelInputItem>
              <LabelInputItem label={textAreaStudySubjectDetailData.label}>
                <TextArea
                  register={register}
                  inputPropName={textAreaStudySubjectDetailData.inputPropName}
                />
              </LabelInputItem>
              <LabelInputItem label={selectPrChannelData.label}>
                <Select
                  register={register}
                  inputPropName={selectPrChannelData.inputPropName}
                  optionDataList={PR_CHANNEL_LIST.map((channel) => {
                    return {
                      name: channel,
                    };
                  })}
                />
              </LabelInputItem>
              <LabelInputItem label={textAreaRemarksData.label}>
                <TextArea
                  register={register}
                  inputPropName={textAreaRemarksData.inputPropName}
                />
              </LabelInputItem>
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
};
