import { CharacterSearchForm } from "@/components/CharacterSearchForm/CharacterSearchForm";
import CharactersList from "@/components/CharactersList/CharactersList";
import { ContentWrapper } from "@/components/ContentWrapper/ContentWrapper";
import { getCharacters } from "@/services/marvelApi";
import { ReactNode } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { q: string };
}): Promise<ReactNode> {
  const initialSearch = searchParams.q || "";
  const { data } = await getCharacters(initialSearch);

  return (
    <ContentWrapper
      $paddingTop={24}
      $paddingBottom={24}
      $paddingLeft={16}
      $paddingRight={16}
    >
      <CharacterSearchForm
        initialSearch={initialSearch}
        resultCount={data?.count}
      />
      <CharactersList characters={data.results} />
    </ContentWrapper>
  );
}
