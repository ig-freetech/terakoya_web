/** @jsxImportSource @emotion/react */

"use client";

import {
  COURSE_CHOICE,
  GRADE,
  HOW_TO_KNOW_TERAKOYA,
} from "@apis/(user)/common";
import {
  FlexColStartLeftBox,
  FlexHorCenteredBox,
  MarginBox,
} from "@components/elements/box";
import { DarkBrownButton } from "@components/elements/button";
import { ErrorReloading } from "@components/elements/error";
import {
  StyledComboBox,
  StyledInput,
  StyledTextArea,
} from "@components/elements/input";
import { Loading } from "@components/elements/loading";
import { PagePaper } from "@components/elements/paper";
import { CaptionDarkBrown } from "@components/elements/text";

import { useProfileEdit } from "./hook";

type Option = {
  name: string;
  value: GRADE | COURSE_CHOICE | HOW_TO_KNOW_TERAKOYA | string;
};
const GRADE_LIST: Array<Option> = [
  // react-hook-form show a validation error when the value is undefined, null or empty string
  { name: "", value: "" },
  { name: "中学1年生", value: 11 },
  { name: "中学2年生", value: 12 },
  { name: "中学3年生", value: 13 },
  { name: "高校1年生", value: 1 },
  { name: "高校2年生", value: 2 },
  { name: "高校3年生", value: 3 },
  { name: "その他", value: 0 },
];
const COURSE_CHOICE_LIST: Array<Option> = [
  { name: "", value: -1 },
  { name: "まだ決めていない", value: 1 },
  { name: "文系", value: 2 },
  { name: "理系", value: 3 },
  { name: "その他", value: 0 },
];

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example
export default function Page({ params }: { params: { uuid: string } }) {
  const {
    isFetching,
    isErrorFetching,
    refetch,
    register,
    onSubmit,
    isUpdating,
  } = useProfileEdit(params.uuid);

  if (isFetching)
    return (
      <PagePaper>
        <Loading />
      </PagePaper>
    );

  if (isErrorFetching)
    return (
      <PagePaper>
        <ErrorReloading
          text="プロフィール情報の読み込みに失敗しました。"
          onClick={refetch}
        />
      </PagePaper>
    );

  return (
    <PagePaper>
      <FlexHorCenteredBox>
        <form onSubmit={onSubmit}>
          <FlexColStartLeftBox>
            <MarginBox marginTopPx={30}>
              <CaptionDarkBrown>名前</CaptionDarkBrown>
            </MarginBox>
            <MarginBox marginTopPx={10}>
              <StyledInput
                {...register("name")}
                type="text"
                placeholder="山田 太郎"
                required={true}
              />
            </MarginBox>
            <MarginBox marginTopPx={20}>
              <CaptionDarkBrown>
                ニックネーム
                <br />
                （呼んでほしい名前）
              </CaptionDarkBrown>
            </MarginBox>
            <MarginBox marginTopPx={10}>
              <StyledInput
                {...register("nickname")}
                type="text"
                placeholder="タロウ"
                required={false}
              />
            </MarginBox>
            <MarginBox marginTopPx={30}>
              <CaptionDarkBrown>メールアドレス</CaptionDarkBrown>
            </MarginBox>
            <MarginBox marginTopPx={10}>
              <StyledInput
                {...register("email")}
                type="email"
                placeholder="abc@example.com"
                required={true}
              />
            </MarginBox>
            <MarginBox marginTopPx={30}>
              <CaptionDarkBrown>学年</CaptionDarkBrown>
            </MarginBox>
            <MarginBox marginTopPx={10}>
              <StyledComboBox
                {...register("grade", { valueAsNumber: true })}
                required
              >
                {GRADE_LIST.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </StyledComboBox>
            </MarginBox>
            <MarginBox marginTopPx={30}>
              <CaptionDarkBrown>在籍している学校</CaptionDarkBrown>
            </MarginBox>
            <MarginBox marginTopPx={10}>
              <StyledInput
                {...register("school")}
                type="text"
                placeholder="○○高等学校"
                required={false}
              />
            </MarginBox>
            <MarginBox marginTopPx={30}>
              <CaptionDarkBrown>文理選択</CaptionDarkBrown>
            </MarginBox>
            <MarginBox marginTopPx={10}>
              <StyledComboBox
                {...register("course_choice", { valueAsNumber: true })}
              >
                {COURSE_CHOICE_LIST.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </StyledComboBox>
            </MarginBox>
            <MarginBox marginTopPx={30}>
              <CaptionDarkBrown>将来の夢・志望校など</CaptionDarkBrown>
            </MarginBox>
            <MarginBox marginTopPx={10} isWidthMax={true}>
              <StyledTextArea {...register("future_path")} rows={2} />
            </MarginBox>
            <MarginBox marginTopPx={30}>
              <CaptionDarkBrown>好きなもの(こと)</CaptionDarkBrown>
            </MarginBox>
            <MarginBox marginTopPx={10} isWidthMax={true}>
              <StyledTextArea {...register("like_thing")} rows={2} />
            </MarginBox>
            <MarginBox marginTopPx={30}>
              {isUpdating ? (
                <Loading />
              ) : (
                <DarkBrownButton type="submit">更新</DarkBrownButton>
              )}
            </MarginBox>
          </FlexColStartLeftBox>
        </form>
      </FlexHorCenteredBox>
    </PagePaper>
  );
}
