import { CharacterSearchForm } from "@/components/CharacterSearchForm";
import CharactersList from "@/components/CharactersList";
import { ContentWrapper } from "@/components/ContentWrapper/ContentWrapper";
import { Text } from "@/components/Text/Text";
import { getCharacter, getCharacters } from "@/services/marvelApi";
import { cookies } from "next/headers";

const getFavoriteCharacters = async (favoriteIds: number[], q = "") => {
  if (q) {
    const characters = await getCharacters(q);
    return (
      characters.data?.results.filter((c) => favoriteIds.includes(c.id)) || []
    );
  }

  return await Promise.all(favoriteIds.map((id) => getCharacter(id)));
};

export default async function Favorites({ searchParams }) {
  const cookieStore = cookies();
  const favoritesCookie = cookieStore.get("favorites");
  const initialSearch = searchParams.q || "";

  if (!favoritesCookie) {
    return <CharactersList characters={[]} />;
  }

  const favoritesIds = favoritesCookie.value
    .split(",")
    .map((id) => parseInt(id));

  const characters = await getFavoriteCharacters(favoritesIds, initialSearch);

  return (
    <ContentWrapper
      $paddingBottom={24}
      $paddingTop={24}
      $paddingLeft={16}
      $paddingRight={16}
    >
      <ContentWrapper $paddingBottom={24}>
        <Text isUpperCase size={24} weight={700}>
          Favorites
        </Text>
      </ContentWrapper>
      <CharacterSearchForm
        initialSearch={initialSearch}
        resultCount={characters.length}
      />
      <CharactersList characters={characters.filter((c) => !!c)} />
    </ContentWrapper>
  );
}
