import axios from "axios";
import { BASE_URL } from "@apis/config";

const EXCLUDED_DATES_API_URL = BASE_URL + "/booking/excluded-dates";

export const fetchExcludedDates = () => axios.get(EXCLUDED_DATES_API_URL);

export type UpdateExcludedDatesRequestBody = {
  dates: Array<string>;
};

export const updateExcludedDates = (
  requestBody: UpdateExcludedDatesRequestBody
) => axios.put(EXCLUDED_DATES_API_URL, requestBody);
