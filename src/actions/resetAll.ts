'use server';

import { prisma } from '@/lib/prisma';
import { GAME_STAGE } from '@/types';

export default async function resetAll() {
  await prisma?.game.updateMany({
    data: {
      stage: GAME_STAGE.ONBOARDING
    }
  });

  await prisma?.team.updateMany({
    data: {
      level: 0,
      points: 0,
      progress: 0
    }
  });

  await prisma?.quest_queue.updateMany({
    data: {
      is_done: false,
      is_reached: false
    }
  });
}
