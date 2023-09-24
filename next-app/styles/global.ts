import { css } from "@emotion/react";

import { colors } from "@styles/colors";

export const globalStyles = css`
  // It's recommended to set the font size in html tag so that the font size setting can be reflected when a user changes the font size in the browser.
  // https://developer.mozilla.org/ja/docs/Web/CSS/font-size
  // But even html is ok if usability is not a concern.
  // https://swallow-incubate.com/archives/blog/20190617/
  body {
    // Reset values of margin, padding and so on because their default values are different between browsers.
    margin: 0;
    padding: 0;
    // Set the root font size so that the font size of the body element can be calculated by rem and em.
    // Because rem is calculated based on the font size of html tag.
    // https://developer.mozilla.org/ja/docs/Web/CSS/font-size
    font-size: 16px;
    /* font-size: 62.5%; */
    color: ${colors.primaryBlack};
  }
`;
