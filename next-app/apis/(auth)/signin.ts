import axios from "axios";

import { AccountRequestBody } from "@apis/(auth)/types";
import { API_BASE_URL } from "@utils/config";

export const signIn = (body: AccountRequestBody) =>
  axios.post(API_BASE_URL + "/signin", body);
