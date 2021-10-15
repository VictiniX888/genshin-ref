import { Talent } from 'genshin-db';
import PassiveCard from './passive-card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface PassiveCardGroupProps {
  talentData: Talent;
}

export default function PassiveCardGroup({
  talentData,
}: PassiveCardGroupProps) {
  return (
    <>
      <Row className='gy-3'>
        <Col xs={12}>
          <PassiveCard
            type='1st Ascension Passive'
            passive={talentData.passive1}
          />
        </Col>

        <Col xs={12}>
          <PassiveCard
            type='4th Ascension Passive'
            passive={talentData.passive2}
          />
        </Col>

        {talentData.passive3 && (
          <Col xs={12}>
            <PassiveCard type='Utility Passive' passive={talentData.passive3} />
          </Col>
        )}

        {talentData.passive4 && (
          <Col xs={12}>
            <PassiveCard type='Utility Passive' passive={talentData.passive4} />
          </Col>
        )}
      </Row>
    </>
  );
}
