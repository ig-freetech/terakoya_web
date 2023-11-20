import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useFetchPost, useFetchCommentList } from "@apis/(timeline)";
import { Comment } from "@apis/(timeline)/type";

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
  const {
    data,
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
      onError(error) {
        toast.error(`エラーが発生しました。\n${error}`);
      },
    }
  );

  useEffect(() => {
    if (commentList.length === 0 && data?.items && data.items.length > 0) {
      setCommentList(data.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    post,
    isFetchingPost,
    isErrorFetchingPost,
    refetchPost,
    commentList,
    isFetchingCommentList,
    isErrorFetchingCommentList,
    refetchCommentList,
  };
};
