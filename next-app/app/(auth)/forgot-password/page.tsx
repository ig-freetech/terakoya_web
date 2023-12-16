"use client";

import { MarginBox } from "@components/elements/box";

import Form from "../form";

import { useForgotPassword } from "./hook";

export default function Page() {
  const { register, isLoading, onSubmit } = useForgotPassword();
  return (
    <Form
      formType="FORGOT_PASSWORD"
      headline="パスワードをお忘れの方"
      buttonText="送信"
      register={register}
      isLoading={isLoading}
      onSubmit={onSubmit}
      description={
        <>
          ご登録のメールアドレスを入力してください。
          <br />
          パスワード再設定用の認証コードを添付したメールをお送りします。
          <br />
          <MarginBox marginTopPx={5}>
            &#8251;npoterakoya2021@gmail.com
            からのメールを受信できるように設定してください。
          </MarginBox>
        </>
      }
    />
  );
}
