import axios from "axios";
import t from "io-ts";

import { convertWithAdditonalProps, convert } from "@apis/common";
import { API_BASE_URL } from "@utils/config";

const EXCLUDED_DATES_API_URL = API_BASE_URL + "/booking/excluded-dates";

export const fetchExcludedDates = () =>
  axios
    .get(EXCLUDED_DATES_API_URL)
    .then((data) => {
      console.log(data);
      const convertExcludedDatesResponse = convertWithAdditonalProps(
        t.type({
          dates: t.array(t.string),
        })
      );
      const responseBody = convertExcludedDatesResponse(data);
      if (responseBody.status_code == 500) {
        // alert("除外日程一覧の取得に失敗しました");
        // throw new Error("Failed to fetch excluded dates");
      }
      return responseBody;
    })
    .catch((_) => {
      // alert("除外日程一覧の取得に失敗しました");
      throw new Error("Failed to fetch excluded dates");
    });

export type UpdateExcludedDatesRequestBody = {
  dates: Array<string>;
};

export const updateExcludedDates = (
  requestBody: UpdateExcludedDatesRequestBody
) =>
  axios
    .put(EXCLUDED_DATES_API_URL, requestBody)
    .then((data) => {
      const responseBody = convert(data);
      if (responseBody.status_code == 500) {
        // alert("更新に失敗しました");
        throw new Error("Failed to update excluded dates");
      }
      // alert("更新しました");
      return responseBody;
    })
    .catch((_) => {
      // alert("更新に失敗しました");
      throw new Error("Failed to update excluded dates");
    });
