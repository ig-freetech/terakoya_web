/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

import {
  flexCol,
  flexHor,
  flexHorAlignCentered,
  flexHorCentered,
  flexHorSpaceBetween,
} from "@styles/utils";

export const FlexHorBox = styled.div`
  ${flexHor}
`;
export const FlexHorAlignCenterBox = styled.div`
  ${flexHorAlignCentered}
`;
export const FlexHorCenteredBox = styled.div`
  ${flexHorCentered}
`;
export const FlexHorSpaceBetweenBox = styled.div`
  ${flexHorSpaceBetween}
`;
export const FlexHorEndRightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const FlexColBox = styled.div`
  ${flexCol}
`;
export const FlexColCenteredBox = styled.div`
  ${flexCol}
  align-items: center;
  justify-content: center;
`;
export const FlexColSpaceBetweenBox = styled.div`
  ${flexCol}
  justify-content: space-between;
`;
export const FlexColStartLeftBox = styled.div`
  ${flexCol}
  align-items: flex-start;
  justify-content: center;
`;
export const FlexColEndRightBox = styled.div`
  ${flexCol}
  align-items: flex-end;
  justify-content: center;
`;

type MarginBoxProps = {
  marginTopPx?: number;
  marginLeftPx?: number;
  marginBottomPx?: number;
  marginRightPx?: number;
  isWidthMax?: boolean;
  children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>; // HTMLAttributes<HTMLDivElement> means all props of div element
export const MarginBox = ({
  marginTopPx,
  marginLeftPx,
  marginBottomPx,
  marginRightPx,
  isWidthMax,
  children,
  ...props
}: MarginBoxProps) => (
  <div
    {...props} // Pass all props of div element
    css={css`
      margin-top: ${marginTopPx || 0}px;
      margin-left: ${marginLeftPx || 0}px;
      margin-bottom: ${marginBottomPx || 0}px;
      margin-right: ${marginRightPx || 0}px;
      // width: 100% includes padding and border but auto does not.
      // https://zenn.dev/k_kazukiiiiii/articles/f6eaa24ce0ae9f
      width: ${isWidthMax ? "100%" : "auto"};
    `}
  >
    {children}
  </div>
);
