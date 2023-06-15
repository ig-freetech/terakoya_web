import { useMutation, useQueryClient } from "react-query";

import { BOOKING_LIST_QUERY_KEY } from "@apis/(booking)/queryKeys";
import { BookingItem } from "@apis/(booking)/types";
import { put } from "@apis/common";
import { API_BASE_URL } from "@utils/config";

export const useEditBookingPlace = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedItem: BookingItem) =>
      put(`${API_BASE_URL}/booking/edit/place`, updatedItem),
    {
      // Optimistic update is a technique to update the UI immediately expecting that the mutation will succeed while simultaneously sending a request to update the data source.
      // https://qiita.com/suzuki0430/items/1812e600797bba661cef#optimistic-update
      // https://qiita.com/devneko/items/a636b81be76b9e2137f2
      // The average human blinking speed is said to be 0.1 to 0.15 seconds, so if the delay time between an operation and visual feedback is within this range, the result is immediately reflected, providing a crisp operation experience.
      // https://kaminashi-developer.hatenablog.jp/entry/optimistic-update-in-spa

      // Optimistic update example
      // https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
      onMutate: async (updatedItem) => {
        // cancelQueries(queryKey) cancels all queries being implemented with the specified query key.
        // In React Query, a new query can be started before the previous query has finished and then the results of the previous query are discarded when the new query finishes. However, the fetching of the old query itself continues in the background.
        // https://zenn.dev/mkt_engr/articles/abort-fetch-with-axios
        // fetcher must has a signal property to enable the query cancellation function.
        // https://tanstack.com/query/v4/docs/react/guides/query-cancellation#using-axios-v0220
        await queryClient.cancelQueries(BOOKING_LIST_QUERY_KEY);
        // https://zenn.dev/ryuta1346/articles/aece784f940597#queryclient.getquerystate
        const previousItems = queryClient.getQueryData<Array<BookingItem>>(
          BOOKING_LIST_QUERY_KEY
        );
        if (previousItems) {
          // https://zenn.dev/ryuta1346/articles/aece784f940597#queryclient.setqueriesdata
          queryClient.setQueryData<BookingItem[]>(
            BOOKING_LIST_QUERY_KEY,
            previousItems.map((previousItem) =>
              previousItem.date === updatedItem.date &&
              previousItem.sk == updatedItem.sk
                ? updatedItem
                : previousItem
            )
          );
        }
        // Return the context object that will be passed to the onError and onSettled functions.
        // https://reffect.co.jp/react/tanstack-query/#onmutate-onsuccess-onerror-onsettled-%E3%81%AE%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D
        // https://react-query.tanstack.com/reference/useMutation
        return { previousItems };
      },
      // onSuccess in useMutation is fired after onSuccess in mutate function is fired.
      // https://tanstack.com/query/v4/docs/react/guides/mutations#consecutive-mutations
      onSuccess: () => {
        // invalidateQueries(queryKey) is used to refetch data for a given query key.
        // https://zenn.dev/akineko/articles/65eb83fe43ae57#invalidatequeries-%E3%81%AB%E3%82%88%E3%82%8B%E5%86%8D%E5%8F%96%E5%BE%97%E3%83%88%E3%83%AA%E3%82%AC%E3%83%BC
        // https://tanstack.com/query/v4/docs/react/reference/QueryClient#queryclientinvalidatequeries
        queryClient.invalidateQueries(BOOKING_LIST_QUERY_KEY);
      },
      onError: (_, __, context) => {
        if (context?.previousItems) {
          queryClient.setQueryData<Array<BookingItem>>(
            BOOKING_LIST_QUERY_KEY,
            context.previousItems
          );
        }
      },
    }
  );
};
