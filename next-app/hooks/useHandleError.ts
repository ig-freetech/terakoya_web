import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { ErrorData } from "@apis/common";
import { ROUTER } from "@app/links";
import { useUserStore } from "@stores/user";

export const useHandleError = () => {
  const router = useRouter();
  const { disposeUser } = useUserStore();

  const handleError = (error: unknown, errMsg?: string) => {
    if (error instanceof ErrorData) {
      const err = error as ErrorData;
      toast.error(`${errMsg ?? "エラーが発生しました。"}\n${err.detail}`);

      const isUnauthorized = err.statusCode === 401;
      if (isUnauthorized) {
        disposeUser();
        router.push(ROUTER.SIGN_IN);
      }
      return;
    }
    toast.error(`エラーが発生しました。\n${error}`);
  };

  return {
    handleError,
  };
};
