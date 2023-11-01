/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CircularProgress } from "@mui/material";

import { FlexColCenteredBox } from "@components/elements/box";
import { BoldText } from "@components/elements/text";

type LoadingProps = {
  text?: string;
};
export const Loading = (props: LoadingProps) => (
  <FlexColCenteredBox
    css={css`
      height: 100%;
    `}
  >
    <CircularProgress />
    {/**
     * Nullish coalescing operator is null ?? "value" or undefined ?? "value".
     * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
     */}
    <BoldText>{props.text ?? "Loading..."}</BoldText>
  </FlexColCenteredBox>
);
