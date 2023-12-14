/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import { HiOutlineUserCircle } from "react-icons/hi";

import {
  FlexColCenteredBox,
  FlexColStartLeftBox,
  FlexHorAlignCenterBox,
  MarginBox,
} from "@components/elements/box";
import { RoundedTransparentIndigoButton } from "@components/elements/button";
import { GrayDivider } from "@components/elements/divider";
import { ErrorReloading } from "@components/elements/error";
import { Loading } from "@components/elements/loading";
import { PagePaper } from "@components/elements/paper";
import {
  BoldLargeTextPrimaryBlack,
  BoldTextGray,
  CaptionDarkBrown,
  SmallTextDanger,
  TextPrimaryBlack,
} from "@components/elements/text";
import { PostItem } from "@components/layouts/timeline";
import { GRADE, COURSE_CHOICE } from "@domains/user/const";
import { usePutReaction } from "@hooks/timeline/usePutReaction";
import { MEDIA_QUERIES, clickable } from "@styles/utils";

import { useProfile } from "./hook";

const PROFILE_IMAGE_SIZE = 100;

export default function Page({ params }: { params: { uuid: string } }) {
  const {
    profile,
    isLoading,
    isError,
    refetch,
    isSameUser,
    handleGoToEdit,
    handleDeleteAccount,
    isDeleting,
    postList,
    isFetchingPostList,
    isErrorFetchingPostList,
    refetchInitialPostList,
  } = useProfile(params.uuid);

  const { currentToggledPostList, handleReactionToPost } =
    usePutReaction(postList);

  if (isLoading)
    return (
      <PagePaper>
        <Loading />
      </PagePaper>
    );

  if (isError)
    return (
      <PagePaper>
        <ErrorReloading
          text="プロフィール情報の読み込みに失敗しました。"
          onClick={refetch}
        />
      </PagePaper>
    );

  if (!profile) return null;

  const {
    user_profile_img_url,
    name,
    nickname,
    grade,
    course_choice,
    like_thing,
  } = profile;

  return (
    <PagePaper>
      <FlexColCenteredBox
        css={css`
          margin: 0 20%;
          ${MEDIA_QUERIES.upTo600} {
            margin: initial;
          }
        `}
      >
        <FlexHorAlignCenterBox>
          {user_profile_img_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt="ユーザーアイコン"
              src={user_profile_img_url}
              width={PROFILE_IMAGE_SIZE}
              height={PROFILE_IMAGE_SIZE}
            />
          ) : (
            // <Image alt="userIcon" src={userProfileImageUrl} />
            <HiOutlineUserCircle size={PROFILE_IMAGE_SIZE} />
          )}
          <MarginBox marginLeftPx={20}>
            <FlexColStartLeftBox>
              <BoldLargeTextPrimaryBlack>
                {name || "未設定"}
              </BoldLargeTextPrimaryBlack>
              <MarginBox marginTopPx={5}>
                <BoldTextGray>{nickname || "未設定"}</BoldTextGray>
              </MarginBox>
            </FlexColStartLeftBox>
          </MarginBox>
        </FlexHorAlignCenterBox>

        <FlexColStartLeftBox
          css={css`
            width: 100%;
          `}
        >
          <MarginBox marginTopPx={30}>
            <CaptionDarkBrown>学年</CaptionDarkBrown>
          </MarginBox>
          <MarginBox marginTopPx={10}>
            <TextPrimaryBlack>{GRADE[grade]}</TextPrimaryBlack>
          </MarginBox>
          <MarginBox marginTopPx={30}>
            <CaptionDarkBrown>文理選択</CaptionDarkBrown>
          </MarginBox>
          <MarginBox marginTopPx={10}>
            <TextPrimaryBlack>{COURSE_CHOICE[course_choice]}</TextPrimaryBlack>
          </MarginBox>
          <MarginBox marginTopPx={30}>
            <CaptionDarkBrown>好きなもの(こと)</CaptionDarkBrown>
          </MarginBox>
          <MarginBox marginTopPx={10}>
            <TextPrimaryBlack>{like_thing || "未設定"}</TextPrimaryBlack>
          </MarginBox>
        </FlexColStartLeftBox>

        {isSameUser ? (
          <MarginBox marginTopPx={50}>
            <FlexHorAlignCenterBox>
              <RoundedTransparentIndigoButton
                onClick={handleGoToEdit}
                css={css`
                  width: 150px;
                `}
              >
                編集
              </RoundedTransparentIndigoButton>
              <MarginBox marginLeftPx={50}>
                {isDeleting ? (
                  <Loading />
                ) : (
                  <SmallTextDanger
                    css={css`
                      ${clickable}
                    `}
                    onClick={handleDeleteAccount}
                  >
                    アカウントを削除
                  </SmallTextDanger>
                )}
              </MarginBox>
            </FlexHorAlignCenterBox>
          </MarginBox>
        ) : null}

        <MarginBox marginTopPx={30} isWidthMax={true}>
          <GrayDivider />
        </MarginBox>

        <FlexColStartLeftBox
          css={css`
            width: 100%;
          `}
        >
          <MarginBox marginTopPx={30}>
            <CaptionDarkBrown>投稿一覧</CaptionDarkBrown>
          </MarginBox>
          <MarginBox marginTopPx={20}>
            {isFetchingPostList ? (
              <Loading text="最新の投稿を取得中..." />
            ) : isErrorFetchingPostList ? (
              <ErrorReloading
                text="タイムラインの読み込みに失敗しました。"
                onClick={refetchInitialPostList}
              />
            ) : currentToggledPostList?.length > 0 ? (
              currentToggledPostList.map((post, index) => (
                <MarginBox key={index} marginTopPx={10}>
                  <PostItem
                    post={post}
                    onClickLike={() => handleReactionToPost(post.post_id)}
                    isLinkable={true}
                  />
                </MarginBox>
              ))
            ) : (
              <TextPrimaryBlack>投稿はありません</TextPrimaryBlack>
            )}
          </MarginBox>
        </FlexColStartLeftBox>
      </FlexColCenteredBox>
    </PagePaper>
  );
}
