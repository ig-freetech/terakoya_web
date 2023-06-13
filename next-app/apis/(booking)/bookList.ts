import * as t from "io-ts";
import { useQuery } from "react-query";

import { get } from "@apis/common";
import { BookingItem } from "@apis/(booking)/types";
import { API_BASE_URL } from "@utils/config";

export const ROUTE_PATH = "/booking/list";

const getBookingList = (target_date: string) =>
  get(
    `${API_BASE_URL}${ROUTE_PATH}?date=${target_date}`,
    t.type({
      item_list: t.array(BookingItem),
    })
  );

export const useFetchBookingList = (target_date: string) => {
  // https://zenn.dev/t_keshi/articles/react-query-prescription#query-key-is-%E4%BD%95%EF%BC%9F
  const { data, error, isLoading, refetch } = useQuery(
    // useQuery hook caches fetched data for each query key and re-uses it if the query key is the same when useQuery is called again.
    // Query keys are used to determine whether new data needs to be fetched or not.
    // Fetch new data when the query key changes without re-using the cached data.
    // https://react-query.tanstack.com/guides/query-keys
    [ROUTE_PATH, target_date], // Query key can be a string or an array of strings.
    () => getBookingList(target_date)
  );
  // refetch is a function that you can call to manually trigger a refetch of the query.
  // https://zenn.dev/akineko/articles/0e4334ca1f99d0
  return { data, error, isLoading, refetch };
};
