import axios from "axios";

const BASE_URL = "https://r54d83j7hk.execute-api.us-east-1.amazonaws.com";

export const test = () => {
  axios.post(BASE_URL + "/test");
};
