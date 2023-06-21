import { useMutation } from "react-query";

import { AuthAccountRequestBody } from "@apis/(auth)/types";
import { post } from "@apis/common";

export const useSignUp = () =>
  useMutation((reqBody: AuthAccountRequestBody) => post("/account", reqBody));

export const useSignIn = () =>
  useMutation((reqBody: AuthAccountRequestBody) => post("/signin", reqBody));

export const useSignOut = () => useMutation(() => post("/signout"));
