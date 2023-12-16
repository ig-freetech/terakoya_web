"use client";

import Form from "../form";

import { useSignUp } from "./hook";

export default function Page() {
  const { register, isLoading, onSubmit } = useSignUp();
  return (
    <Form
      formType="SIGN_UP"
      headline="Welcome to テラコヤ!"
      buttonText="サインアップ"
      register={register}
      isLoading={isLoading}
      onSubmit={onSubmit}
    />
  );
}
