import * as t from "io-ts";
import { useQuery, useMutation } from "react-query";

import { BOOKING_EXCLUDED_DATES_QUERY_KEY } from "@apis/(booking)/queryKeys";
import { createValidator, get, put, CustomQueryOptions } from "@apis/common";

const API_ROUTE_URL = "/booking/excluded-dates";

const fetchExcludedDatesValidator = createValidator(
  t.type({
    dates: t.array(t.string),
  })
);
type FetchResponseBody = t.TypeOf<typeof fetchExcludedDatesValidator>;

// It's a best practice to use a custom hook for each method type (GET, POST, PUT, DELETE, etc) to reuse the logic across your app.
// https://zenn.dev/hrbrain/articles/1202f4d107d890#2.-%E5%90%84%E3%82%A8%E3%83%B3%E3%83%89%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8Busequery%E3%81%AEhooks%E3%82%92%E4%BD%9C%E6%88%90%E3%81%97%E3%81%A6%E5%85%B1%E9%80%9A%E5%8C%96%E3%81%99%E3%82%8B
export const useFetchExcludedDates = (
  options?: CustomQueryOptions<FetchResponseBody>
) =>
  // useQuery retrys failed queries up to 3 times by default.
  // https://tanstack.com/query/v4/docs/react/guides/query-retries
  useQuery<FetchResponseBody>(
    BOOKING_EXCLUDED_DATES_QUERY_KEY,
    ({ signal }) => get(API_ROUTE_URL, fetchExcludedDatesValidator, signal),
    options
  );

export type UpdateRequestBody = {
  dates: Array<string>;
};

export const useUpdateExcludedDates = () =>
  useMutation((reqBody: UpdateRequestBody) => put(API_ROUTE_URL, reqBody));
