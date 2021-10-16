import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Home() {
  return (
    <ListGroup variant='flush'>
      <Link href={`/character`} passHref>
        <ListGroup.Item action>Characters</ListGroup.Item>
      </Link>
    </ListGroup>
  );
}
