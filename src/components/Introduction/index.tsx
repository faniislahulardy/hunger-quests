import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { useGameContext } from '@/contexts/GameContext';

import Button from '../Button';

export default function Introduction() {
  const { team } = useGameContext();
  const router = useRouter();

  const onPlay = async () => {
    router.refresh();
  };

  return (
    <IntroContainer>
      <h1>Welcome to team {team.name}</h1>
      <Button onClick={onPlay}>Start</Button>
    </IntroContainer>
  );
}

const IntroContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;
