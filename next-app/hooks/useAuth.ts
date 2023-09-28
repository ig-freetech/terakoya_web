import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ROUTER } from "@app/links";
import { useUserStore } from "@stores/user";

export const useRedirectToSignIn = () => {
  const router = useRouter();
  const isSignedIn = useUserStore((state) => state.isSignedIn);

  useEffect(() => {
    if (!isSignedIn) {
      router.push(ROUTER.SIGN_IN);
    }
  }, [isSignedIn, router]);
};
