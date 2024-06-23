'use client';

import type { Game, Quest, Quest_queue, Team } from '@prisma/client';
import React, { createContext, useContext } from 'react';

type Props = {
  children: React.ReactNode;
  team: Team;
  game: Game;
  queue: ({ quest: Quest } & Quest_queue) | null;
};

type ContextValue = {
  team: Team;
  game: Game;
  queue: ({ quest: Quest } & Quest_queue) | null;
};

const GameContext = createContext<ContextValue | null>(null);

export const Provider = ({ children, team, game, queue }: Props) => {
  return <GameContext.Provider value={{ team, game, queue }}>{children}</GameContext.Provider>;
};

export const useGameContext = (): ContextValue => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('Context not available');
  }

  return context;
};
