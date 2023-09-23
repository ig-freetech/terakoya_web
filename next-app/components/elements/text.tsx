import styled from "@emotion/styled";

import { colors } from "@styles/colors";
import { MEDIA_QUERIES } from "@styles/utils";

export const BoldText = styled.span`
  font-weight: bold;
`;
export const BoldDangerText = styled(BoldText)`
  color: ${colors.danger};
`;
export const BoldWarningText = styled(BoldText)`
  color: ${colors.warning};
`;
export const BoldSuccessText = styled(BoldText)`
  color: ${colors.success};
`;
export const BoldTextDarkBrown = styled(BoldText)`
  color: ${colors.darkBrown};
`;
export const BoldTextLightBrown = styled(BoldText)`
  color: ${colors.lightBrown};
`;
export const BoldTextWhite = styled(BoldText)`
  color: ${colors.white};
`;
export const CaptionDarkBrown = styled(BoldTextDarkBrown)`
  font-size: 24px;
  ${MEDIA_QUERIES.upTo600} {
    font-size: 20px;
  }
`;
export const HeadlineDarkBrown = styled(BoldTextDarkBrown)`
  font-size: 36px;
  ${MEDIA_QUERIES.upTo600} {
    font-size: 28px;
  }
`;
export const CaptionSuccess = styled(BoldSuccessText)`
  font-size: 24px;
`;
export const CaptionWarning = styled(BoldWarningText)`
  font-size: 24px;
`;
export const CaptionDanger = styled(BoldDangerText)`
  font-size: 24px;
`;

export const TextDarkBrown = styled.span`
  color: ${colors.darkBrown};
`;
export const TextLightBrown = styled.span`
  color: ${colors.lightBrown};
`;
export const SmallTextGray = styled.span`
  font-size: 12px;
  color: ${colors.gray};
`;
