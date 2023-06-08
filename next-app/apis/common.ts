// npm i io-ts fp-ts becaise fp-ts is a peer dependency of io-ts
// https://github.com/gcanti/io-ts#installation
import * as t from "io-ts";
import { isLeft } from "fp-ts/Either";
// https://github.com/gillchristian/io-ts-reporters
import reporter from "io-ts-reporters";
import axios, { AxiosError } from "axios";

import { notifyErrorMsg } from "@apis/slack";

const COMMON_ERROR_MSG = "Error happened!";

// Validation fails when fields is missing but passes when there are extra fields.
// https://qiita.com/fukky21/items/421f41baf3ebc4016d3c
export const BasicResponseData = t.type({
  message: t.string,
  status_code: t.number,
});

// Currying is to return a function that takes the next argument.
// https://www.ragate.co.jp/blog/articles/17895

/**
 * convertWithAdditonalProps is a curried function.
 * It first takes the `additionalProps`, then returns a new function that takes the `data`.
 */
// Mixed (interface) in io-ts is a type that can be anything like `unknown` in TypeScript.
// https://www.jsdocs.io/package/io-ts#Mixed
const convertWithAdditonalProps = <T extends t.Mixed>(additionalProps: T) => {
  const validator = t.intersection([BasicResponseData, additionalProps]);
  return (data: unknown) => {
    // decode() returns Either<Errors, t.Type> in fp-ts.
    // https://github.com/gcanti/io-ts/blob/master/index.md#basic-usage
    const result = validator.decode(data);
    // isLeft() checks if the Either is Left.
    // https://qiita.com/kalzit/items/483e4d210c0c187787a8#isleftisright
    if (isLeft(result)) {
      throw new Error(reporter.report(result).join("\n"));
    }
    // Return the type of the intersection of BasicResponseData and additionalProps.
    return result.right as t.TypeOf<typeof BasicResponseData & T>;
  };
};

const convert = convertWithAdditonalProps(t.type({}));

const handleError = (err: AxiosError, onError?: (err: unknown) => void) => {
  if (onError) onError(err);
  notifyErrorMsg(err.message);
  throw new Error(COMMON_ERROR_MSG);
};

export const get = <T extends t.Mixed>(
  url: string,
  additionalProps: T,
  onError?: (err: unknown) => void,
  onSuccess?: (data: t.TypeOf<typeof BasicResponseData & T>) => void
) => {
  return axios
    .get(url)
    .then((res) => {
      const convertToResponseBody = convertWithAdditonalProps(additionalProps);
      const responseBody = convertToResponseBody(res.data);
      if (onSuccess) onSuccess(responseBody);
      return responseBody;
    })
    .catch((err: AxiosError) => {
      throw handleError(err, onError);
    });
};

export const put = <T>(
  url: string,
  requestBody: T,
  onError?: (err: unknown) => void
) => {
  return axios.put(url, requestBody).catch((err) => {
    throw handleError(err, onError);
  });
};

export const post = <T>(
  url: string,
  requestBody: T,
  onError?: (err: unknown) => void
) => {
  return axios.post(url, requestBody).catch((err) => {
    throw handleError(err, onError);
  });
};
