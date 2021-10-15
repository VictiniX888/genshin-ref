import { PassiveTalentDetail } from 'genshin-db';
import Card from 'react-bootstrap/Card';
import { parseFormattedTextAsCardText } from '../lib/text';

interface PassiveCardProps {
  type: string;
  passive: PassiveTalentDetail;
}

export default function PassiveCard({ type, passive }: PassiveCardProps) {
  return (
    <Card>
      <Card.Header>{type}</Card.Header>
      <Card.Body>
        <Card.Title>{passive.name}</Card.Title>

        {parseFormattedTextAsCardText(passive.info)}
      </Card.Body>
    </Card>
  );
}
