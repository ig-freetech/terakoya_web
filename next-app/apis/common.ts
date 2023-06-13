// npm i io-ts fp-ts becaise fp-ts is a peer dependency of io-ts
// https://github.com/gcanti/io-ts#installation
import * as t from "io-ts";
import { isLeft } from "fp-ts/Either";
// https://github.com/gillchristian/io-ts-reporters
import reporter from "io-ts-reporters";
import axios, { AxiosError } from "axios";
import { UseQueryOptions } from "react-query";

import { notifyErrorMsg } from "@apis/slack";

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
const convertWithAdditonalProps = <T extends t.Type<object>>(
  additionalProps: T
) => {
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

const handleError = (err: AxiosError) => notifyErrorMsg(err.message);

export const get = <T extends t.Mixed>(url: string, additionalProps: T) => {
  return axios
    .get(url)
    .then((res) => {
      const convertToResponseBody = convertWithAdditonalProps(additionalProps);
      const responseBody = convertToResponseBody(res.data);
      return responseBody;
    })
    .catch((err: AxiosError) => {
      throw handleError(err);
    });
};

export const put = <T>(url: string, requestBody: T) => {
  return axios.put(url, requestBody).catch((err) => {
    throw handleError(err);
  });
};

export const post = <T>(url: string, requestBody: T) => {
  return axios.post(url, requestBody).catch((err) => {
    throw handleError(err);
  });
};

// Pick<Type, Key1 | Key2 | ...> returns a type that has only the specified fields.
// https://typescriptbook.jp/reference/type-reuse/utility-types/pick
export type UseQueryProps = Pick<UseQueryOptions, "onError" | "onSuccess">;
