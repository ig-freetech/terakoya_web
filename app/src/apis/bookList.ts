import axios from "axios";
import { BASE_URL } from "@apis/config";

export const getBookingList = (target_date: string) =>
  axios.get(BASE_URL + `/book/list?date=${target_date}`);
