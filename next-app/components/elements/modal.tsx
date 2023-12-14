/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { colors } from "@styles/colors";
import { MEDIA_QUERIES, clickable } from "@styles/utils";

// Create a modal with overlay and content by full-scratching
// https://qiita.com/yokoto/items/7570ee5529a28da6527b

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; // 100% of the viewport width
  height: 100vh; // 100% of the viewport height
  background-color: rgba(0, 0, 0, 0.5); // Black with 50% opacity
  // Max value of z-index is 2147483647
  // https://qiita.com/7note/items/290d18194fec89f087f7
  z-index: 99;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 25%;
  left: 25%;
  width: 50%;
  height: auto;
  padding: 10px;
  border: 2px solid ${colors.white};
  border-radius: 10px;
  background-color: ${colors.white};
  z-index: 100;
  ${MEDIA_QUERIES.upTo600} {
    top: 10%;
    left: 10%;
    width: 80%;
  }
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        css={css`
          position: fixed;
          top: 0;
          right: 0;
          margin-top: 5%;
          margin-right: 5%;
          z-index: 100;
          color: ${colors.white};
          ${clickable}
        `}
        onClick={onClose}
      >
        <IoIosCloseCircleOutline size={50} />
      </div>
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </>
  );
};
