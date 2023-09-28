import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useDeleteAccount } from "@apis/(user)/auth";
import { ROUTER } from "@app/links";
import { useUser } from "@hooks/user/useUser";
import { useUserStore } from "@stores/user";

export const useProfile = (uuid: string) => {
  const router = useRouter();
  const handleGoToEdit = () => {
    router.push(`${ROUTER.PROFILE}/${uuid}/edit`);
  };

  const { user: currentUser, disposeUser } = useUserStore();
  const { user: fetchedUser, isLoading, isError, refetch } = useUser(uuid);
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
        onError: (error) => {
          toast.error(`アカウントの削除に失敗しました。${error}`);
        },
      }
    );
  };

  return {
    fetchedUser,
    isLoading,
    isError,
    refetch,
    isSameUser,
    handleGoToEdit,
    handleDeleteAccount,
    isDeleting,
  };
};
