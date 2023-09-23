import { FlexColCenteredBox, MarginBox } from "@components/elements/box";
import { BoldText } from "@components/elements/text";

import { DarkBrownButton } from "./button";

type ErrorReloadingProps = {
  text: string;
  onClick: () => void;
};
export const ErrorReloading = (props: ErrorReloadingProps) => {
  const { text, onClick } = props;
  return (
    <FlexColCenteredBox>
      <BoldText>{text}</BoldText>
      <MarginBox marginTopPx={20} />
      <DarkBrownButton onClick={onClick}>再読み込み</DarkBrownButton>
    </FlexColCenteredBox>
  );
};
