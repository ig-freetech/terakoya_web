/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { SwipeableDrawer, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useSignOut } from "@apis/(user)/auth";
import { ROUTER } from "@app/links";
import { MarginBox } from "@components/elements/box";
import { InternalLink } from "@components/elements/link";
import { Loading } from "@components/elements/loading";
import TerakoyaLogo from "@components/elements/logo";
import {
  BoldDangerText,
  BoldSuccessText,
  BoldText,
} from "@components/elements/text";
import { useUserStore } from "@stores/user";
import { flexCenteredContent, borderRight, clickable } from "@styles/utils";

type MenuItemProps = {
  path: string;
  text: string;
};
const MenuItem = (props: MenuItemProps) => {
  const { path, text } = props;
  return (
    <div
      css={css`
        margin-top: 10px;
      `}
    >
      <InternalLink path={path}>
        <BoldText>{text}</BoldText>
      </InternalLink>
    </div>
  );
};
const MENU_ITEM_PROPS_LIST: MenuItemProps[] = [
  {
    path: ROUTER.BOOK,
    text: "カフェ塾テラコヤ参加予約",
  },
];

const StyledSidebarContent = styled("div")`
  ${flexCenteredContent}
  ${borderRight}
  flex-direction: column;
  padding: 20px;
`;

type SidebarProps = {
  drawerOpen: boolean;
  handleHamburgerIconClick: () => void;
};
export default function Sidebar(props: SidebarProps) {
  const { drawerOpen, handleHamburgerIconClick } = props;
  const router = useRouter();
  const { mutate: signOut, isLoading } = useSignOut();
  const { disposeUser, isLoggedIn } = useUserStore();
  const handleSignOut = () => {
    const dummyRequestBody = undefined;
    signOut(dummyRequestBody, {
      onSuccess: () => {
        disposeUser();
        toast.success("ログアウトしました。");
      },
      onError: (error) => {
        toast.error(`エラーが発生しました。\n${error}`);
      },
    });
  };
  const handleSignIn = () => {
    router.push(ROUTER.SIGN_IN);
  };

  return (
    // https://mui.com/material-ui/react-drawer/#swipeable
    <SwipeableDrawer
      anchor="left" // Fixed to left
      open={drawerOpen}
      onOpen={handleHamburgerIconClick}
      onClose={handleHamburgerIconClick}
    >
      <StyledSidebarContent>
        <TerakoyaLogo isNotClickable={true} />
        {/**https://mui.com/material-ui/react-divider/ */}
        <Divider />
        <MarginBox marginTopPx={20} />
        {MENU_ITEM_PROPS_LIST.map((props, index) => (
          <MenuItem key={index} {...props} />
        ))}
        <MarginBox marginTopPx={20} />
        <Divider />
        <MarginBox marginTopPx={20} />
        {isLoading ? (
          <Loading />
        ) : isLoggedIn ? (
          <BoldSuccessText
            css={css`
              ${clickable}
            `}
            onClick={handleSignIn}
          >
            サインイン
          </BoldSuccessText>
        ) : (
          <BoldDangerText
            css={css`
              ${clickable}
            `}
            onClick={handleSignOut}
          >
            サインアウト
          </BoldDangerText>
        )}
      </StyledSidebarContent>
    </SwipeableDrawer>
  );
}
