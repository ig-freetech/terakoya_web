"use client";

import { Paper, Box, TextField, Typography, Button } from "@mui/material";
import Link from "next/link";
import React, { BaseSyntheticEvent } from "react";
import { UseFormRegister } from "react-hook-form";

import { AuthAccountRequestBody } from "@apis/(auth)/types";
import { Loading } from "@components/elements/loading";

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
    <Box display="flex" justifyContent="center">
      <Paper
        sx={{
          margin: 5,
          padding: 5,
        }}
      >
        <Box flexDirection="column">
          <Link href="/">
            {/* https://mui.com/material-ui/react-typography/ */}
            <Typography variant="subtitle1">Back to Home</Typography>
          </Link>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" sx={{ marginTop: 1 }}>
              {text}
            </Typography>
            {/* https://mui.com/material-ui/react-text-field/ */}
            <TextField
              {...register("email")}
              fullWidth
              required={true}
              type="email"
              label="Email"
              variant="filled"
              sx={{ marginTop: 3 }}
            />
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
              sx={{ marginTop: 2 }}
            />
            {isLoading ? (
              <Loading text={`Processing ${text}...`} />
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "200px", marginTop: 3 }}
                onClick={onSubmit}
              >
                {text}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
