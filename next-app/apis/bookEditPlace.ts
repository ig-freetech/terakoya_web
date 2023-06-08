import { put } from "@apis/common";
import { BookingItem } from "@apis/bookList";
import { API_BASE_URL } from "@utils/config";

export const editBookingPlace = (item: BookingItem) =>
  put(API_BASE_URL + "/booking/edit/place", item);
