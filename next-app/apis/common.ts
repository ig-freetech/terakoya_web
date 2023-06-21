// npm i io-ts fp-ts becaise fp-ts is a peer dependency of io-ts
// https://github.com/gcanti/io-ts#installation
import axios, { AxiosError } from "axios";
import { isLeft } from "fp-ts/Either";
import * as t from "io-ts";
// https://github.com/gillchristian/io-ts-reporters
import reporter from "io-ts-reporters";
import { UseQueryOptions } from "react-query";

import { notifyErrorMsg } from "@apis/slack";
import { API_BASE_URL } from "@utils/config";

export const api = axios.create({
  baseURL: API_BASE_URL,
  // Cookie is included in the request to Server-side by default when withCredentials is true.
  // https://axios-http.com/docs/req_config
  withCredentials: true,
});

/** Refresh access token and refetch new refresh token */
const refreshAccessToken = () => api.post("/refresh-token");

const refreshHandler = async <T>(api_request: () => Promise<T>) => {
  try {
    return api_request();
  } catch (e) {
    if (
      // Branches processes for each error types by using "e instanceof <Error type>"
      // https://qiita.com/necojackarc/items/c77cf3b5368b9d33601b#%E3%82%A8%E3%83%A9%E3%83%BC%E3%83%8F%E3%83%B3%E3%83%89%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%8A%E3%81%95%E3%82%89%E3%81%84
      // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Error#%E7%89%B9%E5%AE%9A%E3%81%AE%E3%82%A8%E3%83%A9%E3%83%BC%E3%82%92%E5%87%A6%E7%90%86%E3%81%99%E3%82%8B
      e instanceof AxiosError &&
      e.response &&
      // 401: Unauthorized
      // https://developer.mozilla.org/ja/docs/Web/HTTP/Status/401
      e.response.status === 401
    ) {
      // If token is expired, refresh access token, retry the request and refetch new refresh token.
      await refreshAccessToken();
      return api_request();
    }
    // If the error is due to other reasons, throw it
    throw e;
  }
};

// Validation fails when fields is missing but passes when there are extra fields.
// https://qiita.com/fukky21/items/421f41baf3ebc4016d3c
const BasicResponseData = t.type({
  message: t.string,
  status_code: t.number,
});

// t.Mixed is a type that can be anything like `unknown` in TypeScript but it can be validated when decoding.
// On the other hand, t.Any is a type that can be anything like `unknown` in TypeScript but it can't be validated when decoding.
type ResponseBody<T extends t.Mixed> = t.TypeOf<typeof BasicResponseData & T>;

// Mixed (interface) in io-ts is a type that can be anything like `unknown` in TypeScript.
// https://www.jsdocs.io/package/io-ts#Mixed
export const createValidator = <T extends t.Mixed>(additonalProps: T) =>
  t.intersection([BasicResponseData, additonalProps]);

const handleError = (url: string, err: AxiosError) =>
  notifyErrorMsg(url, err.message);

export const get = <T extends t.Mixed>(
  url: string,
  validator: t.IntersectionC<[typeof BasicResponseData, T]>,
  signal: AbortSignal | undefined
) =>
  refreshHandler(() =>
    api
      // axios.get must return cancellable promise (having cancel() method) to be used with queryClient.cancelQueries(queryKey) in react-query.
      // https://tanstack.com/query/v4/docs/react/guides/query-cancellation#using-axios-v0220
      .get<ResponseBody<T>>(url, { signal })
      .then((res) => {
        // decode() returns Either<Errors, t.Type> in fp-ts.
        // https://github.com/gcanti/io-ts/blob/master/index.md#basic-usage
        const result = validator.decode(res.data);
        // isLeft() checks if the Either is Left.
        // https://qiita.com/kalzit/items/483e4d210c0c187787a8#isleftisright
        if (isLeft(result)) {
          throw new Error(reporter.report(result).join("\n"));
        }
        // Return the type of the intersection of BasicResponseData and additionalProps.
        return result.right;
      })
      .catch((err: AxiosError) => {
        throw handleError(url, err);
      })
  );

export const put = <T>(url: string, requestBody: T) =>
  refreshHandler(() =>
    api.put(url, requestBody).catch((err) => {
      throw handleError(url, err);
    })
  );

export const post = <T>(url: string, requestBody?: T) =>
  refreshHandler(() =>
    api.post(url, requestBody).catch((err) => {
      throw handleError(url, err);
    })
  );

export type CustomQueryOptions<T> = Omit<
  UseQueryOptions<T>,
  "queryKey" | "queryFn"
>;
