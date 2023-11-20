import * as t from "io-ts";
import { useMutation, useQuery } from "react-query";

import { Comment, Post, SubmitPostRequestBody } from "@apis/(timeline)/type";
import { get, CustomQueryOptions, post } from "@apis/common";
import { createQueryParams } from "@apis/utils";

/**Query keys */
const ALL_POST_LIST_QUERY_KEY = "all_post_list";
const USER_POST_LIST_QUERY_KEY = "user_post_list";
const POST_QUERY_KEY = "post";
const COMMENT_LIST_QUERY_KEY = "comment_list";

const fetchPostItemListValidator = t.type({
  items: t.array(Post),
  // t.union([t.Type, t.undefined]) means Type | undefined
  // https://snyk.io/advisor/npm-package/io-ts/functions/io-ts.undefined
  last_evaluated_timestamp: t.union([t.number, t.undefined, t.null]),
  last_evaluated_id: t.union([t.string, t.undefined, t.null]),
  count: t.number,
});
type FetchPostListResponseBody = t.TypeOf<typeof fetchPostItemListValidator>;

export const useFetchAllPostList = (
  lastEvaluatedTimestamp?: number | null,
  lastEvaluatedPostId?: string | null,
  options?: CustomQueryOptions<FetchPostListResponseBody>
) =>
  useQuery<FetchPostListResponseBody>(
    ALL_POST_LIST_QUERY_KEY,
    ({ signal }) =>
      get(
        `/timeline/list?${createQueryParams({
          timestamp: lastEvaluatedTimestamp,
          post_id: lastEvaluatedPostId,
        })}`,
        fetchPostItemListValidator,
        signal
      ),
    options
  );

export const useFetchUserPostList = (
  uuid: string,
  lastEvaluatedTimestamp?: number,
  lastEvaluatedPostId?: string,
  options?: CustomQueryOptions<FetchPostListResponseBody>
) =>
  useQuery<FetchPostListResponseBody>(
    [USER_POST_LIST_QUERY_KEY, uuid],
    ({ signal }) =>
      get(
        `/timeline/list?${createQueryParams({
          uuid,
          timestamp: lastEvaluatedTimestamp,
          post_id: lastEvaluatedPostId,
        })}`,
        fetchPostItemListValidator,
        signal
      ),
    options
  );

export const useSubmitPost = () =>
  useMutation((reqBody: SubmitPostRequestBody) => post(`/timeline`, reqBody));

export const useFetchPost = (
  postId: string,
  options?: CustomQueryOptions<Post>
) =>
  useQuery<Post>(
    [POST_QUERY_KEY, postId],
    ({ signal }) => get(`/timeline/${postId}`, Post, signal),
    options
  );

const fetchCommentItemListValidator = t.type({
  items: t.array(Comment),
  last_evaluated_timestamp: t.union([t.number, t.undefined, t.null]),
  last_evaluated_id: t.union([t.string, t.undefined, t.null]),
  count: t.number,
});
type FetchCommentListResponseBody = t.TypeOf<
  typeof fetchCommentItemListValidator
>;

export const useFetchCommentList = (
  postId: string,
  lastEvaluatedTimestamp?: number | null,
  lastEvaluatedCommentId?: string | null,
  options?: CustomQueryOptions<FetchCommentListResponseBody>
) =>
  useQuery<FetchCommentListResponseBody>(
    [COMMENT_LIST_QUERY_KEY, postId],
    ({ signal }) =>
      get(
        `/timeline/${postId}/comment/list?${createQueryParams({
          timestamp: lastEvaluatedTimestamp,
          comment_id: lastEvaluatedCommentId,
        })}`,
        fetchCommentItemListValidator,
        signal
      ),
    options
  );
