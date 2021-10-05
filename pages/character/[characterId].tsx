import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {
  Character,
  getAllCharacterIds,
  getCharacterData,
} from '../../lib/characters';
import Container from 'react-bootstrap/Container';

interface CharacterPageProps {
  character?: Character;
}

interface CharacterPageParams extends ParsedUrlQuery {
  characterId: string;
}

export default function CharacterPage({ character }: CharacterPageProps) {
  if (character === undefined) {
    return (
      <Container>
        <h1>Character does not exist!</h1>
      </Container>
    );
  }

  return (
    <Container>
      <p>{character.name}</p>
      <p>{character.description}</p>
    </Container>
  );
}

export const getStaticProps: GetStaticProps<
  CharacterPageProps,
  CharacterPageParams
> = async ({ params }) => {
  const character = getCharacterData(params!.characterId);
  return {
    props: {
      character,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllCharacterIds();
  return {
    paths,
    fallback: false,
  };
};
