"use client";

import React from "react";
import Link from "next/link";
import ReactLoading from "react-loading";
import { Paper, Box, TextField, Typography, Button } from "@mui/material";

import { useLogin } from "./hook";

export default function Page() {
  const { register, isLoading, onSubmit } = useLogin();

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
              Management Console
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
              type="password"
              label="Password"
              variant="filled"
              sx={{ marginTop: 2 }}
            />
            {isLoading ? (
              <>
                <ReactLoading type="spin" color="#866440" />
                <Typography>Processing login...</Typography>
              </>
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "200px", marginTop: 3 }}
                onClick={onSubmit}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
