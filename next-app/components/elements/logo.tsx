/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FlexHorBox } from "@components/elements/box";
import { colors } from "@styles/colors";
import { clickable } from "@styles/utils";

type TerakoyaLogoProps = {
  isNotClickable?: boolean;
};

export default function TerakoyaLogo(props: TerakoyaLogoProps) {
  const { isNotClickable } = props;
  const router = useRouter();
  const goToHome = () => router.push("/");
  return (
    <FlexHorBox
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
      <h2
        css={css`
          color: ${colors.darkBrown};
        `}
      >
        テラコヤ
      </h2>
    </FlexHorBox>
  );
}
