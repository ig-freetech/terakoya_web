/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";

import { FlexColBox } from "@components/elements/box";
import { InternalLink } from "@components/elements/link";
import TerakoyaLogo from "@components/elements/logo";
import { colors } from "@styles/colors";
import { flexSpaceBetween, borderBottom, clickable } from "@styles/utils";

const StyledHeader = styled.header`
  ${flexSpaceBetween}
  ${borderBottom}
  padding: 20px;
`;

type HeaderProps = {
  handleHamburgerIconClick: () => void;
};
export default function Header(props: HeaderProps) {
  const { handleHamburgerIconClick } = props;
  return (
    <StyledHeader>
      <FlexColBox
        css={css`
          ${clickable}
        `}
        onClick={handleHamburgerIconClick}
      >
        <RxHamburgerMenu size={30} />
        <div>メニュー</div>
      </FlexColBox>
      <TerakoyaLogo />
      <InternalLink path="/profile">
        <FlexColBox
          css={css`
            color: ${colors.primaryBlack};
          `}
        >
          <HiOutlineUserCircle size={30} />
          <div>プロフィール</div>
        </FlexColBox>
      </InternalLink>
    </StyledHeader>
  );
}
