import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  useSignIn as useSignInMutation,
  AuthAccountRequestBody,
} from "@apis/(auth)/index";

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
