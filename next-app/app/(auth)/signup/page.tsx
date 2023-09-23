"use client";

import Form from "../form";

import { useSignUp } from "./hook";

export default function Page() {
  const { register, isLoading, onSubmit } = useSignUp();
  return (
    <Form
      register={register}
      isLoading={isLoading}
      onSubmit={onSubmit}
      isSignIn={false}
    />
  );
}
