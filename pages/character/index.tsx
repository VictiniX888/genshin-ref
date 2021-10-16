import { GetStaticProps } from 'next';
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import { getCharacterList } from '../../lib/characters';

interface CharacterListPageProps {
  characters: { name: string; id: string }[];
}

export default function CharacterListPage({
  characters,
}: CharacterListPageProps) {
  return (
    <ListGroup variant='flush'>
      {characters.map(({ name, id }) => (
        <Link key={id} href={`/character/${id}`} passHref>
          <ListGroup.Item action>{name}</ListGroup.Item>
        </Link>
      ))}
    </ListGroup>
  );
}

export const getStaticProps: GetStaticProps<CharacterListPageProps> =
  async () => {
    const characters = getCharacterList();
    return {
      props: {
        characters,
      },
    };
  };
