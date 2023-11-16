/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";

import {
  FlexColStartLeft,
  FlexHorCenteredBox,
  MarginBox,
} from "@components/elements/box";
import { DarkBrownButton } from "@components/elements/button";
import { ErrorReloading } from "@components/elements/error";
import { Loading } from "@components/elements/loading";
import { BasicPaper } from "@components/elements/paper";
import {
  CaptionDarkBrown,
  SmallTextDarkGray,
  TextPrimaryBlack,
} from "@components/elements/text";
import { GRADE, COURSE_CHOICE } from "@domains/user/const";
import { clickable } from "@styles/utils";

import { useProfile } from "./hook";

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
  } = useProfile(params.uuid);

  if (isLoading)
    return (
      <BasicPaper>
        <Loading />
      </BasicPaper>
    );

  if (isError)
    return (
      <BasicPaper>
        <ErrorReloading
          text="プロフィール情報の読み込みに失敗しました。"
          onClick={refetch}
        />
      </BasicPaper>
    );

  if (!profile) return null;

  const { name, nickname, grade, course_choice, like_thing } = profile;

  return (
    <BasicPaper>
      <FlexHorCenteredBox>
        <FlexColStartLeft>
          <MarginBox marginTopPx={10}>
            <CaptionDarkBrown>名前</CaptionDarkBrown>
          </MarginBox>
          <MarginBox marginTopPx={10}>
            <TextPrimaryBlack>{name || "未設定"}</TextPrimaryBlack>
          </MarginBox>
          <MarginBox marginTopPx={20}>
            <CaptionDarkBrown>
              ニックネーム
              <br />
              （呼んでほしい名前）
            </CaptionDarkBrown>
          </MarginBox>
          <MarginBox marginTopPx={10}>
            <TextPrimaryBlack>{nickname || "未設定"}</TextPrimaryBlack>
          </MarginBox>
          <MarginBox marginTopPx={30}>
            <CaptionDarkBrown>学年</CaptionDarkBrown>
          </MarginBox>
          <MarginBox marginTopPx={10}>
            <TextPrimaryBlack>{GRADE[grade]}</TextPrimaryBlack>
          </MarginBox>
          {/* <MarginBox marginTopPx={30} />
                <CaptionDarkBrown>在籍している学校</CaptionDarkBrown>
                <MarginBox marginTopPx={10} />
                <TextIndigo>{school}</TextIndigo> */}
          <MarginBox marginTopPx={30}>
            <CaptionDarkBrown>文理選択</CaptionDarkBrown>
          </MarginBox>
          <MarginBox marginTopPx={10}>
            <TextPrimaryBlack>{COURSE_CHOICE[course_choice]}</TextPrimaryBlack>
          </MarginBox>
          {/* <MarginBox marginTopPx={30} />
          <CaptionDarkBrown>将来の夢・志望校など</CaptionDarkBrown>
          <MarginBox marginTopPx={10} />
          <TextPrimaryBlack>{future_path}</TextPrimaryBlack> */}
          <MarginBox marginTopPx={30}>
            <CaptionDarkBrown>好きなもの(こと)</CaptionDarkBrown>
          </MarginBox>
          <MarginBox marginTopPx={10}>
            <TextPrimaryBlack>{like_thing || "未設定"}</TextPrimaryBlack>
          </MarginBox>
          {isSameUser ? (
            <>
              <MarginBox marginTopPx={30}>
                <DarkBrownButton onClick={handleGoToEdit}>編集</DarkBrownButton>
              </MarginBox>
              <MarginBox marginTopPx={50}>
                {isDeleting ? (
                  <Loading />
                ) : (
                  <SmallTextDarkGray
                    css={css`
                      ${clickable}
                    `}
                    onClick={handleDeleteAccount}
                  >
                    アカウントを削除
                  </SmallTextDarkGray>
                )}
              </MarginBox>
            </>
          ) : null}
        </FlexColStartLeft>
      </FlexHorCenteredBox>
    </BasicPaper>
  );
}
