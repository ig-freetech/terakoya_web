/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { AuthAccountRequestBody } from "@apis/(user)/auth";
import {
  FlexColStartLeftBox,
  MarginBox,
  FlexHorCenteredBox,
} from "@components/elements/box";
import { StyledInput } from "@components/elements/input";
import { CaptionDarkBrown } from "@components/elements/text";
import { colors } from "@styles/colors";
import { clickable, absoluteVerticalCentered } from "@styles/utils";

export const StyledIconButton = styled.span`
  ${clickable}
  color: ${colors.darkGray};
  ${absoluteVerticalCentered}
  // Put the icon 10px inside from the right edge of the input as the right edge of the icon.
  // https://developer.mozilla.org/ja/docs/Web/CSS/right
  right: 10px;
`;

type PasswordInputProps = {
  register: UseFormRegister<AuthAccountRequestBody>;
  onSubmit: () => Promise<void>;
};
export const PasswordInput = ({ register, onSubmit }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FlexColStartLeftBox>
      <MarginBox marginTopPx={20}>
        <CaptionDarkBrown>パスワード</CaptionDarkBrown>
      </MarginBox>
      <MarginBox marginTopPx={10}>
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
          />
          <MarginBox marginLeftPx={2}>
            <StyledIconButton onClick={togglePasswordVisibility}>
              {showPassword ? (
                <AiOutlineEye size={30} />
              ) : (
                <AiOutlineEyeInvisible size={30} />
              )}
            </StyledIconButton>
          </MarginBox>
        </FlexHorCenteredBox>
      </MarginBox>
    </FlexColStartLeftBox>
  );
};
