/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { colors } from "@styles/colors";

const BaseDividerStyle = css`
  width: 100%;
  height: 1px;
`;

export const GrayDivider = styled.div`
  ${BaseDividerStyle}
  background-color: ${colors.gray};
`;
export const BlackDivider = styled.div`
  ${BaseDividerStyle}
  background-color: ${colors.primaryBlack};
`;
