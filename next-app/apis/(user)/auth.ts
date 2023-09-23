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

export const useSignOut = () =>
  useMutation((dummy: undefined) => post("/signout", dummy));

export type DeleteAccountRequestBody = {
  uuid: string;
  sk: string;
};

export const useDeleteAccount = () =>
  useMutation((reqBody: DeleteAccountRequestBody) =>
    post("/delete-account", reqBody)
  );
