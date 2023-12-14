// app/<route>/page.tsx is shown in "/<route>" in Next.js v13.
// https://blog.logrocket.com/next-js-13-app-directory/#page-directory-vs-app-directory
// https://nextjs.org/docs/app/building-your-application/routing#the-app-router

// All components in app/ are Server Components by default.
// So you must use "use client" to use client components in app/.
// https://zenn.dev/azukiazusa/articles/next-js-app-dir-tutorial

// It is recommended to use Server Components for display (list and detail) and Client Components for manipulation (create and delete).
// https://zenn.dev/jtakahashi64/articles/a9d2ae3285ceb6#react-server-components

// Codes used in only Server Components won't be sent to the client. So bundle size will be smaller and network traffic will be less in Client side.
// Hooks cannot be used and event handlers like onClick cannot be set in Server Components.
// getServerSideProps and getStaticProps are deprecated in Server Components in Next.js v13.
// https://zenn.dev/sumiren/articles/f39a151e7320d5#next.js-13-server-components

// CSR load JS to generate DOM (= Hydration) and render pages on client side.
// https://zenn.dev/takuyakikuchi/articles/2f7e54bdafce52#csr

// SSG in Next.js automatically caches the generated static page and serves it to the first visitor. Subsequent requests will serve pages from the cache.
// SSG builds html files for all pages in build time. So it is suitable for pages that are not updated frequently such as blog posts or Q&A.
// SSG is more beneficial for SEO and performance than SSR.
// https://zenn.dev/luvmini511/articles/1523113e0dec58#2.-ssg
// https://zenn.dev/takuyakikuchi/articles/2f7e54bdafce52#ssg

// SSR generates html files for each request. So it is suitable for pages that are updated frequently such as item list page or shopping cart in e-commerce.
// SSR is more beneficial for SEO and performance than CSR.
// https://zenn.dev/luvmini511/articles/1523113e0dec58#3.-ssr

// Next.js pre-renders all pages in SSG at build time by default instead of loading JS and rendering them on client side.
// Pre-rendering (SSG, SSR) is beneficial for SEO and performance.
// https://zenn.dev/luvmini511/articles/1523113e0dec58#1.-pre-rendering

// next dev --turbo will enable Turbo Mode to reduce the time to build and reload pages and cache them.
// https://zenn.dev/anneau/articles/5b0856bbf72c0c#turbopack%E3%81%AE%E7%99%BA%E5%B1%95%E3%81%8C%E6%A5%BD%E3%81%97%E3%81%BF
// https://nextjs.org/docs/architecture/turbopack

// <Suspense> handle the rendering status of the child component.
// For example, it's used with React.lazy() to load the child component asynchronously.
// https://zenn.dev/uhyo/books/react-concurrent-handson/viewer/what-is-suspense
// Suspense is to wait for the data(await) of the child component(async function) to be loaded (until resolving Promise) and then render it.
// Suspense is for use with React.lazy() for now.
// https://zenn.dev/tfutada/articles/36ad71ab598019

// TODO: use/fetch/cache
// https://zenn.dev/1031take/articles/e9234890d0c6d3
// https://zenn.dev/uhyo/articles/react-use-rfc
// https://zenn.dev/sora_kumo/articles/46a87f1bde207c

// TODO: useTransition
// https://qiita.com/Yuki_Oshima/items/b6ec2fb9f5b5d53381ad

// TODO: Server Actions
// https://nextjs.org/blog/next-13-4#server-actions-alpha

// TODO: next/image
// https://www.zenryoku-kun.com/post/nextjs13-image

/** @jsxImportSource @emotion/react */

"use client";

import styled from "@emotion/styled";
import { HiOutlineUserCircle } from "react-icons/hi";

import {
  FlexColBox,
  FlexHorBox,
  FlexHorEndRightBox,
  MarginBox,
} from "@components/elements/box";
import { IndigoSecondaryButton } from "@components/elements/button";
import { ErrorReloading } from "@components/elements/error";
import { StyledTextArea } from "@components/elements/input";
import { Loading } from "@components/elements/loading";
import { PagePaper, AtomStyledPaper } from "@components/elements/paper";
import { CaptionSuccess, TextDanger } from "@components/elements/text";
import { PostItem } from "@components/layouts/timeline";
import { usePutReaction } from "@hooks/timeline/usePutReaction";
import { useUserStore } from "@stores/user";
import { colors } from "@styles/colors";

import { useFetchTimeline, usePostTimeline } from "./hook";

const PostFormPaper = styled(AtomStyledPaper)`
  border: 1px solid ${colors.primaryBrown};
  border-radius: 10px;
  background-color: #f8f8ff; // GhostWhite
`;

export default function Page() {
  const {
    postList,
    isFetchingPostList,
    isErrorFetchingPostList,
    refetchInitialPostList,
  } = useFetchTimeline();
  const { onSubmitPost, isSubmittingPost, errorText, register } =
    usePostTimeline(refetchInitialPostList);
  const { currentToggledPostList, handleReactionToPost } =
    usePutReaction(postList);

  const { user } = useUserStore();

  return (
    <PagePaper>
      {isSubmittingPost ? (
        <Loading text="Submitting post..." />
      ) : (
        <PostFormPaper>
          <FlexColBox>
            <CaptionSuccess>今日の学びを投稿しよう</CaptionSuccess>
            <MarginBox marginTopPx={10}>
              <FlexHorBox>
                {user?.user_profile_img_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.user_profile_img_url}
                    alt="プロフィールアイコン"
                    width={30}
                    height={30}
                  />
                ) : (
                  <HiOutlineUserCircle size={30} />
                )}
                <MarginBox marginLeftPx={20} isWidthMax={true}>
                  <FlexColBox>
                    <StyledTextArea
                      rows={3}
                      placeholder="What did you learn today? (※10文字以上)"
                      {...register("texts")}
                    />
                    {errorText ? <TextDanger>{errorText}</TextDanger> : null}
                    <MarginBox marginTopPx={10}>
                      <FlexHorEndRightBox>
                        <IndigoSecondaryButton
                          type="submit"
                          onClick={onSubmitPost}
                        >
                          投稿
                        </IndigoSecondaryButton>
                      </FlexHorEndRightBox>
                    </MarginBox>
                  </FlexColBox>
                </MarginBox>
              </FlexHorBox>
            </MarginBox>
          </FlexColBox>
        </PostFormPaper>
      )}
      <MarginBox marginTopPx={20}>
        {isFetchingPostList ? (
          <Loading text="最新の投稿を取得中..." />
        ) : isErrorFetchingPostList ? (
          <ErrorReloading
            text="タイムラインの読み込みに失敗しました。"
            onClick={refetchInitialPostList}
          />
        ) : (
          currentToggledPostList?.map((post, index) => (
            <MarginBox key={index} marginTopPx={10}>
              <PostItem
                post={post}
                onClickLike={() => handleReactionToPost(post.post_id)}
                isLinkable={true}
              />
            </MarginBox>
          ))
        )}
      </MarginBox>
    </PagePaper>
  );
}
