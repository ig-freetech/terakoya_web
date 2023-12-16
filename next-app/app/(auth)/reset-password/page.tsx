"use client";

/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {
  FlexColCenteredBox,
  FlexColStartLeftBox,
  FlexHorBox,
  MarginBox,
} from "@components/elements/box";
import { DarkBrownButton } from "@components/elements/button";
import { StyledInput } from "@components/elements/input";
import { Loading } from "@components/elements/loading";
import { PagePaper } from "@components/elements/paper";
import {
  CaptionDarkBrown,
  HeadlineDarkBrown,
  TextDanger,
  TextPrimaryBlack,
} from "@components/elements/text";
import { StyledIconButton } from "@components/layouts/input/password";

import { useResetPassword } from "./hook";

const RelativeFlexHorBox = styled(FlexHorBox)`
  position: relative;
  // fit-content is to set the width of the element to the width of the content.
  // https://buildstd.com/fit-content/
  width: fit-content;
`;

export default function Page() {
  const { register, isLoading, onSubmit, errors } = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  return (
    <PagePaper>
      <FlexColCenteredBox>
        <MarginBox marginTopPx={20}>
          <HeadlineDarkBrown>パスワード再設定</HeadlineDarkBrown>
        </MarginBox>
        <MarginBox marginTopPx={10}>
          <TextPrimaryBlack>
            メールに添付されたパスワード再設定用の認証コードを入力して新しいパスワードを設定してください。
          </TextPrimaryBlack>
        </MarginBox>

        <FlexColStartLeftBox>
          <MarginBox marginTopPx={20}>
            <CaptionDarkBrown>認証コード</CaptionDarkBrown>
            <MarginBox marginTopPx={10}>
              <StyledInput
                type="text"
                {...register("confirmation_code")}
                placeholder="6桁の認証コード"
              />
              {errors.confirmation_code ? (
                <MarginBox marginTopPx={5}>
                  <TextDanger>{errors.confirmation_code.message}</TextDanger>
                </MarginBox>
              ) : null}
            </MarginBox>
            <MarginBox marginTopPx={20}>
              <CaptionDarkBrown>新しいパスワード</CaptionDarkBrown>
              <MarginBox marginTopPx={10}>
                <RelativeFlexHorBox>
                  <StyledInput
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="ex) Terakoya2021"
                  />
                  <StyledIconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiOutlineEye size={30} />
                    ) : (
                      <AiOutlineEyeInvisible size={30} />
                    )}
                  </StyledIconButton>
                </RelativeFlexHorBox>
                {errors.password ? (
                  <MarginBox marginTopPx={5}>
                    <TextDanger>{errors.password.message}</TextDanger>
                  </MarginBox>
                ) : null}
              </MarginBox>
            </MarginBox>
            <MarginBox marginTopPx={20}>
              <CaptionDarkBrown>新しいパスワード（確認用）</CaptionDarkBrown>
              <MarginBox marginTopPx={10}>
                <RelativeFlexHorBox>
                  <StyledInput
                    type={showPasswordConfirmation ? "text" : "password"}
                    {...register("password_confirmation")}
                    placeholder="ex) Terakoya2021"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit();
                      }
                    }}
                  />
                  <StyledIconButton
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                  >
                    {showPasswordConfirmation ? (
                      <AiOutlineEye size={30} />
                    ) : (
                      <AiOutlineEyeInvisible size={30} />
                    )}
                  </StyledIconButton>
                </RelativeFlexHorBox>
                {errors.password_confirmation ? (
                  <MarginBox marginTopPx={5}>
                    <TextDanger>
                      {errors.password_confirmation.message}
                    </TextDanger>
                  </MarginBox>
                ) : null}
              </MarginBox>
            </MarginBox>
          </MarginBox>
        </FlexColStartLeftBox>

        <MarginBox marginTopPx={30}>
          {isLoading ? (
            <Loading text={`再設定処理中...`} />
          ) : (
            <DarkBrownButton onClick={onSubmit} type="submit">
              送信
            </DarkBrownButton>
          )}
        </MarginBox>
      </FlexColCenteredBox>
    </PagePaper>
  );
}
