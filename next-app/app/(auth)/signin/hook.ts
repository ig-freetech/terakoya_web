import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useSignIn as useSignInMutation } from "@apis/(auth)/index";
import { AuthAccountRequestBody } from "@apis/(auth)/types";

export const useSignIn = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<AuthAccountRequestBody>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signIn, isLoading } = useSignInMutation();

  const onSubmit = handleSubmit((inputs) => {
    if (!inputs.email || !inputs.password) {
      toast.error("メールアドレスまたはパスワードの書式が不正です");
      return;
    }
    signIn(inputs, {
      onError: () => {
        toast.error("メールアドレスまたはパスワードが間違っています");
        router.push("/error");
      },
      onSuccess: () => {
        toast.success("ログインしました");
        router.push("/manage");
      },
    });
  });

  return {
    register,
    onSubmit,
    isLoading,
  };
};
