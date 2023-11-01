/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ROUTER } from "@app/links";
import { FlexHorCenteredBox } from "@components/elements/box";
import { clickable } from "@styles/utils";

import { CaptionDarkBrown } from "./text";

type TerakoyaLogoProps = {
  isNotClickable?: boolean;
};

export default function TerakoyaLogo(props: TerakoyaLogoProps) {
  const { isNotClickable } = props;
  const router = useRouter();
  const goToHome = () => router.push(ROUTER.HOME);
  return (
    <FlexHorCenteredBox
      onClick={goToHome}
      css={
        !isNotClickable &&
        css`
          ${clickable}
        `
      }
    >
      <Image
        // Put static files (ex: images, fonts, etc) in "public" directory in Next.js.
        // https://nextjs-ja-translation-docs.vercel.app/docs/basic-features/static-file-serving
        // Specify the path from the "public" directory.
        // https://qiita.com/P-man_Brown/items/ed564ae4ea3c8eacfd4f
        src="/terakoya_icon.png"
        alt="Logo"
        width={50}
        height={50}
      />
      <CaptionDarkBrown>テラコヤ</CaptionDarkBrown>
    </FlexHorCenteredBox>
  );
}
