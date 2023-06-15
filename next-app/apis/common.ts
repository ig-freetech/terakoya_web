// npm i io-ts fp-ts becaise fp-ts is a peer dependency of io-ts
// https://github.com/gcanti/io-ts#installation
import axios, { AxiosError } from "axios";
import { isLeft } from "fp-ts/Either";
import * as t from "io-ts";
// https://github.com/gillchristian/io-ts-reporters
import reporter from "io-ts-reporters";
import { UseQueryOptions } from "react-query";

import { notifyErrorMsg } from "@apis/slack";

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

const handleError = (err: AxiosError) => notifyErrorMsg(err.message);

export const get = <T extends t.Mixed>(
  url: string,
  validator: t.IntersectionC<[typeof BasicResponseData, T]>,
  signal: AbortSignal | undefined
) => {
  return (
    axios
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
        throw handleError(err);
      })
  );
};

export const put = <T>(url: string, requestBody: T) =>
  axios.put(url, requestBody).catch((err) => {
    throw handleError(err);
  });

export const post = <T>(url: string, requestBody: T) =>
  axios.post(url, requestBody).catch((err) => {
    throw handleError(err);
  });

export type CustomQueryOptions<T> = Omit<
  UseQueryOptions<T>,
  "queryKey" | "queryFn"
>;
