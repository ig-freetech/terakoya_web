import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import {
  book,
  RequestBody,
  GRADE,
  ARRIVAL_TIME,
  COURSE_CHOICE,
  STUDY_SUBJECT,
  STUDY_STYLE,
  HOW_TO_KNOW_TERAKOYA,
  TERAKOYA_TYPE,
  TERAKOYA_EXPERIENCE,
} from "@apis/book";
import {
  TODAY_JST,
  getNextSameDayDateList,
  getNextTargetDayDate,
} from "@utils/datetime";

export const useBook = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, getValues, resetField } = useForm<
    // Safari では setValue で数値型の値をセットできないため、Front側の状態管理としては文字列型で管理する
    Omit<RequestBody, "terakoya_type" | "terakoya_experience"> & {
      terakoya_type: string;
      terakoya_experience: string;
    }
  >({
    defaultValues: {
      name: "",
      email: "",
      terakoya_type: TERAKOYA_TYPE.NULL.toString(),
      attendance_date_list: [],
      arrival_time: ARRIVAL_TIME.NULL,
      grade: GRADE.NULL,
      terakoya_experience: TERAKOYA_EXPERIENCE.NULL.toString(),
      study_subject: STUDY_SUBJECT.NULL,
      study_subject_detail: "",
      study_style: STUDY_STYLE.NULL,
      school_name: "",
      first_choice_school: "",
      course_choice: COURSE_CHOICE.NULL,
      future_free: "",
      like_thing_free: "",
      how_to_know_terakoya: HOW_TO_KNOW_TERAKOYA.NULL,
      remarks: "",
    },
  });

  const _onBook = (body: RequestBody) =>
    book(body)
      .then((_) => navigate("/result"))
      .catch((err: AxiosError) => {
        // console.log(`Error Happened. Error Message: ${err.message}`);
        navigate("/error");
      });

  const onSubmit = handleSubmit((inputs) => {
    // console.log(`Request Body:\n${JSON.stringify(inputs)}`);
    if (inputs.attendance_date_list.length === 0) {
      alert("参加希望日を1つ以上選択して下さい");
      return;
    }
    setIsLoading(true);
    const requestBody = {
      ...inputs,
      terakoya_type: Number(selectedTerakoyaType) as TERAKOYA_TYPE,
      terakoya_experience: Number(
        selectedTerakoyaExperience
      ) as TERAKOYA_EXPERIENCE,
    };
    _onBook(requestBody);
  });

  const onChangeDateList = (value: string) => {
    const selectedDateList = getValues().attendance_date_list;
    if (selectedDateList.includes(value)) {
      setValue(
        "attendance_date_list",
        selectedDateList.filter((dt) => dt != value)
      );
      return;
    }
    setValue("attendance_date_list", [...selectedDateList, value]);
  };

  const [selectedTerakoyaExperience, setTerakoyaExperience] = useState<string>(
    TERAKOYA_EXPERIENCE.NULL.toString()
  );
  const onChangeSelectedExperience = (value: string) => {
    setTerakoyaExperience(value);
  };

  const [selectedTerakoyaType, setTerakoyaType] = useState<string>(
    TERAKOYA_TYPE.NULL.toString()
  );
  const onChangeSelectedTerakoyaType = (value: string) => {
    setTerakoyaType(value);
    _reset();
  };
  const _reset = () => {
    resetField("attendance_date_list");
    resetField("grade");
    // resetField("study_subject");
  };

  /**
   * Date list to not be shown in attendance date list
   * @description Add a date in the form of "YYYY-MM-DD"
   */
  const EXCLUDE_DATE_LIST: Array<string> = [];
  const TUESUDAY = 2;
  const SATURDAY = 6;
  const TERAKOYA_START_TIME = 17;
  const SHOW_DATES_MAX_COUNT = 3;
  const _getNextThreeDateList = (day: 2 | 6) =>
    getNextSameDayDateList(
      getNextTargetDayDate(TODAY_JST, day, TERAKOYA_START_TIME),
      SHOW_DATES_MAX_COUNT,
      EXCLUDE_DATE_LIST
    );

  return {
    register,
    onSubmit,
    isLoading,
    onChangeDateList,
    selectedTerakoyaExperience,
    onChangeSelectedExperience,
    selectedTerakoyaType,
    onChangeSelectedTerakoyaType,
    isMiddle:
      selectedTerakoyaType == TERAKOYA_TYPE.MID_IKE.toString() ||
      selectedTerakoyaType == TERAKOYA_TYPE.MID_SHIBU.toString(),
    attendanceDateList: _getNextThreeDateList(
      selectedTerakoyaType == TERAKOYA_TYPE.MID_SHIBU.toString()
        ? SATURDAY
        : TUESUDAY
    ),
  };
};
