// app/loading.tsx is shown in all pages while the next page is loading by CSR by default in Next.js v13.
// So app/loading.ts is not shown in SSG, SSR and direct url access.
// https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states

// app/loading.tsx must be client component.
"use client";

import { Loading as LoadingElement } from "@components/elements/loading";
import { PagePaper } from "@components/elements/paper";

type LoadingProps = {
  text?: string;
};
export default function Loading(props: LoadingProps) {
  return (
    <PagePaper>
      <LoadingElement text={props.text} />;
    </PagePaper>
  );
}
