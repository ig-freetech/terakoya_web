"use client";

import Form from "../form";

import { useSignIn } from "./hook";

export default function Page() {
  const { register, isLoading, onSubmit } = useSignIn();
  return (
    <Form
      register={register}
      isLoading={isLoading}
      onSubmit={onSubmit}
      text="Sign in"
    />
  );
}
