/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { Modal as MuiModal } from "@mui/material";
import { useState } from "react";

import { FlexColCenteredBox, MarginBox } from "@components/elements/box";
import { DarkBrownButton } from "@components/elements/button";
import {
  BoldTextLightBrown,
  CaptionDanger,
  CaptionDarkBrown,
  CaptionSuccess,
  CaptionWarning,
} from "@components/elements/text";

const StyledDiv = styled.div`
  // <tag>:not(:first-child) is used to apply styles to all elements except the first child of <tag>.
  // https://kouhekikyozou.com/css_except_first_child
  // <tag>:first-child is used to apply styles to the first child of <tag> between the elements of the same level (siblings).
  // https://developer.mozilla.org/ja/docs/Web/CSS/:first-child
  &:not(:first-child) {
    margin-top: 10px;
  }
`;

type Mode = "success" | "warning" | "danger";
type ButtonProps = {
  onClick: () => void;
  text: string;
};

export const useSimpleModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [texts, setTexts] = useState<Array<string>>([]);
  const [mode, setMode] = useState<Mode>();
  const [btnProps, setBtnProps] = useState<ButtonProps>();

  const onClose = () => setIsOpen(false);
  const openModal = (
    caption: string,
    texts: Array<string>,
    mode?: Mode,
    btnProps?: ButtonProps
  ) => {
    setMode(mode);
    setCaption(caption);
    setTexts(texts);
    setIsOpen(true);
    setBtnProps(btnProps);
  };

  const Caption = () =>
    mode === "success" ? (
      <CaptionSuccess>{caption}</CaptionSuccess>
    ) : mode === "warning" ? (
      <CaptionWarning>{caption}</CaptionWarning>
    ) : mode === "danger" ? (
      <CaptionDanger>{caption}</CaptionDanger>
    ) : (
      <CaptionDarkBrown>{caption}</CaptionDarkBrown>
    );

  const Modal = () => (
    // https://mui.com/material-ui/react-modal/#basic-modal
    <MuiModal open={isOpen} onClose={onClose}>
      <FlexColCenteredBox>
        <MarginBox marginTopPx={20} />
        <Caption />
        {texts.map((text, index) => (
          <StyledDiv key={index}>
            <BoldTextLightBrown>{text}</BoldTextLightBrown>
          </StyledDiv>
        ))}
        {btnProps && (
          <>
            <MarginBox marginTopPx={20} />
            <DarkBrownButton onClick={btnProps.onClick}>
              {btnProps.text}
            </DarkBrownButton>
          </>
        )}
      </FlexColCenteredBox>
    </MuiModal>
  );

  return {
    Modal,
    openModal,
  };
};
