import axios from "axios";
import { API_BASE_URL } from "@utils/config";
import { BookingItem } from "@apis/bookList";

export const editBookingPlace = (item: BookingItem) =>
  axios.put(API_BASE_URL + "/booking/edit/place", item);
