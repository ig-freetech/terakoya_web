// Define _app.tsx as Client Component to use Client Side API such as useState, useEffect, useContext and so on.
// For example, QueryClientProvider uses useContext internally.
"use client";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Sandwitch children with <QueryClientProvider> in layout.tsx to use react-query across all pages.
    // https://tanstack.com/query/v3/docs/react/quick-start
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
