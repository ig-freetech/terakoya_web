import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { User } from "@apis/(user)/common";
import { useFetchUser, useUpdateUserProfile } from "@apis/(user)/user";
import { ROUTER } from "@app/links";
import { useRedirectToSignIn } from "@hooks/useAuth";
import { useUserStore } from "@stores/user";

export const useProfileEdit = (uuid: string) => {
  const router = useRouter();
  const { user, setLoggedInUser } = useUserStore();
  useRedirectToSignIn();

  const {
    isLoading: isFetching,
    isError: isErrorFetching,
    refetch,
  } = useFetchUser(uuid, {
    onSuccess: (data) => {
      setLoggedInUser(data);
    },
    onError: (error) => {
      toast.error(`エラーが発生しました。\n${error}`);
    },
  });

  const { mutate: update, isLoading: isUpdating } = useUpdateUserProfile(uuid);

  useEffect(() => {
    if (user?.uuid !== uuid) {
      router.push(`${ROUTER.PROFILE}/${uuid}`);
    }
  }, [user, uuid, router]);

  const { register, reset, handleSubmit } = useForm<User>({
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      grade: -1,
      school: "",
      course_choice: -1,
      like_thing: "",
      future_path: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit = handleSubmit((inputs) => {
    update(inputs, {
      onSuccess: () => {
        setLoggedInUser(inputs);
        toast.success("プロフィールを更新しました。");
        router.push(`${ROUTER.PROFILE}/${uuid}`);
      },
      onError: (error) => {
        toast.error(`エラーが発生しました。\n${error}`);
      },
    });
  });

  return {
    isFetching,
    isErrorFetching,
    user,
    refetch,
    register,
    onSubmit,
    isUpdating,
  };
};
