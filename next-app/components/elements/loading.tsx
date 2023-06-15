import { Box, CircularProgress, Typography } from "@mui/material";

type LoadingProps = {
  text?: string;
};
export const Loading = (props: LoadingProps) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <CircularProgress />
    {/**
     * Nullish coalescing operator is null ?? "value" or undefined ?? "value".
     * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
     */}
    <Typography>{props.text ?? "Loading..."}</Typography>
  </Box>
);
