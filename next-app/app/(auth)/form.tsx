"use client";

import { BaseSyntheticEvent } from "react";
import { UseFormRegister } from "react-hook-form";

import { AuthAccountRequestBody } from "@apis/(user)/auth";
import { ROUTER } from "@app/links";
import {
  FlexColCenteredBox,
  FlexColStartLeftBox,
  MarginBox,
} from "@components/elements/box";
import { DarkBrownButton } from "@components/elements/button";
import { InternalLink } from "@components/elements/link";
import { Loading } from "@components/elements/loading";
import { PagePaper } from "@components/elements/paper";
import { HeadlineDarkBrown } from "@components/elements/text";
import { EmailInput } from "@components/layouts/input/email";
import { PasswordInput } from "@components/layouts/input/password";

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
    <PagePaper>
      <FlexColCenteredBox>
        <MarginBox marginTopPx={20}>
          <HeadlineDarkBrown>{headline}</HeadlineDarkBrown>
        </MarginBox>
        <MarginBox marginTopPx={20}>
          <FlexColStartLeftBox>
            <EmailInput register={register} />
            <MarginBox marginTopPx={20} />
            <PasswordInput register={register} onSubmit={onSubmit} />
          </FlexColStartLeftBox>
        </MarginBox>
        <MarginBox marginTopPx={20}>
          {isLoading ? (
            <Loading text={`${text}処理中...`} />
          ) : (
            <DarkBrownButton onClick={onSubmit} type="submit">
              {text}
            </DarkBrownButton>
          )}
        </MarginBox>
        <MarginBox marginTopPx={20}>
          {isSignIn
            ? "まだアカウントをお持ちでない方は"
            : "既にアカウントをお持ちの方は"}
        </MarginBox>
        <MarginBox marginLeftPx={5}>
          <InternalLink path={isSignIn ? ROUTER.SIGN_UP : ROUTER.SIGN_IN}>
            {isSignIn ? "今すぐユーザー登録して始めよう" : "サインイン"}
          </InternalLink>
        </MarginBox>
      </FlexColCenteredBox>
    </PagePaper>
  );
}
