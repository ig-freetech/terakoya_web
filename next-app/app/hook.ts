import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

import { useSubmitPost, useFetchAllPostList } from "@apis/(timeline)";
import { Post } from "@apis/(timeline)/type";
import { ROUTER } from "@app/links";
import { useHandleError } from "@hooks/useHandleError";
import { useUserStore } from "@stores/user";

export const useFetchTimeline = () => {
  const [lastEvaluatedTimestamp, setLastTimestamp] = useState<number | null>();
  const [lastEvaluatedPostId, setLastPostId] = useState<string | null>();
  const [postList, setPostList] = useState<Array<Post>>([]);

  const { handleError } = useHandleError();
  const {
    data,
    isLoading: isFetchingPostList,
    isError: isErrorFetchingPostList,
    refetch,
  } = useFetchAllPostList(lastEvaluatedTimestamp, lastEvaluatedPostId, {
    onSuccess(data) {
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
    refetch();
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
      refetch();
    }
  }, [hasFetchedAllPosts, refetch]);

  useEffect(() => {
    window.addEventListener("scroll", fetch);
    // Remove event listeners on cleanup when unmounted
    return () => {
      window.removeEventListener("scroll", fetch);
    };
  }, [fetch]);

  useEffect(() => {
    if (postList.length === 0 && data?.items && data.items.length > 0) {
      setPostList(data.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    postList,
    isFetchingPostList,
    isErrorFetchingPostList,
    refetchInitialPostList,
  };
};

export const usePostTimeline = (refetchInitialPostList: () => void) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      texts: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        texts: yup
          .string()
          .required("投稿内容を5文字以上で入力してください。")
          .min(5, "5文字以上入力してください。"),
      })
    ),
  });

  const { user } = useUserStore();

  const { mutate: submitPost, isLoading: isSubmittingPost } = useSubmitPost();
  const { handleError } = useHandleError();
  const onSubmitPost = handleSubmit((inputs) => {
    if (!user) {
      toast.error(
        "タイムラインに投稿するにはサインインが必要です。サインインしてください。"
      );
      router.push(ROUTER.SIGN_IN);
      return;
    }

    if (errors.texts?.message) {
      toast.error(errors.texts.message);
      return;
    }

    submitPost(
      {
        uuid: user.uuid,
        user_name: user.name,
        user_profile_img_url: user.user_profile_img_url ?? "",
        texts: inputs.texts,
      },
      {
        onSuccess() {
          toast.success("投稿しました。");
          reset();
          refetchInitialPostList();
        },
        onError: (error) => handleError(error, "投稿に失敗しました。"),
      }
    );
  });
  return {
    onSubmitPost,
    isSubmittingPost,
    errorText: errors?.texts?.message,
    register,
  };
};
