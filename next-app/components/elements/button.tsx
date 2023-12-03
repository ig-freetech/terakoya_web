import styled from "@emotion/styled";

import { BoldTextWhite, BoldTextIndigo } from "@components/elements/text";
import { colors } from "@styles/colors";
import { basicButton } from "@styles/utils";

const StyledDarkBrownButton = styled.button`
  ${basicButton}
  background-color: ${colors.darkBrown};
  // box-shadow: offset-x | offset-y | blur-radius | color
  // https://developer.mozilla.org/ja/docs/Web/CSS/box-shadow
  /* box-shadow: 5px 5px 5px 0px ${colors.gray}; */
`;
type ButtonProps = {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit";
};
export const DarkBrownButton = ({
  children,
  onClick,
  type,
  disabled,
}: ButtonProps) => {
  return (
    <StyledDarkBrownButton onClick={onClick} type={type} disabled={disabled}>
      <BoldTextWhite>{children}</BoldTextWhite>
    </StyledDarkBrownButton>
  );
};
const StyledIndigoSecondaryButton = styled.button`
  ${basicButton}
  border: 1px solid ${colors.indigo};
  background-color: ${colors.white};
`;
export const IndigoSecondaryButton = ({
  children,
  onClick,
  type,
  disabled,
}: ButtonProps) => {
  return (
    <StyledIndigoSecondaryButton
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <BoldTextIndigo>{children}</BoldTextIndigo>
    </StyledIndigoSecondaryButton>
  );
};

export const GrayButton = styled.button`
  ${basicButton}
  background-color: ${colors.gray};
`;
