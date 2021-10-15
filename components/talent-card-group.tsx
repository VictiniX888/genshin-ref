import { Talent } from 'genshin-db';
import TalentCard from './talent-card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface TalentCardGroupProps {
  talentData: Talent;
}

export default function TalentCardGroup({ talentData }: TalentCardGroupProps) {
  return (
    <>
      <Row className='gy-3'>
        <Col xs={12}>
          <TalentCard type='Attack' talent={talentData.combat1} />
        </Col>

        <Col xs={12}>
          <TalentCard type='Elemental Skill' talent={talentData.combat2} />
        </Col>

        <Col xs={12}>
          <TalentCard type='Elemental Burst' talent={talentData.combat3} />
        </Col>

        {talentData.combatsp && (
          <Col xs={12}>
            <TalentCard type='Alternate Sprint' talent={talentData.combatsp} />
          </Col>
        )}
      </Row>
    </>
  );
}
