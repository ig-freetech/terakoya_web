import { useMutation } from "react-query";

import { post } from "@apis/common";

export type AuthAccountRequestBody = {
  email: string;
  password: string;
};

export const useSignUp = () =>
  useMutation((reqBody: AuthAccountRequestBody) => post("/signup", reqBody));

export const useSignIn = () =>
  useMutation((reqBody: AuthAccountRequestBody) => post("/signin", reqBody));

export type DeleteAccountRequestBody = {
  uuid: string;
  sk: string;
};

export const useDeleteAccount = () =>
  useMutation((reqBody: DeleteAccountRequestBody) =>
    post("/delete-account", reqBody)
  );
