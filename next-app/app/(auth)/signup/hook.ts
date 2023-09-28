import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  useSignUp as useSignUpMutation,
  AuthAccountRequestBody,
} from "@apis/(user)/auth";
import { ROUTER } from "@app/links";
import { useUserStore } from "@stores/user";

export const useSignUp = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<AuthAccountRequestBody>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signUp, isLoading } = useSignUpMutation();

  const { isSignedIn } = useUserStore();
  useEffect(() => {
    if (isSignedIn) {
      router.push(ROUTER.PROFILE);
    }
  }, [isSignedIn, router]);

  const onSubmit = handleSubmit((inputs) => {
    if (!inputs.email || !inputs.password) {
      toast.error("メールアドレスまたはパスワードの書式が不正です。");
      return;
    }
    signUp(inputs, {
      onError: (error) => {
        toast.error(`アカウントの作成に失敗しました。\n${error}`);
      },
      onSuccess: () => {
        toast.success("アカウントの仮登録が完了しました。");
        router.push(ROUTER.SIGN_UP + ROUTER.SUCCESS);
      },
    });
  });

  return {
    register,
    onSubmit,
    isLoading,
  };
};
