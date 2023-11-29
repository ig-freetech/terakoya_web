import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

import {
  useFetchPost,
  useFetchCommentList,
  useSubmitComment,
  usePutReactionToComment,
  usePutReactionToPost,
  UsePutReactionToCommentArgs,
} from "@apis/(timeline)";
import { Comment, REACTION_TYPE } from "@apis/(timeline)/type";
import { ROUTER } from "@app/links";
import { toggleReaction } from "@domains/timeline/utils";
import { useHandleError } from "@hooks/useHandleError";
import { useUserStore } from "@stores/user";

export const usePostTimeline = (postId: string) => {
  const {
    data: post,
    isLoading: isFetchingPost,
    isError: isErrorFetchingPost,
    refetch: refetchPost,
  } = useFetchPost(postId);

  const [lastEvaluatedTimestamp, setLastTimestamp] = useState<number | null>();
  const [lastEvaluatedCommentId, setLastCommentId] = useState<string | null>();
  const [commentList, setCommentList] = useState<Array<Comment>>([]);

  const { handleError } = useHandleError();
  const {
    data: fetchedCommentList,
    isLoading: isFetchingCommentList,
    isError: isErrorFetchingCommentList,
    refetch: refetchCommentList,
  } = useFetchCommentList(
    postId,
    lastEvaluatedTimestamp,
    lastEvaluatedCommentId,
    {
      onSuccess(data) {
        setLastTimestamp(data.last_evaluated_timestamp);
        setLastCommentId(data.last_evaluated_id);
        setCommentList((prev) => [...prev, ...data.items]);
      },
      onError: (error) => handleError(error, "コメントの取得に失敗しました。"),
    }
  );

  const refetchInitialCommentList = () => {
    setCommentList([]);
    setLastTimestamp(undefined);
    refetchCommentList();
  };

  useEffect(() => {
    if (
      commentList.length === 0 &&
      fetchedCommentList?.items &&
      fetchedCommentList.items.length > 0
    ) {
      setCommentList(fetchedCommentList.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();
  const { user } = useUserStore();

  const [toggledReactionPost, setToggledReactionPost] = useState(post);

  useEffect(() => {
    setToggledReactionPost(post);
  }, [post]);

  const { mutate: putReactionToPost } = usePutReactionToPost();
  const handleReactionToPost = (postId: string) => {
    if (!user) {
      toast.error(
        "リアクションするにはサインインが必要です。サインインしてください。"
      );
      router.push(ROUTER.SIGN_IN);
      return;
    }

    putReactionToPost(
      {
        postId: postId,
        reqBody: {
          uuid: user.uuid,
          type: REACTION_TYPE.LIKE,
        },
      },
      {
        onSuccess() {
          setToggledReactionPost((prev) => {
            if (!prev) return;
            return toggleReaction(prev, user.uuid);
          });
        },
        onError: (error) => handleError(error),
      }
    );
  };

  const { mutate: putReactionToComment } = usePutReactionToComment();

  const [
    currentToggledReactionCommentList,
    setCurrentToggledReactionCommentList,
  ] = useState<Array<Comment>>([]);

  useEffect(() => {
    setCurrentToggledReactionCommentList(commentList);
  }, [commentList]);

  const handleReactionToComment = (commentId: string) => {
    if (!user) {
      toast.error(
        "リアクションするにはサインインが必要です。サインインしてください。"
      );
      router.push(ROUTER.SIGN_IN);
      return;
    }

    const args: UsePutReactionToCommentArgs = {
      commentId: commentId,
      reqBody: {
        uuid: user.uuid,
        type: REACTION_TYPE.LIKE,
      },
    };

    putReactionToComment(args, {
      onSuccess() {
        const newToggledCommentList = currentToggledReactionCommentList.map(
          (comment) => {
            if (comment.comment_id === commentId) {
              return toggleReaction(comment, user.uuid);
            }
            return comment;
          }
        );

        setCurrentToggledReactionCommentList(newToggledCommentList);
      },
      onError(error) {
        handleError(error, "リアクションに失敗しました。");
      },
    });
  };

  return {
    toggledReactionPost,
    isFetchingPost,
    isErrorFetchingPost,
    refetchPost,
    currentToggledReactionCommentList,
    handleReactionToPost,
    handleReactionToComment,
    isFetchingCommentList,
    isErrorFetchingCommentList,
    refetchInitialCommentList,
  };
};

export const usePostComment = (
  postId: string,
  refetchPost: () => void,
  refetchInitialCommentList: () => void
) => {
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
          .trim() // Remove space and break-line from the head and tail of the inputted string.
          .min(1, "1文字以上入力してください。")
          .matches(/^(?!\s*$).+/, "空白文字または改行のみの入力はできません。"),
      })
    ),
  });

  const { user } = useUserStore();

  const { mutate: submitComment, isLoading: isSubmittingComment } =
    useSubmitComment();
  const { handleError } = useHandleError();
  const onSubmitComment = handleSubmit((inputs) => {
    if (!user) {
      toast.error(
        "コメントするにはサインインが必要です。サインインしてください。"
      );
      router.push(ROUTER.SIGN_IN);
      return;
    }

    if (errors.texts?.message) {
      toast.error(errors.texts.message);
      return;
    }

    submitComment(
      {
        uuid: user.uuid,
        user_name: user.name,
        // user_profile_img_url: user.profile_img_url,
        user_profile_img_url: "",
        texts: inputs.texts,
        post_id: postId,
      },
      {
        onSuccess() {
          toast.success("コメントしました。");
          reset();
          refetchPost();
          refetchInitialCommentList();
        },
        onError: (error) => handleError(error),
      }
    );
  });

  return {
    onSubmitComment,
    isSubmittingComment,
    errorText: errors?.texts?.message,
    register,
  };
};
