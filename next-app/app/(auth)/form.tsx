"use client";

import { Box, TextField, Typography, Button } from "@mui/material";
import Link from "next/link";
import React, { BaseSyntheticEvent } from "react";
import { UseFormRegister } from "react-hook-form";

import { AuthAccountRequestBody } from "@apis/(auth)/index";
import { Loading } from "@components/elements/loading";
import { BasicPaper } from "@components/elements/paper";

type FormProps = {
  register: UseFormRegister<AuthAccountRequestBody>;
  isLoading: boolean;
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  text: "Sign in" | "Sign up";
};

export default function Page(props: FormProps) {
  const { register, isLoading, onSubmit, text } = props;

  return (
    // https://mui.com/system/flexbox/
    <Box display="flex" justifyContent="center" alignItems="center">
      <BasicPaper>
        <Box flexDirection="column">
          <Link href="/">
            {/* https://mui.com/material-ui/react-typography/ */}
            <Typography variant="subtitle1">Back to Home</Typography>
          </Link>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" sx={{ marginTop: 3 }}>
              {text}
            </Typography>
            <Box sx={{ marginTop: 5 }}>
              {/* https://mui.com/material-ui/react-text-field/ */}
              <TextField
                {...register("email")}
                fullWidth
                required={true}
                type="email"
                label="Email"
                variant="filled"
                sx={{
                  width: "calc(100vh * 0.4)",
                }}
              />
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <TextField
                {...register("password")}
                fullWidth
                required={true}
                // Hide input text by using type="password"
                // https://blog.hiros-dot.net/?p=11689#toc4
                // TODO: Create a password input UI with a show/hide icon and put it in components/elements
                // https://mui.com/material-ui/react-text-field/#input-adornments
                type="password"
                label="Password"
                variant="filled"
                sx={{ width: "calc(100vh * 0.4)" }}
              />
            </Box>
            <Box sx={{ marginTop: 5 }}>
              {isLoading ? (
                <Loading text={`Processing ${text}...`} />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "200px" }}
                  onClick={onSubmit}
                >
                  {text}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </BasicPaper>
    </Box>
  );
}
