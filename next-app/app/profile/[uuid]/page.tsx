"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  COURSE_CHOICE,
  GRADE,
  HOW_TO_KNOW_TERAKOYA,
  User,
} from "@apis/(user)/common";
import { FlexColStartLeft, MarginBox } from "@components/elements/box";
import { ErrorReloading } from "@components/elements/error";
import { StyledComboBox, StyledInput } from "@components/elements/input";
import { Loading } from "@components/elements/loading";
import { BasicPaper } from "@components/elements/paper";
import { CaptionDarkBrown } from "@components/elements/text";

import { useProfile } from "./hook";

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

type Option = {
  name: string;
  value: GRADE | COURSE_CHOICE | HOW_TO_KNOW_TERAKOYA | string;
};

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example
export default function Page({ params }: { params: { uuid: string } }) {
  const { user, isLoading, isError, refetch } = useProfile(params.uuid);
  const { register, reset } = useForm<User>();

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  return (
    <BasicPaper>
      {isLoading ? (
        <Loading />
      ) : isError || !user ? (
        <ErrorReloading
          text="プロフィール情報の読み込みに失敗しました。"
          onClick={refetch}
        />
      ) : (
        <FlexColStartLeft>
          <MarginBox marginTopPx={30} />
          <CaptionDarkBrown>名前</CaptionDarkBrown>
          <MarginBox marginTopPx={10} />
          <StyledInput
            {...register("name")}
            type="text"
            placeholder="西村 博之"
            required={true}
          />
          <MarginBox marginTopPx={20} />
          <CaptionDarkBrown>ニックネーム（呼んでほしい名前）</CaptionDarkBrown>
          <MarginBox marginTopPx={10} />
          <StyledInput
            {...register("nickname")}
            type="text"
            placeholder="ヒロ"
            required={false}
          />
          <MarginBox marginTopPx={30} />
          <CaptionDarkBrown>メールアドレス</CaptionDarkBrown>
          <MarginBox marginTopPx={10} />
          <StyledInput
            {...register("email")}
            type="email"
            placeholder="abc@example.com"
            required={true}
          />
          <MarginBox marginTopPx={30} />
          <CaptionDarkBrown>学年</CaptionDarkBrown>
          <MarginBox marginTopPx={10} />
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
          <MarginBox marginTopPx={30} />
        </FlexColStartLeft>
      )}
    </BasicPaper>
  );
}
