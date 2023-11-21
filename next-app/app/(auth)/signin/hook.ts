import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  useSignIn as useSignInMutation,
  AuthAccountRequestBody,
} from "@apis/(user)/auth";
import { ROUTER } from "@app/links";
import { useHandleError } from "@hooks/useHandleError";
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
  const { handleError } = useHandleError();
  const { user, isSignedIn, setLoggedInUser } = useUserStore();

  useEffect(() => {
    if (isSignedIn && user) {
      router.push(`${ROUTER.PROFILE}/${user.uuid}`);
    }
  }, [user, isSignedIn, router]);

  const onSubmit = handleSubmit((inputs) => {
    if (!inputs.email || !inputs.password) {
      toast.error("メールアドレスまたはパスワードの書式が不正です。");
      return;
    }
    signIn(inputs, {
      onSuccess(data) {
        setLoggedInUser(data);
        toast.success("サインインしました。");
        router.push(`${ROUTER.PROFILE}/${data.uuid}`);
      },
      onError: (error) => handleError(error, "サインインに失敗しました。"),
    });
  });

  return {
    register,
    onSubmit,
    isLoading,
  };
};
