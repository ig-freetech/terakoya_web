// app/loading.tsx is shown in all pages while the next page is loading by CSR by default in Next.js v13.
// So app/loading.ts is not shown in SSG, SSR and direct url access.
// https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states

// app/loading.tsx must be client component.
"use client";

// https://mui.com/material-ui/react-progress/#circular
import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  );
}
