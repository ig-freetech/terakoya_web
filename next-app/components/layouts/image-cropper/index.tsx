/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import NextImage from "next/image";
// react-easy-crop is better than react-image-crop because it supports zooming images in addition to cropping images.
// https://zenn.dev/kyosuke_14/articles/e892bffc0357da
import Cropper from "react-easy-crop";
import { HiOutlineUserCircle } from "react-icons/hi";
import { TbCameraPlus } from "react-icons/tb";

// "Crop" means trimming image.
// react-image-crop supports only cropping images and don't support zooming images.
// So I use react-easy-crop instead to utilize both cropping and zooming.
// https://github.com/DominicTobias/react-image-crop
// import { ReactCrop, type Crop, type PixelCrop } from "react-image-crop";

import {
  FlexColBox,
  FlexColCenteredBox,
  MarginBox,
} from "@components/elements/box";
import { IndigoSecondaryButton } from "@components/elements/button";
import { Modal } from "@components/elements/modal";
import { TextGray } from "@components/elements/text";
import { useUserStore } from "@stores/user";
import { colors } from "@styles/colors";
import { cursorPointer } from "@styles/utils";

import { ASPECT_RATIO, useImageCropper } from "./hook";

const PreviewSize = 192;

const DropAreaButton = styled.button`
  position: relative;
  background-color: ${colors.gray};
  // Remove the default padding and border of the button
  padding: 0;
  border: none;
  // Make the button round and display the image in a circle
  border-radius: 50%;
  overflow: hidden;
  // Make the button the same size as the image
  width: ${PreviewSize}px;
  height: ${PreviewSize}px;
  ${cursorPointer};
  &:hover {
    opacity: 0.5;
  }
`;

const OverlayStyle = css`
  position: absolute;
  // Move the icon to the center of the button using transform.
  // https://webst8.com/blog/css-transform-translate/
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${colors.white};
`;

type ImageCropperProps = {
  uuid: string;
  currentImgUrl?: string;
};

export const ImageCropper = ({ uuid, currentImgUrl }: ImageCropperProps) => {
  const { user } = useUserStore();
  const {
    previewImgDataUrl,
    // Loading image from local
    getRootProps,
    getInputProps,
    isDragActive,
    // Cropping
    srcImgUrl,
    crop,
    zoom,
    handleCropChanged,
    handlerCropCompleted,
    handleZoomChanged,
    previewCanvasRef,
    // Modal
    isOpenModal,
    handleOnApply,
    handleCloseModal,
  } = useImageCropper(uuid, currentImgUrl);

  return (
    <FlexColBox>
      {/* https://qiita.com/nya-mochi/items/d148fa5863627d972493#react-dropzone%E3%81%A7%E3%83%89%E3%83%A9%E3%83%83%E3%82%B0%E3%82%A2%E3%83%B3%E3%83%89%E3%83%89%E3%83%AD%E3%83%83%E3%83%97%E3%81%A7%E3%81%8D%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B */}
      <DropAreaButton
        {...getRootProps()}
        // Prevent onSubmit event from being fired when the button is clicked. This is because the button is wrapped by <form>.
        // Because button's type is "submit" by default.
        type="button"
      >
        {isDragActive ? (
          <span
            css={css`
              font-weight: bold;
              ${OverlayStyle};
            `}
          >
            ここにドロップ
            <br />
            して下さい
          </span>
        ) : (
          <TbCameraPlus css={OverlayStyle} size={PreviewSize / 4} />
        )}
        {previewImgDataUrl ? (
          <NextImage
            src={previewImgDataUrl}
            alt="プレビュー画像"
            // Countermeasure against layout shift
            // https://coliss.com/articles/build-websites/operation/work/avoiding-img-layout-shifts.html
            width={PreviewSize}
            height={PreviewSize}
          />
        ) : user?.user_profile_img_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="プレビュー画像"
            src={user.user_profile_img_url}
            width={PreviewSize}
            height={PreviewSize}
          />
        ) : (
          <HiOutlineUserCircle size={PreviewSize} />
        )}
        <input {...getInputProps()} accept="image/*" />
      </DropAreaButton>
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <FlexColCenteredBox>
          <MarginBox marginTopPx={10}>
            <TextGray>
              &#8251;プロフィール画像はトリミングを確定すると自動的に更新されます。
            </TextGray>
          </MarginBox>
          <MarginBox
            marginTopPx={20}
            css={css`
              position: relative;
              width: 100%;
              height: 300px;
            `}
          >
            <Cropper
              // https://zenn.dev/kyosuke_14/articles/e892bffc0357da#cropper%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AEprops%E3%82%92%E6%8C%87%E5%AE%9A
              image={srcImgUrl}
              aspect={ASPECT_RATIO}
              crop={crop}
              onCropChange={handleCropChanged}
              onCropComplete={handlerCropCompleted}
              zoom={zoom}
              onZoomChange={handleZoomChanged}
              showGrid={false}
            />
          </MarginBox>
          <MarginBox marginTopPx={20} marginBottomPx={10}>
            <IndigoSecondaryButton onClick={handleOnApply}>
              確定
            </IndigoSecondaryButton>
          </MarginBox>
        </FlexColCenteredBox>
      </Modal>
      <canvas
        ref={previewCanvasRef}
        // The canvas is not displayed because it is used only to generate the image.
        style={{ display: "none" }}
      />
    </FlexColBox>
  );
};

export default ImageCropper;
