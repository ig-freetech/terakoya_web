import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  useSignUp as useSignUpMutation,
  AuthAccountRequestBody,
} from "@apis/(auth)/index";

export const useSignUp = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<AuthAccountRequestBody>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signIn, isLoading } = useSignUpMutation();

  const onSubmit = handleSubmit((inputs) => {
    if (!inputs.email || !inputs.password) {
      toast.error("メールアドレスまたはパスワードの書式が不正です");
      return;
    }
    signIn(inputs, {
      onError(error, variables, context) {
        toast.error("アカウントの作成に失敗しました。\nerror: " + error);
        router.push("/error");
      },
      onSuccess: () => {
        toast.success("ログインしました");
        router.push("/");
      },
    });
  });

  return {
    register,
    onSubmit,
    isLoading,
  };
};
