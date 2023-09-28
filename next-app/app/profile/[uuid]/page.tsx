/** @jsxImportSource @emotion/react */

"use client";

import {
  FlexColStartLeft,
  FlexHorCenteredBox,
  MarginBox,
} from "@components/elements/box";
import { DarkBrownButton } from "@components/elements/button";
import { ErrorReloading } from "@components/elements/error";
import { Loading } from "@components/elements/loading";
import { BasicPaper } from "@components/elements/paper";
import { CaptionDarkBrown, TextPrimaryBlack } from "@components/elements/text";
import { GRADE, COURSE_CHOICE } from "@domains/user/const";

import { useProfile } from "./hook";

export default function Page({ params }: { params: { uuid: string } }) {
  const {
    fetchedUser,
    isLoading,
    isError,
    refetch,
    isSameUser,
    handleGoToEdit,
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

  if (!fetchedUser) return null;

  const { name, nickname, grade, course_choice, like_thing } = fetchedUser;

  return (
    <BasicPaper>
      <FlexHorCenteredBox>
        <FlexColStartLeft>
          <MarginBox marginTopPx={30} />
          <CaptionDarkBrown>名前</CaptionDarkBrown>
          <MarginBox marginTopPx={10} />
          <TextPrimaryBlack>{name || "未設定"}</TextPrimaryBlack>
          <MarginBox marginTopPx={20} />
          <CaptionDarkBrown>
            ニックネーム
            <br />
            （呼んでほしい名前）
          </CaptionDarkBrown>
          <MarginBox marginTopPx={10} />
          <TextPrimaryBlack>{nickname || "未設定"}</TextPrimaryBlack>
          <MarginBox marginTopPx={30} />
          <CaptionDarkBrown>学年</CaptionDarkBrown>
          <MarginBox marginTopPx={10} />
          <TextPrimaryBlack>{GRADE[grade]}</TextPrimaryBlack>
          {/* <MarginBox marginTopPx={30} />
                <CaptionDarkBrown>在籍している学校</CaptionDarkBrown>
                <MarginBox marginTopPx={10} />
                <TextIndigo>{school}</TextIndigo> */}
          <MarginBox marginTopPx={30} />
          <CaptionDarkBrown>文理選択</CaptionDarkBrown>
          <MarginBox marginTopPx={10} />
          <TextPrimaryBlack>{COURSE_CHOICE[course_choice]}</TextPrimaryBlack>
          {/* <MarginBox marginTopPx={30} />
          <CaptionDarkBrown>将来の夢・志望校など</CaptionDarkBrown>
          <MarginBox marginTopPx={10} />
          <TextPrimaryBlack>{future_path}</TextPrimaryBlack> */}
          <MarginBox marginTopPx={30} />
          <CaptionDarkBrown>好きなもの(こと)</CaptionDarkBrown>
          <MarginBox marginTopPx={10} />
          <TextPrimaryBlack>{like_thing || "未設定"}</TextPrimaryBlack>
          {isSameUser ? (
            <>
              <MarginBox marginTopPx={30} />
              <DarkBrownButton onClick={handleGoToEdit}>編集</DarkBrownButton>
            </>
          ) : null}
        </FlexColStartLeft>
      </FlexHorCenteredBox>
    </BasicPaper>
  );
}
