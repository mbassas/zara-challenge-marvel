"use client";
import { Character } from "@/types/MarvelApiTypes";
import styled from "styled-components";
import { Heart } from "./icons/Heart";

interface CharacterCardProps
  extends Pick<Character, "name" | "thumbnail" | "id" | "description"> {
  detailed?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  thumbnail,
  id,
  description,
  detailed = false,
}) => {
  const handleToggleFavorite = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Toggle favorite", id);
  };

  const showDescription = detailed && description;
  return (
    <Container $detailed={detailed}>
      <CharacterPhotoWrapper $detailed={detailed}>
        <CharacterPhoto
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={name}
        />
      </CharacterPhotoWrapper>

      <CharacterInfo>
        {!detailed && <Rectangle />}
        <Name $detailed={detailed}>{name}</Name>
        <NoStyleButton onClick={handleToggleFavorite}>
          <Heart selected={false} size={detailed ? "lg" : "sm"} />
        </NoStyleButton>
      </CharacterInfo>
      {showDescription && <Description>{description}</Description>}
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

const Container = styled.div<{ $detailed: boolean }>`
  position: relative;
  width: 100%;

  background-color: #000;

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
    ${(props) =>
      !props.$detailed &&
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
`;

const CharacterPhotoWrapper = styled.div<{ $detailed: boolean }>`
  ${(props) => !props.$detailed && "height: 190px;"}
`;

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

export const Name = styled.span<{ $detailed: boolean }>`
  width: 108px;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.41px;
  text-transform: uppercase;
  z-index: 1;

  ${(props) =>
    props.$detailed &&
    `
    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
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

const Description = styled.p`
  color: #fff;
  padding: 8px 16px 48px 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  width: 361px;
`;

export default CharacterCard;
