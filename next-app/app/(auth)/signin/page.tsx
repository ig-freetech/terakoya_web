"use client";

import Form from "../form";

import { useSignIn } from "./hook";

export default function Page() {
  const { register, isLoading, onSubmit } = useSignIn();
  return (
    <Form
      formType="SIGN_IN"
      headline="お帰りなさい!"
      buttonText="サインイン"
      register={register}
      isLoading={isLoading}
      onSubmit={onSubmit}
    />
  );
}
