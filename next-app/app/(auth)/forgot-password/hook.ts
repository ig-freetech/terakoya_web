import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  useForgotPassword as useForgotPasswordMutation,
  AuthAccountRequestBody,
} from "@apis/(user)/auth";
import { ROUTER } from "@app/links";
import { useHandleError } from "@hooks/useHandleError";
import { useUserStore } from "@stores/user";

export const useForgotPassword = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<AuthAccountRequestBody>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: postForgotPassword, isLoading } = useForgotPasswordMutation();
  const { handleError } = useHandleError();
  const { user, isSignedIn } = useUserStore();

  useEffect(() => {
    if (isSignedIn && user) {
      router.push(`${ROUTER.PROFILE}/${user.uuid}`);
    }
  }, [user, isSignedIn, router]);

  const onSubmit = handleSubmit((inputs) => {
    if (!inputs.email) {
      toast.error("メールアドレスの書式が不正です。");
      return;
    }
    postForgotPassword(inputs, {
      onSuccess() {
        toast.success("パスワード再設定用のメールを送信しました。");
        router.push(`${ROUTER.RESET_PASSWORD}?email=${inputs.email}`);
      },
      onError: (error) =>
        handleError(error, "パスワード再設定用のメールの送信に失敗しました。"),
    });
  });

  return {
    register,
    onSubmit,
    isLoading,
  };
};
