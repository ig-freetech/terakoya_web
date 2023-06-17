import axios from "axios";

import { API_BASE_URL } from "@utils/config";

export type RequestBody = {
  email: string;
  password: string;
};

export const signIn = (body: RequestBody) =>
  axios.post(API_BASE_URL + "/signin", body);
