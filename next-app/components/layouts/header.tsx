/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
// import NextImage from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";

import { ROUTER } from "@app/links";
import { FlexColCenteredBox } from "@components/elements/box";
import { DarkBrownInternalLink } from "@components/elements/link";
import TerakoyaLogo from "@components/elements/logo";
import { useUserStore } from "@stores/user";
import { colors } from "@styles/colors";
import { flexHorSpaceBetween, borderBottom, clickable } from "@styles/utils";

const StyledHeader = styled.header`
  ${flexHorSpaceBetween}
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
      <DarkBrownInternalLink href={profilePath}>
        <FlexColCenteredBox
          css={css`
            color: ${colors.primaryBlack};
          `}
        >
          {user?.user_profile_img_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user?.user_profile_img_url}
              alt="プロフィール画像"
              width={30}
              height={30}
            />
          ) : (
            <HiOutlineUserCircle size={30} />
          )}
          <span>プロフィール</span>
        </FlexColCenteredBox>
      </DarkBrownInternalLink>
    </StyledHeader>
  );
}
