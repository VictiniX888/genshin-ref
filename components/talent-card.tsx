import { CombatTalentDetail } from 'genshin-db';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import {
  parseFormattedTextAsCardText,
  parseTalentValuesAsTableRow,
} from '../lib/text';
import utilStyles from '../styles/util.module.css';

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

        <Table responsive striped className={utilStyles['table-sticky-column']}>
          <thead>
            <tr>
              <th></th>
              {Array.from({ length: 15 }, (_, i) => (
                <th key={i}>{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {talent.attributes.labels.map((label) =>
              parseTalentValuesAsTableRow(label, talent.attributes.parameters)
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
