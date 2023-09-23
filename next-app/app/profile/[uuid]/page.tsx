"use client";

import { FlexColCenteredBox } from "@components/elements/box";
import { ErrorReloading } from "@components/elements/error";
import { Loading } from "@components/elements/loading";
import { BasicPaper } from "@components/elements/paper";
import { BoldText } from "@components/elements/text";

import { useProfile } from "./hook";

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example
export default function Page({ params }: { params: { uuid: string } }) {
  const { user, isLoading, isError, refetch } = useProfile(params.uuid);

  return (
    <BasicPaper>
      {isLoading ? (
        <Loading />
      ) : isError || !user ? (
        <ErrorReloading
          text="プロフィール情報の読み込みに失敗しました。"
          onClick={refetch}
        />
      ) : (
        <FlexColCenteredBox>
          <BoldText>{user.name}</BoldText>
          <BoldText>{user.email}</BoldText>
        </FlexColCenteredBox>
      )}
    </BasicPaper>
  );
}
