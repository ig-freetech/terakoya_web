/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";

import { ROUTER } from "@app/links";
import { FlexColCenteredBox } from "@components/elements/box";
import { InternalLink } from "@components/elements/link";
import TerakoyaLogo from "@components/elements/logo";
import { colors } from "@styles/colors";
import { flexSpaceBetween, borderBottom, clickable } from "@styles/utils";
import { useUserStore } from "@stores/user";
import { useEffect, useState } from "react";

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
  const [profilePath, setProfilePath] = useState<string>(ROUTER.SIGN_IN);
  const { user, isLoggedIn } = useUserStore();
  useEffect(() => {
    if (isLoggedIn && user) {
      setProfilePath(ROUTER.PROFILE + `/${user.uuid}`);
    }
  }, [isLoggedIn, user]);
  return (
    <StyledHeader>
      <FlexColCenteredBox
        css={css`
          ${clickable}
        `}
        onClick={handleHamburgerIconClick}
      >
        <RxHamburgerMenu size={30} />
        <span>メニュー</span>
      </FlexColCenteredBox>
      <TerakoyaLogo />
      <InternalLink path={profilePath}>
        <FlexColCenteredBox
          css={css`
            color: ${colors.primaryBlack};
          `}
        >
          <HiOutlineUserCircle size={30} />
          <span>プロフィール</span>
        </FlexColCenteredBox>
      </InternalLink>
    </StyledHeader>
  );
}
