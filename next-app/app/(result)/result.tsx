"use client";

// import styles from "@app/(result)/result.module.scss";
import { BsCheckCircle } from "react-icons/bs";
import { MdOutlineDangerous } from "react-icons/md";

import {
  FlexColCenteredBox,
  FlexHorCenteredBox,
  MarginBox,
} from "@components/elements/box";
import { BasicPaper } from "@components/elements/paper";
import {
  BoldTextDarkBrown,
  CaptionSuccess,
  CaptionDanger,
  CaptionDarkBrown,
} from "@components/elements/text";

type ResultProps = {
  caption: string;
  texts: Array<string>;
  mode?: "success" | "danger";
};
const Result: React.FC<ResultProps> = (props) => {
  const { caption, texts, mode } = props;
  return (
    <BasicPaper>
      <FlexColCenteredBox>
        {mode === "success" ? (
          <FlexHorCenteredBox>
            <BsCheckCircle />
            <MarginBox marginLeftPx={5} />
            <CaptionSuccess>{caption}</CaptionSuccess>
          </FlexHorCenteredBox>
        ) : mode === "danger" ? (
          <FlexHorCenteredBox>
            <MdOutlineDangerous />
            <MarginBox marginLeftPx={5} />
            <CaptionDanger>{caption}</CaptionDanger>
          </FlexHorCenteredBox>
        ) : (
          <CaptionDarkBrown>{caption}</CaptionDarkBrown>
        )}
        {texts.map((text, index) => (
          <div key={index}>
            <MarginBox marginTopPx={10} />
            <BoldTextDarkBrown>{text}</BoldTextDarkBrown>
          </div>
        ))}
      </FlexColCenteredBox>
    </BasicPaper>
  );
  // return (
  //   <div className={styles.result}>
  //     <div className={styles.content}>
  //       {texts.map((text, index) => (
  //         <p key={index}>{text}</p>
  //       ))}
  //     </div>
  //   </div>
  // );
};
export default Result;
