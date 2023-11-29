/** @jsxImportSource @emotion/react */

"use client";

import { css } from "@emotion/react";
import Linkify from "linkify-react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { HiOutlineUserCircle, HiOutlineChatAlt2 } from "react-icons/hi";

// https://www.npmjs.com/package/linkify-react
// https://qiita.com/yuikoito/items/d5cb63263f5726808cd2

import {
  Comment,
  Post,
  TimelineBase,
  REACTION_TYPE,
} from "@apis/(timeline)/type";
import { ROUTER } from "@app/links";
import {
  FlexColBox,
  FlexHorAlignCenterBox,
  FlexHorBox,
  FlexHorSpaceBetweenBox,
  MarginBox,
} from "@components/elements/box";
import { BlackDivider } from "@components/elements/divider";
import {
  AtomTransparentIndigoPaper,
  AtomTransparentLightBrownPaper,
} from "@components/elements/paper";
import {
  BoldWrapText,
  TextPrimaryBlack,
  SmallTextDarkGray,
} from "@components/elements/text";
import { colors } from "@styles/colors";
import { clickable } from "@styles/utils";
import {
  cvtTimestampToJstDayjs,
  ISO_FORMAT_WITH_TIME,
  TODAY_JST,
} from "@utils/datetime";

import { useReactionToggle } from "./hook";

type Props = {
  timelineItem: TimelineBase;
  onClickLike: () => void;
  /**For only PostItem */
  commentCountChildren?: React.ReactNode;
  isComment?: boolean;
};

const TimelineItem = ({
  timelineItem,
  onClickLike,
  commentCountChildren,
  isComment,
}: Props) => {
  const {
    user_name: userName,
    user_profile_img_url: userProfileImageUrl,
    texts,
    reactions,
    timestamp,
  } = timelineItem;

  const likeCount = reactions.filter(
    (reaction) => reaction.type == REACTION_TYPE.LIKE
  ).length;
  const { isCurrentUserLiked } = useReactionToggle(timelineItem);
  const handleClickLike = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    // Prevent from triggering parent onClick event so that it can't move to the post page
    e.preventDefault();

    onClickLike();
  };
  // const badCount = reactions.filter(
  //   (reaction) => reaction.type == REACTION_TYPE.BAD
  // ).length;

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
  const fontSizeCss =
    isComment &&
    css`
      font-size: 14px;
    `;
  return (
    <FlexColBox>
      <FlexHorSpaceBetweenBox>
        <FlexHorAlignCenterBox>
          {userProfileImageUrl ? (
            <Image alt="userIcon" src={userProfileImageUrl} />
          ) : (
            <HiOutlineUserCircle size={isComment ? 20 : 30} />
          )}
          <MarginBox marginLeftPx={10}>
            <TextPrimaryBlack css={fontSizeCss}>{userName}</TextPrimaryBlack>
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
            ${fontSizeCss}
          `}
        >
          <Linkify>{texts}</Linkify>
        </BoldWrapText>
        <MarginBox marginTopPx={10}>
          <SmallTextDarkGray>{datetime}</SmallTextDarkGray>
        </MarginBox>
      </MarginBox>
      <MarginBox marginTopPx={10}>
        <FlexHorBox
          css={css`
            justify-content: ${isComment ? "flex-end" : "space-between"};
          `}
        >
          {commentCountChildren}
          <FlexHorAlignCenterBox
            css={css`
              color: ${isCurrentUserLiked
                ? colors.success
                : colors.primaryBlack};
            `}
          >
            <AiOutlineLike
              size={20}
              onClick={handleClickLike}
              css={css`
                ${clickable}
                &:hover {
                  color: ${colors.success};
                }
              `}
            />
            <MarginBox marginLeftPx={5}>
              <span css={fontSizeCss}>{likeCount}</span>
            </MarginBox>
            {/* <MarginBox marginLeftPx={10}>
              <FlexHorAlignCenterBox>
                <AiOutlineDislike size={20} />
                <MarginBox marginLeftPx={5}>
                  <TextPrimaryBlack css={fontSizeCss}>
                    {badCount}
                  </TextPrimaryBlack>
                </MarginBox>
              </FlexHorAlignCenterBox>
            </MarginBox> */}
          </FlexHorAlignCenterBox>
        </FlexHorBox>
      </MarginBox>
    </FlexColBox>
  );
};

type PostItemProps = {
  post: Post;
  onClickLike: () => void;
  isLinkable?: boolean;
};
export const PostItem = ({ post, onClickLike, isLinkable }: PostItemProps) => {
  const Content = () => (
    <AtomTransparentLightBrownPaper>
      <TimelineItem
        timelineItem={post}
        onClickLike={onClickLike}
        commentCountChildren={
          <FlexHorAlignCenterBox>
            <HiOutlineChatAlt2 size={20} />
            <MarginBox marginLeftPx={5}>
              <TextPrimaryBlack>{post.comment_count}</TextPrimaryBlack>
            </MarginBox>
          </FlexHorAlignCenterBox>
        }
      />
    </AtomTransparentLightBrownPaper>
  );
  return isLinkable ? (
    <Link
      href={`${ROUTER.POST}/${post.post_id}`}
      css={css`
        text-decoration: none; // Remove default link underline
        color: inherit; // Remove default link color
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
  onClickLike: () => void;
};
export const CommentItem = ({ comment, onClickLike }: CommentItemProps) => (
  <AtomTransparentIndigoPaper>
    <TimelineItem
      timelineItem={comment}
      isComment={true}
      onClickLike={onClickLike}
    />
  </AtomTransparentIndigoPaper>
);
