/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";

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
  ${flexHorCentered}
  flex-direction: column;
`;
export const FlexColSpaceBetweenBox = styled.div`
  ${flexHorSpaceBetween}
  flex-direction: column;
`;
export const FlexColStartLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

type MarginBoxProps = {
  marginTopPx?: number;
  marginLeftPx?: number;
  marginBottomPx?: number;
  isWidthMax?: boolean;
  children?: React.ReactNode;
};
export const MarginBox = ({
  marginTopPx,
  marginLeftPx,
  marginBottomPx,
  isWidthMax,
  children,
}: MarginBoxProps) => (
  <div
    css={css`
      margin-top: ${marginTopPx || 0}px;
      margin-left: ${marginLeftPx || 0}px;
      margin-bottom: ${marginBottomPx || 0}px;
      // width: 100% includes padding and border but auto does not.
      // https://zenn.dev/k_kazukiiiiii/articles/f6eaa24ce0ae9f
      width: ${isWidthMax ? "100%" : "auto"};
    `}
  >
    {children}
  </div>
);
