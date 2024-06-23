'use server';

import { prisma } from '@/lib/prisma';
import { GAME_STAGE } from '@/types';

export default async function startGame(gameId: string) {
  await prisma?.game.update({
    where: {
      id: gameId
    },
    data: {
      stage: GAME_STAGE.PLAYING
    }
  });
}
