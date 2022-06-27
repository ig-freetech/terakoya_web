import axios from "axios";

export type RequestBody = {
  name: string;
  email: string;
  grade: string;
  terakoyaType: string;
  attendanceDate: string;
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
};

const BASE_URL = "https://r54d83j7hk.execute-api.us-east-1.amazonaws.com";

export const test = () => {
  axios.post(BASE_URL + "/test");
};

export const callTest2 = (reqBody: RequestBody) => {
  axios.post(BASE_URL + "/test2", reqBody);
};
