import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useFetchUserPostList } from "@apis/(timeline)";
import { Post } from "@apis/(timeline)/type";
import { useDeleteAccount } from "@apis/(user)/auth";
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

  const [lastEvaluatedTimestamp, setLastTimestamp] = useState<number | null>();
  const [lastEvaluatedPostId, setLastPostId] = useState<string | null>();
  const [postList, setPostList] = useState<Array<Post>>([]);
  const {
    data: fetchedPostListResponse,
    isLoading: isFetchingPostList,
    isError: isErrorFetchingPostList,
    refetch: refetchPostList,
  } = useFetchUserPostList(uuid, lastEvaluatedTimestamp, lastEvaluatedPostId, {
    onSuccess: (data) => {
      setPostList((prev) => [...prev, ...data.items]);
      setLastTimestamp(data.last_evaluated_timestamp);
      setLastPostId(data.last_evaluated_id);
    },
    onError: (error) =>
      handleError(error, "タイムラインの取得に失敗しました。"),
  });

  const refetchInitialPostList = () => {
    setPostList([]);
    setLastTimestamp(undefined);
    setLastPostId(undefined);
    refetchPostList();
  };

  const hasFetchedAllPosts = useMemo(
    () =>
      postList.length > 0 && !lastEvaluatedTimestamp && !lastEvaluatedPostId,
    [postList, lastEvaluatedTimestamp, lastEvaluatedPostId]
  );

  const fetch = useCallback(() => {
    if (hasFetchedAllPosts) return;

    // Fetch more posts if scrolling to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight
    ) {
      refetchPostList();
    }
  }, [hasFetchedAllPosts, refetchPostList]);

  useEffect(() => {
    window.addEventListener("scroll", fetch);
    // Remove event listeners on cleanup when unmounted
    return () => {
      window.removeEventListener("scroll", fetch);
    };
  }, [fetch]);

  useEffect(() => {
    if (
      postList.length === 0 &&
      fetchedPostListResponse?.items &&
      fetchedPostListResponse.items.length > 0
    ) {
      setPostList(fetchedPostListResponse.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    postList,
    isFetchingPostList,
    isErrorFetchingPostList,
    refetchInitialPostList,
  };
};
