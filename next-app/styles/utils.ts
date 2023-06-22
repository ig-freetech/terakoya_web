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

/**Text */
export const boldText = css`
  font-weight: bold;
`;
export const captionText = css`
  ${boldText}
  font-size: 24px;
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
