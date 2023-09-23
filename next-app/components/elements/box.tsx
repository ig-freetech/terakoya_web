/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { flexCenteredContent, flexSpaceBetween } from "@styles/utils";

export const FlexHorCenteredBox = styled.div`
  ${flexCenteredContent}
`;
export const FlexColCenteredBox = styled.div`
  ${flexCenteredContent}
  flex-direction: column;
`;

export const FlexHorSpaceBetweenBox = styled.div`
  ${flexSpaceBetween}
`;
export const FlexColSpaceBetweenBox = styled.div`
  ${flexSpaceBetween}
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
};
export const MarginBox = (props: MarginBoxProps) => {
  const { marginTopPx, marginLeftPx } = props;
  return (
    <div
      css={css`
        margin-top: ${marginTopPx || 0}px;
        margin-left: ${marginLeftPx || 0}px;
      `}
    />
  );
};
