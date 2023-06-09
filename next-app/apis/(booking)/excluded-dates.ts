import * as t from "io-ts";

import { get, put } from "@apis/common";
import { API_BASE_URL } from "@utils/config";

const EXCLUDED_DATES_API_URL = API_BASE_URL + "/booking/excluded-dates";

export const fetchExcludedDates = () => {
  const additionalProps = t.type({
    dates: t.array(t.string),
  });
  return get(EXCLUDED_DATES_API_URL, additionalProps);
};

export type UpdateExcludedDatesRequestBody = {
  dates: Array<string>;
};

export const updateExcludedDates = (
  requestBody: UpdateExcludedDatesRequestBody
) => put(EXCLUDED_DATES_API_URL, requestBody);
