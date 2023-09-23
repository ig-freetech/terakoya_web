import styled from "@emotion/styled";

import { BoldTextWhite } from "@components/elements/text";
import { colors } from "@styles/colors";
import { clickable, basicButton } from "@styles/utils";

const StyledDarkBrownButton = styled.button`
  ${clickable}
  ${basicButton}
  background-color: ${colors.darkBrown};
  // box-shadow: offset-x | offset-y | blur-radius | color
  // https://developer.mozilla.org/ja/docs/Web/CSS/box-shadow
  /* box-shadow: 5px 5px 5px 0px ${colors.gray}; */
`;
type DarkBrownButtonProps = {
  children: string;
  onClick: () => void;
  type?: "submit";
};
export const DarkBrownButton = (props: DarkBrownButtonProps) => {
  const { children, onClick, type } = props;
  return (
    <StyledDarkBrownButton onClick={onClick} type={type}>
      <BoldTextWhite>{children}</BoldTextWhite>
    </StyledDarkBrownButton>
  );
};
