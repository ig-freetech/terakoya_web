"use client";

import React, { BaseSyntheticEvent } from "react";
import { UseFormRegister } from "react-hook-form";

import { AuthAccountRequestBody } from "@apis/(user)/auth";
import { ROUTER } from "@app/links";
import {
  FlexColCenteredBox,
  FlexColStartLeftBox,
  MarginBox,
} from "@components/elements/box";
import { DarkBrownButton } from "@components/elements/button";
import {
  DarkBrownInternalLink,
  MidGrayInternalLink,
} from "@components/elements/link";
import { Loading } from "@components/elements/loading";
import { PagePaper } from "@components/elements/paper";
import { HeadlineDarkBrown, TextPrimaryBlack } from "@components/elements/text";
import { EmailInput } from "@components/layouts/input/email";
import { PasswordInput } from "@components/layouts/input/password";

const FormType = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
} as const;
type FormType = (typeof FormType)[keyof typeof FormType];

type FormProps = {
  formType: FormType;
  headline: string;
  buttonText: string;
  register: UseFormRegister<AuthAccountRequestBody>;
  isLoading: boolean;
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  description?: React.ReactNode;
};

export default function Page({
  formType,
  headline,
  buttonText,
  register,
  isLoading,
  onSubmit,
  description,
}: FormProps) {
  const isForgotPassword = formType === FormType.FORGOT_PASSWORD;
  const isSignUp = formType === FormType.SIGN_UP;
  const isSignIn = formType === FormType.SIGN_IN;

  return (
    <PagePaper>
      <FlexColCenteredBox>
        <MarginBox marginTopPx={20}>
          <HeadlineDarkBrown>{headline}</HeadlineDarkBrown>
        </MarginBox>
        {description ? (
          <MarginBox marginTopPx={10}>
            <TextPrimaryBlack>{description}</TextPrimaryBlack>
          </MarginBox>
        ) : null}
        <MarginBox marginTopPx={20}>
          <FlexColStartLeftBox>
            <EmailInput register={register} />
            {isSignUp || isSignIn ? (
              <>
                <MarginBox marginTopPx={20}>
                  <PasswordInput register={register} onSubmit={onSubmit} />
                </MarginBox>
                {isSignIn ? (
                  <MarginBox marginTopPx={20}>
                    <MidGrayInternalLink href={ROUTER.FORGOT_PASSWORD}>
                      パスワードをお忘れの方はこちら
                    </MidGrayInternalLink>
                  </MarginBox>
                ) : null}
              </>
            ) : null}
          </FlexColStartLeftBox>
        </MarginBox>
        <MarginBox marginTopPx={isForgotPassword ? 40 : 20}>
          {isLoading ? (
            <Loading text={`${buttonText}処理中...`} />
          ) : (
            <DarkBrownButton onClick={onSubmit} type="submit">
              {buttonText}
            </DarkBrownButton>
          )}
        </MarginBox>
        {isSignUp || isSignIn ? (
          <>
            <MarginBox marginTopPx={20}>
              {isSignIn
                ? "まだアカウントをお持ちでない方は"
                : "既にアカウントをお持ちの方は"}
            </MarginBox>
            <MarginBox marginLeftPx={5}>
              <DarkBrownInternalLink
                href={isSignIn ? ROUTER.SIGN_UP : ROUTER.SIGN_IN}
              >
                {isSignIn ? "今すぐユーザー登録して始めよう" : "サインイン"}
              </DarkBrownInternalLink>
            </MarginBox>
          </>
        ) : null}
      </FlexColCenteredBox>
    </PagePaper>
  );
}
