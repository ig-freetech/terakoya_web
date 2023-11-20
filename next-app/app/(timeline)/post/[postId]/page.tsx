/** @jsxImportSource @emotion/react */

"use client";

import {
  FlexColBox,
  FlexColCenteredBox,
  MarginBox,
} from "@components/elements/box";
import { ErrorReloading } from "@components/elements/error";
import { Loading } from "@components/elements/loading";
import { PagePaper } from "@components/elements/paper";
import { CommentItem, PostItem } from "@components/layouts/timeline";

import { usePostTimeline } from "./hook";

export default function Page({ params }: { params: { postId: string } }) {
  const {
    post,
    isFetchingPost,
    isErrorFetchingPost,
    refetchPost,
    commentList,
    isFetchingCommentList,
    isErrorFetchingCommentList,
    refetchCommentList,
  } = usePostTimeline(params.postId);

  return (
    <PagePaper>
      {isFetchingPost ? (
        <Loading text="投稿を読み込み中...." />
      ) : isErrorFetchingPost ? (
        <ErrorReloading
          text="投稿の読み込みに失敗しました"
          onClick={refetchPost}
        />
      ) : (
        <FlexColBox>
          {post ? <PostItem post={post} /> : null}
          <MarginBox marginTopPx={20}>
            {isFetchingCommentList ? (
              <Loading text="コメントを読み込み中...." />
            ) : isErrorFetchingCommentList ? (
              <ErrorReloading
                text="コメントの読み込みに失敗しました"
                onClick={refetchCommentList}
              />
            ) : (
              <FlexColCenteredBox>
                {/* TODO: Put input here for commenting */}
                {commentList?.map((comment, index) => (
                  <MarginBox key={index} marginTopPx={20}>
                    <CommentItem comment={comment} />
                  </MarginBox>
                ))}
              </FlexColCenteredBox>
            )}
          </MarginBox>
        </FlexColBox>
      )}
    </PagePaper>
  );
}
