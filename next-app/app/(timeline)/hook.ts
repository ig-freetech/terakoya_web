import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

import { useSubmitPost, useFetchAllPostList } from "@apis/(timeline)";
import { Post } from "@apis/(timeline)/type";
import { ROUTER } from "@app/links";
import { useUserStore } from "@stores/user";

export const useFetchTimeline = () => {
  const [lastEvaluatedTimestamp, setLastTimestamp] = useState<number | null>();
  const [lastEvaluatedPostId, setLastPostId] = useState<string | null>();
  const [postList, setPostList] = useState<Array<Post>>([]);
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
    onError(error) {
      toast.error(`エラーが発生しました。\n${error}`);
    },
  });
  const refetchInitialPostList = () => {
    setPostList([]);
    setLastTimestamp(undefined);
    refetch();
  };
  const hasFetchedAllPosts = useMemo(
    () =>
      postList.length > 0 && !lastEvaluatedTimestamp && !lastEvaluatedPostId,
    [postList, lastEvaluatedTimestamp, lastEvaluatedPostId]
  );
  const fetch = useCallback(() => {
    if (hasFetchedAllPosts) return;
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.offsetHeight
    )
      refetch();
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
    fetch,
    refetchInitialPostList,
  };
};

export const usePostTimeline = (refetchInitialPostList: () => void) => {
  const router = useRouter();
  const { user } = useUserStore();

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
          .required("投稿内容を10文字以上で入力してください。")
          .min(10, "10文字以上入力してください。"),
      })
    ),
  });

  const { mutate: submitPost, isLoading: isSubmittingPost } = useSubmitPost();
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
        // user_profile_img_url: user.profile_img_url,
        user_profile_img_url: "",
        texts: inputs.texts,
      },
      {
        onSuccess() {
          toast.success("投稿しました。");
          reset();
          refetchInitialPostList();
        },
        onError(error) {
          toast.error(`エラーが発生しました。\n${error}`);
        },
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
