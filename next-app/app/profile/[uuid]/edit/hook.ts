import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { User } from "@apis/(user)/common";
import { ROUTER } from "@app/links";
import { useRedirectToSignIn } from "@hooks/useAuth";
import { useUser } from "@hooks/user/useUser";
import { useUserStore } from "@stores/user";

export const useProfileEdit = (uuid: string) => {
  const router = useRouter();
  const { user: currentUser, setLoggedInUser } = useUserStore();
  useRedirectToSignIn();

  const {
    user: editedUser,
    isLoading,
    isError,
    refetch,
    update,
    isUpdating,
  } = useUser(uuid);

  useEffect(() => {
    if (currentUser?.uuid !== uuid) {
      router.push(`${ROUTER.PROFILE}/${uuid}`);
    }
  }, [currentUser, uuid, router]);

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
    if (editedUser) {
      reset(editedUser);
    }
  }, [editedUser, reset]);

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
    isLoading,
    isError,
    editedUser,
    refetch,
    register,
    onSubmit,
    isUpdating,
  };
};
