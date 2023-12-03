import styled from "@emotion/styled";
import React, { useState } from "react";
// https://react-dropzone.js.org/
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";

// "Crop" means trimming image.
// react-image-crop supports only cropping images and don't support zooming images.
// So I use react-easy-crop instead to utilize both cropping and zooming.
// https://github.com/DominicTobias/react-image-crop
// import { ReactCrop, type Crop, type PixelCrop } from "react-image-crop";

import { FlexColBox } from "@components/elements/box";
import "react-image-crop/dist/ReactCrop.css";
import { clickable } from "@styles/utils";

const EDIT_AREA_SIZE = 600; // The same as Twitter
const FIXED_CROP_SIZE = 256;
const RESEIZED_SIZE = 56;

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
  const [srcUrl, setSrcUrl] = useState("");
  const [crop, setCrop] = useState<Crop>({
    // Default crop area
    unit: "px",
    width: FIXED_CROP_SIZE,
    height: FIXED_CROP_SIZE,
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

      const base64StrImg = reader.result;
      // Regular expression to extract the image type from the base64 string
      // https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions#javascript%E3%81%A7%E3%81%AE%E6%AD%A3%E8%A6%8F%E8%A1%A8%E7%8F%BE%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9
      const imgTypeMatch = new RegExp("data:image/(.*);").exec(base64StrImg);
      if (!imgTypeMatch) {
        toast.error("画像ファイルを選択してください");
        return;
      }
      // Mathes[0] is the whole string, and Matches[1] is only the first capture group (Ex: (.*))
      const imgType = imgTypeMatch[1];
      const img = new Image();
      img.addEventListener("load", () => {
        if (!previewCanvasRef.current) {
          console.log("canvas is null");
          return;
        }
        const canvas = previewCanvasRef.current as HTMLCanvasElement;

        // Make the canvas size the same as the crop area.
        // canvas.width = crop.width;
        // canvas.height = crop.height;

        // canvas.getContext("2d") is used to draw graphics (ex: images, graphs, etc...) dinamically.
        // https://developer.mozilla.org/ja/docs/Web/API/Canvas_API/Tutorial/Using_images
        const ctx = canvas.getContext("2d");

        // https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/drawImage
        ctx?.drawImage(
          img,
          crop.x, // The x coordinate where to start clipping on the source image
          crop.y, // The y coordinate where to start clipping on the source image
          crop.width, // The width of the clipped image from the start point defined by the x parameter
          crop.height, // The height of the clipped image from the start point defined by the y parameter
          0, // The x coordinate where to place the image on the canvas
          0, // The y coordinate where to place the image on the canvas
          crop.width, // The width of the image to use (stretch or reduce the image)
          crop.height // The height of the image to use (stretch or reduce the image)
        );

        // toDataURL() returns the url starting with "data:" which is used to embed the image generated from the canvas in another HTML element like <img>.
        // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toDataURL
        // https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/Data_URLs
        const imgSrcUrl = canvas.toDataURL(`image/${imgType}`);
        setSrcUrl(imgSrcUrl);
      });
      img.src = base64StrImg;
    });
    // Read the image file as File object. Then convert and store it as a base64 encoded data URL in reader.result, and "load" event will be fired.
    // https://developer.mozilla.org/ja/docs/Web/API/FileReader/readAsDataURL
    reader.readAsDataURL(imgFile);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCropChanged = (crop: PixelCrop) =>
    setCrop({
      ...crop,
      width: FIXED_CROP_SIZE,
      height: FIXED_CROP_SIZE,
    });

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
      {srcUrl ? (
        // TODO: 下記は Modal 化する
        <Cropper
          image={srcUrl}
          crop={crop}
          zoom={zoom}
          aspect={ASPECT_RATIO}
          onCropChange={handleCropChanged}
        />
      ) : null}
      <canvas
        ref={previewCanvasRef}
        // The canvas is not displayed because it is used only to generate the image.
        style={{ display: "none" }}
      />
    </FlexColBox>
  );
}

export default ImageCrop;
