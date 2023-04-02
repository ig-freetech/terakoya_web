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

  const { register, handleSubmit, setValue, getValues, resetField } =
    useForm<RequestBody>({
      defaultValues: {
        name: "",
        email: "",
        terakoya_type: TERAKOYA_TYPE.NULL,
        attendance_date_list: [],
        arrival_time: ARRIVAL_TIME.NULL,
        grade: GRADE.NULL,
        terakoya_experience: TERAKOYA_EXPERIENCE.NULL,
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
    inputs.terakoya_type = Number(inputs.terakoya_type) as TERAKOYA_TYPE;
    inputs.terakoya_experience = Number(
      inputs.terakoya_experience
    ) as TERAKOYA_EXPERIENCE;
    _onBook(inputs);
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

  const [selectedTerakoyaExperience, setTerakoyaExperience] =
    useState<TERAKOYA_EXPERIENCE>(TERAKOYA_EXPERIENCE.NULL);
  const onChangeSelectedExperience = (value: string) => {
    setTerakoyaExperience(Number(value) as TERAKOYA_EXPERIENCE);
  };

  const [selectedTerakoyaType, setTerakoyaType] = useState<TERAKOYA_TYPE>(
    TERAKOYA_TYPE.NULL
  );
  const onChangeSelectedTerakoyaType = (value: string) => {
    setTerakoyaType(Number(value) as TERAKOYA_TYPE);
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
      selectedTerakoyaType == TERAKOYA_TYPE.MID_IKE ||
      selectedTerakoyaType == TERAKOYA_TYPE.MID_SHIBU,
    attendanceDateList: _getNextThreeDateList(
      selectedTerakoyaType == TERAKOYA_TYPE.MID_SHIBU ? SATURDAY : TUESUDAY
    ),
  };
};
