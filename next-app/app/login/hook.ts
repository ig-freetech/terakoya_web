import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { RequestBody, login } from "@apis/login";
import { AxiosError } from "axios";

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<RequestBody>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const _onLogin = (body: RequestBody) => {
    setIsLoading(true);
    login(body)
      .then((v) => {
        if (v.data.result_type === 1) {
          router.push("/manage");
          return;
        }
      })
      .catch((_: AxiosError) => {
        alert("メールアドレスまたはパスワードが間違っています");
        throw new Error("Mailaddress or Password is wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmit = handleSubmit((inputs) => {
    if (!inputs.email || !inputs.password) {
      alert("メールアドレスまたはパスワードの書式が不正です");
      return;
    }
    _onLogin(inputs);
  });

  return {
    register,
    onSubmit,
    isLoading,
  };
};
