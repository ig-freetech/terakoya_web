import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";

import {
  useResetPassword as useResetPasswordMutation,
  ResetPasswordRequestBody,
} from "@apis/(user)/auth";
import { ROUTER } from "@app/links";
import { useHandleError } from "@hooks/useHandleError";
import { useUserStore } from "@stores/user";

export const useResetPassword = () => {
  const router = useRouter();
  // Get query params from URL
  // https://nextjs.org/docs/app/api-reference/functions/use-search-params
  const searchParams = useSearchParams();
  const email = searchParams?.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    confirmation_code: string;
    password: string;
    password_confirmation: string;
  }>({
    defaultValues: {
      confirmation_code: "",
      password: "",
      password_confirmation: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        confirmation_code: yup
          .string()
          .required("確認コードを入力してください。")
          .matches(/^[0-9]{6}$/, "確認コードは6桁の数字で入力してください。"),
        password: yup
          .string()
          .required(
            "パスワードは大文字小文字英数字をそれぞれ1文字以上含んだ8文字以上で入力してください。"
          )
          .matches(
            /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/,
            "パスワードは大文字小文字英数字をそれぞれ1文字以上含んだ8文字以上で入力してください。"
          ),
        password_confirmation: yup
          .string()
          .required("もう一度同じパスワードを入力してください。")
          .oneOf([yup.ref("password")], "パスワードが一致しません。"),
      })
    ),
  });

  const { mutate: resetPassword, isLoading } = useResetPasswordMutation();
  const { handleError } = useHandleError();
  const { user, isSignedIn } = useUserStore();

  useEffect(() => {
    if (isSignedIn && user) {
      router.push(`${ROUTER.PROFILE}/${user.uuid}`);
    }
  }, [user, isSignedIn, router]);

  const onSubmit = handleSubmit((inputs) => {
    console.log("inputs", inputs);
    console.log("email", email);
    // String.match() returns null if there is no match
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/match
    if (
      !email ||
      !email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    ) {
      toast.error(
        "メールアドレスの書式が不正です。\nもう一度確認コードの発行からやり直してください。"
      );
      router.push(ROUTER.FORGOT_PASSWORD);
      return;
    }
    const requestBody: ResetPasswordRequestBody = {
      email: email,
      confirmation_code: inputs.confirmation_code,
      new_password: inputs.password,
    };
    resetPassword(requestBody, {
      onSuccess() {
        toast.success("パスワードを再設定しました。");
        router.push(ROUTER.SIGN_IN);
      },
      onError: (error) =>
        handleError(error, "パスワード再設定用のメールの送信に失敗しました。"),
    });
  });

  return {
    register,
    onSubmit,
    isLoading,
    errors,
  };
};
