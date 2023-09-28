import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { User } from "@apis/(user)/common";
import { useFetchUser, useUpdateUserProfile } from "@apis/(user)/user";
import { useRedirectToSignIn } from "@hooks/useAuth";

export const useUser = (uuid: string) => {
  const [user, setUser] = useState<User>();
  useRedirectToSignIn();

  const { isLoading, isError, refetch } = useFetchUser(uuid, {
    // ユーザーのUUIDを利用
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      toast.error(`エラーが発生しました。\n${error}`);
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { mutate: update, isLoading: isUpdating } = useUpdateUserProfile(uuid);

  return {
    isLoading,
    isError,
    user,
    refetch,
    update,
    isUpdating,
  };
};
