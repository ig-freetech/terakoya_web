import axios from "axios";
import { BASE_URL } from "@apis/config";
import { RequestBody } from "@apis/book";

export type BookingItem = RequestBody & {
  date: string;
  place: number;
  is_reminded: boolean;
};

export const getBookingList = (target_date: string) =>
  axios.get(BASE_URL + `/book/list?date=${target_date}`);
