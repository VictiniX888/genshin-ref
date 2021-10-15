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
import PassiveCardGroup from '../../components/passive-card-group';

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
      <h1>{character.name}</h1>
      <p>{character.description}</p>

      {character.talentData && (
        <Row className='gy-3'>
          <Col xs={12}>
            <h2>Talents</h2>
            <TalentCardGroup talentData={character.talentData} />
          </Col>

          <Col xs={12}>
            <h2>Passives</h2>
            <PassiveCardGroup talentData={character.talentData} />
          </Col>
        </Row>
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
