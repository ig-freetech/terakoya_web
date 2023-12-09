import React, { useEffect, useState } from "react";
// https://react-dropzone.js.org/
import { useDropzone } from "react-dropzone";
import { type Point, type Area } from "react-easy-crop";
import toast from "react-hot-toast";

import { useFetchProfile, useUpdateUserProfileImg } from "@apis/(user)/user";
import { useHandleError } from "@hooks/useHandleError";

export const ASPECT_RATIO = 1; // The same as Twitter

export const useImageCropper = (uuid: string, imgUrl?: string) => {
  const [srcImgUrl, setSrcImgUrl] = useState(imgUrl ?? "");
  const [srcImgType, setSrcImgType] = useState(""); // ex: "png", "jpeg", "jpg", etc...
  const [croppedImgDataUrl, setCroppedImgDataUrl] = useState("");
  const [previewImgDataUrl, setPreviewImgDataUrl] = useState("");
  const [crop, setCrop] = useState<Point>({
    // default coordinates of the top-left corner of the crop area
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(1);
  const previewCanvasRef = React.useRef(null);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleCloseModal = () => setIsOpenModal(false);

  const handleOnApply = () => {
    if (!previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current as HTMLCanvasElement;

    // toBlob() converts the image generated from the canvas to a Blob object.
    // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toBlob
    canvas.toBlob((blob) => {
      if (!blob) return;
      const formData = new FormData();
      // Fast API's UploadFile requires "name" to be set to "file".
      // 3rd argument "filename" is converted to UploadFile.filename by Fast API.
      // https://developer.mozilla.org/ja/docs/Web/API/FormData/append
      formData.append("file", blob, `profile_img.${srcImgType}`);

      // Debug code for whether the formData is correct or not.
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      updateProfileImg(formData, {
        onSuccess: () => {
          toast.success("プロフィール画像を更新しました");
          refetch();
        },
        onError: () => {
          toast.error("プロフィール画像の更新に失敗しました");
        },
      });
      setPreviewImgDataUrl(croppedImgDataUrl);
      setIsOpenModal(false);
    });
  };

  const { handleError } = useHandleError();
  const { refetch } = useFetchProfile(uuid, {
    onError: (error) => handleError(error),
  });
  const { mutate: updateProfileImg } = useUpdateUserProfileImg(uuid);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    if (acceptedFiles.length > 1) {
      toast.error("画像ファイルは1つだけ選択してください");
      return;
    }

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

      setSrcImgUrl(dataUrl);
      setIsOpenModal(true);
    });
    // Read the image file as File object. Then convert and store it as a base64 encoded data URL in reader.result, and "load" event will be fired.
    // https://developer.mozilla.org/ja/docs/Web/API/FileReader/readAsDataURL
    reader.readAsDataURL(imgFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCropChanged = (location: Point) => setCrop(location);

  const handlerCropCompleted = (croppedArea: Area, croppedAreaPixels: Area) => {
    const img = new Image();
    img.addEventListener("load", () => {
      if (!previewCanvasRef.current) return;

      const canvas = previewCanvasRef.current as HTMLCanvasElement;

      // Make the canvas size the same as the crop area.
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // canvas.getContext("2d") is used to draw graphics (ex: images, graphs, etc...) dinamically.
      // https://developer.mozilla.org/ja/docs/Web/API/Canvas_API/Tutorial/Using_images
      const ctx = canvas.getContext("2d");

      // https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/drawImage
      ctx?.drawImage(
        img,
        croppedAreaPixels.x, // The x coordinate where to start clipping on the source image
        croppedAreaPixels.y, // The y coordinate where to start clipping on the source image
        croppedAreaPixels.width, // The width of the clipped image from the start point defined by the x parameter
        croppedAreaPixels.height, // The height of the clipped image from the start point defined by the y parameter
        0, // The x coordinate where to place the image on the canvas
        0, // The y coordinate where to place the image on the canvas
        croppedAreaPixels.width, // The width of the image to use in the canvas (stretch or reduce the image)
        croppedAreaPixels.height // The height of the image to use in the canvas (stretch or reduce the image)
      );

      // toDataURL() returns the url starting with "data:" which is used to embed the image generated from the canvas in another HTML element like <img>.
      // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toDataURL
      // https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/Data_URLs
      const croppedImgSrcUrl = canvas.toDataURL(`image/${srcImgType}`);
      setCroppedImgDataUrl(croppedImgSrcUrl);
    });
    img.src = srcImgUrl;
  };

  const handleZoomChanged = (zoom: number) => setZoom(zoom);

  useEffect(() => {
    if (imgUrl) setPreviewImgDataUrl(imgUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
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
  };
};
