import { CombatTalentDetail } from 'genshin-db';
import Card from 'react-bootstrap/Card';
import { parseFormattedTextAsCardText } from '../lib/text';

interface TalentCardProps {
  type: string;
  talent: CombatTalentDetail;
}

export default function TalentCard({ type, talent }: TalentCardProps) {
  return (
    <Card>
      <Card.Header>{type}</Card.Header>
      <Card.Body>
        <Card.Title>{talent.name}</Card.Title>
        {parseFormattedTextAsCardText(talent.info)}
        {talent.description && <Card.Text>{talent.description}</Card.Text>}
      </Card.Body>
    </Card>
  );
}
