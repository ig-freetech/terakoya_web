/** @jsxImportSource @emotion/react */

"use client";

import { FlexColCenteredBox, MarginBox } from "@components/elements/box";
import { IndigoSecondaryButton } from "@components/elements/button";
import { PagePaper } from "@components/elements/paper";
import { CaptionDarkBrown, HeadlineDarkBrown } from "@components/elements/text";

import { useTimeline } from "./hook";
import Loading from "./loading";
import { PostItem } from "@components/layouts/timeline/postItem";

export default function Page() {
  const { postList, isLoading, isError, refetch } = useTimeline();

  const handleReload = () => {
    refetch();
  };

  if (isLoading)
    return (
      <PagePaper>
        <Loading />
      </PagePaper>
    );

  if (isError)
    return (
      <PagePaper>
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
      </PagePaper>
    );

  return (
    <PagePaper>
      <MarginBox marginTopPx={20}>
        {postList?.map((post) => (
          <MarginBox key={post.post_id} marginTopPx={10}>
            <PostItem post={post} />
          </MarginBox>
        ))}
      </MarginBox>
    </PagePaper>
  );
}
