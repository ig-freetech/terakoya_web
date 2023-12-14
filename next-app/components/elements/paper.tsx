import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Paper as MuiPaper } from "@mui/material";

import { colors } from "@styles/colors";

const AtomPaperStyle = css`
  padding: 20px 20px;
  background-color: ${colors.white};
  border-radius: 5px;
`;

type PaperProps = {
  children?: React.ReactNode;
};
export const AtomStyledPaper = styled.div`
  ${AtomPaperStyle}
`;
export const AtomTransparentLightIndigoPaper = styled(AtomStyledPaper)`
  // https://ironodata.info/rgb.php?color=0F5EA9
  background-color: rgba(15, 94, 169, 0.2);
`;
export const AtomTransparentLightBrownPaper = styled(AtomStyledPaper)`
  // https://ironodata.info/rgb.php?color=8B4513
  background-color: rgba(139, 69, 19, 0.1);
`;
export const AtomTransparentIndigoPaper = styled(AtomStyledPaper)`
  background-color: rgba(23, 43, 77, 0.1);
`;
export const AtomGrayPaper = styled(AtomStyledPaper)`
  background-color: ${colors.gray};
`;

const StyledPaper = styled.div`
  ${AtomPaperStyle}
  min-height: calc(100vh * 0.65);
  min-width: calc(100vw * 0.9);
  /* margin: 5px; */
  /* box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); // elevation effect */
`;

export const PagePaper = (props: PaperProps) => {
  return <StyledPaper>{props.children}</StyledPaper>;
};

type BasicMuiPaperProps = {
  children?: React.ReactNode;
  backgroundColor?: string;
};
export const PageMuiPaper = (props: BasicMuiPaperProps) => {
  const { children, backgroundColor } = props;
  return (
    <MuiPaper
      elevation={5}
      sx={{
        // viewport is a content display area that dynamically changes for each device, such as PCs and mobile devices (smartphones and tablets).
        // https://seolaboratory.jp/48581/
        // vh and vw are relative to the viewport's height and width respectively.
        // https://coliss.com/articles/build-websites/operation/css/css-viewport-units.html
        minHeight: "calc(100vh * 0.5)",
        minWidth: {
          // MUI default breakpoints are xs, sm, md, lg, and xl.
          // https://mui.com/material-ui/customization/breakpoints/#default-breakpoints
          xs: "auto", // More than 0px
          // sm: "auto", // More than 600px
          md: "calc(100vw * 0.9)", // More than 900px
          // lg: "calc(100vw * 0.9)", // More than 1200px
          // xl: "calc(100vw * 0.9)", // More than 1536px
        },
        margin: 5,
        padding: 5,
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </MuiPaper>
  );
};
