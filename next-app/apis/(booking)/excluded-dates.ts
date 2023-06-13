import * as t from "io-ts";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { UseQueryProps, get, put } from "@apis/common";
import { API_BASE_URL } from "@utils/config";

export const ROUTE_PATH = "/booking/excluded-dates";

const fetchExcludedDates = () => {
  const additionalPropsFetch = t.type({
    dates: t.array(t.string),
  });
  return get(`${API_BASE_URL}${ROUTE_PATH}`, additionalPropsFetch);
};

// It's a best practice to use a custom hook for each method type (GET, POST, PUT, DELETE, etc) to reuse the logic across your app.
// https://zenn.dev/hrbrain/articles/1202f4d107d890#2.-%E5%90%84%E3%82%A8%E3%83%B3%E3%83%89%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8Busequery%E3%81%AEhooks%E3%82%92%E4%BD%9C%E6%88%90%E3%81%97%E3%81%A6%E5%85%B1%E9%80%9A%E5%8C%96%E3%81%99%E3%82%8B
export const useFetchExcludedDates = (props?: UseQueryProps) => {
  const { data, isLoading } = useQuery(ROUTE_PATH, fetchExcludedDates, {
    onError: props?.onError,
  });
  return {
    dates: data?.dates,
    isLoadingFetchDates: isLoading,
  };
};

export type UpdateExcludedDatesRequestBody = {
  dates: Array<string>;
};

const updateExcludedDates = (requestBody: UpdateExcludedDatesRequestBody) =>
  put(`${API_BASE_URL}${ROUTE_PATH}`, requestBody);

export const useUpdateExcludedDates = (props?: UseQueryProps) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateExcludedDates, {
    onSuccess: () => {
      queryClient.invalidateQueries(ROUTE_PATH);
    },
    onError: props?.onError,
  });
  return {
    updateDates: mutate,
    isLoadingUpdateDates: isLoading,
  };
};
