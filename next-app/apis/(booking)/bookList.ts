import * as t from "io-ts";

import { get } from "@apis/common";
import { BookingItem } from "@apis/(booking)/types";
import { API_BASE_URL } from "@utils/config";

export const getBookingList = (target_date: string) =>
  get(
    `${API_BASE_URL}/booking/list?date=${target_date}`,
    t.type({
      item_list: t.array(BookingItem),
    })
  );
