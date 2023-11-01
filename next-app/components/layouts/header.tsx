/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";

import { ROUTER } from "@app/links";
import { FlexColCenteredBox } from "@components/elements/box";
import { InternalLink } from "@components/elements/link";
import TerakoyaLogo from "@components/elements/logo";
import { useUserStore } from "@stores/user";
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
  const [profilePath, setProfilePath] = useState<string>(ROUTER.SIGN_IN);
  const { user, isSignedIn } = useUserStore();
  useEffect(() => {
    if (isSignedIn && user) {
      setProfilePath(ROUTER.PROFILE + `/${user.uuid}`);
    }
  }, [isSignedIn, user]);
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
