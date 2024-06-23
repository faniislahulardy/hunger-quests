import { faCompass, faStar, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

type Props = {
  teamName: string;
  playerName: string;
  questStatus: string;
};

export default function GameStatus({ teamName, playerName, questStatus }: Props) {
  return (
    <Container>
      <span>
        <FontAwesomeIcon icon={faStar} />
        {teamName}
      </span>
      <span>
        <FontAwesomeIcon icon={faUser} />
        {playerName}
      </span>
      <span>
        <FontAwesomeIcon icon={faCompass} />
        {questStatus}
      </span>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  svg {
    margin-right: 10px;
  }
`;
