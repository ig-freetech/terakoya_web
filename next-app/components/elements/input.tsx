/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { AuthAccountRequestBody } from "@apis/(user)/auth";
import {
  FlexColStartLeft,
  FlexHorCenteredBox,
  MarginBox,
} from "@components/elements/box";
import { CaptionDarkBrown } from "@components/elements/text";
import { colors } from "@styles/colors";
import { clickable, absoluteVerticalCentered } from "@styles/utils";

const iconSize = 30;
const StyledInput = styled.input`
  // + ${iconSize}px makes a padding between the right end of input and the left end of icon
  width: calc(100vw * 0.4 + ${iconSize}px);
  height: 50px;
  border: 1px solid ${colors.gray};
  border-radius: 5px;
  // padding in input is make a padding between border and text
  padding-left: 10px;
  padding-right: 10px;
`;
const StyledIconButton = styled.span`
  ${clickable}
  color: ${colors.darkGray};
  ${absoluteVerticalCentered}
  // Put the icon 10px inside from the right edge of the input as the right edge of the icon.
  // https://developer.mozilla.org/ja/docs/Web/CSS/right
  right: 10px;
`;
type PasswordInputProps = {
  register: UseFormRegister<AuthAccountRequestBody>;
};
export const PasswordInput = (props: PasswordInputProps) => {
  const { register } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FlexColStartLeft>
      <MarginBox marginTopPx={20} />
      <CaptionDarkBrown>パスワード</CaptionDarkBrown>
      <MarginBox marginTopPx={10} />
      <FlexHorCenteredBox
        css={css`
          // Set position: relative to the parent element of the DOM element to be positioned absolutely.
          // https://zero-plus.io/media/css-position-absolute/
          position: relative;
        `}
      >
        <StyledInput
          {...register("password")}
          required={true}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <MarginBox marginLeftPx={2} />
        <StyledIconButton onClick={togglePasswordVisibility}>
          {showPassword ? (
            <AiOutlineEye size={iconSize} />
          ) : (
            <AiOutlineEyeInvisible size={iconSize} />
          )}
        </StyledIconButton>
      </FlexHorCenteredBox>
    </FlexColStartLeft>
  );
};

type EmailInputProps = {
  register: UseFormRegister<AuthAccountRequestBody>;
};
export const EmailInput = (props: EmailInputProps) => {
  const { register } = props;

  return (
    <FlexColStartLeft>
      <MarginBox marginTopPx={20} />
      <CaptionDarkBrown>メールアドレス</CaptionDarkBrown>
      <MarginBox marginTopPx={10} />
      <StyledInput
        {...register("email")}
        required={true}
        type="email"
        placeholder="Email"
      />
    </FlexColStartLeft>
  );
};
