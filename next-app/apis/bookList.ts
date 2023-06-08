import axios from "axios";
import { API_BASE_URL } from "@utils/config";
import { RequestBody } from "@apis/book";

export type BookingItem = RequestBody & {
  date: string;
  place: number;
  is_reminded: boolean;
};

export const getBookingList = (target_date: string) =>
  axios.get(API_BASE_URL + `/booking/list?date=${target_date}`);
