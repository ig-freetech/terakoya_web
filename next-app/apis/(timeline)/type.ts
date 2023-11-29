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

export const REACTION_TYPE = {
  LIKE: 1,
  BAD: 2,
} as const;

const TimelineBase = t.type({
  uuid: t.string,
  timestamp: t.number,
  user_name: t.string,
  user_profile_img_url: t.string,
  texts: t.string,
  reactions: t.array(Reaction),
});
export type TimelineBase = t.TypeOf<typeof TimelineBase>;

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

export const SubmitPostRequestBody = t.type({
  uuid: t.string,
  user_name: t.string,
  user_profile_img_url: t.string,
  texts: t.string,
});
export type SubmitPostRequestBody = t.TypeOf<typeof SubmitPostRequestBody>;

export const SubmitCommentRequestBody = t.intersection([
  SubmitPostRequestBody,
  t.type({
    post_id: t.string,
  }),
]);
export type SubmitCommentRequestBody = t.TypeOf<
  typeof SubmitCommentRequestBody
>;
