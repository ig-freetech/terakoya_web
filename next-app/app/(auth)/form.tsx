"use client";

import { BaseSyntheticEvent } from "react";
import { UseFormRegister } from "react-hook-form";

import { AuthAccountRequestBody } from "@apis/(user)/auth";
import { ROUTER } from "@app/links";
import {
  FlexColCenteredBox,
  FlexColStartLeft,
  MarginBox,
} from "@components/elements/box";
import { DarkBrownButton } from "@components/elements/button";
import { EmailInput, PasswordInput } from "@components/elements/input";
import { InternalLink } from "@components/elements/link";
import { Loading } from "@components/elements/loading";
import { BasicPaper } from "@components/elements/paper";
import { HeadlineDarkBrown } from "@components/elements/text";

type FormProps = {
  register: UseFormRegister<AuthAccountRequestBody>;
  isLoading: boolean;
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  isSignIn: boolean;
};

export default function Page(props: FormProps) {
  const { register, isLoading, onSubmit, isSignIn } = props;

  const headline = isSignIn ? "お帰りなさい!" : "Welcome to テラコヤ!";
  const text = isSignIn ? "サインイン" : "サインアップ";

  return (
    <BasicPaper>
      <FlexColCenteredBox>
        <MarginBox marginTopPx={20} />
        <HeadlineDarkBrown>{headline}</HeadlineDarkBrown>
        <MarginBox marginTopPx={20} />
        <FlexColStartLeft>
          <EmailInput register={register} />
          <MarginBox marginTopPx={20} />
          <PasswordInput register={register} />
        </FlexColStartLeft>
        <MarginBox marginTopPx={20} />
        {isLoading ? (
          <Loading text={`${text}処理中...`} />
        ) : (
          <DarkBrownButton onClick={onSubmit} type="submit">
            {text}
          </DarkBrownButton>
        )}
        <MarginBox marginTopPx={20} />
        {isSignIn
          ? "まだアカウントをお持ちでない方は"
          : "既にアカウントをお持ちの方は"}
        <MarginBox marginLeftPx={5} />
        <InternalLink path={isSignIn ? ROUTER.SIGN_UP : ROUTER.SIGN_IN}>
          {isSignIn ? "今すぐユーザー登録して始めよう" : "サインイン"}
        </InternalLink>
      </FlexColCenteredBox>
    </BasicPaper>
  );
}
