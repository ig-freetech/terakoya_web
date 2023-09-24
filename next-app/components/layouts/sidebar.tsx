/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { SwipeableDrawer, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useSignOut, useDeleteAccount } from "@apis/(user)/auth";
import { ROUTER } from "@app/links";
import { MarginBox } from "@components/elements/box";
import { InternalLink } from "@components/elements/link";
import { Loading } from "@components/elements/loading";
import TerakoyaLogo from "@components/elements/logo";
import {
  BoldDangerText,
  BoldSuccessText,
  BoldText,
  SmallTextDarkGray,
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
  const { user, disposeUser, isLoggedIn } = useUserStore();
  const handleSignOut = () => {
    signOut();
    disposeUser();
    router.push(ROUTER.SIGN_IN);
    toast.success("ログアウトしました。");
  };
  const handleSignIn = () => {
    router.push(ROUTER.SIGN_IN);
  };

  const { mutate: deleteAccount, isLoading: isDeleting } = useDeleteAccount();
  const handleDeleteAccount = () => {
    const isYes = window.confirm(
      "※本当にアカウントを削除しますか？\nこの操作は取り消すことができません。"
    );
    if (!isYes) return;

    if (!user) {
      toast.error(
        "ユーザー情報が取得できません。もう一度サインインし直して下さい。"
      );
      return;
    }
    deleteAccount(
      { sk: user.sk, uuid: user.uuid },
      {
        onSuccess: () => {
          disposeUser();
          toast.success("アカウントを削除しました。");
          router.push(ROUTER.SIGN_IN);
        },
        onError: (error) => {
          toast.error(`アカウントの削除に失敗しました。${error}`);
        },
      }
    );
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
        {user?.is_admin ? (
          <>
            <MarginBox marginTopPx={10} />
            <MenuItem path={ROUTER.MANAGE} text="予約情報管理画面" />
          </>
        ) : null}
        <MarginBox marginTopPx={20} />
        <Divider />
        <MarginBox marginTopPx={20} />
        {isLoggedIn ? (
          isLoading ? (
            <Loading />
          ) : (
            <BoldDangerText
              css={css`
                ${clickable}
              `}
              onClick={handleSignOut}
            >
              サインアウト
            </BoldDangerText>
          )
        ) : (
          <BoldSuccessText
            css={css`
              ${clickable}
            `}
            onClick={handleSignIn}
          >
            サインイン
          </BoldSuccessText>
        )}
        <MarginBox marginTopPx={20} />
        <Divider />
        <MarginBox marginTopPx={20} />
        {isLoggedIn ? (
          isDeleting ? (
            <Loading />
          ) : (
            <SmallTextDarkGray
              css={css`
                ${clickable}
              `}
              onClick={handleDeleteAccount}
            >
              アカウントを削除
            </SmallTextDarkGray>
          )
        ) : null}
      </StyledSidebarContent>
    </SwipeableDrawer>
  );
}
