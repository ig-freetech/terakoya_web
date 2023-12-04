import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { useDeleteAccount } from "@apis/(user)/auth";
import { UserProfile } from "@apis/(user)/common";
import { useFetchProfile } from "@apis/(user)/user";
import { ROUTER } from "@app/links";
import { useHandleError } from "@hooks/useHandleError";
import { useUserStore } from "@stores/user";

export const useProfile = (uuid: string) => {
  const router = useRouter();

  const { user: currentUser, disposeUser } = useUserStore();

  const { handleError } = useHandleError();
  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useFetchProfile(uuid, {
    onError: (error) => handleError(error),
  });
  const isSameUser = currentUser?.uuid === uuid;

  const { mutate: deleteAccount, isLoading: isDeleting } = useDeleteAccount();
  const handleDeleteAccount = () => {
    const isYes = window.confirm(
      "※本当にアカウントを削除しますか？\nこの操作は取り消すことができません。"
    );
    if (!isYes) return;

    if (!currentUser) {
      toast.error(
        "ユーザー情報が取得できません。もう一度サインインし直して下さい。"
      );
      return;
    }
    deleteAccount(
      { sk: currentUser.sk, uuid: currentUser.uuid },
      {
        onSuccess: () => {
          disposeUser();
          toast.success("アカウントを削除しました。");
          router.push(ROUTER.SIGN_IN);
        },
        onError: (error) =>
          handleError(error, "アカウントの削除に失敗しました。"),
      }
    );
  };

  const handleGoToEdit = () => {
    router.push(`${ROUTER.PROFILE}/${uuid}/edit`);
  };

  return {
    profile,
    isLoading,
    isError,
    refetch,
    isSameUser,
    handleGoToEdit,
    handleDeleteAccount,
    isDeleting,
  };
};
