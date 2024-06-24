"use client";
import { Character } from "@/types/MarvelApiTypes";
import styled, { css } from "styled-components";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { Heart } from "../icons/Heart";
import { useRouter } from "next/navigation";

interface CharacterCardProps
  extends Pick<Character, "name" | "thumbnail" | "id" | "description"> {
  isDetailed?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  thumbnail,
  id,
  description,
  isDetailed = false,
}) => {
  const { toggleFavorite, favorites } = useFavoritesContext();
  const router = useRouter();
  const isFavorite = favorites.includes(id);
  const handleToggleFavorite = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(id);
    router.refresh();
  };

  const showDescription = isDetailed && description;
  return (
    <Container>
      <CharacterCardContentWrapper $isDetailed={isDetailed}>
        <CharacterPhotoWrapper $isDetailed={isDetailed}>
          <CharacterPhoto
            src={`${thumbnail.path}.${thumbnail.extension}`}
            alt={name}
            loading="lazy"
          />
        </CharacterPhotoWrapper>

        <CharacterInfoWrapper>
          <CharacterInfo>
            {!isDetailed && <Rectangle />}
            <Name $isDetailed={isDetailed}>{name}</Name>
            <NoStyleButton
              onClick={handleToggleFavorite}
              aria-label="heart-icon"
            >
              <Heart selected={isFavorite} size={isDetailed ? "lg" : "sm"} />
            </NoStyleButton>
          </CharacterInfo>
          {showDescription && <Description>{description}</Description>}
        </CharacterInfoWrapper>
      </CharacterCardContentWrapper>
      <Cut />
    </Container>
  );
};

const Rectangle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 5px;
  background: var(--marvel-red);
  transition: height 0.3s ease-in-out;
`;

const NoStyleButton = styled.button`
  background: none;
  border: none;
  padding: 12px;
  margin: 0;
  cursor: pointer;
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #000;
`;

const CharacterCardContentWrapper = styled.div<{ $isDetailed: boolean }>(
  (props) => css`
    /*---------------------------------------
    the card expands if another one in the row
    has a longer name
    */
    height: 100%;
    display: flex;
    flex-direction: column;
    /** ------------------------------------- */

    @media (hover: hover) {
      &:hover ${Rectangle} {
        height: 100%;
      }
      ${!props.$isDetailed &&
      `
      &:hover ${NoStyleButton} {
        color: #fff;
      }
    `}
    }

    ${NoStyleButton} {
      transition: color 0.3s ease-in-out;
      color: #ec1d24;
    }

    ${props.$isDetailed &&
    css`
      @media (min-width: 768px) {
        flex-direction: row;
        width: 100%;
        max-width: 960px;
        margin: auto;
        gap: 48px;
      }
    `}
  `,
);

const CharacterPhotoWrapper = styled.div<{ $isDetailed: boolean }>(
  (props) => css`
    ${!props.$isDetailed && "height: 190px;"}
    ${props.$isDetailed &&
    css`
      @media (min-width: 768px) {
        width: 320px;
        height: 320px;
        object-fit: cover;
      }
    `}
  `,
);

const CharacterPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CharacterInfo = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 16px;
  padding-top: 21px;
  align-items: center;
`;

const Name = styled.span<{ $isDetailed: boolean }>`
  width: 108px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.41px;
  text-transform: uppercase;
  z-index: 1;

  ${(props) =>
    props.$isDetailed &&
    css`
      font-weight: 700;
      font-size: 32px;
      line-height: 37px;
      width: 218px;
    `}
`;

const Cut = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background-color: #fff;
  border: 1px solid #fff;
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
`;

const CharacterInfoWrapper = styled.div`
  flex: 1;
  align-content: center;
`;

const Description = styled.p`
  color: #fff;
  padding: 8px 16px 48px 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

export default CharacterCard;