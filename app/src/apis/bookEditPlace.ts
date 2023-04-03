import axios from "axios";
import { BASE_URL } from "@apis/config";
import { BookingItem } from "@apis/bookList";

export const editBookingPlace = (item: BookingItem) =>
  axios.put(BASE_URL + "/book/edit/place", item);
