import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  useSignIn as useSignInMutation,
  AuthAccountRequestBody,
} from "@apis/(user)/auth";
import { ROUTER } from "@app/links";
import { useUserStore } from "@stores/user";

export const useSignIn = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<AuthAccountRequestBody>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signIn, isLoading } = useSignInMutation();
  const { user, isLoggedIn, setLoggedInUser } = useUserStore();

  useEffect(() => {
    if (isLoggedIn && user) {
      router.push(ROUTER.PROFILE + `/${user.uuid}`);
    }
  }, [user, isLoggedIn, router]);

  const onSubmit = handleSubmit((inputs) => {
    if (!inputs.email || !inputs.password) {
      toast.error("メールアドレスまたはパスワードの書式が不正です。");
      return;
    }
    signIn(inputs, {
      onError: (error) => {
        toast.error(`エラーが発生しました。\n${error}`);
      },
      onSuccess(data) {
        setLoggedInUser(data);
        toast.success("サインインしました。");
        router.push(ROUTER.PROFILE + `/${data.uuid}`);
      },
    });
  });

  return {
    register,
    onSubmit,
    isLoading,
  };
};
