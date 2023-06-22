/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FaRegCopyright } from "react-icons/fa";
import { GrContact } from "react-icons/gr";

import { FlexHorBox, FlexColBox } from "@components/elements/box";
import { ExternalLinkNoUnderline } from "@components/elements/link";
import { colors } from "@styles/colors";
import { flexSpaceBetween, borderTop } from "@styles/utils";

const StyledFooter = styled.footer`
  ${flexSpaceBetween}
  ${borderTop}
  padding: 30px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <FlexColBox>
        <FlexHorBox>
          <GrContact />
          <div>お問い合わせ</div>
        </FlexHorBox>
        <div
          css={css`
            margin-top: 5px;
          `}
        >
          <div color={colors.darkBrown}>info&#64;npoterakoya.org</div>
        </div>
      </FlexColBox>
      <FlexHorBox>
        <ExternalLinkNoUnderline
          url="https://www.npoterakoya.org/"
          color={colors.darkBrown}
        >
          <FlexHorBox>
            <FaRegCopyright />
            <div
              css={css`
                margin-left: 5px;
              `}
            >
              NPO法人テラコヤ
            </div>
          </FlexHorBox>
        </ExternalLinkNoUnderline>
      </FlexHorBox>
    </StyledFooter>
  );
}
