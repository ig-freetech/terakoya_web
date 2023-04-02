import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Page() {
  return (
    <Link to="/">
      {/* https://mui.com/material-ui/react-typography/ */}
      <Typography variant="subtitle1">ホームへ戻る</Typography>
    </Link>
  );
}
