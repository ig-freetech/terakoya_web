import { useRouter } from "next/navigation";

import { ROUTER } from "@app/links";
import { useUser } from "@hooks/user/useUser";
import { useUserStore } from "@stores/user";

export const useProfile = (uuid: string) => {
  const router = useRouter();
  const handleGoToEdit = () => {
    router.push(`${ROUTER.PROFILE}/${uuid}/edit`);
  };

  const { user: currentUser } = useUserStore();
  const { user: fetchedUser, isLoading, isError, refetch } = useUser(uuid);
  const isSameUser = currentUser?.uuid === uuid;

  return {
    fetchedUser,
    isLoading,
    isError,
    refetch,
    isSameUser,
    handleGoToEdit,
  };
};
