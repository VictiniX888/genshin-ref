import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {
  Character,
  getAllCharacterIds,
  getCharacterData,
} from '../../lib/characters';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TalentCardGroup from '../../components/talent-card-group';

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

      {character.talentData && (
        <TalentCardGroup talentData={character.talentData} />
      )}
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
