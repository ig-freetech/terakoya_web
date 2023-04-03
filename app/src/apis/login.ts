import axios from "axios";
import { BASE_URL } from "@apis/config";

export type RequestBody = {
  email: string;
  password: string;
};

export const login = (body: RequestBody) =>
  axios.post(BASE_URL + "/login", body);
