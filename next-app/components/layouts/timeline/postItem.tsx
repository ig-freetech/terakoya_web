import Image from "next/image";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { HiOutlineUserCircle, HiOutlineChatAlt2 } from "react-icons/hi";

import { Post } from "@apis/(timeline)/common";
import {
  FlexColBox,
  FlexHorAlignCenterBox,
  FlexHorSpaceBetweenBox,
  MarginBox,
} from "@components/elements/box";
import { BlackDivider } from "@components/elements/divider";
import { AtomTransparentLightBrownPaper } from "@components/elements/paper";
import {
  BoldText,
  TextIndigo,
  TextPrimaryBlack,
  SmallTextDarkGray,
} from "@components/elements/text";
import {
  cvtTimestampToJstDayjs,
  ISO_FORMAT_WITH_TIME,
  TODAY_JST,
} from "@utils/datetime";

type Props = {
  post: Post;
};

export const PostItem = ({ post }: Props) => {
  const {
    user_name: userName,
    user_profile_img_url: userProfileImageUrl,
    texts,
    comment_count: commentCount,
    reactions,
    timestamp,
  } = post;

  const LIKE = 1;
  const BAD = 2;
  const likeCount = reactions.filter(
    (reaction) => reaction.type == LIKE
  ).length;
  const badCount = reactions.filter((reaction) => reaction.type == BAD).length;

  const dayjsPostedTime = cvtTimestampToJstDayjs(timestamp);
  const datetime = dayjsPostedTime.format(ISO_FORMAT_WITH_TIME);
  const diffDays = TODAY_JST.diff(dayjsPostedTime, "day");
  const diffHours = TODAY_JST.diff(dayjsPostedTime, "hour");
  const diffMinutes = TODAY_JST.diff(dayjsPostedTime, "minute");
  const diffSeconds = TODAY_JST.diff(dayjsPostedTime, "second");
  const postedAt =
    diffDays > 0
      ? `${diffDays}d`
      : diffHours > 0
      ? `${diffHours}h`
      : diffMinutes > 0
      ? `${diffMinutes}m`
      : `${diffSeconds}s`;
  return (
    <AtomTransparentLightBrownPaper>
      <FlexColBox>
        <FlexHorSpaceBetweenBox>
          <FlexHorAlignCenterBox>
            {userProfileImageUrl ? (
              <Image alt="userIcon" src={userProfileImageUrl} />
            ) : (
              <HiOutlineUserCircle size={20} />
            )}
            <MarginBox marginLeftPx={10}>
              <TextPrimaryBlack>{userName}</TextPrimaryBlack>
            </MarginBox>
          </FlexHorAlignCenterBox>
          <SmallTextDarkGray>{postedAt} ago</SmallTextDarkGray>
        </FlexHorSpaceBetweenBox>
        <MarginBox marginTopPx={10}>
          <BlackDivider />
        </MarginBox>
        <MarginBox marginTopPx={10}>
          <BoldText>{texts}</BoldText>
          <MarginBox marginTopPx={10}>
            <SmallTextDarkGray>{datetime}</SmallTextDarkGray>
          </MarginBox>
        </MarginBox>
        <MarginBox marginTopPx={10}>
          <FlexHorSpaceBetweenBox>
            <FlexHorAlignCenterBox>
              <HiOutlineChatAlt2 size={20} />
              <MarginBox marginLeftPx={5}>
                <TextIndigo>{commentCount}</TextIndigo>
              </MarginBox>
            </FlexHorAlignCenterBox>
            <FlexHorAlignCenterBox>
              <AiOutlineLike size={20} />
              <MarginBox marginLeftPx={5}>
                <TextIndigo>{likeCount}</TextIndigo>
              </MarginBox>
              <MarginBox marginLeftPx={10}>
                <FlexHorAlignCenterBox>
                  <AiOutlineDislike size={20} />
                  <MarginBox marginLeftPx={5}>
                    <TextIndigo>{badCount}</TextIndigo>
                  </MarginBox>
                </FlexHorAlignCenterBox>
              </MarginBox>
            </FlexHorAlignCenterBox>
          </FlexHorSpaceBetweenBox>
        </MarginBox>
      </FlexColBox>
    </AtomTransparentLightBrownPaper>
  );
};
