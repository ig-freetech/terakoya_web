import * as t from "io-ts";
import { useQuery } from "react-query";

import {
  Post,
  Comment,
  ALL_POST_LIST_QUERY_KEY,
  USER_POST_LIST_QUERY_KEY,
  POST_QUERY_KEY,
  COMMENT_LIST_QUERY_KEY,
} from "@apis/(timeline)/common";
import { get, CustomQueryOptions } from "@apis/common";
import { createQueryParams } from "@apis/utils";

const fetchPostItemListValidator = t.type({
  items: t.array(Post),
  // t.union([t.Type, t.undefined]) means Type | undefined
  // https://snyk.io/advisor/npm-package/io-ts/functions/io-ts.undefined
  last_evaluated_timestamp: t.union([t.number, t.undefined]),
  count: t.number,
});
type FetchResponseBody = t.TypeOf<typeof fetchPostItemListValidator>;

export const useFetchAllPostList = (
  lastEvaluatedTimestamp?: number,
  options?: CustomQueryOptions<FetchResponseBody>
) =>
  useQuery<FetchResponseBody>(
    ALL_POST_LIST_QUERY_KEY,
    ({ signal }) =>
      get(
        `/timeline/list?${createQueryParams({
          timestamp: lastEvaluatedTimestamp,
        })}`,
        fetchPostItemListValidator,
        signal
      ),
    options
  );

export const useFetchUserPostList = (
  uuid: string,
  lastEvaluatedTimestamp?: number,
  options?: CustomQueryOptions<FetchResponseBody>
) =>
  useQuery<FetchResponseBody>(
    [USER_POST_LIST_QUERY_KEY, uuid],
    ({ signal }) =>
      get(
        `/timeline/list?${createQueryParams({
          uuid,
          timestamp: lastEvaluatedTimestamp,
        })}`,
        fetchPostItemListValidator,
        signal
      ),
    options
  );
