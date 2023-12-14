import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { usePutReactionToPost } from "@apis/(timeline)";
import { Post, REACTION_TYPE } from "@apis/(timeline)/type";
import { ROUTER } from "@app/links";
import { toggleReaction } from "@domains/timeline/utils";
import { useHandleError } from "@hooks/useHandleError";
import { useUserStore } from "@stores/user";

export const usePutReaction = (postItemList: Array<Post>) => {
  const { user } = useUserStore();
  const router = useRouter();

  const [currentToggledPostList, setCurrentToggledPostList] =
    useState<Array<Post>>(postItemList);

  useEffect(() => {
    setCurrentToggledPostList(postItemList);
  }, [postItemList]);

  const { handleError } = useHandleError();
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
          const newToggledPostList = currentToggledPostList.map((post) => {
            if (post.post_id === postId) {
              return toggleReaction(post, user.uuid);
            }
            return post;
          });

          setCurrentToggledPostList(newToggledPostList);
        },
        onError: (error) => handleError(error),
      }
    );
  };

  return {
    currentToggledPostList,
    handleReactionToPost,
  };
};
