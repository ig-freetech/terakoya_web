/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { SwipeableDrawer } from "@mui/material";

import { InternalLink } from "@components/elements/link";
import TerakoyaLogo from "@components/elements/logo";
import {
  flexCenteredContent,
  borderRight,
  borderBottom,
  boldText,
} from "@styles/utils";

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
        <div
          css={css`
            ${boldText}
          `}
        >
          {text}
        </div>
      </InternalLink>
    </div>
  );
};
const MENU_ITEM_PROPS_LIST: MenuItemProps[] = [
  {
    path: "/book",
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
  return (
    // https://mui.com/material-ui/react-drawer/#swipeable
    <SwipeableDrawer
      anchor="left" // Fixed to left
      open={drawerOpen}
      onOpen={handleHamburgerIconClick}
      onClose={handleHamburgerIconClick}
    >
      <StyledSidebarContent>
        <div
          css={css`
            ${borderBottom}
          `}
        >
          <TerakoyaLogo isNotClickable={true} />
        </div>
        <div
          css={css`
            margin-top: 20px;
          `}
        />
        {MENU_ITEM_PROPS_LIST.map((props, index) => (
          <MenuItem key={index} {...props} />
        ))}
      </StyledSidebarContent>
    </SwipeableDrawer>
  );
}
