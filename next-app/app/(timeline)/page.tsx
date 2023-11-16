/** @jsxImportSource @emotion/react */

"use client";

import { FlexColCenteredBox, MarginBox } from "@components/elements/box";
import { IndigoSecondaryButton } from "@components/elements/button";
import { BasicPaper } from "@components/elements/paper";
import { CaptionDarkBrown, HeadlineDarkBrown } from "@components/elements/text";

import { useTimeline } from "./hook";
import Loading from "./loading";

export default function Page() {
  const { postList, isLoading, isError, refetch } = useTimeline();

  const handleReload = () => {
    refetch();
  };

  if (isLoading)
    return (
      <BasicPaper>
        <Loading />
      </BasicPaper>
    );

  if (isError)
    return (
      <BasicPaper>
        <FlexColCenteredBox>
          <CaptionDarkBrown>
            タイムラインの読み込みに失敗しました。
          </CaptionDarkBrown>
          <MarginBox marginTopPx={20}>
            <IndigoSecondaryButton onClick={handleReload}>
              再読み込み
            </IndigoSecondaryButton>
          </MarginBox>
        </FlexColCenteredBox>
      </BasicPaper>
    );

  return (
    <BasicPaper>
      <FlexColCenteredBox>
        <MarginBox marginTopPx={10}>
          <HeadlineDarkBrown>タイムライン</HeadlineDarkBrown>
        </MarginBox>
        <MarginBox marginTopPx={20}>
          {postList?.map((post) => {
            return (
              <div key={post.post_id}>
                <MarginBox marginTopPx={10}>
                  <CaptionDarkBrown>{post.user_name}</CaptionDarkBrown>
                </MarginBox>
                <MarginBox marginTopPx={10}>
                  <CaptionDarkBrown>
                    {post.user_profile_img_url}
                  </CaptionDarkBrown>
                </MarginBox>
                <MarginBox marginTopPx={10}>
                  <CaptionDarkBrown>{post.texts}</CaptionDarkBrown>
                </MarginBox>
                <MarginBox marginTopPx={10}>
                  <CaptionDarkBrown>{post.comment_count}</CaptionDarkBrown>
                </MarginBox>
                <MarginBox marginTopPx={10}>
                  <CaptionDarkBrown>
                    タイムスタンプ: {post.timestamp}
                  </CaptionDarkBrown>
                </MarginBox>
              </div>
            );
          })}
        </MarginBox>
      </FlexColCenteredBox>
    </BasicPaper>
  );
}
