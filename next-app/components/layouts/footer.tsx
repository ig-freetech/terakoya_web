/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FaRegCopyright } from "react-icons/fa";
import { GrContact } from "react-icons/gr";

import {
  FlexHorCenteredBox,
  FlexColCenteredBox,
} from "@components/elements/box";
import { ExternalLinkNoUnderline } from "@components/elements/link";
import { colors } from "@styles/colors";
import { flexHorSpaceBetween, borderTop, MEDIA_QUERIES } from "@styles/utils";

const StyledFooter = styled.footer`
  ${flexHorSpaceBetween}
  ${borderTop}
  padding: 30px;
  ${MEDIA_QUERIES.upTo600} {
    flex-direction: column;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <FlexColCenteredBox>
        <FlexHorCenteredBox>
          <GrContact />
          <span>お問い合わせ</span>
        </FlexHorCenteredBox>
        <div
          css={css`
            margin-top: 5px;
          `}
        >
          <div color={colors.darkBrown}>info&#64;npoterakoya.org</div>
        </div>
      </FlexColCenteredBox>
      <FlexHorCenteredBox>
        <ExternalLinkNoUnderline
          url="https://www.npoterakoya.org/"
          color={colors.darkBrown}
        >
          <FlexHorCenteredBox>
            <FaRegCopyright />
            <div
              css={css`
                margin-left: 5px;
              `}
            >
              NPO法人テラコヤ
            </div>
          </FlexHorCenteredBox>
        </ExternalLinkNoUnderline>
      </FlexHorCenteredBox>
    </StyledFooter>
  );
}
