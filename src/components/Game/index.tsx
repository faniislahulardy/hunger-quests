'use client';

import type { Player } from '@prisma/client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useGameContext } from '@/contexts/GameContext';
import { GAME_STAGE } from '@/types';

import Ending from '../Final';
import GameStatus from '../GameStatus';
import Introduction from '../Introduction';
import NewPlayer from '../NewPlayer';
import Quest from '../Quest/Quest';

export default function Game() {
  const { game, team } = useGameContext();
  const [player, setPlayer] = useState<Player>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localPlayer = JSON.parse(localStorage?.getItem('player') || '{}') as Player;

    if (localPlayer.id) {
      setPlayer(localPlayer);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  }

  if (!player?.id) {
    return <NewPlayer />;
  }

  return (
    <GameContainer>
      <GameStatus
        teamName={team.name}
        playerName={player.name}
        questStatus={`${team.level + 1} of 3`}
      />

      {game.stage === GAME_STAGE.ONBOARDING && <Introduction />}
      {game.stage === GAME_STAGE.PLAYING && <Quest />}
      {game.stage === GAME_STAGE.FINISHED && <Ending />}
    </GameContainer>
  );
}

const GameContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
