import { useMemo } from "react";

import { TimelineBase } from "@apis/(timeline)/type";
import { useUserStore } from "@stores/user";

export const useReactionToggle = <T extends TimelineBase>(item: T) => {
  const { user } = useUserStore();

  const isCurrentUserLiked = useMemo(() => {
    if (!user) return false;
    return item.reactions.some((r) => r.uuid === user.uuid);
  }, [item, user]);

  return {
    isCurrentUserLiked,
  };
};
