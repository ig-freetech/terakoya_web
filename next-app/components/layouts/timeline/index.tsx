/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import Linkify from "linkify-react";
import Image from "next/image";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { HiOutlineUserCircle, HiOutlineChatAlt2 } from "react-icons/hi";

// https://www.npmjs.com/package/linkify-react
// https://qiita.com/yuikoito/items/d5cb63263f5726808cd2

import { Comment, Post, TimelineBase } from "@apis/(timeline)/type";
import {
  FlexColBox,
  FlexHorAlignCenterBox,
  FlexHorSpaceBetweenBox,
  MarginBox,
} from "@components/elements/box";
import { BlackDivider } from "@components/elements/divider";
import { AtomTransparentLightBrownPaper } from "@components/elements/paper";
import {
  BoldWrapText,
  TextIndigo,
  TextPrimaryBlack,
  SmallTextDarkGray,
} from "@components/elements/text";
import {
  cvtTimestampToJstDayjs,
  ISO_FORMAT_WITH_TIME,
  TODAY_JST,
} from "@utils/datetime";
import Link from "next/link";
import { ROUTER } from "@app/links";

type Props = {
  timelineItem: TimelineBase;
  /**For only PostItem */
  commentCountChildren?: React.ReactNode;
};

const TimelineItem = ({ timelineItem, commentCountChildren }: Props) => {
  const {
    user_name: userName,
    user_profile_img_url: userProfileImageUrl,
    texts,
    reactions,
    timestamp,
  } = timelineItem;

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
              <HiOutlineUserCircle size={30} />
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
          <BoldWrapText
            css={css`
              // break-all is to breaks lines at any character
              // https://developer.mozilla.org/ja/docs/Web/CSS/word-break#break-all
              word-break: break-all;
            `}
          >
            <Linkify>{texts}</Linkify>
          </BoldWrapText>
          <MarginBox marginTopPx={10}>
            <SmallTextDarkGray>{datetime}</SmallTextDarkGray>
          </MarginBox>
        </MarginBox>
        <MarginBox marginTopPx={10}>
          <FlexHorSpaceBetweenBox>
            {commentCountChildren}
            <FlexHorAlignCenterBox>
              <AiOutlineLike size={20} />
              <MarginBox marginLeftPx={5}>
                <TextPrimaryBlack>{likeCount}</TextPrimaryBlack>
              </MarginBox>
              <MarginBox marginLeftPx={10}>
                <FlexHorAlignCenterBox>
                  <AiOutlineDislike size={20} />
                  <MarginBox marginLeftPx={5}>
                    <TextPrimaryBlack>{badCount}</TextPrimaryBlack>
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

type PostItemProps = {
  post: Post;
  isLinkable?: boolean;
};
export const PostItem = ({ post, isLinkable }: PostItemProps) => {
  const Content = () => (
    <TimelineItem
      timelineItem={post}
      commentCountChildren={
        <FlexHorAlignCenterBox>
          <HiOutlineChatAlt2 size={20} />
          <MarginBox marginLeftPx={5}>
            <TextPrimaryBlack>{post.comment_count}</TextPrimaryBlack>
          </MarginBox>
        </FlexHorAlignCenterBox>
      }
    />
  );
  return isLinkable ? (
    <Link
      href={`${ROUTER.POST}/${post.post_id}`}
      css={css`
        text-decoration: none; // Remove default link underline
        color: inherit; // Remove default link color: ;
      `}
    >
      <Content />
    </Link>
  ) : (
    <Content />
  );
};

type CommentItemProps = {
  comment: Comment;
};
export const CommentItem = ({ comment }: CommentItemProps) => (
  <TimelineItem timelineItem={comment} />
);
