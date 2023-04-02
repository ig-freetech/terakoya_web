import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { RequestBody, login } from "@apis/login";
import { AxiosError } from "axios";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<RequestBody>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const _onLogin = (body: RequestBody) =>
    login(body)
      .then((v) => {
        if (v.data.resultType === 1) {
          navigate("/manage");
          return;
        }
        alert("メールアドレスまたはパスワードが間違っています");
        setIsLoading(false);
      })
      .catch((err: AxiosError) => {
        navigate("/error");
      });

  const onSubmit = handleSubmit((inputs) => {
    console.log(`Request Body:\n${JSON.stringify(inputs)}`);
    if (!inputs.email || !inputs.password) {
      alert("メールアドレスまたはパスワードの書式が不正です");
      return;
    }
    setIsLoading(true);
    _onLogin(inputs);
  });

  return {
    register,
    onSubmit,
    isLoading,
  };
};
