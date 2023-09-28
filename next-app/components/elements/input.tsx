/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";

import { colors } from "@styles/colors";

const iconSize = 30;
export const StyledInput = styled.input`
  // + ${iconSize}px makes a padding between the right end of input and the left end of icon
  width: calc(100vw * 0.4 + ${iconSize}px);
  height: 50px;
  border: 1px solid ${colors.gray};
  border-radius: 5px;
  // padding in input is make a padding between border and text
  padding-left: 10px;
  padding-right: 10px;
`;

export const StyledComboBox = styled.select`
  width: 100%;
  height: 50px;
  border: 1px solid ${colors.gray};
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const StyledTextArea = styled.textarea`
  width: calc(100% - 20px);
  outline: none;
  border: none;
  padding: 10px;
  border-radius: 10px;
`;
