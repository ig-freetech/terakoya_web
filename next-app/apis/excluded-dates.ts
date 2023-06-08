import axios from "axios";
import { API_BASE_URL } from "@utils/config";

const EXCLUDED_DATES_API_URL = API_BASE_URL + "/booking/excluded-dates";

export const fetchExcludedDates = () => axios.get(EXCLUDED_DATES_API_URL);

export type UpdateExcludedDatesRequestBody = {
  dates: Array<string>;
};

export const updateExcludedDates = (
  requestBody: UpdateExcludedDatesRequestBody
) => axios.put(EXCLUDED_DATES_API_URL, requestBody);
