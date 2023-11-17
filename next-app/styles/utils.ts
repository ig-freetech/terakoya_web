import { css } from "@emotion/react";

import { colors } from "@styles/colors";

/**Flexbox */
export const flexHor = css`
  display: flex;
  flex-direction: row;
`;
export const flexCol = css`
  display: flex;
  flex-direction: column;
`;
export const flexHorAlignCentered = css`
  ${flexHor};
  align-items: center;
`;
export const flexHorCentered = css`
  ${flexHorAlignCentered};
  justify-content: center;
`;
export const flexHorSpaceBetween = css`
  ${flexHor};
  justify-content: space-between;
`;

/**Border */
export const borderTop = css`
  border-top: 1px solid ${colors.gray};
`;
export const borderBottom = css`
  border-bottom: 1px solid ${colors.gray};
`;
export const borderRight = css`
  border-right: 1px solid ${colors.gray};
`;

/**Clickable */
export const cursorPointer = css`
  cursor: pointer;
`;
export const opacity = css`
  opacity: 0.7;
`;
export const clickable = css`
  ${cursorPointer};
  &:hover {
    ${opacity};
  }
`;

/**Button */
export const basicButton = css`
  ${flexHorCentered};
  ${clickable};
  width: 200px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  &:disabled {
    background-color: ${colors.gray};
    cursor: not-allowed;
  }
`;

/**Absolute Position */
export const absoluteVerticalCentered = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

/**Media Queries */
export const MEDIA_QUERIES = {
  upTo600: "@media screen and (max-width: 600px)",
};
