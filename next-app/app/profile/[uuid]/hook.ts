import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { useFetchUserProfile } from "@apis/(user)/profile";
import { useUserStore } from "@stores/user";

export const useProfile = (uuid: string) => {
  const router = useRouter();
  const { user, isLoggedIn, setLoggedInUser } = useUserStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
    }
  }, [isLoggedIn, router, uuid]);

  const { isLoading, isError, refetch } = useFetchUserProfile(uuid, {
    // ユーザーのUUIDを利用
    onSuccess: (data) => {
      setLoggedInUser(data);
    },
    onError: (error) => {
      toast.error(`エラーが発生しました。\n${error}`);
    },
  });

  return {
    isLoading,
    isError,
    user,
    refetch,
  };
};
