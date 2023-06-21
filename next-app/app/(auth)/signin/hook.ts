import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { signIn } from "@apis/(auth)/signin";
import { AuthAccountRequestBody } from "@apis/(auth)/types";

export const useSignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<AuthAccountRequestBody>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const _onSignIn = (body: AuthAccountRequestBody) => {
    setIsLoading(true);
    signIn(body)
      .then((v) => {
        if (v.data.result_type === 1) {
          router.push("/manage");
          return;
        }
      })
      .catch(() => {
        toast.error("メールアドレスまたはパスワードが間違っています");
        router.push("/error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = handleSubmit((inputs) => {
    if (!inputs.email || !inputs.password) {
      toast.error("メールアドレスまたはパスワードの書式が不正です");
      return;
    }
    _onSignIn(inputs);
  });

  return {
    register,
    onSubmit,
    isLoading,
  };
};
