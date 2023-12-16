import { useMutation } from "react-query";

import { post, postWithResponse } from "@apis/common";

import { User } from "./common";

export type AuthAccountRequestBody = {
  email: string;
  password: string;
};

export const useSignUp = () =>
  useMutation((reqBody: AuthAccountRequestBody) => post("/signup", reqBody));

export const useSignIn = () =>
  useMutation((reqBody: AuthAccountRequestBody) =>
    postWithResponse("/signin", User, reqBody)
  );

export const useSignOut = () => useMutation(() => post("/signout"));

export type DeleteAccountRequestBody = {
  uuid: string;
  sk: string;
};

export const useDeleteAccount = () =>
  useMutation((reqBody: DeleteAccountRequestBody) =>
    post("/account/delete", reqBody)
  );

export type ForgotPasswordRequestBody = {
  email: string;
};
export const useForgotPassword = () =>
  useMutation((reqBody: ForgotPasswordRequestBody) =>
    post("/forgot-password", reqBody)
  );

export type ResetPasswordRequestBody = {
  email: string;
  confirmation_code: string;
  new_password: string;
};
export const useResetPassword = () =>
  useMutation((reqBody: ResetPasswordRequestBody) =>
    post("/reset-password", reqBody)
  );
