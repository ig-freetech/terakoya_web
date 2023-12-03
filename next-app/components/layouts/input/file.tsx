/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import NextImage from "next/image";
import React, { useState } from "react";
// https://react-dropzone.js.org/
import { useDropzone } from "react-dropzone";
import Cropper, {
  type MediaSize,
  type Area,
  type Point,
} from "react-easy-crop";
import toast from "react-hot-toast";
import { IoArrowBackSharp } from "react-icons/io5";

// "Crop" means trimming image.
// react-image-crop supports only cropping images and don't support zooming images.
// So I use react-easy-crop instead to utilize both cropping and zooming.
// https://github.com/DominicTobias/react-image-crop
// import { ReactCrop, type Crop, type PixelCrop } from "react-image-crop";

import {
  FlexColBox,
  FlexColCenteredBox,
  FlexHorSpaceBetweenBox,
  MarginBox,
} from "@components/elements/box";
import { IndigoSecondaryButton } from "@components/elements/button";
import { Modal } from "@components/elements/modal";
import { clickable } from "@styles/utils";

const CROP_SIZE = 600; // The same as Twitter
const PreviewSize = 56;

const ASPECT_RATIO = 1; // The same as Twitter

const DropAreaButton = styled.button`
  width: 300px;
  height: 100%;
  border: 1px solid #f8f8ff;
  border-radius: 10px;
  background-color: #f8f8ff; // GhostWhite
  ${clickable}
`;
const StyledSpan = styled.span`
  // line-height is the distance between the top of the first line box and the bottom of the last line box.
  // https://developer.mozilla.org/ja/docs/Web/CSS/line-height
  line-height: 1.5rem;
`;

function ImageCrop() {
  const [srcImgDataUrl, setSrcImgDataUrl] = useState("");
  const [srcImgType, setSrcImgType] = useState(""); // Ex: "png", "jpeg", etc...
  const [cropedImgDataUrl, setCropedImgDataUrl] = useState("");
  const [previewImgDataUrl, setPreviewImgDataUrl] = useState("");
  const [crop, setCrop] = useState<Point>({
    // default coordinates of the top-left corner of the crop area
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(1);
  const previewCanvasRef = React.useRef(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    if (acceptedFiles.length > 1)
      toast.error("画像ファイルは1つだけ選択してください");

    // Set the image file as the base64 string.
    // https://qiita.com/nya-mochi/items/d148fa5863627d972493#%E3%83%89%E3%83%A9%E3%83%83%E3%82%B0%E3%81%97%E3%81%9F%E7%94%BB%E5%83%8F%E3%82%92base64%E3%81%AB%E5%A4%89%E6%8F%9B%E3%81%99%E3%82%8B
    const imgFile = acceptedFiles[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (!reader.result || typeof reader.result !== "string") return;
      const dataUrl = reader.result;

      // Regular expression to extract the image type from the base64 string
      // https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions#javascript%E3%81%A7%E3%81%AE%E6%AD%A3%E8%A6%8F%E8%A1%A8%E7%8F%BE%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9
      const imgTypeMatch = new RegExp("data:image/(.*);").exec(dataUrl);
      if (!imgTypeMatch) {
        toast.error("画像ファイルを選択してください");
        return;
      }

      // Mathes[0] is the whole string, and Matches[1] is only the first capture group (Ex: (.*))
      const imgType = imgTypeMatch[1];
      setSrcImgType(imgType);

      setSrcImgDataUrl(dataUrl);
      setIsOpenModal(true);
    });
    // Read the image file as File object. Then convert and store it as a base64 encoded data URL in reader.result, and "load" event will be fired.
    // https://developer.mozilla.org/ja/docs/Web/API/FileReader/readAsDataURL
    reader.readAsDataURL(imgFile);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCropChanged = (location: Point) => setCrop(location);
  const handlerCropCompleted = (cropedArea: Area, cropedAreaPixels: Area) => {
    const img = new Image();
    img.addEventListener("load", () => {
      if (!previewCanvasRef.current) {
        console.log("canvas is null");
        return;
      }
      const canvas = previewCanvasRef.current as HTMLCanvasElement;

      // Make the canvas size the same as the crop area.
      canvas.width = cropedAreaPixels.width;
      canvas.height = cropedAreaPixels.height;

      // canvas.getContext("2d") is used to draw graphics (ex: images, graphs, etc...) dinamically.
      // https://developer.mozilla.org/ja/docs/Web/API/Canvas_API/Tutorial/Using_images
      const ctx = canvas.getContext("2d");

      // https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/drawImage
      ctx?.drawImage(
        img,
        cropedAreaPixels.x, // The x coordinate where to start clipping on the source image
        cropedAreaPixels.y, // The y coordinate where to start clipping on the source image
        cropedAreaPixels.width, // The width of the clipped image from the start point defined by the x parameter
        cropedAreaPixels.height, // The height of the clipped image from the start point defined by the y parameter
        0, // The x coordinate where to place the image on the canvas
        0, // The y coordinate where to place the image on the canvas
        cropedAreaPixels.width, // The width of the image to use in the canvas (stretch or reduce the image)
        cropedAreaPixels.height // The height of the image to use in the canvas (stretch or reduce the image)
      );

      // toDataURL() returns the url starting with "data:" which is used to embed the image generated from the canvas in another HTML element like <img>.
      // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toDataURL
      // https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/Data_URLs
      const cropedImgSrcUrl = canvas.toDataURL(`image/${srcImgType}`);
      setCropedImgDataUrl(cropedImgSrcUrl);
    });
    img.src = srcImgDataUrl;
  };

  const handleMediaLoaded = (mediaSize: MediaSize) => {
    const { width, height } = mediaSize;
    const mediaAspectRadio = width / height;
    // In case that hight is longer than width
    if (mediaAspectRadio > ASPECT_RATIO) {
      // Set zoom size to fit the height
      const zoom = CROP_SIZE / ASPECT_RATIO / height;
      setZoom(zoom);
      return;
    }
    // Set zoom size to fit the width in case that width is longer than height.
    const zoom = CROP_SIZE / width;
    setZoom(zoom);
  };

  const handleOnApply = () => {
    setPreviewImgDataUrl(cropedImgDataUrl);
    setIsOpenModal(false);
  };

  const [isOpenModal, setIsOpenModal] = useState(false);

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
          <StyledSpan>ここにドロップして下さい</StyledSpan>
        ) : previewImgDataUrl ? (
          <NextImage
            src={previewImgDataUrl}
            alt="トリミング後プレビュー"
            width={PreviewSize}
            height={PreviewSize}
          />
        ) : (
          <>
            <StyledSpan>&#43;</StyledSpan>
            <br />
            <StyledSpan>ファイルを選択または</StyledSpan>
            <br />
            <StyledSpan>ドラッグ&ドロップして下さい</StyledSpan>
          </>
        )}
        <input {...getInputProps()} accept="image/*" />
      </DropAreaButton>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <FlexColCenteredBox>
          <FlexHorSpaceBetweenBox>
            <IoArrowBackSharp onClick={() => setIsOpenModal(false)} />
            <IndigoSecondaryButton onClick={handleOnApply}>
              Apply
            </IndigoSecondaryButton>
          </FlexHorSpaceBetweenBox>
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
              image={srcImgDataUrl}
              aspect={ASPECT_RATIO}
              crop={crop}
              onCropChange={handleCropChanged}
              onCropComplete={handlerCropCompleted}
              zoom={zoom}
              onZoomChange={setZoom}
              onMediaLoaded={handleMediaLoaded}
              showGrid={false}
            />
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
}

export default ImageCrop;
