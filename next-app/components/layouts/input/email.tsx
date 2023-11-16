import { UseFormRegister } from "react-hook-form";

import { AuthAccountRequestBody } from "@apis/(user)/auth";
import { FlexColStartLeft, MarginBox } from "@components/elements/box";
import { StyledInput } from "@components/elements/input";
import { CaptionDarkBrown } from "@components/elements/text";

type EmailInputProps = {
  register: UseFormRegister<AuthAccountRequestBody>;
};
export const EmailInput = (props: EmailInputProps) => {
  const { register } = props;

  return (
    <FlexColStartLeft>
      <MarginBox marginTopPx={20}>
        <CaptionDarkBrown>メールアドレス</CaptionDarkBrown>
      </MarginBox>
      <MarginBox marginTopPx={10}>
        <StyledInput
          {...register("email")}
          required={true}
          type="email"
          placeholder="Email"
        />
      </MarginBox>
    </FlexColStartLeft>
  );
};
