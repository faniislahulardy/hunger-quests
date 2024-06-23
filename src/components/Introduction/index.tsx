import styled from 'styled-components';

import startGame from '@/actions/startGame';
import { useGameContext } from '@/contexts/GameContext';

import Button from '../Button';

export default function Introduction() {
  const { game } = useGameContext();

  const onPlay = async () => {
    await startGame(game.id);
    window.location.reload();
  };

  return (
    <IntroContainer>
      <h1>Welcome to the game</h1>
      <Button onClick={onPlay}>Let&lsquo;s start</Button>
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

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;
