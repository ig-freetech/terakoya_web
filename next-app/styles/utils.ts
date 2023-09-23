import { css } from "@emotion/react";

import { colors } from "@styles/colors";

/**Flexbox */
export const flexCenteredContent = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const flexSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  ${flexCenteredContent};
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
