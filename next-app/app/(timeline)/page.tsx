/** @jsxImportSource @emotion/react */

"use client";

import styled from "@emotion/styled";
import { HiOutlineUserCircle } from "react-icons/hi";

import {
  FlexColBox,
  FlexColCenteredBox,
  FlexHorBox,
  FlexHorEndRightBox,
  MarginBox,
} from "@components/elements/box";
import { IndigoSecondaryButton } from "@components/elements/button";
import { StyledTextArea } from "@components/elements/input";
import { PagePaper, AtomStyledPaper } from "@components/elements/paper";
import {
  CaptionDarkBrown,
  CaptionSuccess,
  TextDanger,
} from "@components/elements/text";
import { PostItem } from "@components/layouts/timeline/postItem";
import { colors } from "@styles/colors";

import { useFetchTimeline, usePostTimeline } from "./hook";
import Loading from "./loading";

const PostFormPaper = styled(AtomStyledPaper)`
  border: 1px solid ${colors.primaryBrown};
  border-radius: 10px;
  background-color: #f8f8ff; // GhostWhite
`;

export default function Page() {
  const {
    postList,
    isFetchingPostList,
    isErrorFetchingPostList,
    fetch,
    refetchInitialPostList,
  } = useFetchTimeline();
  const { onSubmitPost, isSubmittingPost, errorText, register } =
    usePostTimeline(refetchInitialPostList);

  return (
    <PagePaper>
      {isSubmittingPost ? (
        <Loading text="Submitting post..." />
      ) : (
        <PostFormPaper>
          <FlexColBox>
            <CaptionSuccess>今日の学びを投稿しよう</CaptionSuccess>
            <MarginBox marginTopPx={10}>
              <FlexHorBox>
                <HiOutlineUserCircle size={30} />
                <MarginBox marginLeftPx={20} isWidthMax={true}>
                  <FlexColBox>
                    <StyledTextArea
                      rows={3}
                      placeholder="What did you learn today? (※10文字以上)"
                      {...register("texts")}
                    />
                    {errorText ? <TextDanger>{errorText}</TextDanger> : null}
                    <MarginBox marginTopPx={10}>
                      <FlexHorEndRightBox>
                        <IndigoSecondaryButton
                          type="submit"
                          onClick={onSubmitPost}
                        >
                          投稿
                        </IndigoSecondaryButton>
                      </FlexHorEndRightBox>
                    </MarginBox>
                  </FlexColBox>
                </MarginBox>
              </FlexHorBox>
            </MarginBox>
          </FlexColBox>
        </PostFormPaper>
      )}
      <MarginBox marginTopPx={20}>
        {isFetchingPostList ? (
          <Loading text="最新の投稿を取得中..." />
        ) : isErrorFetchingPostList ? (
          <FlexColCenteredBox>
            <CaptionDarkBrown>
              タイムラインの読み込みに失敗しました。
            </CaptionDarkBrown>
            <MarginBox marginTopPx={20}>
              <IndigoSecondaryButton onClick={fetch}>
                再読み込み
              </IndigoSecondaryButton>
            </MarginBox>
          </FlexColCenteredBox>
        ) : (
          postList?.map((post, index) => (
            <MarginBox key={index} marginTopPx={10}>
              <PostItem post={post} />
            </MarginBox>
          ))
        )}
      </MarginBox>
    </PagePaper>
  );
}
