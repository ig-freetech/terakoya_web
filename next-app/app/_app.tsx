// Define _app.tsx as Client Component to use Client Side API such as useState, useEffect, useContext and so on.
// For example, QueryClientProvider uses useContext internally.
"use client";

import { QueryClientProvider, QueryClient } from "react-query";

// QueryClient is a React context that holds all of the cache data, so create a instance only once here and export it to reuse it across the app.
// QueryClient instance can be used in any component by using useQueryClient hook.
// https://zenn.dev/ryuta1346/articles/aece784f940597
const queryClient = new QueryClient({
  // Define default options for all queries in QueryClient.
  // https://note.yuuniworks.com/study/react-query#%E3%83%87%E3%83%95%E3%82%A9%E3%83%AB%E3%83%88%E8%A8%AD%E5%AE%9A%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%B3%A8%E6%84%8F
  // https://tanstack.com/query/v4/docs/react/reference/QueryClient
  defaultOptions: {
    queries: {
      // refetchIntervalInBackground is set to false to prevent continuously refetching data in background with refetchInterval seconds.
      refetchIntervalInBackground: false,
      // refetchOnWindowFocus is set to false to prevent refetching data when the window is focused.
      refetchOnWindowFocus: false,
      // refetchOnMount is set to false to prevent refetching data when the component is mounted.
      refetchOnMount: false,
      // refetchOnReconnect is set to false to prevent refetching data when the network is reconnected.
      // refetchOnReconnect: false,
      // retry is set to false to prevent retrying when the query fails.
      retry: false, // By default, retry failed query up to 3 times.
    },
  },
});

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
