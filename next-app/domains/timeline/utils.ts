import { REACTION_TYPE, TimelineBase } from "@apis/(timeline)/type";

export const toggleReaction = <T extends TimelineBase>(
  item: T,
  uuid: string
) => {
  const alreadyToggled = item.reactions.some((r) => r.uuid === uuid);
  return {
    ...item,
    reactions: alreadyToggled
      ? item.reactions.filter((r) => r.uuid !== uuid)
      : [...item.reactions, { uuid, type: REACTION_TYPE.LIKE }],
  };
};
