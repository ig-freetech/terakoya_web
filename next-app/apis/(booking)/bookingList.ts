import * as t from "io-ts";
import { useQuery } from "react-query";

import { BOOKING_LIST_QUERY_KEY } from "@apis/(booking)/queryKeys";
import { BookingItem } from "@apis/(booking)/types";
import { get, createValidator, CustomQueryOptions } from "@apis/common";
import { API_BASE_URL } from "@utils/config";

const fetchBookingListValidator = createValidator(
  t.type({
    item_list: t.array(BookingItem),
  })
);
type FetchResponseBody = t.TypeOf<typeof fetchBookingListValidator>;

export const useFetchBookingList = (
  target_date: string,
  options?: CustomQueryOptions<FetchResponseBody>
) =>
  // https://zenn.dev/t_keshi/articles/react-query-prescription#query-key-is-%E4%BD%95%EF%BC%9F
  useQuery<FetchResponseBody>(
    // useQuery hook caches fetched data for each query key and re-uses it if the query key is the same when useQuery is called again.
    // Query keys are used to determine whether new data needs to be fetched or not.
    // Fetch new data when the query key changes without re-using the cached data.
    // https://react-query.tanstack.com/guides/query-keys
    [BOOKING_LIST_QUERY_KEY, target_date], // Query key can be a string or an array of strings.
    ({ signal }) =>
      get(
        `${API_BASE_URL}/booking/list?date=${target_date}`,
        fetchBookingListValidator,
        signal
      ),
    options
  );
