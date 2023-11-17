import * as t from "io-ts";

export const ReactionType = t.union([
  /**Like */
  t.literal(1),
  /**Bad */
  t.literal(2),
]);
export type ReactionType = t.TypeOf<typeof ReactionType>;

const Reaction = t.type({
  uuid: t.string,
  type: ReactionType,
});
export type Reaction = t.TypeOf<typeof Reaction>;

const TimelineBase = t.type({
  uuid: t.string,
  timestamp: t.number,
  user_name: t.string,
  user_profile_img_url: t.string,
  texts: t.string,
  reactions: t.array(Reaction),
});

export const Comment = t.intersection([
  TimelineBase,
  t.type({
    post_id: t.string,
    comment_id: t.string,
  }),
]);
export type Comment = t.TypeOf<typeof Comment>;

export const Post = t.intersection([
  TimelineBase,
  t.type({
    post_id: t.string,
    comment_count: t.number,
  }),
]);
export type Post = t.TypeOf<typeof Post>;

/**Query keys */
export const ALL_POST_LIST_QUERY_KEY = "all_post_list";
export const USER_POST_LIST_QUERY_KEY = "user_post_list";
export const POST_QUERY_KEY = "post";
export const COMMENT_LIST_QUERY_KEY = "comment_list";