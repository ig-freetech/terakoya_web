import { useState } from "react";
import toast from "react-hot-toast";

import { Post } from "@apis/(timeline)/common";
import { useFetchAllPostList } from "@apis/(timeline)/postList";

export const useTimeline = () => {
  const [lastEvaluatedTimestamp, setLastTimestamp] = useState<number>();
  const [postList, setPostList] = useState<Array<Post>>([]);
  const { isLoading, isError, refetch } = useFetchAllPostList(
    lastEvaluatedTimestamp,
    {
      onSuccess(data) {
        setPostList((prev) => [...prev, ...data.items]);
        setLastTimestamp(data.last_evaluated_timestamp);
      },
      onError(error) {
        toast.error(`エラーが発生しました。\n${error}`);
      },
    }
  );
  return {
    postList,
    isLoading,
    isError,
    refetch,
  };
};
